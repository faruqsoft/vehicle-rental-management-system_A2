# Vehicle Rental Management System (VRMS)

A complete **role-based vehicle rental platform** built using **Node.js, Express.js, PostgreSQL, and TypeScript**.  
The system allows **Admins** and **Customers** to manage vehicles, bookings, returns, and authentication securely.

---

 Live API URL
 Base URL: https://vehicle-management-three-eta.vercel.app/

 Features

 Authentication & Authorization
- JWT-based secure authentication
- Password hashing using bcrypt
- Role-based access control (RBAC)
- Admin & Customer permissions

 Vehicle Management
- Add, update, delete vehicles (Admin only)
- Vehicle availability status updates automatically
- View all available and booked vehicles

Booking Management
- Customers can book available vehicles
- Customers can cancel booking before rent start date
- Admin can mark booking as **returned**
- Vehicle availability auto-updates

 Profile & Role System
- Admin can see all bookings
- Customer sees only their own booking list

Technology Stack

 Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL (`pg`)
- bcryptjs
- JSON Web Token (JWT)
- dotenv

Dev Tools
- tsx
- Nodemon
- ESLint + Prettier (optional)

 Setup & Installation

Clone the Repository

git clone :https://github.com/faruqsoft/vehicle-rental-management-system_A2.git
cd vehicle-rental-management

npm install
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/vrms
JWT_SECRET=your-secret-key
npm run dev
http://localhost:5000

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | `/api/v1/auth/signup` | Register user   |
| POST   | `/api/auth/signin` | Login & get JWT |

| Method | Endpoint            | Access         | Description      |
| ------ | ------------------- | -------------- | ---------------- |
| POST   | `/api/v1/vehicles`     | Admin          | Add new vehicle  |
| GET    | `/api/v1/vehicles`     | Admin/Customer | Get all vehicles |
| PATCH  | `/api/v1/vehicles/:id` | Admin          | Update vehicle   |
| DELETE | `/api/v1/vehicles/:id` | Admin          | Remove vehicle   |


| Method | Endpoint                   | Access         | Description                                   |
| ------ | -------------------------- | -------------- | --------------------------------------------- |
| POST   | `/api/v1/bookings`            | Customer       | Create booking                                |
| GET    | `/api/v1/bookings`            | Admin/Customer | Admin → all bookings, Customer → own bookings |
| PATCH  | `/api/v1/bookings/:bookingId` | Admin/Customer | Customer cancel / Admin mark returned         |


