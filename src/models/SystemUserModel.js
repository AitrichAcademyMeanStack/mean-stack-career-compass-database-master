import mongoose ,{Schema} from 'mongoose'
import { RolesEnum } from '../Config/rolesEnums.js'


//schema for systemuser
const systemuserschema = new Schema (
    {
        firstName: {type:String},
        Role: {type:String,enum:Object.values(RolesEnum)},
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
