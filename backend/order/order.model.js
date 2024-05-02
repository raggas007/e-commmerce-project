import mongoose from "mongoose";

//set rules

const orderProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "products",
  },
  orderQuantity: {
    type: Number,
    min: 1,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.ObjectId, required: true, ref: "users" },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: [
      "Completed",
      "Pending",
      "Initiated",
      "Refunded",
      "Expired",
      "User Cancelled",
      "Partially Refunded",
    ],
  },
  productList: {
    type: [orderProductSchema],
    required: true,
  },
  pidx: {
    type: String,
    required: true,
    trim: true,
  },
});

//create tabele

const Order = mongoose.model("Order", orderSchema);

export default Order;
