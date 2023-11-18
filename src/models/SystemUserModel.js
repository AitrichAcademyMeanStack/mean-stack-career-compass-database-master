import mongoose ,{Schema} from 'mongoose'


//schema for systemuser
const systemuserschema = new Schema (
    {
        firstName: {type:String},
        role: {type:String},
        lastName: {type:String},
        email: {type:String},
        phone: {type:String},
    },{
        versionKey:false
    }
)

const collectionname = "SystemUser"
const systemuser = mongoose.model("systemuser",systemuserschema,collectionname)

export default systemuser
