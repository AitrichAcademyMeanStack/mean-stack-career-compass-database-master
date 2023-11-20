import mongoose, {Schema} from "mongoose";


const jobseekerschema = new Schema (
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: {type: String,required:true},
        email: { type: String, required: true },
        phone: { type: String, required: true },

    },{versionKey:false}
)

const collectionname = "JobSeeker"
const jobseeker = mongoose.model("jobseeker",jobseekerschema,collectionname)

export default jobseeker