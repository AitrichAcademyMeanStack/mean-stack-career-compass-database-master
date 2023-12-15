import mongoose,{Schema} from 'mongoose'

//schema for job application schema
const jobapplicationschema = new Schema({
    job:{
        JobpostId: mongoose.Schema.Types.ObjectId,
        jobTitle: [String],
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
    applicant:{
        seekerId: mongoose.Schema.Types.ObjectId,
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        phone: String
    },
    resume:{
        title:{type: String},
        Resume:{type:String}
    },
    coverletter:String,
    datesubmitted:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:[
        "SUBMITTED",
        "SHORT_LISTED_BY_EMPLOYER",
        "INTERVIEW_SCHEDULED",
        "INTERVIEW_CONDUCTED",
        "OFFERED",
        "REJECTED_BY_EMPLOYER",
        "HIRED",
        "REJECTED_BY_JOBSEEKER",
        "ON_HOLD"
    ]
    }
},{versionKey:false}
)

const collectionName = "JobApplication"
const Jobapplication = mongoose.model("JobApplication",jobapplicationschema,collectionName)

export default Jobapplication