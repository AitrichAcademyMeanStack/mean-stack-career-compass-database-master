import mongoose,{Schema} from "mongoose";

const resumeSchema = new Schema(
    {
        title:{type: String},
        resume:{type:String}
    }
)

const collectionName = 'Resume'
const Resume = mongoose.model('Resume', resumeSchema , collectionName);

export default Resume