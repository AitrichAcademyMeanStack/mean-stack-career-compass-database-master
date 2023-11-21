import logger from "../middleware/logger.js"
import seekerProfile from "../models/JobSeekerProfileModel.js"
import jobseeker from "../models/JobSeekerModel.js"

const getallprofiles =async(seekerid)=>{
    try {
        const result = await seekerProfile.findById(seekerid)
        console.log(result);
        if (result) {
            logger.info("all job seeker profiles : ",result)
        } else {
            logger.error("cannot find seeker profile with seeker id")
        }
    } catch (error) {
        throw error
    }
}

// const getprofilebyid = async()=>{

// }

const createprofile = async(seekerid,profiledata)=>{
    try {
        const seekerresult = await jobseeker.findById(seekerid)
        if (seekerresult) {
            const profileresult = await seekerProfile.create(profiledata)
            if (profileresult) {
                logger.info("job seeker profile created successfully")
            } else {
                logger.error("error in creating job seeker profile")
            }
        } else {
            logger.error("error in finding seeker id")
        }
    } catch (error) {
        throw error
    }
}

export default {getallprofiles,createprofile}