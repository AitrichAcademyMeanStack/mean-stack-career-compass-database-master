import logger from "../middleware/logger.js"; // importing logger
import seekerProfile from "../models/JobSeekerProfileModel.js"; //importing job seeker profile model
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker model
import ValidationError from "../Exceptions/ValidationError.js"; //importing validation error handler
import BadRequestError from "../Exceptions/BadRequestError.js"; //importing bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; // importing not found error handler



//get profilename
const getprofilename = async (seekerid, profileid) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);

      if (existingprofile) {
        logger.info("Successfully getting profile data with specific id");
        // Assuming profile name is stored in the 'name' property of the existingprofile object
        const profileName = existingprofile.profileName;
        return profileName;
      } else {
        logger.error('Seeker profile not found with this id');
        throw new NotFoundError("Seeker profile not found with this id");
      }
    } else {
      logger.error('Seeker not found with this id');
      throw new NotFoundError("Seeker not found with this id");
    }
  } catch (error) {
    logger.error(`Error: ${error}`);
    // Handle the error or rethrow it if needed
    throw error;
  }
};

//get profilesummary

  const getprofilesummary = async(seekerid,profileid) => {
    try {
      const existingseeker = await jobseeker.findById(seekerid);
      if (existingseeker) {
        const existingprofile = await seekerProfile.findById(profileid);
  
        if (existingprofile) {
          logger.info("Successfully getting profile data with specific id");
         
          const profileSummary = existingprofile.profileSummary;
         
          return profileSummary;
        } 
        else {
          logger.error('Seeker profile not found with this id');
          throw new NotFoundError("Seeker profile not found with this id");
        }
      } else {
        logger.error('Seeker not found with this id');
        throw new NotFoundError("Seeker not found with this id");
      }
    } catch (error) {
      logger.error(`Error: ${error}`);
      // Handle the error or rethrow it if needed
      throw error;
    }
 
  }

  const getqualification= async(seekerid,profileid)=>
  {
    try{
      const  existingseeker= await jobseeker.findById(seekerid)
      if(existingseeker)
      {
        const existingseeker = await jobseeker.findById(seekerid);
        if(existingseeker)
        {
          const existingprofile = await seekerProfile.findById(profileid);
          if (existingprofile) {
            logger.info("Successfully getting profile data with specific id");
           
           const   qualifications = existingprofile.qualifications;
           
            return qualifications;
        }
        else{
          logger.error('qualification not get this id');
          throw new NotFoundError('qualification not get this id');
        }
      }
      else{
            logger.error('qualification not get on this id');
            throw new NotFoundError('qualification not get this id')
      }

    }}

catch (error) {
        logger.error(`Error: ${error}`);
        // Handle the error or rethrow it if needed
        throw error;
      }
   
  };


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
          return result;
        } else {
          logger.error("Error occurred in updating skills");
          throw new BadRequestError("Error occurred in updating skills")
        }
      } else {
        logger.error("Seeker profile not found with specific id");
        throw new NotFoundError("Seeker profile not found with specific id")
      }
    } else {
      logger.error("Seeker not found with specific id");
      throw new NotFoundError("Seeker not found with specific id")
    }
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};

//add profile name to profile
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
          { new: true }
        );

        if (result && result.acknowledged) {
          logger.info("Profile name added successfully");
          return result;
        } else {
          logger.error("Error occurred in adding profilename");
          throw new BadRequestError("Error occurred in adding profilename")
        }
      } else {
        logger.error("Seeker profile not found with specific id");
        throw new NotFoundError("Seeker profile not found with specific id")
      }
    } else {
      logger.error("Seeker not found with specific id");
      throw new NotFoundError("Seeker not found with specific id")
    }
  } catch (error) {
    logger.error(`Error: ${error}`);
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
        throw new NotFoundError("seeker profile is not found with specific id")
      }
    } else {
      logger.error("job seeker is not found with specific id");
      throw new NotFoundError("Seeker not found with specific id")

    }
  } catch (error) {
    logger.error(`Error: ${error}`);
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
        profiledata.qualifications = [{
          name: qualificationdata.name,
          institution: qualificationdata.institution,
          startdate: qualificationdata.startdate,
          enddate: qualificationdata.enddate,
        }]
        const updatedata = await seekerProfile.updateOne(
          { _id: profileid },
          { $addToSet: { qualifications: { $each: qualificationdata.qualifications } } })
        if (updatedata) {
          logger.info("Qualification updated successfully", updatedata);
          return updatedata;
        } else {
          logger.error("Error in updating qualification");
          throw new BadRequestError("Error in updating qualification")
        }
      } else {
        logger.error("Profile not found with specific id");
        throw new NotFoundError("Profile not found with specific id")
      }
    } else {
      logger.error("seeker not found with specific id");
      throw new NotFoundError("Seeker not found with specific id")
    }
  } catch (error) {
    logger.error(`Error: ${error}`);
    throw error;
  }
};

//add profile summary to seekerprofile
const updateprofilesummary = async (seekerid, profileid, summarydata) => {
  try {
    const seekerdata = await jobseeker.findById(seekerid);
    if (seekerdata) {
      const profiledata = await seekerProfile.findById(profileid);
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
          throw new BadRequestError("Error in updating qualification")
        }
      } else {
        logger.error("Profile not found with specific id");
        throw new NotFoundError("Profile not found with specific id")
      }
    } else {
      logger.error("seeker not found with specific id");
      throw new NotFoundError("Seeker not found with specific id")
    }
  }
  catch (error) {
    logger.error(`Error: ${error}`);
    throw error;
  }
};

