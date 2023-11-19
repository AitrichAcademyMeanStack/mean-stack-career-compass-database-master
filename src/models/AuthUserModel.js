import mongoose, { Schema } from "mongoose";

const authUserSchema = new Schema(
  {
    _id: {type: mongoose.Types.ObjectId,ref: 'systemuser',required: true},
    userName: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    role: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { versionKey: false }
);

const collectionName = "AuthUser";
const AuthUser = mongoose.model("AuthUser", authUserSchema, collectionName);

export default AuthUser;
