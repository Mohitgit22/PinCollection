import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async () => {
  try {
    // console.log("MongoDB URL:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!")
  } catch (err) {
    console.log("MONGODB CONNECTION ERROR", err);
  }
};

export default connectDB;