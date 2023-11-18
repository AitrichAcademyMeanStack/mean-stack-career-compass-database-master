import mongoose, { Schema } from "mongoose";
import { RolesEnum } from "../Config/rolesEnums";

const roleSchema = new Schema(
    {
        name: {
            type: String,
            enum: Object.values(RolesEnum)
        },
        description:{type: String}

    }
)

const collectionName = "Role"
const Role = mongoose.model("Role", roleSchema , collectionName)

export default Role;