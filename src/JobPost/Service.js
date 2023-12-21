import JobPost from "../models/JobPostModel.js";
import logger from "../middleware/logger.js";
import BadRequestError from "../Exceptions/BadRequestError.js";
import NotFoundError from "../Exceptions/NotFoundError.js";
import CompanyUser from "../models/CompanyUserModel.js";

// creating job post
const addJobPost = async (companyUserId,jobPost) => {
  try {
    const companyUser = await CompanyUser.findById(companyUserId)
    if (companyUser) {
      jobPost.company = {
        companyId: companyUser._id,
        legalName: companyUser.legalName,
        summary: companyUser.summary,
        industry: companyUser.industry,
        email: companyUser.email,
        phone: companyUser.phone,
        address: companyUser.address,
        website: companyUser.website,
        location: companyUser.location,
      }
      const jobs = await JobPost.create(jobPost);
      if (jobs) {
        logger.info("Job Posted Successfully");
        return jobs;
      } else {
        throw new BadRequestError("Error while posting Job");
      }  
    }else {
      throw new NotFoundError("CompanyUser not found")
    }
  } catch (error) {
    throw error;
  }
};

// fetching all job posts
const getAllJobPosts = async (page , limit) => {
  try {
    const perPage = limit;
    const totalPost = await JobPost.countDocuments();
    const totalPages = Math.ceil(totalPost / perPage)

    if (page > totalPages) {
      logger.error("Page not found")
      throw new NotFoundError("Page not found")
    }

    const allPosts = await JobPost.find().skip((page - 1) * perPage).limit(perPage).exec();
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
      return totalJobPosts[0].total;
    } else {
      return 0;
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
  try {
    const companyUser = await CompanyUser.findById(companyUserId);
    if (companyUser) {
      const job = await JobPost.findById(postId)
      if (job) {
        const updatePost = await JobPost.findByIdAndUpdate(postId, updateData);
        if (updatePost) {
          logger.info("Job Post Updated Successfully");
          return updatePost;
        } else {
          throw new BadRequestError("Error while updating Job Post");
        }
      }else {
        throw new NotFoundError("JobPost not found with specific ID")
      }
    }else {
      logger.error("Company User not found")
      throw new NotFoundError("Company User not found")
    }
  } catch (error) {
    throw error;
  }
};

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
