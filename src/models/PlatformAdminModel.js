import mongoose,{Schema} from "mongoose";//importing mongoose


//platformadmin schema model
const adminSchema = new Schema(
    {   firstName: { type: String, required: true ,trim:true},
    lastName: { type: String, required: true,trim:true },
    userName: {type: String,required:true,trim:true},
    email: { type: String, required: true,trim:true },
    phone: { type: Number, required: true,trim:true },
        role: {
            type: String,
            default: "Platform Admin",
            select: false
          }
    }
    ,{versionKey:false}
)

const collectionName = 'PlatformAdmin'
const  PlatformAdmin= mongoose.model('PlatformAdmin', adminSchema , collectionName);

export default PlatformAdmin