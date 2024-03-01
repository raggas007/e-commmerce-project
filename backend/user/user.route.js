import express from "express";
import {
  loginUserValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import { User } from "./user.model.js";
import {
  comparePassword,
  generateHashPassword,
} from "../utils/password.function.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//register user
router.post(
  "/user/register",
  validateReqBody(userValidationSchema),
  async (req, res) => {
    //extract new user from req.body
    const newUser = req.body;

    // find user with email
    const user = await User.findOne({ email: newUser.email });
    //if user throw eorror
    if (user) {
      return res.status(409).send({ message: "email already exist." });
    }
    // hash password
    const hashedPassword = await generateHashPassword(newUser.password);

    newUser.password = hashedPassword;

    // create user
    await User.create(newUser);
    // send response
    return res.status(201).send({ message: "User registered successfully" });
  }
);

//login

router.post(
  "/user/login",
  validateReqBody(loginUserValidationSchema),
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;
    //find user with email
    const user = await User.findOne({ email: loginCredentials.email });
    //if not user throw error

    if (!user) {
      return res.status(409).send({ message: "Invalid credentials" });
    }
    //check password for the match
    const isPasswordMatch = await comparePassword(
      loginCredentials.password,
      user.password
    );

    // if not password match throw errors
    if (!isPasswordMatch) {
      return res.status(409).send({ message: "Invalid credentials." });
    }

    //login is successfull and give token
    let payload = { userId: user._id };
    const token = jwt.sign(payload, "45c765d6c890437641281273c41830af", {
      expiresIn: "1d",
    });

    //send response
    return res
      .status(200)
      .send({ message: "login successfull", token: token, user: user });
  }
);

export default router;
