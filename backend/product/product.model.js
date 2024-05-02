import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 55,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxLength: 55,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "electronics",
        "kitchen",
        "clothing",
        "shoes",
        "grocery",
        "automobiles",
        "sports",
        "cosmetics",
        "furniture",
        "liquor",
        "glasses",
        "accessory",
        "toy",
      ],
    },
    freeShipping: {
      type: Boolean,
      required: false,
      default: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
//to remove seller id.
productSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.sellerId;
  return obj;
};

export const Product = mongoose.model("Product", productSchema);
