import mongoose ,{Schema} from 'mongoose' //importing mongoose


//schema for systemuser
const systemuserschema = new Schema (
    {
        firstName: { type: String,required: true },
        role: { type: String, enum: ["Platform Admin","Company Admin","Hiring Manager", "Job Seeker"], required: true },
        lastName: { type: String,required: true },
        email:{ type: String,required: true },
        phone: { type: String,required: true }
      },{
        versionKey:false
    }
)

const collectionname = "SystemUser"
const systemuser = mongoose.model("systemuser",systemuserschema,collectionname)

export default systemuser
