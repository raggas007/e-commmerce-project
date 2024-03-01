import mongoose from "mongoose";

export const checkMongoIdValidity = async (req, res, next) => {
  // extract id from req.params
  const id = req.params.id;

  //  check for mongoid validity
  const isValidMongoId = mongoose.isValidObjectId(id);

  //if not valid mongo id
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  //call next function
  next();
};
