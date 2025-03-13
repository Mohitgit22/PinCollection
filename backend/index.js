import express from "express";
import connectDB from "./utils/connectDB.js";
import userRouter from "./routes/user.route.js"
import dotenv from "dotenv";
dotenv.config(); 


const app = express();

// app.use("/users")
app.listen(3000,() => {
    connectDB();
    console.log("Server is running");
})