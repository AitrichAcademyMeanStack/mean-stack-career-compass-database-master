import logger from "../middleware/logger.js"; //importing logger
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker model
import savedjobs from "../models/SavedJobsModel.js"; //importing saved jobs model


const createsavedjobs = async(seekerid,savedjobdata)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
        savedjobdata.SavedBy={
                firstName:existingseeker.firstName,
                lastName:existingseeker.lastName,
                userName:existingseeker.userName,
                email:existingseeker.email,
                phone:existingseeker.phone
            }
        const newsavedjob = await savedjobs.create(savedjobdata)
        if (newsavedjob) {
            logger.info("jobs are saved successfully")
        } else {
            logger.error("error occured in saving jobs")
        }
        } else {
            logger.error("seeker not found with specific id")
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

const getallsavedjobs = async(seekerid)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            const getalljobs = await savedjobs.find()
            if (getalljobs) {
                logger.info("getting all saved jobs successfull")
            } else {
                logger.error("error occured in getting all savedjobs")
            }
        } else {
            logger.error("jobseeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

const deletesavedjobs = async(seekerid,savedjobid)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            const deletejobs = await savedjobs.findByIdAndDelete(savedjobid)
            if (deletejobs) {
                logger.info("saved job deleted successfully")
            } else {
                logger.error("error occured in deleting savedjob with specific id")
            }
        } else {
            logger.error("jobseeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}


export default {createsavedjobs,getallsavedjobs,deletesavedjobs}

