import { Request, Response } from "express";
import { bookingServices } from "./booking.services";


const createBooking = async (req: Request, res: Response) => {
  try {

    const result = await bookingServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getAllBookings = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user;

    const result = await bookingServices.getAllBookings(loggedInUser);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!bookingId) {
      return res.status(400).json({ success: false, message: "Booking ID is required" });
    }

    const updatedBooking = await bookingServices.updateBooking({
      bookingId,
      status,
      loggedInUser,
    });

    res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: updatedBooking,
    });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const bookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking
};

