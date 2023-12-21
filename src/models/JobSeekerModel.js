import mongoose, {Schema} from "mongoose"; //importing mongoose

//schema for job seeker
const jobseekerschema = new Schema (
    {
        firstName: { type: String, required: true ,trim:true},
        lastName: { type: String, required: true,trim:true },
        userName: {type: String,required:true,trim:true},
        email: { type: String, required: true,trim:true, unique:true },
        phone: { type: Number, required: true,trim:true,unique:true  },
        role: {type: String, default: "Job Seeker", }
    },{versionKey:false}
)

const collectionname = "JobSeeker"
const jobseeker = mongoose.model("jobseeker",jobseekerschema,collectionname)

export default jobseeker