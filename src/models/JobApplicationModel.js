import mongoose,{Schema} from 'mongoose'

//schema for job application schema
const jobapplicationschema = new Schema({
    job:{
        jobTitle: String,
        jobSummary: String,
        jobLocation: String,
        company: String,
        category: String,
        qualifications: String,
        skills: String,
        industry: String,
        jobResponsibilities: [String],
        postedJob: String,
        postedDate: Date
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
        resume:{type:String}
    },
    coverletter:String,
    datesubmitted:{
        type:Date,
        default:Date.now
    },
    status:{
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