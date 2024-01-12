import mongoose, { Schema } from "mongoose"; //importing mongoose

//schema model for role
const roleSchema = new Schema(
    {
        name: {
            type: String,
            enum: ['Platform Admin', 'Company Admin', 'Hiring Manager', 'Job Seeker']
        },
        description:{type: String}

    },{versionKey: false}
)

const collectionName = "Role"
const Role = mongoose.model("Role", roleSchema , collectionName)

export default Role;