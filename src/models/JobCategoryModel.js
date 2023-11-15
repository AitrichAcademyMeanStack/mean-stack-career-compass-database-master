import mongoose, {Schema} from "mongoose";

// Schema for JobCategory
const jobCategory = new Schema (
    {
        name: {type: String , required: true},
        description: {type: String , required: true}
    },{versionKey:false}
)

const Category = mongoose.model("Job_Category", jobCategory);

export default Category