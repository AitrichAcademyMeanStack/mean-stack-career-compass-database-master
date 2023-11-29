import logger from "../middleware/logger.js"; //importing logger
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker model
import savedjobs from "../models/SavedJobsModel.js"; //importing saved jobs model
import JobPost from "../models/JobPostModel.js";

//create saved jobs
const createsavedjobs = async(seekerid,savedjobdata,jobpostid)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
        savedjobdata.SavedBy={
                seekerId:existingseeker._id,
                firstName:existingseeker.firstName,
                lastName:existingseeker.lastName,
                userName:existingseeker.userName,
                email:existingseeker.email,
                phone:existingseeker.phone
            }
        const existingjobpost = await JobPost.findById(jobpostid)
        if (existingjobpost) {
            savedjobdata.Job ={
                jobTitle:existingjobpost.jobTitle,
                jobSummary:existingjobpost.jobSummary,
                jobLocation:existingjobpost.jobLocation,
                company:existingjobpost.company,
                category:existingjobpost.category,
                qualifications:existingjobpost.qualifications,
                skills:existingjobpost.skills,
                industry:existingjobpost.industry,
                jobResponsibilities:existingjobpost.jobResponsibilities,
                postedJob:existingjobpost.postedJob,
                postedDate:existingjobpost.postedDate
            }
            const newsavedjob = await savedjobs.create(savedjobdata)
            if (newsavedjob) {
                logger.info("jobs are saved successfully")
                return newsavedjob
            } else {
                logger.error("error occured in saving jobs")
            }
        } else {
            logger.error("job post not found with specific id")
        }
        } else {
            logger.error("seeker not found with specific id")
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

// get all saved jobs
const getallsavedjobs = async(seekerid,jobpostid)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
        const existingjobpost = await JobPost.findById(jobpostid)
        if (existingjobpost) {
            const getalljobs = await savedjobs.find({seekerId:seekerid})
            console.log(getalljobs);
            if (getalljobs) {
                logger.info("getting all saved jobs successfull")
                return getalljobs
            } else {
                logger.error("error occured in getting all savedjobs")
            }
        } else {
            logger.error("job post not found with specific id")
        }
            
        } else {
            logger.error("jobseeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

//deleting saved jobs
const deletesavedjobs = async(seekerid,savedjobid,jobpostid)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            const existingjobpost = await JobPost.findById(jobpostid)
            if (existingjobpost) {
                const deletejobs = await savedjobs.findByIdAndDelete(savedjobid)
                if (deletejobs) {
                    logger.info("saved job deleted successfully")
                } else {
                    logger.error("error occured in deleting savedjob with specific id")
                }
            } else {
                logger.error("job post not found with specific id")
            }  
        } else {
            logger.error("jobseeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}


export default {createsavedjobs,getallsavedjobs,deletesavedjobs}

