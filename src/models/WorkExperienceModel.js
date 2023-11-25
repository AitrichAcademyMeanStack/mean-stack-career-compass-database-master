import mongoose, { Schema } from 'mongoose'; //importing mongoose

//schema for work experience
const WorkExperienceSchema = new Schema(
    {
      jobTitle: { type: String ,required:true},
      companyName: { type: String ,required:true},
      summary: { type: String ,required:true},
      serviceStart: { type: Date ,required:true},
      serviceEnd: { type: Date,required:true }
    },
    { versionKey: false }
  );
  

const collectionName = "WorkExperience";
const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema, collectionName);

export default WorkExperience;
