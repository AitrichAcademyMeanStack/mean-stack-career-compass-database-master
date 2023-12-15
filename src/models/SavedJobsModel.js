import mongoose,{Schema} from 'mongoose'

const savedjobsschema = new Schema({
    job:{
        JobpostId: mongoose.Schema.Types.ObjectId,
        jobTitle: [String],
        jobSummary: { type: String },
        jobLocation: [String],
        company: {
          companyId: mongoose.Schema.Types.ObjectId,
          legalName: { type: String },
          summary: { type: String },
          industry: [String],
          email: { type: String },
          phone: { type: String },
          address: { type: String },
          website: { type: String },
          location: [String],
        },
        category: [String],
        qualifications: [String],
        skills: [String],
        industry: [String],
        jobResponsibilities: [String],
        postedBy: { type: String },
        postedDate: { type: Date, default: Date.now() },
    },
    savedBy: {
        seekerId: mongoose.Schema.Types.ObjectId,
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        phone: String
    },
    dateSaved: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const collectionName = "SavedJobs";

const savedjobs = mongoose.model("SavedJobs", savedjobsschema, collectionName);

export default savedjobs;
