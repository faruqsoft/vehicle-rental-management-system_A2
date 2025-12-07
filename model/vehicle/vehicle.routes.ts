import  Express from "express";
import { vehicleControllers } from "./vehicle.controller";
import userAuth from './../../middleware/userAuth';
import { Roles } from "../auth/auth.constant";

const router = Express.Router();


router.post("/",userAuth(Roles.admin),vehicleControllers.createVehicle)
router.get("/",vehicleControllers.getAllVehicle)
router.get("/:vehicleId",vehicleControllers.getVehicleById)
router.put("/:vehicleId",userAuth(Roles.admin),vehicleControllers.updateVehicleById)
router.delete("/:vehicleId",userAuth(Roles.admin),vehicleControllers.deleteVehicleById)


export const  vehicleRouter = router