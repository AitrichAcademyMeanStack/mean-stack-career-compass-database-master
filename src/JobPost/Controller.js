import asyncHandler from "../utils/asyncerrorhandler.js";
import jobPostService from "./Service.js";

// creating job post
const createJobPost = asyncHandler(async (req, res) => {
  const companyUser = req.params.companyUserId
  const addPost = req.body;
  const postJob = await jobPostService.addJobPost(addPost,companyUser);
  res.status(201).json(postJob);
});

// Fetching all JobPosts
const getAllJobPosts = asyncHandler(async (req, res) => {
  const result = await jobPostService.getAllJobPosts();
  res.status(200).json(result);
});

// Fetching Job Post by ID
const getJobPostById = asyncHandler(async (req, res) => {
  const companyUser = req.params.companyUserId
  const postId = req.params.jobPosts;
  const getJobPost = await jobPostService.getJobPostsById(postId,companyUser);
  res.status(200).json(getJobPost);
});

// Updating Job Post
const updateJobPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const updateData = req.body;
  const updatePost = await jobPostService.updatePost(postId, updateData);
  res.status(200).json(updatePost);
});

// Deleting Job Post
const deleteJobPost = asyncHandler(async (req, res) => {
  const companyUser = req.params.companyUserId
  const postId = req.params.jobPosts;
  const deletePost = await jobPostService.deletePost(postId,companyUser);
  res.status(200).json(deletePost);
});

export default {
  getAllJobPosts,
  getJobPostById,
  createJobPost,
  updateJobPost,
  deleteJobPost,
};
