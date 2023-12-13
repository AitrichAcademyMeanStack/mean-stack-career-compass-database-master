import mongoose, { Schema } from 'mongoose'; //importing mongoose


//schema for job seeker profile
const jobSeekerProfileSchema = new Schema(
  {
    profileName: String,
    profileSummary: String,
    Resume:{
      title:String,
      resume:String,
    },
    ProfilePicture:{
      
    },
    qualifications: [String],
    workExperiences: [{
       jobTitle: String,
      companyName: String,
      summary: String,
      serviceStart: Date,
      serviceEnd: Date
    }],
    skills:[String],
    jobSeeker: {
      seekerId: mongoose.Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      userName: String,
      email: String,
      phone: Number,
    }
  },
  { versionKey: false }
);

const collectionName = 'JobSeekerProfile';

const seekerProfile = mongoose.model('JobSeekerProfile', jobSeekerProfileSchema, collectionName);

export default seekerProfile;
