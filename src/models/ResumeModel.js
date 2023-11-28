import mongoose,{Schema} from "mongoose";//importing mongoose


//resume schema model
const resumeSchema = new Schema(
    {
        title:{type: String},
        resume:{type:String}
    },{versionKey:false}
)

const collectionName = 'Resume'
const Resume = mongoose.model('Resume', resumeSchema , collectionName);

export default Resume