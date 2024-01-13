import mongoose, { Schema } from "mongoose"; //importing mongoose

//importing schema model for job interview
const jobInterviewSchema = new Schema(
  {
    job: {
      JobpostId: mongoose.Schema.Types.ObjectId,
      jobTitle: String,
      jobSummary: String,
      jobLocation: String,
      company: {
        companyId: mongoose.Schema.Types.ObjectId,
        legalName: { type: String },
        summary: { type: String },
        industry: String,
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        website: { type: String },
        location: String,
      },
      category: String,
      qualifications: [String],
      skills: [String],
      industry: String,
      jobResponsibilities: String,
      postedBy: {
        companyuserId: mongoose.Schema.Types.ObjectId,
        firstName: String,
        role: {
          type: Schema.Types.Mixed,
          default: {
            name: "Company Admin",
            description: "",
          },
        },
        lastName: String,
        userName: String,
        email: String,
        phone: String,
      },
      postedDate: { type: Date },
    },
    interviewee: {
      seekerId: mongoose.Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      userName: String,
      email: String,
      phone: Number,
    },
    jobApplication: {
      jobApplicationId: mongoose.Schema.Types.ObjectId,
      job: {
        JobpostId: mongoose.Schema.Types.ObjectId,
        jobTitle: String,
        jobSummary: { type: String },
        jobLocation: String,
        company: {
          companyId: mongoose.Schema.Types.ObjectId,
          legalName: { type: String },
          summary: { type: String },
          industry: String,
          email: { type: String },
          phone: { type: String },
          address: { type: String },
          website: { type: String },
          location: String,
        },
        category: String,
        qualifications: [String],
        skills: [String],
        industry: String,
        jobResponsibilities: String,
        postedBy: {
          companyuserId: mongoose.Schema.Types.ObjectId,
          firstName: String,
          role: {
            type: Schema.Types.Mixed,
            default: {
              name: "Company Admin",
              description: "",
            },
          },
          lastName: String,
          userName: String,
          email: String,
          phone: String,
        },
        postedDate: { type: Date },
      },
      applicant: {
        seekerId: mongoose.Schema.Types.ObjectId,
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        phone: String,
      },
      resume: {
        title: { type: String },
        Resume: { type: String },
      },
      coverletter: String,
      datesubmitted: {
        type: Date,
      },
      status: {
        type: String,
      },
    },
    scheduledBy: {
      companyuserId: mongoose.Schema.Types.ObjectId,
      firstName: String,
      role: {
        type: Schema.Types.Mixed,
        default: {
          name: "Company Admin",
          description: "",
        },
      },
      lastName: String,
      userName: String,
      email: String,
      phone: String,
    },
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
  },
  { versionKey: false }
);

const collectionName = "Job Interview";

const JobInterview = mongoose.model(
  "JobInterview",
  jobInterviewSchema,
  collectionName
);

export default JobInterview;
