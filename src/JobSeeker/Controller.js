import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler


//get all job seekers
const getallseekers = asyncerrorhandler(async(req,res)=>{
    const page =  parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const allseekers = await service.getallseekers(page,limit)
    res.status(200).json(allseekers)
})

//get job seeker by specific id
const getseekerbyid = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id
    const seekerbyid = await service.getseekerbyid(seekerid)
    res.status(200).json(seekerbyid)
})

//create new job seeker
const createseeker = asyncerrorhandler(async(req,res)=>{
  const seekerdata = req.body 
  const create = await service.createseeker(seekerdata)
  res.status(201).json(create) 
})

//update job seeker by specific id
const updateseeker = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id
    const seekerdata = req.body
    const update = await service.updateseeker(seekerid,seekerdata)
    res.status(200).json(update)
})

// delete job seeker with specific id
const deleteseeker = asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id
    await service.deleteseeker(seekerid)
    res.status(200).json("job seeker deleted successfully")
})

// Login Seeker
const loginJobSeeker = asyncerrorhandler ( async ( req , res ) => {
    res.status(200).json("Login Successfull")
})

export default {getallseekers,getseekerbyid,createseeker,updateseeker,deleteseeker,loginJobSeeker}