import mongoose, { Schema } from "mongoose";

// Schema for jobtitle
const jobtitleschma = new Schema({
  name: {
    type: String,
    unique:true
  },
  description: {
    type: String,
  },
},{versionKey:false}
);

const collectionName =  "JobTitle"

const JobTitle = mongoose.model("JobTitle", jobtitleschma,collectionName);

export default JobTitle;
