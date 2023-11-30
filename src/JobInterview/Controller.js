import asyncHandler from "../utils/asyncerrorhandler";



const getJobInterview = asyncHandler( async(req , res) => {
    
})



// Adding JobInterview
const addJobInterview = asyncHandler( async(req , res) => {
    const data = req.body
    const interview = await jobInterviewService.addJobInterview(data);
    res.status(201).json(interview)

})