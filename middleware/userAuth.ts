//higher order function return kore  function ke

import { NextFunction, Request, Response } from "express"
import  jwt, { JwtPayload }  from 'jsonwebtoken';
import config from "../config/config";
import { pool } from "../config/db";

const userAuth = (...roles: ('admin' | 'customer')[]) => {  
  return async (req: Request, res: Response, next: NextFunction) => {
   
    const authHeader = req.headers.authorization;   // "Bearer eyJhbGciOiJIUzI1Ni..."
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];         // Only token part extract
    if (!token) {
      throw new Error("Invalid token format");
    }
    const decoded = jwt.verify(token,config.secretKey as string) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email]
    );
    if (user.rows.length === 0) {
      throw new Error("User not found!");
    }
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) {
      throw new Error("You are not authorized");
    }
    next();
  };
};


export default userAuth