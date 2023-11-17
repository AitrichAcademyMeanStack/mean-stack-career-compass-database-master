import mongoose, { Schema } from "mongoose";

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
});

const Qualification = mongoose.model("Qualification", qualificationSchema);

export default Qualification;
