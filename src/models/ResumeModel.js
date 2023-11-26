import mongoose,{Schema} from "mongoose";

const resumeSchema = new Schema(
    {
        title:{type: String},
        resume:{type:Buffer}
    }
)

const collectionName = 'Resume'
const Resume = mongoose.model('Resume', resumeSchema , collectionName);

export default Resume