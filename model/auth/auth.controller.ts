import { Request, Response } from "express";
import { authServices } from "./auth.services";


const userSignin= async (req:Request, res:Response)=>{

     try {
    const result = await authServices.userSignin(req.body)

    res.status(201).json({
      success: true,
      message: "login successful",
      data: result
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }


}

export const authControllers = {
    userSignin
}