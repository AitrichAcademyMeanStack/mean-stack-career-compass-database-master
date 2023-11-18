import mongoose , {Schema} from 'mongoose';

const JobProviderCompanySchema = new Schema(
    {
        legalName:{type: String},
        summary:{type: String},
        industry:{type: String}, // industry
        email:{type: String},
        phone: {type: String},
        address: {type: String},
        websile:{type: String},
        location:{type: Schema.Types.ObjectId,ref:"Location"}
    }
)

const collectionName = "JobProviderCompany"
const JobProviderCompany = mongoose.model("JobProviderCompany", JobProviderCompanySchema, collectionName)

export default JobProviderCompany