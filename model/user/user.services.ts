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
console.log(result)
      delete result.rows[0].password
      
    return result

    
 
};

const getUser = async()=>{
    const result = await pool.query(`
      SELECT id,name,email,phone ,role FROM users`
    );
    return result
}


const updateUser = async(name:string, email:string, userId:string)=>{

      const result = await pool.query(
  `UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *`
  ,[name,email,userId]
  
);
return result
}


const deleteUser = async(userId:string)=>{
    const result = await pool.query(
  `DELETE FROM users WHERE id = $1`
  ,[userId]
);
return result
}


export const userServices = {
  createUser,
  getUser,
  updateUser,
  deleteUser
};
