import mongoose from "mongoose";

async function connectDB() {
  try {
    return await mongoose.connect(process.env.MONGO_DB)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB