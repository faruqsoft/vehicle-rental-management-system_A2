import Express from  "express";
import { bookingControllers } from "./booking.controllers";

const router = Express.Router();


router.post("/",bookingControllers.createBooking);
router.get("/",bookingControllers.getAllBooking);
router.put("/:bookingId",bookingControllers.updateBooking);

export const bookingRouter = router