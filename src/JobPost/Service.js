import JobPost from "../models/JobPostModel.js";
import logger from "../middleware/logger.js";
import BadRequestError from "../Exceptions/BadRequestError.js";
import NotFoundError from "../Exceptions/NotFoundError.js";

// creating job post
const addJobPost = async (jobPost) => {
  try {
    const jobs = await JobPost.create(jobPost);
    if (jobs) {
      logger.info("Job Posted Successfully");
      return jobs;
    } else {
      throw new BadRequestError("Error while posting Job");
    }
  } catch (error) {
    throw error;
  }
};

// fetching all job posts
const getAllJobPosts = async () => {
  try {
    const allPosts = await JobPost.find();
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

// Fetching Job Post By ID
const getJobPostsById = async (postId) => {
  try {
    const Job = await JobPost.findById(postId);
    if (Job) {
      logger.info("Job :", Job);
      return Job;
    } else {
      throw new NotFoundError("Job ID Not Found");
    }
  } catch (error) {
    throw new BadRequestError("Error while fetching Job");
  }
};

// Updating Job Post
const updatePost = async (postId) => {
  try {
    const updatePost = await JobPost.findByIdAndUpdate(postId);
    if (updatePost) {
      logger.info("Job Post Updated Successfully");
      return updatePost;
    } else {
      throw new BadRequestError("Error while updating Job Post");
    }
  } catch (error) {
    throw error;
  }
};

// Deleting Job Post
const deletePost = async (postId) => {
  try {
    const deleteJobPost = await JobPost.findByIdAndDelete(postId);
    if (deleteJobPost) {
      logger.info("Job Post Deleted Successfully");
      return deleteJobPost;
    } else {
      throw new NotFoundError("PostId not Found");
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
};
