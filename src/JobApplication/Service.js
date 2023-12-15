import BadRequestError from "../Exceptions/BadRequestError.js"; //importing custom bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js";// importing custom not found error handler
import logger from "../middleware/logger.js"; //importing logger
import Jobapplication from "../models/JobApplicationModel.js"; //importing job application model
import JobPost from "../models/JobPostModel.js"; //importing job post model
import jobseeker from "../models/JobSeekerModel.js"; //importing jobseeker model
import seekerProfile from "../models/JobSeekerProfileModel.js"; ///importing seeker profile model

//getting all job applications
const getallapplications = async(profileid,jobpostid)=>{
    try {
        const existingprofile = await seekerProfile.findById(profileid)
        if (existingprofile) {
            const existingjobpost =  await JobPost.findById(jobpostid)
            if (existingjobpost) {
                const result = await Jobapplication.find({"applicant.seekerId":existingprofile.jobSeeker.seekerId})
                if (result.length>0) {
                    logger.info("successfully getting all job applications")
                    return result
                } else {
                    logger.error("error occured in getting all job aplications")
                    throw new BadRequestError("error occured in getting all job applications")
                }
            } else {
                logger.error("job post not found with specific id")
                throw new NotFoundError("job post not found with specific id")
            }
        } else {
            logger.error("job seeker profile not found with specific id")
            throw new NotFoundError("job seeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

//deleting job application with specific id
const deleteapplication = async (profileid,jobpostid,applicationid) => {
    try {
        const existingprofile = await seekerProfile.findById(profileid);
        if (existingprofile) {
            const  existingjobpost = await JobPost.findById(jobpostid)
            if (existingjobpost) {
            const findjobapplication = await Jobapplication.findById(applicationid);
            if (findjobapplication.applicant.seekerId.toString() === existingprofile.jobSeeker.seekerId.toString()) {
                const deletejobapplication = await Jobapplication.findOneAndDelete({_id: applicationid});
                if (!deletejobapplication) {
                    logger.error("Error occurred in deleting job application with specific id");
                    throw new BadRequestError("Error occurred in deleting job application with specific id");
                }
                logger.info("Job application deleted by id");
                return deletejobapplication;
            } else {
                logger.error("Error occurred in deleting job application with specific id");
                throw new BadRequestError("Error occurred in deleting job application with specific id");
            }
            } else {
                logger.error("Job post not found with specific id");
                throw new NotFoundError("Job seeker profile not found with specific id");
            }
        } else {
            logger.error("Job seeker profile not found with specific id");
            throw new NotFoundError("Job seeker not found with specific id");
        }
    } catch (error) {
        throw error;
    }
};

//adding new job application
const createapplication = async(profileid,jobpostid,applicationdata)=>{
    try {
        const existingprofile = await seekerProfile.findById(profileid)
        if (existingprofile) {
            applicationdata.applicant={
                seekerId:existingprofile.jobSeeker.seekerId,
                firstName:existingprofile.jobSeeker.firstName,
                lastName:existingprofile.jobSeeker.lastName,
                userName:existingprofile.jobSeeker.userName,
                email:existingprofile.jobSeeker.email,
                phone:existingprofile.jobSeeker.phone
            }
            const existingjobpost = await JobPost.findById(jobpostid)
            if (existingjobpost) {
                applicationdata.job ={
                    JobpostId:existingjobpost._id,
                    jobTitle:existingjobpost.jobTitle,
                    jobSummary:existingjobpost.jobSummary,
                    jobLocation:existingjobpost.jobLocation,
                    company:existingjobpost.company,
                    category:existingjobpost.category,
                    qualifications:existingjobpost.qualifications,
                    skills:existingjobpost.skills,
                    industry:existingjobpost.industry,
                    jobResponsibilities:existingjobpost.jobResponsibilities,
                    postedBy:existingjobpost.postedBy,
                    postedDate:existingjobpost.postedDate
                }

                applicationdata.resume = {
                    title: existingprofile.Resume.title,
                    Resume:existingprofile.Resume.resume
                }

                const newapplication = await Jobapplication.create(applicationdata)
                if (newapplication) {
                    logger.info("job applied successfully")
                    return newapplication
                } else {
                    logger.error("error occured in applying new job")
                    throw new BadRequestError("error occured in applying new job")
                }
            } else {
                logger.error("job post not found with specific id")
                throw new NotFoundError("job post not found with specific id")
            }
        } else {
            logger.error("job seeker profile not found with specific id")
            throw new NotFoundError("job seeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

export default {createapplication,getallapplications,deleteapplication}
