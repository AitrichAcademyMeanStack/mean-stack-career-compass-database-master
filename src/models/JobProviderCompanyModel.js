import mongoose, { Schema } from "mongoose"; //importing mongoose

//schema model for job provider company
const JobProviderCompanySchema = new Schema(
  {
    legalName: { type: String, unique: true, required: true},
    summary: { type: String, unique: true, required: true },
    industry: [{type:String,unique:true,required:true}],
    email: { type: String, unique: true, required: true },
    phone: { type: Number, unique: true, required: true },
    address: { type: String, unique: true, required: true },
    website: { type: String, unique: true, required: true },
    location: [{ type: String, unique: true, required: true }],
  },
  { versionKey: false }
);

const collectionName = "JobProviderCompany";
const JobProviderCompany = mongoose.model(
  "JobProviderCompany",
  JobProviderCompanySchema,
  collectionName
);

export default JobProviderCompany;
