import mongoose, { Schema } from "mongoose";
import { RolesEnum } from "../Config/rolesEnums.js";

const roleSchema = new Schema(
    {
        name: {
            type: String,
            enum: Object.keys(RolesEnum) // Fetching roles
        },
        description:{type: String}

    },{versionKey: false}
)

const collectionName = "Role"
const Role = mongoose.model("Role", roleSchema , collectionName)

export default Role;