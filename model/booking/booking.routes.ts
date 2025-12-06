import Express from  "express";
import { bookingControllers } from "./booking.controllers";

const router = Express.Router();


router.post("/",bookingControllers.createBooking)

export const bookingRouter = router