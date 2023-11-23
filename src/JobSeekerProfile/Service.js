import logger from "../middleware/logger.js"
import seekerProfile from "../models/JobSeekerProfileModel.js"
import jobseeker from "../models/JobSeekerModel.js"
import Qualification from "../models/QualificationModel.js"
import workexperience from "../models/WorkExperienceModel.js"
import skill from "../models/SkillModel.js"


const createprofile = async (seekerid, profiledata) => {
  try {
    const seekerresult = await jobseeker.findById(seekerid);

    if (seekerresult) {
      profiledata.jobSeeker = {
        firstName: seekerresult.firstName,
        lastName: seekerresult.lastName,
        userName: seekerresult.userName,
        email: seekerresult.email,
        phone: seekerresult.phone,
      };

      profiledata.skills = [];
      profiledata.qualifications = [];

      const profileresult = await seekerProfile.create(profiledata);

      if (profileresult) {
        const workExperienceIds = await workexperience.insertMany(profiledata.workExperiences);  
        workExperienceIds._id = profiledata.workExperiences._id
        logger.info("Job seeker profile created successfully");
        return profileresult;
      } else {
        logger.error("Error in creating job seeker profile");
      }
    } else {
      logger.error("Error in finding seeker id");
    }
  } catch (error) {
    throw error;
  }
};

  

  const getallskills = async (seekerid) => {
    try {
      const findseeker = await jobseeker.findById(seekerid)
      if (findseeker) {
        const allskillresult = await skill.find({},{name:true,_id:false})
      if (allskillresult) {
        logger.info("successfully getting all skills")
        return allskillresult;
      } else {
        logger.error("error in getting all skills")
      }
      } else {
        logger.error("error for finding seeker with specific id")
      }
      
    } catch (error) {
      throw error;
    }
  };
  

  const getallqualifications = async (seekerid) => {
    try {
      const findseeker = await jobseeker.findById(seekerid)
      if (findseeker) {
        const allqualificationsresult = await Qualification.find({},{name:true,_id:false})
      if (allqualificationsresult) {
        logger.info("successfully getting all qualifications")
        return allqualificationsresult;
      } else {
        logger.error("error in getting all qualifications")
      }
      } else {
        logger.error("error for finding seeker with specific id")
      }
      
    } catch (error) {
      throw error;
    }
  };
  
export default {getallskills,getallqualifications,createprofile}