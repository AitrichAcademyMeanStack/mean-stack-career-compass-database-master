import mongoose, { Schema } from "mongoose";

//schema for auth user 
const authUserSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      ref:'SystemUser'
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    firstName: {
      type: mongoose.Types.ObjectId,
      ref:'SystemUser'
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref:'SystemUser'
    },
    lastName: {
      type: mongoose.Types.ObjectId,
      ref:'SystemUser'
    },
    email: {
      type: mongoose.Types.ObjectId,
      ref:'SystemUser'
    },
    phone: {
      type: mongoose.Types.ObjectId,
      ref:'SystemUser'
    },
  },
  { versionKey: false }
);

const collectionName = "AuthUser";
const AuthUser = mongoose.model("AuthUser", authUserSchema, collectionName);

export default AuthUser;
