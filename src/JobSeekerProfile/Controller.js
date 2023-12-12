import asyncerrorhandler from "../utils/asyncerrorhandler.js"; //importing asynchronous error handler
import service from './Service.js' //importing service



const addskill  = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const profileid = req.params.id2
    const skilldata = req.body
    const addskills = await  service.addskill(seekerid,profileid,skilldata)
    res.status(201).json(addskills)
})

const getallprofile = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const profileid = req.params.id2
    const getprofile = await service.getallprofile(seekerid,profileid)
    res.status(200).json(getprofile)
})
//create new job seeker profile
const createprofile =asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const profileid = req.params.id2
    const profiledata = req.body
    const newprofile = await service.createprofile(seekerid,profiledata,profileid)
    res.status(201).json(newprofile)
})

//update job seeker profile
const profileupdate =asyncerrorhandler(async(req,res)=>{
        const seekerid = req.params.id1
        const profileid = req.params.id2
        const updatedata = req.body
        const updateprofile = await service.profileupdate(seekerid,profileid,updatedata,req)
        res.status(200).json(updateprofile)
})

const resumeupload = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const profileid = req.params.id2
    await service.resumeupload(req,seekerid,profileid);
    res.status(201).json({ message: "Resume uploaded successfully" });
})

//delete job seeker profile
const deleteprofile =asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const profileid = req.params.id2
    await service.deleteprofile(seekerid,profileid)
    res.status(200).json("seeker profile deleted successfully")
})


export default {createprofile,profileupdate,deleteprofile,resumeupload,getallprofile,addskill}