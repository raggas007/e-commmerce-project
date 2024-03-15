import mongoose from "mongoose";

const dbName = process.env.DB_NAME;
const userName = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${password}@cluster0.j5sohkx.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("DB connected.");
  } catch (error) {
    console.log(error.message);
    console.log("DB connection failed.");
  }
};
export default connectDB;
