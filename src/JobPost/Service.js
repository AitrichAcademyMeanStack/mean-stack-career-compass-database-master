import JobPost from "../models/JobPostModel.js";
import logger from "../middleware/logger.js";
import BadRequestError from "../Exceptions/BadRequestError.js";
import NotFoundError from "../Exceptions/NotFoundError.js";
import CompanyUser from "../models/CompanyUserModel.js";
import ValidationError from "../Exceptions/ValidationError.js";
import InternalServerError from "../Exceptions/InternalServerError.js"
import { jobPostvalidation } from "../middleware/Validation/JobpostValidation.js";
import JobTitle from "../models/JobTitle.js";
import Jobapplication from "../models/JobApplicationModel.js";
import savedjobs from "../models/SavedJobsModel.js";
import location from "../models/LocationModel.js";
import skill from "../models/SkillModel.js";


// creating job post
const addJobPost = async (companyUserId, jobPost) => {
  try {
    await jobPostvalidation.validateAsync(jobPost);
    const companyUser = await CompanyUser.findById(companyUserId);

    if (companyUser) {
      // Find the JobTitle document based on the selected name
      const jobTitle = await JobTitle.findOne({ name: jobPost.jobTitle });
      const joblocation=await location.findOne({name:jobPost.jobLocation})
      const skilldata = await skill.findOne({name:jobPost.skills})
      if (jobTitle && joblocation && skilldata) {
      
        // Embedding JobProviderCompany
        jobPost.company = {
          companyId: companyUser.company.companyId,
          legalName: companyUser.company.legalName,
          summary: companyUser.company.summary,
          industry: companyUser.company.industry,
          email: companyUser.company.email,
          phone: companyUser.company.phone,
          address: companyUser.company.address,
          website: companyUser.company.website,
          location: companyUser.company.location,
        };

        // Embedding CompanyUser
        jobPost.postedBy = {
          companyuserId: companyUser._id,
          firstName: companyUser.firstName,
          role: companyUser.role,
          lastName: companyUser.lastName,
          userName: companyUser.userName,
          email: companyUser.email,
        };

        // Assign the ObjectId of the found JobTitle
        jobPost.jobTitle = {
          Titleid: jobTitle._id,
          name:jobTitle.name
        }
        jobPost.jobLocation={
          locationId:joblocation._id,
          name:joblocation.name
        }

        jobPost.skills = {
          _id : skilldata._id,
          name: skilldata.name
        }

        const createdJobPost = await JobPost.create(jobPost);
        if (createdJobPost) {
          logger.info("Job Posted Successfully");
          return createdJobPost;
        } else {
          throw new BadRequestError("Error while posting Job");
        }
      } else {
        throw new NotFoundError("error in found common datas");
      }
    } else {
      throw new NotFoundError("CompanyUser not found");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      logger.error(`Validation error: ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};


// fetching all job posts
const getAllJobPosts = async (page, limit, jobtitle, sortOrder) => {
  try {
    let query = {};
    if (jobtitle) {
      query = {
        $or: [
          { jobTitle: { $regex: new RegExp(jobtitle, 'i') } }
        ]
      };
    }

    const perPage = limit;
    const totalPost = await JobPost.countDocuments();
    const totalPages = Math.ceil(totalPost / perPage);

    if (page > totalPages) {
      logger.error("Page not found");
      throw new NotFoundError("Page not found");  
    }

    const sortOption = sortOrder === 'oldest' ? { postedDate: 1 } : { postedDate: -1 };

    const allPosts = await JobPost
      .find(query)
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (allPosts) {
      logger.info("List of Job Posts");
      return allPosts;
    } else {
      throw new BadRequestError("Error while fetching job posts");
    }
  } catch (error) {
    throw error;
  }
};



// count total job posts
const countTotalJobPosts = async () => {
  try {
    const totalJobPosts = await JobPost.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ]);

    if (totalJobPosts.length > 0) {
      logger.info("successfully getting all count of jobposts")
      return totalJobPosts[0].total;
    } else {
      logger.error("error occured in getting all jobposts count")
    }
  } catch (error) {
    throw error;
  }
};



// Fetching Job Post By ID
const getJobPostsById = async (companyUserId,postId) => {
  try {
    const companyUser = await CompanyUser.findById(companyUserId)
    console.log(companyUser);
    if (companyUser) {
      const Job = await JobPost.findById(postId);
      if (Job) {
        logger.info("Job :", Job);
        return Job;
      } else {
        throw new NotFoundError("Job ID Not Found");
      }
    }else {
      throw new NotFoundError("Company User not found")
    }
  } catch (error) {
    throw new BadRequestError("Error while fetching Job");
  }
};

// Updating Job Post
const updatePost = async (postId,companyUserId,updateData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const companyUser = await CompanyUser.findById(companyUserId);
    if (companyUser) {
      const job = await JobPost.findById(postId);
      if (job) {
        const jobtitle = await JobTitle.findOne({name:updateData.jobTitle})
        const joblocation=await location.findOne({name:updateData.jobLocation})
        const skilldata = await skill.findOne({name:updateData.skills})
        if (jobtitle && joblocation && skilldata) {
          updateData.jobTitle = {
            Titleid: jobtitle._id,
            name:jobtitle.name
          }
          updateData.jobLocation={
            locationId:joblocation._id,
            name:joblocation.name
          }
          updateData.skills = {
            skillid : skilldata._id,
            name: skilldata.name
          }
          const updatePost = await JobPost.findByIdAndUpdate(postId, updateData);
          if (updatePost) {
            const jobapply=await Jobapplication.updateMany(
            {'job.JobpostId':postId},
            {$set:updateData},
            {new:true},
            {session});
          logger.console('job apply update successfully')

          if(jobapply)
          {
            const savjobed= await savedjobs.updateMany(
            {
              $set: {
                'Jobapplication.jobTitle': updateData.jobTitle,
                'Jobapplication.jobTitle': updateData.jobTitle,
                'Jobapplication.jobTitle': updateData.jobTitle,
                'Jobapplication.jobTitle': updateData.jobTitle,
                'Jobapplication.jobTitle': updateData.jobTitle,
                'Jobapplication.jobTitle': updateData.jobTitle,
              

              }
            },
            {session})
          }
            
          } else {
            throw new BadRequestError("Error while updating Job Post");
          }
        }else{
          throw new NotFoundError(`JobTitle not found with name: ${updateData.jobTitle}`);
        }
      }else {
        throw new NotFoundError("JobPost not found with specific ID")
      }
    }else {
      logger.error("Company User not found")
      throw new NotFoundError("Company User not found")
    }
  } catch (error) {
    logger.error("Error while updating job:", error);
   throw error
}
}
// Deleting Job Post
const deletePost = async (postId,companyUserId) => {
  try {
    const companyUser = await CompanyUser.findById(companyUserId)
    if (companyUser) {
      const deleteJobPost = await JobPost.findByIdAndDelete(postId);
      if (deleteJobPost) {
        logger.info("Job Post Deleted Successfully");
        return deleteJobPost;
      } else {
        throw new NotFoundError("PostId not Found");
      }   
    }else {
      throw new NotFoundError("CompanyUser not found")
    }
  } catch (error) {
    throw error;
  }
};

export default {
  addJobPost,
  getAllJobPosts,
  getJobPostsById,
  updatePost,
  deletePost,
  countTotalJobPosts,
};
