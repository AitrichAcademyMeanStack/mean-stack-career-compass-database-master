import mongoose , {Schema} from 'mongoose';
import JobProviderCompanySchema from './JobProviderCompanyModel.js'
const jobPostSchema = new Schema(
    {
        jobTitle:{type: String},
        jobSummary:{type:String},
        jobLocation:{
            name: {type:String}
        },
        company:{type:mongoose.Schema.Types.ObjectId,ref:"JobProviderCompany"},
        category:{type:String},
        qualifications:{type:String},
        skills:{type:String},
        industry:{type:String},
        jobResponsibilities:{type:String},
        postedBy:{type:String},
        postedDate:{type:Date, default:Date.now()}
    },{versionKey:false}
)

const collectionName = "Job Post"
const JobPost = mongoose.model("JobPost", jobPostSchema , collectionName);
export default JobPost