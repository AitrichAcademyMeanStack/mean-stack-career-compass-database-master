import mongoose,{Schema} from 'mongoose'

const savedjobsschema = new Schema({
    Job:{
        jobTitle:String,
        jobSummary:String,
        jobLocation:{type:mongoose.Schema.Types.ObjectId,ref:"Location"},
        company:{type:mongoose.Schema.Types.ObjectId,ref:"JobProviderCompany"},
        category:{type:mongoose.Schema.Types.ObjectId,ref:"Job_Category"},
        qualifications:{type:mongoose.Schema.Types.ObjectId,ref:"Qualification"},
        skills:{type:mongoose.Schema.Types.ObjectId,ref:"skills"},
        industry:{type:mongoose.Schema.Types.ObjectId,ref:"Industry"},
        jobResponsibilities:Array,
        postedJob:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyUser"},
        postedDate:{type:Date,default:Date.now}
    },
    SavedBy:{
        firstName:String,
        lastName:String,
        userName:String,
        email:String,
        phone:Number
    },
    dateSaved:{
        type:Date,
        default:Date.now
    }
},{versionKey:false}
)

const collectionName = "SavedJobs"

const savedjobs = mongoose.model("SavedJobs",savedjobsschema,collectionName)

export default savedjobs