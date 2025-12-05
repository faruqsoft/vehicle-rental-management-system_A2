import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(), ".env")})

const config = {
    port:process.env.PORT,
    connectionStr:process.env.CONNECTION_STR,
    secretKey:process.env.SECRECT_KEY
    
    
}




export default config