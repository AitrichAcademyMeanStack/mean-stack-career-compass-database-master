import mongoose, { Schema } from 'mongoose'; //importing mongoose


//schema for job seeker profile
const jobSeekerProfileSchema = new Schema(
  {
    profileName: { type: String, required: true },
    profileSummary: { type: String, required: true },
    Resume:{
      title:String,
      resume:String,
    },
    qualifications: [String],
    workExperiences: [{
       jobTitle: { type: String ,required:true},
      companyName: { type: String ,required:true},
      summary: { type: String ,required:true},
      serviceStart: { type: Date ,required:true},
      serviceEnd: { type: Date,required:true }
    }],
    skills:[String],
    jobSeeker: {
      firstName: String,
      lastName: String,
      userName: String,
      email: String,
      phone: Number,
    },
  },
  { versionKey: false }
);

const collectionName = 'JobSeekerProfile';

const seekerProfile = mongoose.model('JobSeekerProfile', jobSeekerProfileSchema, collectionName);

export default seekerProfile;
