import asyncHandler from "../utils/asyncerrorhandler.js";
import jobInterviewService from "./Service.js"


// GetAllJobInterviews
const getAllJobInterview = asyncHandler( async(req , res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const data = await jobInterviewService.getAllJobInterview(page , limit)
    res.status(200).json(data)

})


// Adding JobInterview
const addJobInterview = asyncHandler( async(req , res) => {
    const application = req.params.jobApplicationId
    const data = req.body;
    const interview = await jobInterviewService.scheduleInterview(application,data);
    res.status(201).json(interview)

})

const deleteJobInterview  = asyncHandler( async(req , res) => {
    const application = req.params.jobApplicationId
    const JobInterviewID = req.params.jobInterviewId;
    const deleteInterview = await jobInterviewService.deleteJobInterview(application,JobInterviewID);
    res.status(200).json(deleteInterview)
})

export default {getAllJobInterview , addJobInterview , deleteJobInterview}