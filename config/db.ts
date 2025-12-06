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

        await pool.query(`
          CREATE TABLE IF NOT EXISTS vehicles (

            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number VARCHAR(50) UNIQUE NOT NULL,
            daily_rent_price NUMERIC(10, 2) NOT NULL CHECK (daily_rent_price > 0),
            availability_status VARCHAR(20) NOT NULL 
                DEFAULT 'available' 
                CHECK (availability_status IN ('available', 'booked')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

            `);

         await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL,
        vehicle_id INT NOT NULL,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC(10, 2) NOT NULL CHECK (total_price > 0),
        status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'cancelled', 'returned')),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_customer
            FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,

        CONSTRAINT fk_vehicle
            FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
    );

            `)   


}

export default initDB
