import  Express  from "express";
import { authControllers } from "./auth.controller";


const router = Express.Router()

router.post('/signin',authControllers.userSignin);


export const  authRouter = router