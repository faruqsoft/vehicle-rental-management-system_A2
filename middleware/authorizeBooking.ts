import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";

export const authorizeBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedInUser = req.user;
    const { bookingId } = req.params;

    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Admin → সব allowed
    if (loggedInUser.role === "admin") {
      return next();
    }

    // Customer → শুধু নিজের booking
    const bookingRes = await pool.query(
      "SELECT * FROM bookings WHERE id = $1",
      [bookingId]
    );

    if (bookingRes.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = bookingRes.rows[0];

    if (booking.customer_id !== loggedInUser.id) {
      return res.status(403).json({ error: "Forbidden: You can only update your own booking" });
    }

    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
