import express from "express";
import { productValidationSchema } from "./product.validation.js";
import {
  isBuyer,
  isSeller,
  isUser,
} from "../middleware/authentication.middleware.js";
import { Product } from "./product.model.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import mongoose from "mongoose";
import { checkMongoIdValidity } from "../middleware/mongo.id.validity.middleware.js";
import { paginationProductSchema } from "../utils/pagination.validation.js";

const router = express.Router();

//add product
router.post(
  "/product/add",
  isSeller,
  validateReqBody(productValidationSchema),
  async (req, res) => {
    //extract new product from req.body
    const newProduct = req.body;
    //add seller
    newProduct.sellerId = req.loggedInUserId;

    //add product
    await Product.create(newProduct);
    // send appropriate response
    return res.status(201).send({ message: "product added successfully." });
  }
);

//get product details

router.get(
  "/product/details/:id",
  isUser,
  checkMongoIdValidity,
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    //find product
    const product = await Product.findOne({ _id: productId });

    //if not product throw errors
    if (!product) {
      return res.status(404).send({ message: "product doesnot exist." });
    }

    //send appropriate response
    return res
      .status(200)
      .send({ message: "success", productDetails: product });
  }
);

router.delete(
  "/product/delete/:id",
  isSeller,
  checkMongoIdValidity,
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "product doesnot exist" });
    }
    // check for ownership of product

    const isProductOwnerId = product.sellerId.equals(req.loggedInUserId);

    // if not owner, throw error
    if (!isProductOwnerId) {
      return res.status(403).send("this is not seller id.");
    }
    // delete product\

    await Product.deleteOne({ _id: productId });
    // send response
    return res
      .status(200)
      .send({ message: "product is deleted successfully." });
  }
);

router.put(
  "/product/edit/:id",
  isSeller,
  checkMongoIdValidity,
  validateReqBody(productValidationSchema),
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "product doesnot exist" });
    }
    // check for ownership of product

    const isProductOwnerId = product.sellerId.equals(req.loggedInUserId);

    // if not owner, throw error
    if (!isProductOwnerId) {
      return res.status(403).send("this is not original seller id.");
    }
    //extract new values from req.body
    const newValues = req.body;
    //update
    await Product.updateOne(
      { _id: productId },
      {
        $set: {
          ...newValues,
        },
      }
    );

    // send response
    return res
      .status(200)
      .send({ message: "product is updated successfully." });
  }
);

//get product list by buyer

router.post(
  "/product/list/buyer",
  isBuyer,
  validateReqBody(paginationProductSchema),
  async (req, res) => {
    //  extract pagination data from req.body
    const paginationData = req.body;

    // calculate skip page
    const skip = (paginationData.page - 1) * paginationData.limit;

    //run query

    const productList = await Product.aggregate([
      { $match: {} },
      { $skip: skip },
      { $limit: paginationData.limit },
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          quantity: 1,
          image: 1,
          category: 1,
          freeShipping: 1,
          description: { $substr: ["$description", 0, 200] },
        },
      },
    ]);

    //send response
    return res
      .status(200)
      .send({ message: "success", productList: productList });
  }
);

//get product list by seller

router.post(
  "/product/list/seller",
  isSeller,
  validateReqBody(paginationProductSchema),
  async (req, res) => {
    //extract pagenation data from req.body
    const { page, limit } = req.body;

    //calculate skip page
    const skip = (page - 1) * limit;

    //run query
    const productList = await Product.aggregate([
      {
        $match: {
          sellerId: req.loggedInUserId,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          image: 1,
          category: 1,
          description: { $substr: ["$description", 0, 200] },
        },
      },
    ]);

    //send response
    return res
      .status(200)
      .send({ message: "success", productList: productList });
  }
);

export default router;
