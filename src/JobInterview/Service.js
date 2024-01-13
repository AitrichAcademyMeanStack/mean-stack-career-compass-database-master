import JobInterview from "../models/JobInterviewModel.js";
import logger from "../middleware/logger.js";
import BadRequestError from "../Exceptions/BadRequestError.js";
import NotFoundError from "../Exceptions/NotFoundError.js";
import Jobapplication from "../models/JobApplicationModel.js";
import { interviewValidation } from "../middleware/Validation/JobInterviewValidation.js";
import ValidationError from "../Exceptions/ValidationError.js"

// Scheduling Job Interview
const scheduleInterview = async (applicationId, data) => {
  try {

    await interviewValidation.validateAsync(data);
    const jobApplication = await Jobapplication.findById(applicationId);

    if (jobApplication) {
      // Embedding Job
      data.job = {
        JobpostId: jobApplication.job.JobpostId,
        jobTitle: jobApplication.job.jobTitle,
        jobSummary: jobApplication.job.jobSummary,
        jobLocation: jobApplication.job.jobLocation,
        company: jobApplication.job.company,
        category: jobApplication.job.category,
        qualifications: jobApplication.job.qualifications,
        skills:jobApplication.job.skills,
        industry: jobApplication.job.industry,
        jobResponsibilities: jobApplication.job.jobResponsibilities,
        postedBy:jobApplication.job.postedBy,
        postedDate: jobApplication.job.postedDate,
      }

      // Embedding Interviewee
      data.interviewee = {
        seekerId: jobApplication.applicant.seekerId,
        firstName: jobApplication.applicant.firstName,
        lastName: jobApplication.applicant.lastName,
        userName: jobApplication.applicant.userName,
        email: jobApplication.applicant.email,
        phone: jobApplication.applicant.phone,
      };

      // Embedding JobApplication
      data.jobApplication = {
        jobApplicationId: jobApplication._id,
        job: jobApplication.job,
        applicant: jobApplication.applicant,
        resume: jobApplication.resume,
        coverLetter: jobApplication.coverletter,
        dateSubmitted: jobApplication.datesubmitted,
        status: jobApplication.status,
      };

      // Embedding CompanyUser
      data.scheduledBy = jobApplication.job.postedBy = {
        companyuserId:jobApplication.job.postedBy.companyuserId,
        firstName: jobApplication.job.postedBy.firstName,
        role:jobApplication.job.postedBy.role,
        lastName: jobApplication.job.postedBy.lastName,
        userName:jobApplication.job.postedBy.userName,
        email: jobApplication.job.postedBy.email
      }

      const scheduleInterview = await JobInterview.create(data);
      if (scheduleInterview) {
        logger.info("Interview Scheduled Succueesfully");
        return scheduleInterview;
      } else {
        throw new BadRequestError("Error while Adding Job Intervie");
      }
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      logger.error(`validaion error : ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

// Fetching all JobInterview
const getAllJobInterview = async (page, limit) => {
  try {
    const totalPost = await JobInterview.countDocuments();
    const totalPages = Math.ceil(totalPost / limit);
    if (page > totalPages) {
      logger.error("Page not  found");
      throw new NotFoundError("page not found");
    }
    const data = await JobInterview.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (data) {
      return data;
    } else {
      throw new BadRequestError("Error while fetching JobInterview");
    }
  } catch (error) {
    throw error;
  }
};

// Deleting JobInterview
const deleteJobInterview = async (applicationId, jobIntervieId) => {
  try {
    const application = await Jobapplication.findById(applicationId);
    if (application) {
      const deleteInterview = await JobInterview.findByIdAndDelete(
        jobIntervieId
      );
      if (deleteInterview) {
        return deleteInterview;
      } else {
        throw new NotFoundError("ID Not found");
      }
    } else {
      logger.error("JobApplication ID Not Found");
      throw new NotFoundError("JobApplication ID Not Found");
    }
  } catch (error) {
    throw error;
  }
};

export default { scheduleInterview, getAllJobInterview, deleteJobInterview };
