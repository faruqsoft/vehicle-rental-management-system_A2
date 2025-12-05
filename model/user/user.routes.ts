import  Express  from "express";
import { userControllers } from "./user.controller";

const router = Express.Router()

router.post('/signup',userControllers.createUser);


export const  userRouter = router