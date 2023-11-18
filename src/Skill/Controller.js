import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler

//fetching all skills
const getallskills = asyncerrorhandler(async(req,res)=>{
    const getskills = await service.getallskills()
    res.status(200).json(getskills)
})

//fetching skill by specific id
const getskillbyid = asyncerrorhandler(async(req,res)=>{
    const skillid = req.params.id
    const getbyid = await service.getskillbyid(skillid)
    res.status(200).json(getbyid)
})

//create new skill
const createskill = asyncerrorhandler(async(req,res)=>{
    const skilldata = req.body
    const create = await service.createskill(skilldata)
    res.status(201).json(create)
})

//update skill
const updateskill = asyncerrorhandler(async(req,res)=>{
    const skillid = req.params.id
    const skilldata = req.body
    const updation = await service.updateskill(skillid,skilldata)
    res.status(200).json(updation)
})

//delete skill
const deleteskill = asyncerrorhandler(async(req,res)=>{
    const skillid = req.params.id
    await service.deleteskill(skillid)
    res.status(200).json("skill deleted successfully")
})


export default {getallskills,getskillbyid,createskill,updateskill,deleteskill}