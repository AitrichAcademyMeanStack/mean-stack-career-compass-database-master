import mongoose, { Schema } from 'mongoose';

const WorkExperienceSchema = new Schema(
    {
      _id: { type: mongoose.Types.ObjectId, ref: 'JobSeekerProfile' },
      jobTitle: { type: String },
      companyName: { type: String },
      summary: { type: String },
      serviceStart: { type: Date },
      serviceEnd: { type: Date }
    },
    { versionKey: false }
  );
  

const collectionName = "WorkExperience";
const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema, collectionName);

export default WorkExperience;
