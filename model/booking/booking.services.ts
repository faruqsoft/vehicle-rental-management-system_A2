import { pool } from "../../config/db";

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
const getAllBooking = async()=>{
 const result  = await  pool.query(`
        SELECT * FROM bookings
        `)
  return result
};

const updateBooking = async()=>{
    await pool.query(`
        UPDATE bookings SET 
        `)
  return
}
export const bookingServices = {
  createBooking,
  getAllBooking,
  updateBooking
};
