import mongoose, {Schema} from "mongoose"; //importing mongoose

//schema for job seeker
const jobseekerschema = new Schema (
    {
        firstName: { type: String, required: true ,trim:true},
        lastName: { type: String, required: true,trim:true },
        userName: {type: String,required:true,trim:true},
        email: { type: String, required: true,trim:true },
        phone: { type: Number, required: true,trim:true },
        role: {
            type: String,
            default: "Job Seeker",
            select: false
          }
          
    },{versionKey:false}
)

const collectionname = "JobSeeker"
const jobseeker = mongoose.model("jobseeker",jobseekerschema,collectionname)

export default jobseeker