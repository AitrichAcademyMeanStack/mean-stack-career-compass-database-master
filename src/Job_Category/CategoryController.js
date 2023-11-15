import service from './Service.js'
import asyncerrorhandler from '../utils/Asyncerrorhandler.js'

const getallcategories = asyncerrorhandler(async(req,res)=>{
    const getcategory = await service.getallcategories()
    res.status(200).json(getcategory)
})

const createcategory = asyncerrorhandler(async(req,res)=>{
    const data = req.body
    const createdata = await service.createcategory(data)
    res.status(201).json(createdata)
})

const updatecategory = asyncerrorhandler(async(req,res)=>{
    const categoryid = req.params.id
    const data = req.body
    await service.updatecategory(categoryid,data)
    res.status(200).json("job-category updated successfully")
})

const deletecategory = asyncerrorhandler(async(req,res)=>{
    const categoryid = req.params.id
    await service.deletecategory(categoryid)
    res.status(200).json("job-category deleted successfully")

})

const getcontrollerbyid = asyncerrorhandler(async(req,res)=>{
    const categoryid = req.params.id
    const getbyid = await service.getcontrollerbyid(categoryid)
    res.status(200).json(getbyid)
})

export default  {getallcategories,createcategory,updatecategory,deletecategory,getcontrollerbyid}