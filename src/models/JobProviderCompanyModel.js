import mongoose , {Schema} from 'mongoose';
import industrySchema from './IndustryModel.js';

const JobProviderCompanySchema = new Schema(
    {
        legalName:{type: String},
        summary:{type: String},
        industry:[industrySchema],
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