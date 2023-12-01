import asyncHandler from "../utils/asyncerrorhandler";
import jobInterviewService from "./Service.js"


// GetAllJobInterviews
const getAllJobInterview = asyncHandler( async(req , res) => {
    const data = await jobInterviewService.getAllJobInterview()
    res.status(200).json(data)

})


// Adding JobInterview
const addJobInterview = asyncHandler( async(req , res) => {
    const data = req.body
    const interview = await jobInterviewService.addJobInterview(data);
    res.status(201).json(interview)

})

const deleteJobInterview  = asyncHandler( async(req , res) => {
    const JobInterviewID = req.params.id;
    const deleteInterview = await jobInterviewService.deleteJobInterview(JobInterviewID);
    res.status(200).json(deleteInterview)
})

export default {getAllJobInterview , addJobInterview}