//add work experience to profile
const addworkexperience = async (seekerid, profileid, experiencedata) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid)
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid)
      if (existingprofile && existingprofile.jobSeeker.seekerId.toString() === existingseeker._id.toString()) {
        existingprofile.workExperiences = [{
          jobTitle: experiencedata.jobTitle,
          companyName: experiencedata.companyName,
          summary: experiencedata.summary,
          serviceStart: experiencedata.serviceStart,
          serviceEnd: experiencedata.serviceEnd
        }]
        const result = await seekerProfile.updateOne(
          { _id: profileid },
          { $addToSet: { workExperiences: { $each: experiencedata.workExperiences } } })
        if (result) {
          logger.info("work experience added successfully")
          console.log(result);
          return result
        } else {
          logger.error("error occured  in adding work experiences")
          throw new BadRequestError("error occured  in adding work experiences")
        }
      } else {
        logger.error("seeker profile not found with specific id")
        throw new NotFoundError("seeker profile not found with specific id")
      }
    } else {
      logger.error("seeker not found with specific id")
      throw new NotFoundError("Seeker not found with specific id")

    }
  } catch (error) {
    logger.error(`Error: ${error}`);
    throw error
  }
}

// add resume to seekerprofile
const resumeupload = async (req, seekerid, profileid) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);

    if (!existingseeker) {
      logger.error("Seeker not found with specific id")
      throw new NotFoundError("Seeker not found with specific id")

    }

    const existingprofile = await seekerProfile.findById(profileid);

    if (!existingprofile || existingprofile.jobSeeker.seekerId.toString() !== existingseeker._id.toString()) {
      throw new  NotFoundError("Invalid profile or mismatched relationship with job seeker")
    }

    const file = existingprofile.Resume;

    existingprofile.Resume = {
      title: req.file.originalname,
      resume: req.file.path,
    };

    if (!file.title || !file.resume) {
      logger.error("Invalid file data");
      throw new Error("Invalid file data");
    }

    const updateprofile = await seekerProfile.updateOne({ _id: profileid }, { $set: existingprofile });

    if (updateprofile) {
      logger.info("Resume uploaded successfully");
      return updateprofile;
    } else {
      logger.error("Error occurred in file uploading");
      throw new Error("Error occurred in file uploading");
    }
  } catch (error) {
    logger.error("Error in upload resume:", error.message);
    throw error;
  }
};

//add profile picture to profile
const addprofilepicture = async (req, seekerid, profileid) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);
      console.log(existingprofile);
      if (existingprofile && existingprofile.jobSeeker.seekerId.toString() === existingseeker._id.toString()) {
        const file = existingprofile.ProfilePicture
        existingprofile.ProfilePicture = {
          title: req.file.originalname,
          profilepicture: req.file.path,
        };
        if (!file.title || !file.profilepicture) {
          logger.error("Invalid file data");
          throw new Error("Invalid file data");
        }

        const updateprofile = await seekerProfile.updateOne(
          { _id: profileid },
          { $set: existingprofile }
        );
        console.log(updateprofile);
        if (updateprofile) {
          logger.info("ProfilePicture uploaded successfully");
          return updateprofile;
        } else {
          logger.error("Error occurred in file uploading");
          throw new BadRequestError("Error occurred in file uploading");
        }
      } else {
        logger.error("job seeker profile not found with specific id")
        throw new NotFoundError("job seeker profile not found with specific id")
      }
    } else {
      logger.error("Seeker not found with specific id")
      throw new NotFoundError("Seeker not found with specific id")
    }
  } catch (error) {
    logger.error("Error in upload profile picture:", error.message);
    throw error;
  }
}

//delete skills frrom array
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
        const result = await seekerProfile.updateOne(
          { _id: profileid },
          { $pull: { skills: skillname } }
        )

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

//delete qualification from array
const deletequalification = async (seekerid, profileid, qualificationid) => {
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
          { $pull: { qualifications: { _id: qualificationid } } }
        )

        if (result && result.acknowledged) {
          logger.info("qualification deleted successfully");
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
}

//delete work experience from array
const deleteworkexperience = async (seekerid, profileid, workexpid) => {
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
          { $pull: { workExperiences: { _id: workexpid } } }
        )

        if (result && result.acknowledged) {
          logger.info("workexperience deleted successfully");
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
}

//delete resume from profile
const deleteresume = async (seekerid, profileid) => {
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
          { $unset: { Resume: 1 } }
        )

        if (result && result.acknowledged) {
          logger.info("Resume deleted successfully");
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
}


// delete profile picture from profile
const deleteprofilepictre = async (seekerid, profileid) => {
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
          { $unset: { ProfilePicture: 1 } }
        )

        if (result && result.acknowledged) {
          logger.info("profile picture deleted successfully");
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
}


export default {
  getprofilename,
  getprofilesummary,
  getqualification,
  resumeupload,
  getallprofile,
  addskill,
  qualificationupdate,
  updateprofilesummary,
  addprofilename,
  addworkexperience,
  deleteskills,
  addprofilepicture,
  deletequalification,
  deleteworkexperience,
  deleteresume,
  deleteprofilepictre
};
