import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected successfully`)

  } catch (error) {
    console.log(`Database connection feild ${error}`);
    process.exit(1);
  }
}