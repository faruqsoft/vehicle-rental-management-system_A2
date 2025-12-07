import { pool } from "../../config/db";
import { UpdateBookingParams } from "../../types/booking";

const createBooking = async (payload: Record<string, any>) => {

  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
    throw new Error("All fields are required");
  }

  // 1️⃣ Vehicle price বের করা
  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price 
     FROM vehicles 
     WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  // 2️⃣ Total days বের করা
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  if (days <= 0) {
    throw new Error("End date must be greater than start date");
  }

  // 3️⃣ price হিসাব করা
  const total_price = days * vehicle.daily_rent_price;

  // 4️⃣ Database এ booking insert করা
  const bookingResult = await pool.query(
    `
      INSERT INTO bookings 
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *;
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const booking = bookingResult.rows[0];

  // 5️⃣ Final response তৈরী করা (nested vehicle info সহ)
  return {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};
const getAllBookings = async (loggedInUser: any) => {

  // ADMIN → get all bookings
  if (loggedInUser.role === "admin") {
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY id DESC"
    );
    return result.rows;
  }

  // CUSTOMER → get only his bookings
  if (loggedInUser.role === "customer") {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE customer_id = $1 ORDER BY id DESC",
      [loggedInUser.id]
    );
    return result.rows;
  }

  throw new Error("Forbidden");
};



const updateBooking = async ({
  bookingId,
  status,
  loggedInUser,
}: UpdateBookingParams) => {
  
  // 1️⃣ Find booking
  const bookingRes = await pool.query(
    "SELECT * FROM bookings WHERE id = $1",
    [bookingId]
  );

  if (bookingRes.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingRes.rows[0];

  // Normalize IDs
  const bookingCustomerId = String(booking.customer_id);
  const loggedUserId = String(loggedInUser.id);

  // ============================
  // 👤 CUSTOMER LOGIC
  // ============================
  if (loggedInUser.role === "customer") {

    // Can only cancel own booking
    if (bookingCustomerId !== loggedUserId) {
      throw new Error("Forbidden: You can only cancel your own bookings");
    }

    // Cannot cancel on/after start date
    const today = new Date();
    const rentStart = new Date(booking.rent_start_date);

    if (today >= rentStart) {
      throw new Error("Cannot cancel booking after start date");
    }

    // Customers can ONLY cancel
    if (status !== "cancelled") {
      throw new Error("Customers can only cancel bookings");
    }

    // Update booking
    await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2",
      [status, bookingId]
    );

    // Make vehicle available again
    await pool.query(
      "UPDATE vehicles SET availability_status = 'available' WHERE id = $1",
      [booking.vehicle_id]
    );

    return { ...booking, status };
  }

  // ============================
  // 👑 ADMIN LOGIC
  // ============================
  if (loggedInUser.role === "admin") {

    // Admin can only mark as returned
    if (status !== "returned") {
      throw new Error("Admins can only mark booking as returned");
    }

    // Update booking
    await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2",
      [status, bookingId]
    );

    // Make vehicle available again
    await pool.query(
      "UPDATE vehicles SET availability_status = 'available' WHERE id = $1",
      [booking.vehicle_id]
    );

    return { ...booking, status, vehicle: { availability_status: "available" } };
  }

  throw new Error("Forbidden");
};


export const bookingServices = {
  createBooking,
  getAllBookings,
  updateBooking
};
