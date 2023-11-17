import mongoose, { Schema } from "mongoose";

// Schema for JobCategory
const jobCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [3, 'Name must be at least 3 characters long']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [3, 'Description must be at least 3 characters long']
        }
    },
    { versionKey: false }
);

const Category = mongoose.model("Job_Category", jobCategorySchema);

export default Category;
