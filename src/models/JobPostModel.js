import mongoose , {Schema} from 'mongoose';

const jobPostSchema = new Schema(
    {
        jobTitle:{type: String},
        jobSummary:{type:String},
        jobLocation:{type:String},
        company:{type:String},
        category:{type:String},
        qualifications:{type:String},
        skills:{type:String},
        industry:{type:String},
        jobResponsibilities:{type:String},
        postedJob:{type:String},
        postedDate:{type:String}
    }
)

const collectionName = "Job Post"
const JobPost = mongoose.model("JobPost", jobPostSchema , collectionName);
export default JobPost