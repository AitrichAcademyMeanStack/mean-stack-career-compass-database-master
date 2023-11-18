import mongoose, {Schema} from 'mongoose';

// Schema for location
const locationSchema = new Schema (
    {
        name:
        {
            type:String ,
            required: [true, "Name is required"]


        },
        description: 
        {
            type:String ,
            required: [true, "Description is required"]
        }
    
    },{versionKey: false},{collection: 'LOCATION'}
        
)


const location = mongoose.model("Location", locationSchema)

export default location