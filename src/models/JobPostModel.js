import mongoose , {Schema} from 'mongoose';
const jobPostSchema = new Schema(
    {
        jobTitle:{type: String},
        jobSummary:{type:String},
        jobLocation:{type:mongoose.Types.ObjectId,ref:"Location"},
        company:{type:mongoose.Types.ObjectId,ref:"JobProviderCompany"},
        category:{type:mongoose.Types.ObjectId,ref:"Job_Category"},
        qualifications:{type:mongoose.Types.ObjectId,ref:"Qualification"},
        skills:{type:mongoose.Types.ObjectId,ref:"skills"},
        industry:{type:mongoose.Types.ObjectId,ref:"Industry"},
        jobResponsibilities:{type:String},
        postedBy:{type:String},
        postedDate:{type:Date, default:Date.now()}
    },{versionKey:false}
)

const collectionName = "Job Post";
const JobPost = mongoose.model("JobPost", jobPostSchema , collectionName);
export default JobPost