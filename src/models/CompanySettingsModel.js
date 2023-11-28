import mongoose , {Schema} from "mongoose";

const companySettingsSchema = new Schema(
    {
        newJobApplicationEmail:{type: String},
        adminUser:{
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
            firstName:{type:String},
            role:{
                type:mongoose.Schema.Types,
                ref:'Role'
            },
            lastName:{type: String},
            userName:{type: String},
            email:{type:String},
            phone:{type:String}


        },
        company: {
        legalName:{type: String},
        summary:{type: String},
        industry:{
            name:{type: String},
            description:{type: String}
        },
        email:{type: String},
        phone: {type: String},
        address: {type: String},
        website:{type: String},
        location:{
            name:{type: String}
        }
    }
    }
)

const collectionName = "CompanySettings";
const CompanySettings = mongoose.model("CompanySettings", companySettingsSchema , collectionName);
export default CompanySettings