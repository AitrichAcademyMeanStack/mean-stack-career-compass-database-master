import JobInterview from "../models/JobInterviewModel.js"
import logger from "../middleware/logger.js"
import BadRequestError from "../Exceptions/BadRequestError.js"
import NotFoundError from "../Exceptions/NotFoundError.js"
import Jobapplication from "../models/JobApplicationModel.js"

// Scheduling Job Interview
const scheduleInterview = async(application,data) => {
    try {
                const jobApplication = await Jobapplication.findById(application)
                if (jobApplication) {
                    data.job = {
                        jobTitle:jobApplication.job.jobTitle,
                        jobSummary:jobApplication.job.jobSummary,
                        jobLocation:jobApplication.job.jobLocation[0],
                        company:jobApplication.job.company,
                        category:jobApplication.job.category[0],
                        qualifications:jobApplication.job.qualifications[0],
                        skills:jobApplication.job.skills[0],
                        industry:jobApplication.job.industry[0],
                        jobResponsibilities:jobApplication.job.jobResponsibilities[0],
                        postedBy:jobApplication.job.postedBy,
                        postedDate:jobApplication.job.postedDate
                    }            
                    data.interviewee  = {
                        firstName: jobApplication.applicant.firstName,
                        lastName: jobApplication.applicant.lastName,
                        userName: jobApplication.applicant.userName,
                        email: jobApplication.applicant.email,
                        phone: jobApplication.applicant.phone
                    }
                    data.jobApplication = {
                        job: jobApplication.job,
                        applicant: jobApplication.applicant,
                        resume: jobApplication.resume,
                        coverLetter: jobApplication.coverletter,
                        dateSubmitted: jobApplication.datesubmitted,
                        status: jobApplication.status
                    }
                    data.scheduledBy = jobApplication.job.postedBy
                    
                    const addInterview = await JobInterview.create(data)
                    if(addInterview){
                        logger.info("Interview Added")
                        return addInterview
                    }else {
                        throw new BadRequestError("Error while Adding Job Intervie")
                    }   
                }
            
    } catch (error) {
        throw error
    }
}

// Fetching all JobInterview
const getAllJobInterview = async(page , limit) => {
    try {
        const totalPost = await JobInterview.countDocuments()
        const totalPages = Math.ceil(totalPost/limit)
        if (page > totalPages) {
            logger.error("Page not  found")
            throw new NotFoundError("page not found")
        }
        const data = await JobInterview.find().skip((page - 1) * limit).limit(limit).exec()
        if (data) {
            return data
        }else {
            throw new BadRequestError("Error while fetching JobInterview")
        }
    } catch (error) {
        throw error
    }
}

// Deleting JobInterview
const deleteJobInterview = async(applicationId,jobIntervieId) => {
    try {
        const application = await Jobapplication.findById(applicationId)
        if (application) {
            const deleteInterview = await JobInterview.findByIdAndDelete(jobIntervieId)
            if (deleteInterview) {
                return deleteInterview
            }else{
                throw new NotFoundError("ID Not found")
            }    
        }else {
            logger.error("JobApplication ID Not Found")
            throw new NotFoundError("JobApplication ID Not Found")
        }
    } catch (error) {
        throw error
    }
}

export default {scheduleInterview, getAllJobInterview , deleteJobInterview}