import mongoose, { Schema } from "mongoose";
const jobPostSchema = new Schema(
  {
    jobTitle: {type:String},
    jobSummary: { type: String },
    jobLocation: [String],
    company: {
      companyId: mongoose.Schema.Types.ObjectId,
      legalName: { type: String },
      summary: { type: String },
      industry: [String],
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      website: { type: String },
      location: [String],
    },
    category: [String],
    qualifications: [String],
    skills: [String],
    industry: [String],
    jobResponsibilities: [String],
    postedBy: { type: String },
    postedDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const collectionName = "Job Post";
const JobPost = mongoose.model("JobPost", jobPostSchema, collectionName);
export default JobPost;
