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
const createprofile = async (seekerid, profiledata) => {
  try {
    const seekerresult = await jobseeker.findById(seekerid);

    if (!seekerresult) {
      logger.error("Seeker not found with id:", seekerid);
      return;
    }
    profiledata.jobSeeker = {
      firstName: seekerresult.firstName,
      lastName: seekerresult.lastName,
      userName: seekerresult.userName,
      email: seekerresult.email,
      phone: seekerresult.phone,
    };


    const profileresult = await seekerProfile.create(profiledata);

    if (profileresult) {
      logger.info("Job seeker profile created successfully. Profile ID:", profileresult._id);
      return { success: true, profile: profileresult };
    } else {
      logger.error("Error in creating job seeker profile");
    }
  } catch (error) {
    logger.error("Error in createprofile:", error.message);
    throw error;
  }
};


//update job seeker profile
const profileupdate = async(seekerid,profileid,updatedata) =>{
  try {
    const seekerdata = await jobseeker.findById(seekerid)
    if (seekerdata) {
      const profiledata = await seekerProfile.findByIdAndUpdate(profileid,updatedata)
      if (profiledata) {
        logger.info("seeker profile updated successfully")
      } else {
        logger.error("error in updating seeker profile")
      }
    } else {
      logger.error("seeker not found with specific id")
    }
  } catch (error) {
    throw error
  }
}

//delete job seeker profile
const deleteprofile = async(seekerid,profileid) =>{
  try {
    const seekerdata = await jobseeker.findById(seekerid)
    if (seekerdata) {
      const profiledata = await seekerProfile.findByIdAndDelete(profileid)
      if (profiledata) {
        logger.info("seeker profile deleted successfully")
        return profiledata
      } else {
        logger.error("error in deleting seeker profile")        
      }
    } else {
      logger.error("seeker not found with specific id")
    }
  } catch (error) {
    throw error
  }
}

export default {createprofile,deleteprofile,profileupdate}