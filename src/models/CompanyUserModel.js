import mongoose,{Schema} from 'mongoose';


const companyUserSchema = new Schema(
    {
        company:{type: String}, // company User
        firstName: {type:String},
        role: {
            type: String,
            default: "Company Admin",
            select: false
          },
        lastName:{type:String},
        userName:{type: String},
        email:{type: String},
        phone:{type: String}

    },{versionKey: false}
)

const collectionName = "CompanyUser";
const CompanyUser = mongoose.model('CompanyUser', companyUserSchema , collectionName);

export default CompanyUser;
