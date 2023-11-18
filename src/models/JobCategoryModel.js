import mongoose, { Schema } from "mongoose";

// Schema for JobCategory
const jobCategorySchema = new Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        }
    },
    { versionKey: false }
);

const collectionname = 'Job_Category'
const Category = mongoose.model("Job_Category", jobCategorySchema,collectionname);

export default Category;
