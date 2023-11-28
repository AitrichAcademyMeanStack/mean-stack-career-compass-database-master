import asyncerrorhandler from "../utils/asyncerrorhandler.js"; //importing asynchronous error handler
import service from './Service.js' //importing service

//get all work experience
const getallexp = asyncerrorhandler(async(req,res)=>{
    const getexp = await service.getallexp()
    res.status(200).json(getexp)
})

//get work experience with specific id
const getexpbyid = asyncerrorhandler(async(req,res)=>{
    const experienceid = req.params.id
    const getexp = await service.getexpbyid(experienceid)
    res.status(200).json(getexp)
})

//create new work experience
const createexp = asyncerrorhandler(async(req,res)=>{
    const experiencedata = req.body
    const expcreate = await service.createexp(experiencedata,req)
    res.status(201).json(expcreate)
})

// update work experience
const updateexp = asyncerrorhandler(async(req,res)=>{
    const experienceid = req.params.id
    const experiencedata = req.body
    const expupdate = await service.updateexp(experienceid,experiencedata)
    res.status(200).json(expupdate)
})

// delete work experience
const deleteexp = asyncerrorhandler(async(req,res)=>{
    const experienceid = req.params.id
    await service.deleteexp(experienceid)
    res.status(200).json("work experience deleted successfully")
})


export default {getallexp,getexpbyid,createexp,updateexp,deleteexp}