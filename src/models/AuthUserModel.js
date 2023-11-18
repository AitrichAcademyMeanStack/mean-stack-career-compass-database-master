import mongoose, { Schema } from "mongoose";

//schema for auth user 
const authUserSchema = new Schema(
  {
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    role: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { versionKey: false }
);

const collectionName = "AuthUser";
const AuthUser = mongoose.model("AuthUser", authUserSchema, collectionName);

export default AuthUser;
