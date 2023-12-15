import logger from "../middleware/logger.js"; //importing logger
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker model
import savedjobs from "../models/SavedJobsModel.js"; //importing saved jobs model
import JobPost from "../models/JobPostModel.js";//importing job post model
import BadRequestError from "../Exceptions/BadRequestError.js"; //imporing bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; //importing not found error handler


//create saved jobs
const createsavedjobs = async (seekerid, savedjobdata, jobpostid) => {
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            savedjobdata.savedBy = {
                seekerId: existingseeker._id,
                firstName: existingseeker.firstName,
                lastName: existingseeker.lastName,
                userName: existingseeker.userName,
                email: existingseeker.email,
                phone: existingseeker.phone
            }
            const existingjobpost = await JobPost.findById(jobpostid)
            if (existingjobpost) {
                savedjobdata.job = {
                    JobpostId: existingjobpost._id,
                    jobTitle: existingjobpost.jobTitle,
                    jobSummary: existingjobpost.jobSummary,
                    jobLocation: existingjobpost.jobLocation,
                    company: existingjobpost.company,
                    category: existingjobpost.category,
                    qualifications: existingjobpost.qualifications,
                    skills: existingjobpost.skills,
                    industry: existingjobpost.industry,
                    jobResponsibilities: existingjobpost.jobResponsibilities,
                    postedBy: existingjobpost.postedBy,
                    postedDate: existingjobpost.postedDate
                }
                const newsavedjob = await savedjobs.create(savedjobdata)
                if (newsavedjob) {
                    logger.info("jobs are saved successfully")
                    return newsavedjob
                } else {
                    logger.error("error occured in saving jobs")
                    throw new BadRequestError("error occured in saving new jobs")
                }
            } else {
                logger.error("job post not found with specific id")
                throw new NotFoundError("job post not found with specific id")
            }
        } else {
            logger.error("seeker not found with specific id")
            throw new NotFoundError("job seeker not found with specific id")
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

// get all saved jobs
const getallsavedjobs = async (seekerid, jobpostid) => {
    try {
        const existingseeker = await jobseeker.findById(seekerid);
        if (existingseeker) {
            const existingjobpost = await JobPost.findById(jobpostid)
            if (existingjobpost) {
                const getalljobs = await savedjobs.find({ "savedBy.seekerId": seekerid })
                if (getalljobs.length > 0) {
                    logger.info("Getting all saved jobs successfully");
                    return getalljobs;
                } else {
                    logger.error("No saved jobs found for the specified job seeker");
                    throw new NotFoundError("No saved jobs found for the specified job seeker")
                }
            } else {
                logger.error("Job post not found with the specific id");
                throw new NotFoundError("Job post not found with the specific id")
            }
        } else {
            logger.error("Job seeker not found with the specific id");
            throw new NotFoundError("Job seeker not found with the specific id")
        }
    } catch (error) {
        logger.error("Error occurred in getallsavedjobs:", error.message);
        throw error;
    }
};



//deleting saved jobs
const deletesavedjobs = async (seekerid, jobpostid, savedjobid) => {
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            const existingjobpost = await  JobPost.findById(jobpostid)
            if (existingjobpost) {
                const deletejobs = await savedjobs.findByIdAndDelete(savedjobid)
                if (deletejobs) {
                    logger.info("saved job deleted successfully")
                } else {
                    logger.error("error occured in deleting savedjob with specific id")
                }
            } else {
                logger.error("job post not found with specific id")
                throw new NotFoundError("Job post not found with the specific id")
            }
        }
        else {
            logger.error("jobseeker not found with specific id")
            throw new NotFoundError("Job seeker not found with the specific id")
        }
    } catch (error) {
        throw error
    }
}


export default { createsavedjobs, getallsavedjobs, deletesavedjobs }

