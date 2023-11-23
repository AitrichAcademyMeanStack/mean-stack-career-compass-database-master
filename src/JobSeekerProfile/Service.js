import logger from "../middleware/logger.js"
import seekerProfile from "../models/JobSeekerProfileModel.js"
import jobseeker from "../models/JobSeekerModel.js"
import Qualification from "../models/QualificationModel.js"
import workexperience from "../models/WorkExperienceModel.js"
import skill from "../models/SkillModel.js"

// const getallprofiles =async(seekerid)=>{
//     try {
//         const result = await seekerProfile.findById(seekerid)
//         console.log(result);
//         if (result) {
//             logger.info("all job seeker profiles : ",result)
//         } else {
//             logger.error("cannot find seeker profile with seeker id")
//         }
//     } catch (error) {
//         throw error
//     }
// }

// const getprofilebyid = async()=>{

// }

// const createprofile = async (seekerid, profiledata) => {
//     try {
//       const seekerresult = await jobseeker.findById(seekerid);
  
//       if (seekerresult) {
//         profiledata.jobSeeker = {
//           firstName: seekerresult.firstName,
//           lastName: seekerresult.lastName,
//           userName: seekerresult.userName,
//           email: seekerresult.email,
//           phone: seekerresult.phone,
//         };
  
//         // Fetch qualification names
//         const qualifications = await Qualification.find({}, { name: true, _id: false }).exec();
//         const qualificationNames = qualifications.map(qualification => qualification.name);
//         profiledata.qualifications = qualificationNames;    
//         const profileresult = await seekerProfile.create(profiledata);
//         if (profileresult) {  
//           logger.info("Job seeker profile created successfully");
//           return profileresult;
//         } else {
//           logger.error("Error in creating job seeker profile");
//         }
//       } else {
//         logger.error("Error in finding seeker id");
//       }
//     } catch (error) {
//       throw error;
//     }
//   };
  

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
  
export default {getallskills,getallqualifications}