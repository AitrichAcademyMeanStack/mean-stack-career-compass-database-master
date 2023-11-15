import mongoose, {Schema} from mongoose;

// Schema for location
const locationSchema = new Schema (
    {
        name:{type:String , required: true},
        description: {type:String , required: true}
        
    }
)

export const location = mongoose.model("Location", locationSchema)