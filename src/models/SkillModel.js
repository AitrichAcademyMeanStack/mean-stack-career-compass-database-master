import mongoose, {Schema} from "mongoose";

// schema for skills
const skillschema = new Schema(
    {
        name: {
            type: String,
            unique:true
        },
        description: {
            type: String
        }
    },{versionKey:false}
)

const skill = mongoose.model("skills",skillschema)

export default skill