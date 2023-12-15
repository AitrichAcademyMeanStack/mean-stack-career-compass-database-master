import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler


//getting all job applications
const getallapplications = asyncerrorhandler(async(req,res)=>{
    const profileid = req.params.profileid
    const jobpostid = req.params.jobpostid
    const result = await service.getallapplications(profileid,jobpostid)
    res.status(200).json(result)
})

//deleting job application with specific id
const deleteapplication = asyncerrorhandler(async(req,res)=>{
    const profileid = req.params.profileid
    const jobpostid = req.params.jobpostid
    const applicationid = req.params.applicationid
    await service.deleteapplication(profileid,jobpostid,applicationid)
    res.status(200).json("job application deleted successfully")
})

//adding new job application
const createapplication = asyncerrorhandler(async(req,res)=>{
    const profileid = req.params.profileid
    const jobpostid = req.params.jobpostid
    const applicationdata = req.body
    const result = await service.createapplication(profileid,jobpostid,applicationdata)
    res.status(200).json(result)
})

export default {getallapplications,deleteapplication,createapplication}