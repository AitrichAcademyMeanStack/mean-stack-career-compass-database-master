import JobInterview from "../models/JobInterviewModel.js"
import logger from "../middleware/logger.js"
import BadRequestError from "../Exceptions/BadRequestError.js"
import NotFoundError from "../Exceptions/NotFoundError.js"
import JobPost from "../models/JobPostModel.js"
import jobseeker from "../models/JobSeekerModel.js"
import Jobapplication from "../models/JobApplicationModel.js"

// Adding Job Interview
const addJobInterview = async(postId,seeker,application,data) => {
    try {
        const jobPost = await JobPost.findById(postId)
        if (jobPost) {
            data.job = {
                jobTitle: jobPost.jobTitle,
                jobSummary: jobPost.jobSummary,
                jobLocation: jobPost.jobLocation,
                company:jobPost.company,
                category:jobPost.category,
                qualifications:jobPost.qualifications,
                skills: jobPost.skills,
                industry:jobPost.industry,
                jobResponsibilities:jobPost.jobResponsibilities,
                postedBy: jobPost.postedBy,
                postedDate: jobPost.postedDate
            }
            const jobSeeker = await jobseeker.findById(seeker)
            if (jobSeeker) {
                data.interviewee = {
                    firstName: jobSeeker.firstName,
                    lastName: jobSeeker.lastName,
                    userName: jobSeeker.userName,
                    email: jobSeeker.email,
                    phone:jobSeeker.phone
                }
                const jobApplication = await Jobapplication.findById(application)
                if (jobApplication) {
                    data.jobApplication = {
                        job: jobApplication.job,
                        applicant: jobApplication.applicant,
                        resume: jobApplication.resume,
                        coverLetter: jobApplication.coverletter,
                        dateSubmitted: jobApplication.datesubmitted,
                        status: jobApplication.status
                    }
                    const addInterview = await JobInterview.create(data)
                    if(addInterview){
                        logger.info("Interview Added")
                        return addInterview
                    }else {
                        throw new BadRequestError("Error while Adding Job Intervie")
                    }   
                }
            }
        }else {
            throw new NotFoundError("JobPost not found")
        }
    } catch (error) {
        throw error
    }
}

// Fetching all JobInterview
const getAllJobInterview = async() => {
    try {
        const data = await JobInterview.find()
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
const deleteJobInterview = async(id) => {
    try {
        const deleteInterview = await JobInterview.findByIdAndDelete(id)
        if (deleteInterview) {
            return deleteInterview
        }else{
            throw new NotFoundError("ID Not found")
        }
    } catch (error) {
        throw error
    }
}

export default {addJobInterview, getAllJobInterview , deleteJobInterview}