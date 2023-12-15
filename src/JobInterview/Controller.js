import asyncHandler from "../utils/asyncerrorhandler.js";
import jobInterviewService from "./Service.js"


// GetAllJobInterviews
const getAllJobInterview = asyncHandler( async(req , res) => {
    const data = await jobInterviewService.getAllJobInterview()
    res.status(200).json(data)

})


// Adding JobInterview
const addJobInterview = asyncHandler( async(req , res) => {
    const jobPost = req.params.jobPostId;
    const seeker = req.params.jobSeekerId;
    const application = req.params.jobApplicationId
    const data = req.body;
    const interview = await jobInterviewService.addJobInterview(jobPost,seeker,application,data);
    res.status(201).json(interview)

})

const deleteJobInterview  = asyncHandler( async(req , res) => {
    const JobInterviewID = req.params.id;
    const deleteInterview = await jobInterviewService.deleteJobInterview(JobInterviewID);
    res.status(200).json(deleteInterview)
})

export default {getAllJobInterview , addJobInterview , deleteJobInterview}