import Category from '../models/JobCategoryModel.js'
import logger from '../middleware/Logger.js'

const getallcategories =async()=>{
    try {
        const result = Category.find()
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

const getcontrollerbyid = async(categoryid)=>{
    try {
        const result = Category.findOne(useid)
        if (result) {
            logger.info("job-category with id : ",result)
        }else{
            logger.error("job-category not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

export default {getallcategories,createcategory,updatecategory,deletecategory,getcontrollerbyid}