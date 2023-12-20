import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler


const getalljobapplications = asyncerrorhandler(async (req, res) => {
  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;   
    const result = await service.getalljobapplications( page, limit);  
    res.status(200).json(result);
});



const getallapplications = asyncerrorhandler(async (req, res) => {
    const seekerid = req.params.seekerid;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;   
    const result = await service.getallapplications(seekerid, page, limit);  
    res.status(200).json(result);
});








//deleting job application with specific id
const deleteapplication = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.seekerid
    const applicationid = req.params.applicationid
    await service.deleteapplication(seekerid,applicationid)
    res.status(200).json("job application deleted successfully")
})

//adding new job application
const createapplication = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.seekerid
    const profileid = req.params.profileid
    const jobpostid = req.params.jobpostid
    const applicationdata = req.body
    const result = await service.createapplication(seekerid,profileid,jobpostid,applicationdata)
    res.status(200).json(result)
})

export default {getallapplications,deleteapplication,createapplication,getalljobapplications}