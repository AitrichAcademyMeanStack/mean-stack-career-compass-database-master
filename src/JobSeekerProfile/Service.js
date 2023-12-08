import logger from "../middleware/logger.js" // importing logger
import SkillModel from '../models/SkillModel.js' //importing skill model
import qualification from '../models/QualificationModel.js'//importing qualification model
import Workexperience from '../models/WorkExperienceModel.js' //importing work experience model
import seekerProfile from "../models/JobSeekerProfileModel.js" //importing job seeker profile model
import jobseeker from "../models/JobSeekerModel.js" //importing job seeker model
import ValidationError from "../Exceptions/ValidationError.js"; //importing validation error handler
import BadRequestError from "../Exceptions/Badrequesterror.js"; //importing bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; // importing not found error handler


//create new job seeker profile
const createprofile = async (seekerid,profiledata,profileid) => {
  try {
    const seekerresult = await jobseeker.findById(seekerid);
    if (!seekerresult) {
      logger.error("Seeker not found with id:", seekerid);
      return { success: false, error: "Seeker not found" };
    }
    const profileresult = await seekerProfile.findById(profileid)
    if (profileresult) {
      const profile = await seekerProfile.create(profiledata);
      if (profile) {
        logger.info("Job seeker profile created successfully. Profile ID:", profile._id);
        return { success: true, profile: profile };
      } else {
        logger.error("Error in creating job seeker profile");
        return { success: false, error: "Error in creating profile" };
      }
    } else {
      logger.error("seeker profile not found with specific id")
    }

  } catch (error) {
    logger.error("Error in createprofile:", error.message);
    throw error;
  }
};



//update job seeker profile
const profileupdate = async (seekerid, profileid, updatedata) => {
  try {
    const seekerdata = await jobseeker.findById(seekerid);
    if (seekerdata) {
      const profiledata = await seekerProfile.findById(profileid);
      if (profiledata) {
        const updatedProfile = await seekerProfile.findByIdAndUpdate(
          profileid,
          updatedata,
          { new: true }
        );

        if (updatedProfile) {
          logger.info("Seeker profile updated successfully",updatedProfile);
          return updatedProfile; 
        } else {
          logger.error("Error in updating seeker profile");
        }
      } else {
        logger.error("Profile not found with specific id");
      }
    } else {
      logger.error("Seeker not found with specific id");
    }
  } catch (error) {
    throw error;
  }
};


//delete job seeker profile
const deleteprofile = async (seekerid, profileid) => {
  try {
    const seekerdata = await jobseeker.findById(seekerid);
    if (seekerdata) {
      const profiledata = await seekerProfile.findById(profileid);
      if (profiledata.jobSeeker.seekerId.toString() === seekerdata._id.toString()) {
        const deletedata = await seekerProfile.findOneAndDelete({ _id: profileid });
        if (deletedata) {
          logger.info("Seeker profile deleted successfully");
          return deletedata;
        } else {
          logger.error("Error occurred in deleting seeker profile");
          throw new BadRequestError("Error occurred in deleting seeker profile");
        }
      } else {
        logger.error("Profile not found with specific id");
        throw new NotFoundError("Profile not found with specific id");
      }
    } else {
      logger.error("Seeker not found with specific id");
      throw new NotFoundError("Seeker not found with specific id");
    }
  } catch (error) {
    throw error;
  }
};


export default {createprofile,deleteprofile,profileupdate}