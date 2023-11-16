import Category from '../models/JobCategoryModel.js'
import logger from '../middleware/logger.js'

// fetching all job-categories
const getallcategories =async()=>{
    try {
        const result = await Category.find()
        if (result) {
            logger.info("all job_categories : ",result)
            return result
        } else {
            logger.error("job_categories not found")
        }
    } catch (error) {
        throw error
    }
}

//create new job-category
const createcategory = async(data)=>{
    try {
        const result = Category.create(data)
        if (result) {
            logger.info("job-category created successfully")
            return result
        } else {
            logger.error("error in create job category")
        }
    } catch (error) {
        throw error
    }
}

//update job-category with specific id
const updatecategory = async(categoryid,data)=>{
    try {
        const result = Category.findByIdAndUpdate(categoryid,data)
        if (result) {
            logger.info("job-category updated successfully")
            return result
        } else {
            logger.error("category not found with id")
        }
    } catch (error) {
        throw error
    }
}


//delete job-category with specific id
const deletecategory = async(categoryid)=>{
    try {
        const result = Category.findByIdAndDelete(categoryid)
        if (result) {
            logger.info("job-category deleted successfully")
            return result
        } else {
            logger.error("category not found with id")
        }
    } catch (error) {
        throw error
    }
}

//fetching job-category with specific id
const getcontrollerbyid = async(categoryid)=>{
    try {
        const result =await  Category.findById(categoryid)
        if (result) {
            logger.info("job-category with id : ",result)
            return result
        }else{
            logger.error("job-category not found with specific id")
        }
        
    } catch (error) {
        throw error
    }
}

export default {getallcategories,createcategory,updatecategory,deletecategory,getcontrollerbyid}