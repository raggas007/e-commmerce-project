import mongoose from "mongoose";

//set rules(schema)
const cartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "users",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "products",
  },
  orderedQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// create table

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
