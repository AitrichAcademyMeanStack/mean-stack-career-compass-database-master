import mongoose, {Schema} from "mongoose";

// schema for skills
const skillschema = new Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        }
    },{versionKey:false}
)

const skill = mongoose.model("skills",skillschema)

export default skill