import  Express  from "express";
import { userControllers } from "./user.controller";
import userAuth from './../../middleware/userAuth';
import { Roles } from "../auth/auth.constant";

const router = Express.Router()

router.post('/signup',userControllers.createUser);


router.get("/",userAuth(Roles.customer),userControllers.getUser)

router.put('/:userId',userControllers.updateUser)
router.delete('/:userId',userControllers.deleteUser)

export const  userRouter = router