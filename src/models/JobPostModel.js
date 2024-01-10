import mongoose, { Schema } from "mongoose"; //importing mongoose

//schema model for job post
const jobPostSchema = new Schema(
  {
    jobTitle: { type: String },
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
    jobResponsibilities: String,
    postedBy: {
      companyuserId: mongoose.Schema.Types.ObjectId,
      firstName: String,
      role: {type: Schema.Types.Mixed,
      default: {
          name: 'Company Admin',
          description: ''
      }},
      lastName: String,
      userName: String,
      email: String,
      phone: String,
    },
    postedDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const collectionName = "Job Post";
const JobPost = mongoose.model("JobPost", jobPostSchema, collectionName);
export default JobPost;
