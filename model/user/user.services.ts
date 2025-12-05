import bcrypt from 'bcryptjs';
import { pool } from '../../config/db';

const createUser = async (payload: Record<string, unknown>) => {
  
    const { name, email, password, phone, role } = payload;

   
    if (!email || email !== (email as string).toLowerCase()) {
      throw new Error("Email must be in lowercase");
    }

    if (!password || (password as string).length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    if (!role || !['admin', 'customer'].includes(role as string)) {
      throw new Error("Role must be either 'admin' or 'customer'");
    }

   
    const hashedPassword = await bcrypt.hash(password as string, 10);

  console.log(hashedPassword)
    const result = await pool.query(
      `INSERT INTO users (name,email,password,phone,role)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [name, email, hashedPassword, phone, role]
    );

      delete result.rows[0].password
      
    return result

    
 
};

export const userServices = {
  createUser
};
