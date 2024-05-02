import express from "express";
import { isBuyer } from "../middleware/authentication.middleware.js";
import {
  addCartItemValidationSchema,
  updateQuantityValidationSchema,
} from "./cart.validation.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { checkMongoIdValidity } from "../middleware/mongo.id.validity.middleware.js";
import mongoose from "mongoose";
import { Product } from "../product/product.model.js";
import Cart from "./cart.model.js";

const router = express.Router();

router.post(
  "/cart/item/add",
  isBuyer,
  validateReqBody(addCartItemValidationSchema),
  (req, res, next) => {
    //extract product id from req.body
    const productId = req.body.productId;

    //check product id for mongo id
    const isValidMongoId = mongoose.isValidObjectId(productId);

    //if not valid throw error
    if (!isValidMongoId) {
      return res.status(400).send({ message: "invalid product id" });
    }

    //call next function
    next();
  },
  async (req, res) => {
    //extract cart item from req.body
    const cartItem = req.body;
    //attach buyer id to cart item
    cartItem.buyerId = req.loggedInUserId;
    //check if item is already added
    const cart = await Cart.findOne({
      productId: cartItem.productId,
      buyerId: req.loggedInUserId,
    });
    //if already added ,throw errors
    if (cart) {
      return res.status(409).send({ message: "item is already added to cart" });
    }
    //find product
    const product = await Product.findOne({ _id: cartItem.productId });
    //if order quantity is more than the product quantity throw errors
    if (cartItem.orderedQuantity > product.quantity) {
      return res.status(403).send({ message: "product is outnumbered" });
    }
    //create product
    await Cart.create(cartItem);

    //send response
    return res.status(200).send({ message: "item added to the cart" });
  }
);

//flush item from cart

router.delete("/cart/flush", isBuyer, async (req, res) => {
  await Cart.deleteMany({ buyerId: req.loggedInUserId });

  return res.status(200).send({ message: "cart is flushed successfully." });
});

//delete one item from cart

router.delete(
  "/cart/item/remove/:id",
  isBuyer,
  checkMongoIdValidity,
  async (req, res) => {
    //extract product id from req.params
    const productId = req.params.id;

    //remove item
    await Cart.deleteOne({ productId: productId, buyerId: req.loggedInUserId });

    //send response
    return res
      .status(200)
      .send({ message: "item from cart removed successfully." });
  }
);

// show the details of the item in cart

router.get("/cart/item/list", isBuyer, async (req, res) => {
  const cartItemList = await Cart.aggregate([
    {
      $match: { buyerId: req.loggedInUserId },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $project: {
        name: { $first: "$productDetails.name" },
        brand: { $first: "$productDetails.brand" },
        price: { $first: "$productDetails.price" },
        image: { $first: "$productDetails.image" },
        orderedQuantity: 1,
        productId: 1,
        subTotal: {
          $multiply: [{ $first: "$productDetails.price" }, "$orderedQuantity"],
        },
      },
    },
  ]);
  let subTotalOfAllProducts = 0;
  cartItemList.forEach((item) => {
    subTotalOfAllProducts = subTotalOfAllProducts + item.subTotal;
  });
  const discount = 0.05 * subTotalOfAllProducts;

  const grandTotal = subTotalOfAllProducts - discount;

  return res.status(200).send({
    message: "success",
    cartItems: cartItemList,
    orderSummary: [
      {
        name: "sub total",
        value: subTotalOfAllProducts.toFixed(2),
      },
      {
        name: "discount",
        value: discount.toFixed(2),
      },
      {
        name: "grandTotal",
        value: grandTotal.toFixed(2),
      },
    ],
    grandTotal,
  });
});

//count item in cart
router.get("/cart/item/count", isBuyer, async (req, res) => {
  const cartItemCount = await Cart.find({
    buyerId: req.loggedInUserId,
  }).count();

  return res.status(200).send({ message: "success", itemCount: cartItemCount });
});

//update Quantity in cart
router.put(
  "/cart/update/quantity/:id",
  isBuyer,
  checkMongoIdValidity,
  validateReqBody(updateQuantityValidationSchema),
  async (req, res) => {
    //extract productId from req.params
    const productId = req.params.id;
    //check for if cart exist using product Id and buyer Id
    const cart = await Cart.findOne({ productId, buyerId: req.loggedInUserId });

    //if not cart throw error
    if (!cart) {
      return res.status(404).send({ message: "product is not added to cart" });
    }
    //extract values from req.body
    const actionData = req.body;

    let newOrderQuantity =
      actionData.action === "inc"
        ? cart.orderedQuantity + 1
        : cart.orderedQuantity - 1;

    const product = await Product.findOne({ _id: productId });

    const availableQuantity = product.quantity;

    if (newOrderQuantity > availableQuantity) {
      return res.status(403).send({ message: "product is outnumbered" });
    }
    if (newOrderQuantity < 1) {
      return res.status(403).send({ message: "please remove item from cart" });
    }

    await Cart.updateOne(
      { productId, buyerId: req.loggedInUserId },
      {
        $set: { orderedQuantity: newOrderQuantity },
      }
    );
    //send appropriate response
    return res
      .status(200)
      .send({ message: "Quantity is updated successfully." });
  }
);

export default router;
