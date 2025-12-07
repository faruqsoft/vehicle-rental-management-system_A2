import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";


const createVehicle = async (req:Request, res:Response)=>{
     try {
    const result = await vehicleServices.createVehicle(req.body)

    res.status(201).json({
      success: true,
      message: "vehicle created successfully",
      data: result.rows[0]
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }


}

const getAllVehicle = async (req:Request, res:Response)=>{
     try {
    const result = await vehicleServices.getAllVehicle()

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }


}


const getVehicleById = async (req:Request, res:Response)=>{

    const id = req.params.vehicleId as string

     try {
    const result = await vehicleServices.getVehicleById(id)



    if(result.rows.length === 0){
    res.status(404).json({
      success:false,
      massage:"not found"
    })
  }else{
    res.status(200).json({
      success:true,
      message:"Vehicle retrieved successfully",
      data:result.rows[0]
    })
  }

 }catch(err:any){
     res.status(500).json({
          success:false,
          message:err.message
        });
 }

}


const updateVehicleById = async (req:Request, res:Response)=>{

    const {vehicle_name,type}= req.body

     try {
    const result = await vehicleServices.updateVehicleById(vehicle_name,type,req.params.vehicleId!)



    if(result.rows.length === 0){
    res.status(404).json({
      success:false,
      massage:"not found"
    })
  }else{
    res.status(200).json({
      success:true,
      message:"Vehicle updated successfully",
      data:result.rows[0]
    })
  }

 }catch(err:any){
     res.status(500).json({
          success:false,
          message:err.message
        });
 }

}

const deleteVehicleById = async (req:Request, res:Response)=>{

     try {
    const result = await vehicleServices.deleteVehicleById(req.params.vehicleId!)

    if(result.rowCount === 0){
    res.status(404).json({
      success:false,
      massage:"not found"
    })
  }else{
    res.status(200).json({
      success:true,
      message:"Vehicle delete successfully",
      
    })
  }

 }catch(err:any){
     res.status(500).json({
          success:false,
          message:err.message
        });
 }

}

export const vehicleControllers = {
    createVehicle,
    getAllVehicle,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById
}