import logger from "../middleware/logger.js"; // importing logger
import SkillModel from "../models/SkillModel.js"; //importing skill model
import qualification from "../models/QualificationModel.js"; //importing qualification model
import Workexperience from "../models/WorkExperienceModel.js"; //importing work experience model
import seekerProfile from "../models/JobSeekerProfileModel.js"; //importing job seeker profile model
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker model
import ValidationError from "../Exceptions/ValidationError.js"; //importing validation error handler
import BadRequestError from "../Exceptions/Badrequesterror.js"; //importing bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; // importing not found error handler

//add skills to profile
const addskill = async (seekerid, profileid, skillNames) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);

    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);

      if (
        existingprofile &&
        existingseeker._id.toString() ===
          existingprofile.jobSeeker.seekerId.toString()
      ) {
        const result = await seekerProfile.updateOne(
          { _id: profileid },
          { $addToSet: { skills: { $each: skillNames.skills } } }
        );

        if (result) {
          logger.info("Skills are added successfully");
          console.log(result);
          return result;
        } else {
          logger.error("Error occurred in updating skills");
        }
      } else {
        logger.error("Seeker profile not found with specific id");
      }
    } else {
      logger.error("Seeker not found with specific id");
    }
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};


const addprofilename = async (seekerid, profileid, profilenamedata) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);

    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);

      if (existingprofile &&
        existingseeker._id.toString() ===
          existingprofile.jobSeeker.seekerId.toString()) {
        const result = await seekerProfile.updateOne(
          { _id: profileid },
          { profileName: profilenamedata.profileName },
          {new:true}
        );

        if (result && result.acknowledged) {
          logger.info("Profile name added successfully");
          console.log(result);
          return result;
        } else {
          logger.error("Error occurred in adding profilename");
        }
      } else {
        logger.error("Seeker profile not found with specific id");
      }
    } else {
      logger.error("Seeker not found with specific id");
    }
  } catch (error) {
    throw error;
  }
};


//get all seeker profiles
const getallprofile = async (seekerid, profileid) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);
      if (existingprofile) {
        logger.info("successfully getting profile data with specific id");
        return existingprofile;
      } else {
        logger.error("seeker profile is not found with specific id");
      }
    } else {
      logger.error("job seeker is not found with specific id");
    }
  } catch (error) {
    throw error;
  }
};


//add qualification to seekerprofile
const qualificationupdate = async (seekerid, profileid, qualificationdata) => {
  try {
    const seekerdata = await jobseeker.findById(seekerid);

    if (seekerdata) {
      const profiledata = await seekerProfile.findById(profileid);

      if (profiledata && seekerdata._id.toString() === profiledata.jobSeeker.seekerId.toString()) {
        
        const updatedata= await seekerProfile.updateOne(
          {_id:profileid},
          {$addToSet:{qualifications:{$each: qualificationdata.qualifications}}})
        if (updatedata) {
          logger.info("Qualification updated successfully", updatedata);
          return updatedata;
        } else {
          logger.error("Error in updating qualification");
        }
      } else {
        logger.error("Profile not found with specific id");
      }
      } else {
        logger.error("seeker not found with specific id");

      }
  } catch (error) {
    throw error;
  }
};

//add profile summary to seekerprofile
const updateprofilesummary= async(seekerid,profileid,summarydata)=>{
  try{
    const seekerdata= await jobseeker.findById(seekerid);
    if(seekerdata){
     const profiledata= await seekerProfile.findById(profileid);
      if (profiledata && seekerdata._id.toString() === profiledata.jobSeeker.seekerId.toString()) {
     
      const updatedata = await seekerProfile.updateOne(
        { _id: profileid },
        { profileSummary: summarydata.profileSummary }
      );
   
     if (updatedata) {
      logger.info("summary updated successfully", updatedata);
      return updatedata;
    } else {
      logger.error("Error in updating qualification");
    }
  } else {
    logger.error("Profile not found with specific id");
  }
 } else {
    logger.error("seeker not found with specific id");
  
  }
}
  catch(error){
    throw error;
  }
};

const addworkexperience = async(seekerid,profileid,experiencedata) =>{
  try {
    const existingseeker  = await jobseeker.findById(seekerid)
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid)
      if (existingprofile && existingprofile.jobSeeker.seekerId.toString() === existingseeker._id.toString()) {
        existingprofile.workExperiences = [{
          jobTitle: experiencedata.jobTitle,
          companyName: experiencedata.companyName,
          summary: experiencedata.summary,
          serviceStart: experiencedata.summary,
          serviceEnd:experiencedata.serviceEnd
        }]
        const result = await seekerProfile.updateOne(
          {_id:profileid},
          {$addToSet:{workExperiences:{$each: experiencedata.workExperiences}}})
          if (result) {
            logger.info("work experience added successfully")
            console.log(result);
            return result
          } else {
            logger.error("error occured  in adding work experiences")
          }
      } else {
        logger.error("seeeker profile not found with specific id")
      }
    } else {
      logger.error("seeker not found with specific id")
    }
  } catch (error) {
    throw error
  }
}

// add resume to seekerprofile
const resumeupload = async (req, seekerid, profileid) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);
      if (existingprofile) {
        const file = existingprofile.Resume;
        existingprofile.Resume = {
          title: req.file.originalname,
          resume: req.file.path,
        };
        if (!file.title || !file.resume) {
          logger.error("Invalid file data");
          throw new Error("Invalid file data");
        }

        const updateprofile = await seekerProfile.updateOne(
          { _id: profileid },
          { $set: existingprofile }
        );
        console.log(updateprofile);
        if (updateprofile) {
          logger.info("File uploaded successfully");
          return updateprofile;
        } else {
          logger.error("Error occurred in file uploading");
          throw new Error("Error occurred in file uploading");
        }
      }
    }
  } catch (error) {
    console.log(error);
    logger.error("Error in createresume:", error.message);
    throw error;
  }
};

const deleteskills = async (seekerid, profileid, skillname) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);
      if (
        existingprofile &&
        existingseeker._id.toString() ===
          existingprofile.jobSeeker.seekerId.toString()
      ) {
        const result = await seekerProfile.findOneAndDelete({_id:profileid})

        if (result && result.acknowledged) {
          logger.info("Skill deleted successfully");
          return result;
        } else {
          logger.error("Update operation failed or not acknowledged by MongoDB");
        }
      } else {
        logger.error("Profile not found with specific id or not associated with the seeker");
      }
    } else {
      logger.error("Seeker not found with specific id");
    }
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    throw error;
  }
};


export default {
  resumeupload,
  getallprofile,
  addskill,
  qualificationupdate,
  updateprofilesummary,
  addprofilename,
  addworkexperience,
  deleteskills
};
