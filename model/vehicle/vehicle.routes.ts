import  Express from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Express.Router();


router.post("/",vehicleControllers.createVehicle)
router.get("/",vehicleControllers.getVehicle)
router.get("/:vehicleId",vehicleControllers.getVehicleById)
router.put("/:vehicleId",vehicleControllers.updateVehicleById)
router.delete("/:vehicleId",vehicleControllers.deleteVehicleById)


export const  vehicleRouter = router