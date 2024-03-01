import mongoose from "mongoose";

// set rules(Schema)

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 55,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 55,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    maxLength: 55,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  dob: {
    type: Date,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    trim: true,
    default: null,
    enum: ["male", "female", "other"],
  },

  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["buyer", "seller"],
  },
});
//to hide password
userSchema.methods.toJSON = function () {
  let obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};
// create table
export const User = mongoose.model("User", userSchema);
