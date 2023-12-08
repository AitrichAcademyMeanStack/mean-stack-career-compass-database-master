import logger from "../middleware/logger.js" // importing logger
import SkillModel from '../models/SkillModel.js' //importing skill model
import qualification from '../models/QualificationModel.js'//importing qualification model
import Workexperience from '../models/WorkExperienceModel.js' //importing work experience model
import seekerProfile from "../models/JobSeekerProfileModel.js" //importing job seeker profile model
import jobseeker from "../models/JobSeekerModel.js" //importing job seeker model
import ValidationError from "../Exceptions/ValidationError.js"; //importing validation error handler
import BadRequestError from "../Exceptions/Badrequesterror.js"; //importing bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; // importing not found error handler



const addskill = async(seekerid,data)=>{
  try {
    const seekerresult = await jobseeker.findById(seekerid)
    if (seekerresult) {

      const result = await  seekerProfile.create(data)
      if (result) {
        logger.info("successfully adding skill into profile")
      } else {
        logger.error("error occured in posting skills")
      }
    } else {
      logger.error("seeker not found with specific id")
    }
  } catch (error) {
    throw error
  }
}


const addqualification = async(seekerid,data)=>{
  try {
    const seekerresult = await jobseeker.findById(seekerid)
    if (seekerresult) {
      
      const result = await  seekerProfile.create(data)
      if (result) {
        logger.info("successfully adding qualification into profile")
      } else {
        logger.error("error occured in posting qualifications")
      }
    } else {
      logger.error("seeker not found with specific id")
    }
  } catch (error) {
    throw error
  }
}

//create new job seeker profile
const createprofile = async (seekerid, profiledata) => {
  try {
    const seekerresult = await jobseeker.findById(seekerid);
    if (!seekerresult) {
      logger.error("Seeker not found with id:", seekerid);
      return { success: false, error: "Seeker not found" };
    }

    profiledata.jobSeeker = {
      seekerId: seekerresult._id,
      firstName: seekerresult.firstName,
      lastName: seekerresult.lastName,
      userName: seekerresult.userName,
      email: seekerresult.email,
      phone: seekerresult.phone,
    }

    const profileresult = await seekerProfile.create(profiledata);

    if (profileresult) {
      logger.info("Job seeker profile created successfully. Profile ID:", profileresult._id);
      return { success: true, profile: profileresult };
    } else {
      logger.error("Error in creating job seeker profile");
      return { success: false, error: "Error in creating profile" };
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
      const profiledata = await seekerProfile.findById(profileid)
      if (profiledata) {
        const updatedataa = await seekerProfile.findByIdAndUpdate(profileid,{ $set: updatedata },{new:true})
        if (updatedataa) {
          logger.info("seeker profile updated successfully")
          return updatedata
        } else {
          logger.error("error in updating seeker profile")
        }
      } else {
        logger.error("profile not found with specific id")
      }
    } else {
      logger.error("seeker not found with specific id")
    }
  } catch (error) {
    throw error
  }
}

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


export default {createprofile,deleteprofile,profileupdate,addskill,addqualification}