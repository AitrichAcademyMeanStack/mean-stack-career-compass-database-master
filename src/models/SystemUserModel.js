import mongoose ,{Schema} from 'mongoose'
import { RolesEnum } from '../Config/rolesEnums.js'


//schema for systemuser
const systemuserschema = new Schema (
    {
        firstName: { type: String, required: true },
        role: { type: String, enum: Object.values(RolesEnum), required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
      },{
        versionKey:false
    }
)

const collectionname = "SystemUser"
const systemuser = mongoose.model("systemuser",systemuserschema,collectionname)

export default systemuser
