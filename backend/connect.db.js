import mongoose from "mongoose";

const dbName = "eCommerce_web";
const userName = "sagar070";
const password = "ragas12345";

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