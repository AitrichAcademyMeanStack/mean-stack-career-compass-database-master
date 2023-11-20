import mongoose ,{Schema} from 'mongoose'


//schema for systemuser
const systemuserschema = new Schema (
    {
       _id:{type : mongoose.Types.ObjectId,ref:'jobseeker',required:true},
        firstName: { type: mongoose.Types.String,ref:'jobseeker', required: true },
        role: { type: String, enum: ["Platform Admin","Company Admin","Hiring Manager", "Job Seeker"], required: true },
        lastName: { type: mongoose.Types.String,ref:'jobseeker', required: true },
        email:{ type: mongoose.Types.String,ref:'jobseeker', required: true },
        phone: { type: mongoose.Types.String,ref:'jobseeker', required: true }
      },{
        versionKey:false
    }
)

const collectionname = "SystemUser"
const systemuser = mongoose.model("systemuser",systemuserschema,collectionname)

export default systemuser
