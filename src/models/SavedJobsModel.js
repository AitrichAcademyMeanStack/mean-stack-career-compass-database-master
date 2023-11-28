import mongoose,{Schema} from 'mongoose'

const savedjobsschema = new Schema({
    Job:{type:mongoose.Schema.Types.ObjectId,ref:'JobPost'},
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