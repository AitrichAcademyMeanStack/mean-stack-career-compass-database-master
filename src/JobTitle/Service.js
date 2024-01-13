import logger from "../middleware/logger.js"; //importing logger middleware
import BadRequestError from "../Exceptions/BadRequestError.js"; //importing badrequest error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; //importing notfound error handler
import ValidationError from "../Exceptions/ValidationError.js"; //importing Validation error handler
import JobTitle from "../models/JobTitle.js"; //importing job title model
import { commonvalidation } from "../middleware/Validation/CommonModule.js"; //importing common validation for validating job title
import JobPost from "../models/JobPostModel.js"; //imporing job post model
import mongoose from "mongoose";  //importing mongoose
import seekerProfile from "../models/JobSeekerProfileModel.js";

//getting all job title
const getalljobtitle = async () => {
  try {
    const result = await JobTitle.find({}, { name: true });
    if (result.length > 0) {
      logger.info("all Jobtitle : ", result);
      return result;
    } else {
      logger.error("Jobtitle not found");
      throw new NotFoundError("jobtitle not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("invalid Jobtitle id");
      throw new BadRequestError("invalid Jobtitle id");
    } else {
      throw error;
    }
  }
};

//create new job title
const createJobTitle=async(jobtitledata)=>{
    try {
        await commonvalidation.validateAsync(jobtitledata)
        const result =await JobTitle.create(jobtitledata)
        if (result) {
            logger.info("new jobtitle created successfully")
            return result
        } else {
            logger.error("error in create new jobtitle")
            throw new BadRequestError("error in create new jobtitle")
        }
    }
    catch(error)
    { if (error.name === "ValidationError") {
        logger.error(`validation error : ${error.message}`)
        throw new ValidationError(error.message)
    } else {
        throw error
    }
    }
}

//delete job title
const deleteJobTitle = async (jobtitleid) => {
    const session = await JobTitle.startSession();
    session.startTransaction();
    try {
      const result = await JobTitle.findByIdAndDelete(jobtitleid).session(session); 
      if (result) {
        await JobPost.deleteMany({ 'jobTitle.Titleid': jobtitleid }).session(session);
        await seekerProfile.updateMany({'workExperiences.jobTitle.Titleid':jobtitleid},{ $pull: { 'workExperiences': { 'jobTitle.Titleid': jobtitleid } } }).session(session)
        await session.commitTransaction();
        session.endSession();
        logger.info("jobtitle deleted successfully");
      } else {
        await session.abortTransaction();
        session.endSession();
        logger.error("jobtitle not found with id");
        throw new NotFoundError("jobtitle data is not found with the specific id");
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error.name === "CastError") {
        logger.error("invalid jobtitle id");
        throw new BadRequestError("invalid jobtitle id");
      } else {
        throw error;
      }
    }
  };
  

//update job title
const updateJobTitle = async (jobTitleId, jobTitleData) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const options = { session, new: true };
      const updatedJobTitle = await JobTitle.findByIdAndUpdate(jobTitleId, jobTitleData, options);
      if (!updatedJobTitle) {
        throw new NotFoundError("JobTitle not found with the specified id");
      }
      logger.info("JobTitle updated successfully");
      await JobPost.updateMany({ 'jobTitle.Titleid': jobTitleId }, { $set: { 'jobTitle.name': jobTitleData.name } }, options);
      await seekerProfile.updateMany({'workExperiences.jobTitle.Titleid':jobTitleId},{$set:{'workExperiences.$.jobTitle.name':jobTitleData.name}},options)
      await session.commitTransaction();
      session.endSession();
      return updatedJobTitle;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (error.name === "CastError") {
        logger.error("Invalid JobTitle id");
        throw new BadRequestError("Invalid JobTitle id");
      } else if (error.name === "ValidationError") {
        logger.error(`Validation Error: ${error.message}`);
        throw new ValidationError(error.message);
      } else {
        throw error;
      }
    }
  };

export default {getalljobtitle,createJobTitle,deleteJobTitle,updateJobTitle};
