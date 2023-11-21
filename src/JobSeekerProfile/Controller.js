import asyncerrorhandler from "../utils/asyncerrorhandler.js";
import service from './Service.js'

const getallprofiles =asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id
    const allprofiles = await service.getallprofiles(seekerid)
    res.status(200).json(allprofiles)
})

const getprofilebyid =asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id1
    const profileid = req.params.id2
    const profilebyid = await service.getprofilebyid(seekerid,profileid)
    res.status(200).json(profilebyid)
})

const createprofile =asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id
    const profiledata = req.body
    const newprofile = await service.createprofile(seekerid,profiledata)
    res.status(201).json(newprofile)
})

// const profileupdate =asyncerrorhandler(async(req,res)=>{

// })

// const deleteprofile =asyncerrorhandler(async(req,res)=>{

// })


export default { getallprofiles,getprofilebyid,createprofile}