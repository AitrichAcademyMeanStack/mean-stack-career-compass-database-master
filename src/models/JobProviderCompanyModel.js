import mongoose , {Schema} from 'mongoose';

const JobProviderCompanySchema = new Schema(
    {
        legalName:{type: String},
        summary:{type: String},
        industry:[String],
        email:{type: String},
        phone: {type: Number},
        address: {type: String},
        website:{type: String},
        location:{
            name:{type: String}
        }
    },{versionKey:false}
) 

const collectionName = "JobProviderCompany";
const JobProviderCompany = mongoose.model("JobProviderCompany", JobProviderCompanySchema, collectionName);

export default JobProviderCompany