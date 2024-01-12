import mongoose, { Schema } from "mongoose"; //importing mongoose

// Schema for Qualification
const qualificationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{versionKey:false}
);

const Qualification = mongoose.model("Qualification", qualificationSchema);

export default Qualification;
