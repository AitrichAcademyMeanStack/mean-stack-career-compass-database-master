import asyncerrorhandler from "../utils/asyncerrorhandler.js"; //importing asynchronous error handler
import service from './Service.js' //importing service

//create saved jobs
const createsavedjobs = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const jobpostid = req.params.id2
    const savedjobdata = req.body
    const newsavedjob = await service.createsavedjobs(seekerid,savedjobdata,jobpostid)
    res.status(201).json(newsavedjob)
})

// get all saved jobs
const getallsavedjobs = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const jobpostid = req.params.id2
    const getsavedjob = await service.getallsavedjobs(seekerid,jobpostid)
    res.status(200).json(getsavedjob)
})

//deleting saved jobs
const deletesavedjobs = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const jobpostid = req.params.id2
    const savedjobid = req.params.id3
    await service.deletesavedjobs(seekerid,savedjobid,jobpostid)
    res.status(200).json("Saved Job deleted successfully")
})


export default {createsavedjobs,getallsavedjobs,deletesavedjobs}