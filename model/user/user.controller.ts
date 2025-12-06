import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req:Request, res:Response)=>{
     try {
    const result = await userServices.createUser (req.body)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0]
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }


}


const getUser = async(req:Request,res:Response)=>{
    try{
        const result = await userServices.getUser();
      
      res.status(200).json({
        success:true,
        message:"users retrieves successfully",
        data:result.rows
      })

    }catch(err:any){
       res.status(500).json({
          success:false,
          message:err.message
        });
    }
}


const updateUser = async(req:Request,res:Response)=>{
  const {name, email,} = req.body

 try{
  const result = await userServices.updateUser(name, email,req.params.userId!)

 
  if(result.rows.length === 0){
    res.status(404).json({
      success:false,
      massage:"not found"
    })
  }else{
    res.status(200).json({
      success:true,
      message:"update user successfully",
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

const deleteUser =  async(req:Request,res:Response)=>{
  // console.log(req.params.id)
 try{
  const result = await userServices.deleteUser(req.params.userId!)

  if(result.rowCount === 0){
    res.status(404).json({
      success:false,
      massage:"not found"
    })
  }else{
    res.status(200).json({
      success:true,
      massage:"user delete successfully",
      data:null
    })
  }

 }catch(err:any){
     res.status(500).json({
          success:false,
          massage:err.massage
        });
 }

}
export const userControllers = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}