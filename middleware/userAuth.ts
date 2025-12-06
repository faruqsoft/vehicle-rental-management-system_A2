//higher order function return kore  function ke

import { NextFunction, Request, Response } from "express"
import  jwt, { JwtPayload }  from 'jsonwebtoken';
import config from "../config/config";

const userAuth = (...role:string[])=>{
    return async (req:Request, res:Response , next:NextFunction)=>{

     try{  
         const token = req.headers.authorization
        
       if(!token){
        return res.status(500).json({
          Message:"you are not allowed!!"
        })
       }
       
      const decoded = jwt.verify(
        token,
        config.secretKey as string
        ) as JwtPayload;

        req.user = decoded;

     

      if (role.length > 0 && !role.includes(decoded.role as string)) {//normal false
        return res.status(403).json({
            error: "unauthorized"
        });
        }

       
       next()

     }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
     }
       
    }
    
}

export default userAuth