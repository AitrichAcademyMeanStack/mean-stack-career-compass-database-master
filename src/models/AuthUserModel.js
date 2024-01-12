import mongoose, { Schema } from "mongoose"; //importing mongoose

//schema model for auth user
const authUserSchema = new Schema(
  {
        userName:{type : String,ref:'systemuser',required:true},
        password:{type : String},
        firstName: { type: String,ref:'systemuser', required: true },
        role: { type: String, ref:'systemuser', required: true },
        lastName: { type: String,ref:'systemuser', required: true },
        email:{ type: String,ref:'systemuser', required: true },
        phone: { type: String,ref:'systemuser', required: true }
  },
  { versionKey: false }
);

const collectionName = "AuthUser";
const AuthUser = mongoose.model("AuthUser", authUserSchema, collectionName);

export default AuthUser;
