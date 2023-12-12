import logger from "../middleware/logger.js"; // importing logger
import SkillModel from "../models/SkillModel.js"; //importing skill model
import qualification from "../models/QualificationModel.js"; //importing qualification model
import Workexperience from "../models/WorkExperienceModel.js"; //importing work experience model
import seekerProfile from "../models/JobSeekerProfileModel.js"; //importing job seeker profile model
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker model
import ValidationError from "../Exceptions/ValidationError.js"; //importing validation error handler
import BadRequestError from "../Exceptions/Badrequesterror.js"; //importing bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; // importing not found error handler

const addskill = async (seekerid, profileid, skilldata) => {
  try {
    const existingseeker = await jobseeker.findById(seekerid);
    if (existingseeker) {
      const existingprofile = await seekerProfile.findById(profileid);
      if (
        existingseeker._id.toString() ===
        existingprofile.jobSeeker.seekerId.toString()
      ) {
        const result = await seekerProfile.updateOne(
          { _id: profileid },
          { $set: { skilldata } }
        );
        if (result) {
          logger.info("skills are added successfullly");
          return result;
        } else {
          logger.error("error occured  in updating skills");
        }
      } else {
        logger.error("seeker profile not found with specific id");
      }
    } else {
      logger.error("seeker not found with specific id");
    }
  } catch (error) {}
};

//create new job seeker profile
const createprofile = async (seekerid, profiledata, profileid) => {
  try {
    const seekerresult = await jobseeker.findById(seekerid);
    if (!seekerresult) {
      logger.error("Seeker not found with id:", seekerid);
      return { success: false, error: "Seeker not found" };
    }
    const profileresult = await seekerProfile.findById(profileid);
    if (profileresult) {
      const profile = await seekerProfile.create(profiledata);
      if (profile) {
        logger.info(
          "Job seeker profile created successfully. Profile ID:",
          profile._id
        );
        return { success: true, profile: profile };
      } else {
        logger.error("Error in creating job seeker profile");
        return { success: false, error: "Error in creating profile" };
      }
    } else {
      logger.error("seeker profile not found with specific id");
    }
  } catch (error) {
    logger.error("Error in createprofile:", error.message);
    throw error;
  }
};

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

//update job seeker profile
const profileupdate = async (seekerid, profileid, updatedata, req) => {
  try {
    const seekerdata = await jobseeker.findById(seekerid);
    if (seekerdata) {
      const profiledata = await seekerProfile.findById(profileid);
      if (profiledata) {
        profiledata.profileName = updatedata.profileName;
        profiledata.profileSummary = updatedata.profileSummary;

        const file = profiledata.Resume;
        profiledata.Resume = {
          title: req.file.originalname,
          resume: req.file.path,
        };

        if (!profiledata.Resume.title || !profiledata.Resume.resume) {
          logger.error("Invalid file data");
          throw new Error("Invalid file data");
        }

        const updatedProfile = await seekerProfile.findOneAndUpdate(
          { _id: profileid },
          {
            $set: {
              profileName: updatedata.profileName,
              profileSummary: updatedata.profileSummary,
              "Resume.title": req.file.originalname,
              "Resume.resume": req.file.path,
              ...updatedata,
            },
          },
          { new: true } // Return the modified document
        );

        if (updatedProfile) {
          logger.info("Seeker profile updated successfully", updatedProfile);
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

const qualificationupdate = async (seekerid, profileid, qualificationdata) => {
  try {
    const seekerdata = await jobseeker.findById(seekerid);

    if (seekerdata) {
      const profiledata = await seekerProfile.findById(profileid);

      if (seekerdata && seekerdata._id.toString() === profiledata.jobSeeker.seekerId.toString()) {
        
        const updatedata= await seekerProfile.updateOne({_id:profileid},{$addToSet:{qualifications:{$each:qualificationdata.qualifications.map((qualification)=>qualification)}}})
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

// const profileupdate = async (seekerid, profileid, updatedata, req) => {
//   try {
//     const seekerdata = await jobseeker.findById(seekerid);

//     if (seekerdata) {
//       const profiledata = await seekerProfile.findById(profileid);

//       if (profiledata) {
//         profiledata.profileName = updatedata.profileName;
//         profiledata.profileSummary = updatedata.profileSummary;

//         const file = profiledata.Resume;
//         profiledata.Resume = {
//           title: req.file.originalname,
//           resume: req.file.path
//         };

//         if (!profiledata.Resume.title || !profiledata.Resume.resume) {
//           logger.error("Invalid file data");
//           throw new Error("Invalid file data");
//         }

//         // Update the job seeker profile (excluding qualification)
//         const updatedProfile = await seekerProfile.findOneAndUpdate(
//           { _id: profileid },
//           {
//             $set: {
//               "profileName": updatedata.profileName,
//               "profileSummary": updatedata.profileSummary,
//               "Resume.title": req.file.originalname,
//               "Resume.resume": req.file.path,
//               ...updatedata
//             }
//           },
//           { new: true } // Return the modified document
//         );

//         if (updatedProfile) {
//           logger.info("Seeker profile updated successfully", updatedProfile);

//           // Call the updateQualification function to update qualifications
//           await updateQualification(profileid, updatedata.newQualification);

//           return updatedProfile;
//         } else {
//           logger.error("Error in updating seeker profile");
//         }
//       } else {
//         logger.error("Profile not found with specific id");
//       }
//     } else {
//       logger.error("Seeker not found with specific id");
//     }
//   } catch (error) {
//     throw error;
//   }
// };

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

//delete job seeker profile
const deleteprofile = async (seekerid, profileid) => {
  try {
    const seekerdata = await jobseeker.findById(seekerid);
    if (seekerdata) {
      const profiledata = await seekerProfile.findById(profileid);
      if (
        profiledata.jobSeeker.seekerId.toString() === seekerdata._id.toString()
      ) {
        const deletedata = await seekerProfile.findOneAndDelete({
          _id: profileid,
        });
        if (deletedata) {
          logger.info("Seeker profile deleted successfully");
          return deletedata;
        } else {
          logger.error("Error occurred in deleting seeker profile");
          throw new BadRequestError(
            "Error occurred in deleting seeker profile"
          );
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

export default {
  createprofile,
  deleteprofile,
  profileupdate,
  resumeupload,
  getallprofile,
  addskill,
  qualificationupdate,
};
