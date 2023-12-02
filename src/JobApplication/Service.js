import BadRequestError from "../Exceptions/Badrequesterror.js"; //importing custom bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js";// importing custom not found error handler
import logger from "../middleware/logger.js"; //importing logger
import Jobapplication from "../models/JobApplicationModel.js"; //importing job application model
import JobPost from "../models/JobPostModel.js"; //importing job post model
import jobseeker from "../models/JobSeekerModel.js"; //importing jobseeker model
import mongoose from "mongoose";

//getting all job applications
const getallapplications = async(seekerid)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            const getapplication = await Jobapplication.find({"applicant.seekerId":seekerid})
            if (getapplication.length>0) {
                logger.info("successfully getting all job applications")
                return getapplication
            } else {
                logger.error("error occured in getting all job aplications")
                throw new BadRequestError("error occured in getting all job applications")
            }
        } else {
            logger.error("job seeker not found with specific id")
            throw new NotFoundError("job seeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

//deleting job application with specific id
const deleteapplication = async (seekerid, applicationid) => {
    try {
        const existingseeker = await jobseeker.findById(seekerid);
        if (existingseeker) {
            const findjobapplication = await Jobapplication.findById(applicationid);
            if (findjobapplication.applicant.seekerId.toString() === existingseeker._id.toString()) {
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
            logger.error("Job seeker not found with specific id");
            throw new NotFoundError("Job seeker not found with specific id");
        }
    } catch (error) {
        throw error;
    }
};

//adding new job application
const createapplication = async(seekerid,jobpostid,applicationdata)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            applicationdata.applicant={
                seekerId:existingseeker._id,
                firstName:existingseeker.firstName,
                lastName:existingseeker.lastName,
                userName:existingseeker.userName,
                email:existingseeker.email,
                phone:existingseeker.phone
            }
            const existingjobpost = await JobPost.findById(jobpostid)
            if (existingjobpost) {
                applicationdata.job ={
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

                const newapplication = await Jobapplication.create(applicationdata)
                if (newapplication) {
                    logger.info("job application added successfully")
                    return newapplication
                } else {
                    logger.error("error occured in adding new job application")
                    throw new BadRequestError("error occured in adding new job application")
                }
            } else {
                logger.error("job post not found with specific id")
                throw new NotFoundError("job post not found with specific id")
            }
        } else {
            logger.error("job seeker not found with specific id")
            throw new NotFoundError("job seeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

export default {createapplication,getallapplications,deleteapplication}
