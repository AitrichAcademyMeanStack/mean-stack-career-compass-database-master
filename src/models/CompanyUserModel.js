import mongoose,{Schema} from 'mongoose';


const companyUserSchema = new Schema(
    {
        company:{
            legalName:{type: String},
            summary:{type: String},
            industry:{
                name:{type: String}
            },
            email:{type: String},
            phone:{type: String},
            address:{type: String},
            website:{type: String},
            location:{
                name:{type: String}
            }
        }, 
        firstName: {type:String},
        role: {
            type: Schema.Types.Mixed,
            default: {
                name: 'Company Admin',
                description: ''
            }
            
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
