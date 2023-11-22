import mongoose , {Schema} from 'mongoose';
import Industry from './IndustryModel.js';

const JobProviderCompanySchema = new Schema(
    {
        legalName:{type: String},
        summary:{type: String},
        industry:{
            name:String,
            description:String
        },
        email:{type: String},
        phone: {type: String},
        address: {type: String},
        website:{type: String},
        location:{type: Schema.Types.ObjectId,ref:"Location"}
    }
) 

const collectionName = "JobProviderCompany";
const JobProviderCompany = mongoose.model("JobProviderCompany", JobProviderCompanySchema, collectionName);

export default JobProviderCompany