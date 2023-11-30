import mongoose,{Schema} from 'mongoose'

const savedjobsschema = new Schema({
    job: {
        jobTitle: String,
        jobSummary: String,
        jobLocation: String,
        company: String,
        category: String,
        qualifications: String,
        skills: String,
        industry: String,
        jobResponsibilities: [String],
        postedJob: String,
        postedDate: Date
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
