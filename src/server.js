import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async() =>{
    try{
        await connectDB();

        app.listen(PORT,() =>{
            console.log(`Server start word in PORT: ${PORT}`);
        })
    }catch(err){
        console.error(err);
    }
}
start();