import BadRequestError from "../Exceptions/BadRequestError.js"; //importing custom bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js";// importing custom not found error handler
import logger from "../middleware/logger.js"; //importing logger
import CompanyUser from "../models/CompanyUserModel.js";
import Jobapplication from "../models/JobApplicationModel.js"; //importing job application model
import JobPost from "../models/JobPostModel.js"; //importing job post model
import jobseeker from "../models/JobSeekerModel.js"; //importing jobseeker model
import seekerProfile from "../models/JobSeekerProfileModel.js"; ///importing seeker profile model
import ValidationError from "../Exceptions/ValidationError.js";
import { jobApplicationvalidation } from "../middleware/Validation/JobApplicationValidation.js";

//get all job applications
const getalljobapplications = async (page, limit,sortorder) => {
    try {
      
        const applications = await Jobapplication.find()
        if (applications)
        {
            const perpage = limit
            const totalposts = await Jobapplication.countDocuments()
            const totalpages = Math.ceil( totalposts/perpage)
            if (page > totalpages) {
                logger.error("page not found")
                throw new NotFoundError("page not found")   
               }

               const sortOption = sortorder === 'oldest' ? {datesubmitted : 1} : {datesubmitted : -1}   
               const result = await Jobapplication.find()
                   .sort(sortOption)
                   .skip((page - 1) * perpage)
                   .limit(perpage)
                   .exec()
   
               if (result.length > 0) {
                   logger.info("Successfully getting paginated job applications");
                   return result;
               } else {
                   logger.error("Error occurred in getting paginated job applications");
                   throw new BadRequestError("Error occurred in getting paginated job applications");
               }
           } }
        catch (error) {
           console.error('Error in getallapplications:', error);
           throw error;
       }
};


const getjobapplications = async(companyuserid,jobpostid,page,limit,sortorder)=>{
    try {
        const existingcompanyuser = await CompanyUser.findById(companyuserid)
        if (existingcompanyuser) {
            const existingjobpost = await JobPost.findById(jobpostid)
            if (existingjobpost && existingjobpost.company.companyId.toString() === existingcompanyuser._id.toString()){
                
                const totalposts = await jobseeker.countDocuments()
                const totalpages = Math.ceil(totalposts / limit)
                if (page > totalpages) {
                    logger.error("Page not  found")
                    throw new NotFoundError("page not found")
                }

                const sortOption = sortorder === 'oldest' ? {datesubmitted : 1} : {datesubmitted : -1}   

                const result = await Jobapplication
                .find({"job.JobpostId" : existingjobpost._id})
                .sort(sortOption)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec()
                if (result.length > 0) {
                    logger.info("successfully geetting all job applications with company user id")
                    return result
                } else {
                    logger.error("error occured in getting all job applications")
                    throw new BadRequestError("error occured in getting all job applications")
                }
            } else {
                logger.error("jobpost not found with specific id")
                throw new NotFoundError("jobpost not found with specific id")
            }
        } else {
            logger.error("company user not found with specific id")
            throw new NotFoundError("company user not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

//get all jobaplication by seekerid
const getallapplications = async (seekerid, page, limit,sortorder) => {
    try {
        const existingseeker = await jobseeker.findById(seekerid);
        if (existingseeker) {
            const perpage = limit
            const totalposts = await Jobapplication.countDocuments()
            const totalpages = Math.ceil( totalposts/perpage)

            if (page > totalpages) {
             logger.error("page not found")
             throw new NotFoundError("page not found")   
            }

            const sortOption = sortorder === 'oldest' ? {datesubmitted : 1} : {datesubmitted : -1}   

            const result = await Jobapplication
                .find({ "applicant.seekerId": existingseeker._id })
                .sort(sortOption)
                .skip((page - 1) * perpage)
                .limit(perpage)
                .exec()

            if (result.length > 0) {
                logger.info("Successfully getting paginated job applications");
                return result;
            } else {
                logger.error("Error occurred in getting paginated job applications");
                throw new BadRequestError("Error occurred in getting paginated job applications");
            }
        } else {
            logger.error("Job seeker not found with specific id");
            throw new NotFoundError("Job seeker not found with specific id");
        }
    } catch (error) {
        console.error('Error in getallapplications:', error);
        throw error;
    }
};

//deleting job application with specific id
const deleteapplication = async (seekerid,applicationid) => {
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
const createapplication = async(seekerid,profileid,jobpostid,applicationdata)=>{
    try {
        await jobApplicationvalidation.validateAsync(applicationdata)
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            const existingprofile = await seekerProfile.findById(profileid)
            if (existingprofile) {

                //Embedding Applicant(JobSeeker)
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

                    // Embedding JobPost
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
    
                    //Embedding Resume
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
                throw new NotFoundError("job seeker profile not found with specific id")
            }
        } else {
            logger.error("job seeker not found with specific id")
            throw new NotFoundError("job seeker not found with specific id")
        }
    } catch (error) {
        if (error.name === "ValidationError") {
          logger.error(`validation error: ${error.message}`)
          throw new ValidationError(error.message)
        }else {
          throw error;
        }
      }
}

export default {createapplication,getallapplications,deleteapplication,getalljobapplications,getjobapplications}
