import asyncerrorhandler from "../utils/asyncerrorhandler.js"; //importing asynchronous error handler
import service from './Service.js' //importing service


//add skills to profile
const addskill  = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.seekerid
    const profileid = req.params.profileid
    const skillNames = req.body
    const addskills = await service.addskill(seekerid,profileid,skillNames)
    res.status(200).json(addskills)
})

//add profile name to seeker profile
const addprofilename = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.seekerid
    const profileid = req.params.profileid
    const profilenamedata = req.body
    const newprofilename = await service.addprofilename(seekerid,profileid,profilenamedata)
    res.status(200).json(newprofilename)
})

//get all profiles
const getallprofile = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const profileid = req.params.id2
    const getprofile = await service.getallprofile(seekerid,profileid)
    res.status(200).json(getprofile)
})

//updatequalification
const qualificationupdate=asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    const qualificationdata=req.body
    const updatequalification=await service.qualificationupdate(seekerid,profileid,qualificationdata)
    res.status(200).json(updatequalification)
})

//update profile summary
const updateprofilesummary= asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    const summarydata=req.body
    const  updateprofilesummary=await service.updateprofilesummary(seekerid,profileid,summarydata)
    res.status(200).json(updateprofilesummary)
})

//upload resume
const resumeupload = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.seekerid
    const profileid = req.params.profileid
    await service.resumeupload(req,seekerid,profileid);
    res.status(201).json({ message: "Resume uploaded successfully" });
})

const addprofilepicture = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.seekerid
    const profileid = req.params.profileid
    await service.addprofilepicture(req,seekerid,profileid);
    res.status(201).json({ message: "Profile Picture uploaded successfully" });
})


//update work experience
const addworkexperience = asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    const experiencedata =  req.body
    const newexperience = await  service.addworkexperience(seekerid,profileid,experiencedata) 
    res.status(200).json(newexperience)
})

const deleteskills = asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    const skillname = req.params.skillname
    await service.deleteskills(seekerid,profileid,skillname)
    res.status(202).json("skill deleted successfully")
})

const deletequalification = asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    const qualificationid = req.params.qualificationid
    await service.deletequalification(seekerid,profileid,qualificationid)
    res.status(202).json("qualification deleted successfully")
})

const deleteworkexperience = asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    const workexpid = req.params.workexperienceid
    await service.deleteworkexperience(seekerid,profileid,workexpid)
    res.status(202).json("workexperience deleted successfully")
})

const deleteresume = asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    await service.deleteresume(seekerid,profileid)
    res.status(202).json("Resume deleted successfully")
})

const deleteprofilepictre = asyncerrorhandler(async(req,res)=>{
    const seekerid=req.params.seekerid
    const profileid=req.params.profileid
    await service.deleteprofilepictre(seekerid,profileid)
    res.status(202).json("profile picture deleted successfully")
})


export default {resumeupload,
    getallprofile,
    addskill,
    qualificationupdate,
    addprofilename,
    updateprofilesummary,
    addworkexperience,
    deleteskills,
    addprofilepicture,
    deletequalification,
    deleteworkexperience,
    deleteresume,
    deleteprofilepictre
}
