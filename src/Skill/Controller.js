import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler

//fetching all skills
// const getallskills = asyncerrorhandler(async(req,res)=>{
//     const skillkey = req.params.key
//     const getskills = await service.getallskills(skillkey)
//     res.status(200).json(getskills)
// })

const getskills = asyncerrorhandler(async(req,res)=>{
    const getallskills = await service.getskills()
    res.status(200).json(getallskills)
})

const getselectedskills = asyncerrorhandler(async(req,res)=>{
    const getallselectedskills = await service.getselectedskills()
    res.status(200).json(getallselectedskills)
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

const selectedskills = asyncerrorhandler(async(req,res)=>{
    const skillid = req.params.id
    await service.selectedskills(skillid)
    res.status(201).json("skills are selected")
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


export default {getskillbyid,createskill,updateskill,deleteskill,getskills,selectedskills,getselectedskills}