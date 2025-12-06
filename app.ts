import Express, { Request, Response } from "express"
import initDB from "./config/db"
import { userRouter } from "./model/user/user.routes";
import { authRouter } from "./model/auth/auth.routes";
import { vehicleRouter } from "./model/vehicle/vehicle.routes";

const app = Express();
app.use(Express.json());

initDB()


app.use("/api/v1/auth",userRouter);

app.use("/api/v1/auth",authRouter);


app.use("/api/v1/vehicles",vehicleRouter)



app.get("/",(req:Request, res:Response)=>{
    res.status(200).json({
        success:true,
        message:"server initiation successfully"
    })
})

export default app