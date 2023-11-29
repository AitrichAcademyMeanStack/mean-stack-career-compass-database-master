import mongoose, { Schema } from "mongoose";

// Schema for location
const locationSchema = new Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
  },
  { versionKey: false },
  
);

const collectionName = 'Location';
const location = mongoose.model("Location", locationSchema , collectionName);

export default location;
