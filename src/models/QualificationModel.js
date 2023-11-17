import mongoose , {Schema} from "mongoose";

const qualificationSchema = new Schema (
    {
        name: 
        {
            type: String,
            required: [true, "name"]

        }
    }
)