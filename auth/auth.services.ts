
import bcrypt from "bcryptjs";
import { pool } from "../config/db"
import jwt from "jsonwebtoken"
import config from "../config/config";


const userSignin = async(payload: Record<string, unknown>)=>{

    const {email, password}= payload

      if (!email || !password) {
    throw new Error("Email and password are required");
  }

   const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`
    ,[email]);

    if(result.rows.length === 0){
         return null
    }

    const user = result.rows[0];
    

   const match = await bcrypt.compare(password as string, user.password)

    if(!match){
        return false
    }

   
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,   
  };

    const  token = jwt.sign(jwtPayload,config.secretKey as string,{expiresIn:("7d")});


    console.log(token)

    return {token, user}

   
}



export  const  authServices ={
userSignin
}