import mongoose, {Schema} from 'mongoose';

// Schema for location
const locationSchema = new Schema (
    {
        name:{type:String , required: true},
        description: {type:String , required: true}
        
    },{versionKey:false}
)

const location = mongoose.model("Location", locationSchema)

export default location