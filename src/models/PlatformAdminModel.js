import mongoose,{Schema} from "mongoose";//importing mongoose


//platformadmin schema model
const adminSchema = new Schema(
    {
        userName:{type: String},
        password:{type:String},
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