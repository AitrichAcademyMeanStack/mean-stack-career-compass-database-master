import mongoose, { Schema } from 'mongoose'; //importing mongoose


//schema for job seeker profile
const jobSeekerProfileSchema = new Schema(
  {
    profileName: { type: String, required: true },
    profileSummary: { type: String, required: true },
    Resume:[{
      title:String,
      resume:String,
    }],
    qualifications: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Qualification'
    }],
    workExperiences: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:'WorkExperience'
    }],
    skills:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'skills'
    }],
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
