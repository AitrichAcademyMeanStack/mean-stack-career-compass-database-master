import mongoose, { Schema } from "mongoose"; //importing mongoose

//schema model for industry
const industrySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  { versionKey: false }
);

const collectionName = "Industry";
const Industry = mongoose.model("Industry", industrySchema, collectionName);

export default Industry;
