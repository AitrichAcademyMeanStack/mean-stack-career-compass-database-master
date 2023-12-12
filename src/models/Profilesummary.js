import mongoose, { Schema } from "mongoose";

// Schema for Qualification
const ProfilesummarySchema = new Schema({
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

const profileSummary = mongoose.model("ProfileSummary",ProfilesummarySchema);

export default profileSummary;