import service from './service.js' 
import asyncerrorhandler from '../utils/asyncerrorhandler.js'

// fetching all job-categories
const getallcategories = asyncerrorhandler(async (req, res) => {
    const getcategory = await service.getallcategories()
    res.status(200).json(getcategory)
})

//create new job-category
const createcategory = asyncerrorhandler(async (req, res) => {
    const data = req.body
    const createdata = await service.createcategory(data)
    res.status(201).json(createdata)
})

//update job-category with specific id
const updatecategory = asyncerrorhandler(async (req, res) => {
    const categoryid = req.params.id
    const data = req.body
    const updatedata = await service.updatecategory(categoryid, data)
    res.status(200).json(updatedata)
})

//delete job-category with specific id
const deletecategory = asyncerrorhandler(async (req, res) => {
    const categoryid = req.params.id
    await service.deletecategory(categoryid)
    res.status(200).json("job-category deleted successfully")
})

//fetching job-category with specific id
const getcategorybyid = asyncerrorhandler(async (req, res) => {
    const categoryid = req.params.id
    const getbyid = await service.getcategorybyid(categoryid)
    res.status(200).json(getbyid)
})

export default { getallcategories, createcategory, updatecategory, deletecategory, getcategorybyid }