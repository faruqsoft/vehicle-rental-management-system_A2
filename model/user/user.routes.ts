import  Express  from "express";
import { userControllers } from "./user.controller";

const router = Express.Router()

router.post('/signup',userControllers.createUser);


router.get("/",userControllers.getUser)

router.put('/:userId',userControllers.updateUser)
router.delete('/:userId',userControllers.deleteUser)

export const  userRouter = router