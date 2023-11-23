import mongoose, { Schema } from 'mongoose';

const jobSeekerProfileSchema = new Schema(
  {
    profileName: { type: String, required: true },
    profileSummary: { type: String, required: true },
    resume: {
      title: String,
      resume: Buffer,
    },
    qualifications: [{
      type: String,
    }],
    workExperiences: [{
      jobTitle: String,
      companyName: String,
      summary: String,
      serviceStart: Date,
      serviceEnd: Date,
    }],
    skills: [{
      type: String,
    }],
    jobSeeker: {
      firstName: String,
      lastName: String,
      userName: String,
      email: String,
      phone: String,
    },
  },
  { versionKey: false }
);

const collectionName = 'JobSeekerProfile';

const seekerProfile = mongoose.model('JobSeekerProfile', jobSeekerProfileSchema, collectionName);

export default seekerProfile;
