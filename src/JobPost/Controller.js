import asyncHandler from "../utils/asyncerrorhandler.js";
import jobPostService from "./Service.js";

// creating job post
const createJobPost = asyncHandler(async (req, res) => {
  const companyUser = req.params.companyUserId
  const addPost = req.body;
  const postJob = await jobPostService.addJobPost(companyUser,addPost);
  res.status(201).json(postJob);
});

// Fetching all JobPosts
const getAllJobPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const result = await jobPostService.getAllJobPosts(page , limit);
  res.status(200).json(result);
});

// Fetching Job Post by ID
const getJobPostById = asyncHandler(async (req, res) => {
  const companyUser = req.params.companyUserId;
  const postId = req.params.jobPostId;
  const getJobPost = await jobPostService.getJobPostsById(companyUser,postId);
  res.status(200).json(getJobPost);
});


//counting all jobs
const getTotalJobPosts = asyncHandler(async (req, res) => {
  const totalJobPosts = await jobPostService.countTotalJobPosts();
  res.status(200).json({ totalJobPosts });
})


// Updating Job Post
const updateJobPost = asyncHandler(async (req, res) => {
  const postId = req.params.jobPostId;
  const companyUser = req.params.companyUserId
  const updateData = req.body;
  const updatePost = await jobPostService.updatePost(postId, companyUser, updateData);
  res.status(200).json(updatePost);
});

// Deleting Job Post
const deleteJobPost = asyncHandler(async (req, res) => {
  const companyUser = req.params.companyUserId
  const postId = req.params.jobPostId;
  const deletePost = await jobPostService.deletePost(postId,companyUser);
  res.status(202).json(deletePost);
});

export default {
  getAllJobPosts,
  getJobPostById,
  createJobPost,
  updateJobPost,
  deleteJobPost,
  getTotalJobPosts ,
};
