import Express from  "express";
import { bookingControllers } from "./booking.controllers";
import userAuth from './../../middleware/userAuth';
import { Roles } from "../auth/auth.constant";
import { authorizeUser } from "../../middleware/authorizeUser";


const router = Express.Router();


router.post("/",userAuth(Roles.admin,Roles.customer),bookingControllers.createBooking);
router.get("/",authorizeUser,userAuth(Roles.admin, Roles.customer),bookingControllers.getAllBookings);
router.put("/:bookingId",authorizeUser,userAuth(Roles.admin,Roles.customer),bookingControllers.updateBooking);

export const bookingRouter = router