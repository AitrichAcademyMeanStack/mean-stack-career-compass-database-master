import mongoose, { Schema } from "mongoose";

const jobInterviewSchema = new Schema({
  job: {
    jobTitle: String,
    jobSummary: String,
    jobLocation: String,
    company: String,
    category: String,
    qualifications: String,
    skills: String,
    industry: String,
    jobResponsibilities: String,
    postedBy: String,
    postedDate: { type: Date, default: Date.now() },
  },
  interviewee: {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    phone: Number,
  },
  jobApplication: String,
  scheduledBy: String, //companyUser
  dateScheduled: { type: Date, default: Date.now() },
  status: {
    type: String,
    enum: [
      "SCHEDULED",
      "ACCEPTED_BY_JOB_SEEKER",
      "INTERVIEW_CONDUCTED",
      "RESCHEDULED",
      "REJECTED_BY_JOB_SEEKER",
      "CANCELLED_BY_EMPLOYER",
    ],
  },
});

const collectionName = "Job Interview"

const JobInterview = mongoose.model("JobInterview", jobInterviewSchema , collectionName)

export default JobInterview