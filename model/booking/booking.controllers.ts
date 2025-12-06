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


const getAllBooking = async (req: Request, res: Response) => {
  try {

    const result = await bookingServices.getAllBooking();

    res.status(201).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows
    
    });
   

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {

    const result = await bookingServices.updateBooking();

    res.status(201).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const bookingControllers = {
  createBooking,
  getAllBooking,
  updateBooking
};

