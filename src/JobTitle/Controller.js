import asyncerrorhandler from "../utils/asyncerrorhandler.js"; //importing asynchronous error handler
import service from './Service.js' //importing service

// fetching all skills 
const getalljobtitle = asyncerrorhandler(async(req,res)=>{
    const getjobtitle = await service.getalljobtitle()
    res.status(200).json(getjobtitle)
})
//Create new jobtitle
const createJobTitle=asyncerrorhandler(async(req,res)=>{
    const jobtitledata = req.body
    const  createNewJobTitle= await service.createJobTitle(jobtitledata)
    res.status(201).json(createNewJobTitle)
})

//Delete jobtitle
const deleteJobTitle=asyncerrorhandler(async(req,res)=>
{   const jobtitleid=req.params.id
    await service.deleteJobTitle(jobtitleid)
    res.status(200).json("jobtitle deleted successfully")
})

//update jobtitle
const updateJobTitle=asyncerrorhandler(async(req,res)=>
{   const jobtitleid=req.params.id
    const jobtitledata=req.body
    const jobtitleupdate=await service.updateJobTitle(jobtitleid,jobtitledata)
    res.status(200).json(jobtitleupdate)
})

export default {getalljobtitle,createJobTitle,deleteJobTitle,updateJobTitle}