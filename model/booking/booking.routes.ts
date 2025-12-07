import Express from  "express";
import { bookingControllers } from "./booking.controllers";
import userAuth from './../../middleware/userAuth';
import { Roles } from "../auth/auth.constant";

import { authorizeBooking } from "../../middleware/authorizeBooking";


const router = Express.Router();


router.post("/",userAuth(Roles.admin,Roles.customer),bookingControllers.createBooking);
router.get("/",userAuth(Roles.admin, Roles.customer),bookingControllers.getAllBookings);
router.put("/:bookingId",userAuth(Roles.admin,Roles.customer),authorizeBooking,bookingControllers.updateBooking);

export const bookingRouter = router