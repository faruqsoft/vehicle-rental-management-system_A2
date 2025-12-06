import  Express  from "express";
import { authControllers } from "./auth.controller";
import userAuth from './../../middleware/userAuth';
import { Roles } from "./auth.constant";


const router = Express.Router()

router.post('/signin',authControllers.userSignin);


export const  authRouter = router