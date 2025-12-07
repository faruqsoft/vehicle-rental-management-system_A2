import  Express  from "express";
import { userControllers } from "./user.controller";
import userAuth from './../../middleware/userAuth';
import { Roles } from "../auth/auth.constant";
import { authorizeUser } from './../../middleware/authorizeUser';

const router = Express.Router()

router.post('/signup',userControllers.createUser);


router.get("/",userAuth(Roles.admin),userControllers.getUser)

router.put('/:userId',authorizeUser,userAuth(Roles.admin),userControllers.updateUser)
router.delete('/:userId',userAuth(Roles.admin),userControllers.deleteUser)

export const  userRouter = router