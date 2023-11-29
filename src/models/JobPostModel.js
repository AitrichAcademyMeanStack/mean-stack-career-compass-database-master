import mongoose , {Mongoose, Schema} from 'mongoose';
import JobProviderCompanySchema from './JobProviderCompanyModel.js'
const jobPostSchema = new Schema(
    {
        jobTitle:{type: String},
        jobSummary:{type:String},
        jobLocation:{type:mongoose.Schema.Types.ObjectId,ref:"Location"},
        company:{type:mongoose.Schema.Types.ObjectId,ref:"JobProviderCompany"},
        category:{type:mongoose.Schema.Types.ObjectId,ref:"Job_Category"},
        qualifications:{type:mongoose.Schema.Types.ObjectId,ref:"Qualification"},
        skills:{type:mongoose.Schema.Types.ObjectId,ref:"skills"},
        industry:{type:mongoose.Schema.Types.ObjectId,ref:"Industry"},
        jobResponsibilities:{type:String},
        postedBy:{type:String},
        postedDate:{type:Date, default:Date.now()}
    },{versionKey:false}
)

const collectionName = "Job Post"
const JobPost = mongoose.model("JobPost", jobPostSchema , collectionName);
export default JobPost