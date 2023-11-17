import Category from '../models/JobCategoryModel.js'
import logger from '../middleware/logger.js'
import Badrequesterror from '../Exceptions/Badrequesterror.js'
import Notfounderror from '../Exceptions/Notfounderror.js'
import ValidationError from '../Exceptions/ValidationError.js'
import authschema from '../middleware/ValidationSchema.js'


// fetching all job-categories
const getallcategories =async()=>{
    try {
        const result = await Category.find()
        if (result) {
            logger.info("all job_categories : ",result)
            return result
        } else {
            logger.error("job_categories not found")
            throw new Badrequesterror("job_categories are not found")
        }
    } catch (error) {
        throw error
    }
}

//create new job-category
const createcategory = async(data)=>{
    try {
        await authschema.validateAsync(data)
        const result =await Category.create(data)
        if (result) {
            logger.info("job-category created successfully")
            return result
        } else {
            logger.error("error in create job category")
            throw new Badrequesterror("error in create new job-category")
        }
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            logger.error(`validation error : ${error.message}`)
            throw new ValidationError(error.message)
        } else {
            throw error
        }
    }
}

//update job-category with specific id
const updatecategory = async(categoryid,data)=>{
    try {
        await authschema.validateAsync(data)
        const result = await Category.findByIdAndUpdate(categoryid,data,{new:true})
        if (result) {
            logger.info("job-category updated successfully")
            return result
        } else {
            logger.error("category not found with id")
            throw new Notfounderror("job_category data is not found with specific id")

        }
    } catch (error) {
        if (error.name === "CastError") {
            logger.error("invalid category id")
            throw new Badrequesterror("invalid category id")
        } else if(error.name === 'ValidationError'){
            logger.error(`validation Error : ${error.message}`)
            throw new ValidationError(error.message)
        }else{
            throw error
        }
    }
}

//delete job-category with specific id
const deletecategory = async(categoryid)=>{
    try {
        const result =await Category.findByIdAndDelete(categoryid)
        if (result) {
            logger.info("job-category deleted successfully")
            return result
        } else {
            logger.error("category not found with id")
            throw new Notfounderror("job_category data is not found with specific id")
        }
        
    } catch (error) {
        if (error.name === "CastError") {
            logger.error("invalid category id")
            throw new Badrequesterror("invalid category id")
        } else {
            throw error
        }
    }
}

//fetching job-category with specific id
const getcategorybyid = async(categoryid)=>{
    try {
        const result =await  Category.findById(categoryid)
        if (result) {
            logger.info("job-category with id : ",result)
            return result
        }else{
            logger.error("job-category not found with specific id")
            throw new Notfounderror("job_category data is not found with specific id")
        }
        
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            logger.error("invalid category id")
            throw new Badrequesterror("invalid category id")
        } else {
            throw error
        }
    }
}

export default {getallcategories,createcategory,updatecategory,deletecategory,getcategorybyid}