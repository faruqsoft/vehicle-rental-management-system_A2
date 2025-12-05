import {Pool} from "pg";
import config from "./config"

 export const pool = new Pool({
    connectionString:config.connectionStr
})


const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL CHECK (email = LOWER(email)),
            password TEXT NOT NULL CHECK (LENGTH(password) >= 6), 
            phone TEXT NOT NULL,
            role VARCHAR(20) NOT NULL CHECK (role IN ('admin','customer')), 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

export default initDB
