import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler


//getting all job applications
const getallapplications = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const result = await service.getallapplications(seekerid)
    res.status(200).json(result)
})

//deleting job application with specific id
const deleteapplication = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const applicationid = req.params.id2
    await service.deleteapplication(seekerid,applicationid)
    res.status(200).json("job application deleted successfully")
})

//adding new job application
const createapplication = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const jobpostid = req.params.id2
    const applicationdata = req.body
    const result = await service.createapplication(seekerid,jobpostid,applicationdata)
    res.status(200).json(result)
})

export default {getallapplications,deleteapplication,createapplication}