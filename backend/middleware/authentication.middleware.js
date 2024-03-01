import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

export const isSeller = async (req, res, next) => {
  //extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }

  let payload;
  try {
    payload = jwt.verify(token, "45c765d6c890437641281273c41830af");
  } catch (error) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //find user using userId from paylod
  const user = await User.findOne({ _id: payload.userId });
  //if not user throw error
  if (!user) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //  console.log(user);
  // if user is not seller throw error
  if (user.role !== "seller") {
    return res.status(401).send({ message: "unauthorized" });
  }

  req.loggedInUserId = user._id;
  // console.log(req);

  //call next function
  next();
};

export const isBuyer = async (req, res, next) => {
  //extract token from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }

  let payload;
  try {
    payload = jwt.verify(token, "45c765d6c890437641281273c41830af");
  } catch (error) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //find user using userId from paylod
  const user = await User.findOne({ _id: payload.userId });
  //if not user throw error
  if (!user) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //  console.log(user);
  // if user is not seller throw error
  if (user.role !== "buyer") {
    return res.status(401).send({ message: "unauthorized" });
  }

  req.loggedInUserId = user._id;
  // console.log(req);

  //call next function
  next();
};

export const isUser = async (req, res, next) => {
  //extract toke from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "unauthorized." });
  }
  let payload;
  try {
    payload = jwt.verify(token, "45c765d6c890437641281273c41830af");
  } catch (error) {
    return res.status(401).send({ message: "unauthorized." });
  }

  //find user using userid from payload

  const user = User.findOne({ _id: payload.userId });

  if (!user) {
    return res.status(401).send({ message: "unauthorized." });
  }
  req.loggedInUserId = user._id;

  // call next function
  next();
};
