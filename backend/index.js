import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./user/user.route.js";
import productRoutes from "./product/product.route.js";
import cartRoutes from "./cart/cart.route.js";
import cors from "cors";

const app = express();

//to make json unde3rstand
app.use(express.json());

//use database
connectDB();

//cors
app.use(cors());

//register routes
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

// port and server
const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`App is listening to the port ${PORT}`);
});
