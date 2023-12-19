import BadRequestError from "../Exceptions/BadRequestError.js"; //importing custom bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js";// importing custom not found error handler
import logger from "../middleware/logger.js"; //importing logger
import CompanyUser from "../models/CompanyUserModel.js";
import Jobapplication from "../models/JobApplicationModel.js"; //importing job application model
import JobPost from "../models/JobPostModel.js"; //importing job post model
import jobseeker from "../models/JobSeekerModel.js"; //importing jobseeker model
import seekerProfile from "../models/JobSeekerProfileModel.js"; ///importing seeker profile model


const getalljobapplications = async()=>{
    try {
        const applications = await Jobapplication.find()
        if (applications) {
            logger.info("all job applications getting successfully")
            return applications
        } else {
            logger.error("error occured in getting all job aplications")
            throw new BadRequestError("error occured in getting all job applications")
        }
    } catch (error) {
        throw error
    }
}


const getjobapplications = async(companyuserid,jobpostid,page,limit)=>{
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
        
                const result = await Jobapplication.find({"job.JobpostId" : existingjobpost._id})
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

//getting all job applications
const getallapplications = async(seekerid)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
                const result = await Jobapplication.find({"applicant.seekerId":existingseeker._id})
                if (result.length>0) {
                    logger.info("successfully getting all job applications")
                    return result
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
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
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
                throw new NotFoundError("job seeker profile not found with specific id")
            }
        } else {
            logger.error("job seeker not found with specific id")
            throw new NotFoundError("job seeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

export default {createapplication,getallapplications,deleteapplication,getalljobapplications,getjobapplications}
