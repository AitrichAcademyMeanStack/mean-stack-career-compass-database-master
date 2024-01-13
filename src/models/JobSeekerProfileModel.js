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
      title:String,
      profilepicture:String
    },
    qualifications: [{
      name:String,
      institution:String,
      startdate: Date,
      enddate: Date
    }],
    workExperiences: [{
      jobTitle: {
        Titleid:{type: mongoose.Schema.Types.ObjectId},
        name:{type : String}
      },
      companyName: String,
      summary: String,
      serviceStart: Date,
      serviceEnd: Date
    }],
    skills: [{
      _id:{type:mongoose.Schema.Types.ObjectId},  
      name:{type : String}
    }],
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
