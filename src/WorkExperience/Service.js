import logger from "../middleware/logger.js"; //importing logger
import ValidationError from "../Exceptions/ValidationError.js"; //importing validation custom error handler
import BadRequestError from "../Exceptions/BadRequestError.js"; // importing bad request custom error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; //importing not found custom error handler
import WorkExperience from "../models/WorkExperienceModel.js"; //importing work experience schema model
import { experiencevalid } from "../middleware/Validation/WorkExperience.js";

// get all work experience
const getallexp= async()=>{
    try {
        const result = await WorkExperience.find()
        if (result) {
            logger.info("successfully getting all work experience")
            return result
        } else {
            logger.error("error in getting all work experience")
            throw new NotFoundError("work experiences not found")
        }
    } catch (error) {
        throw error
    }
}

// get work experience with specific id
const getexpbyid= async(experienceid)=>{
try {
    const result = await WorkExperience.findById(experienceid)
    if (result) {
        logger.info("successfully getting work experience with specific id")
        return result
    } else {
        logger.error("error in getting work experience with specific id")
        throw new NotFoundError("work experience not found with specific id")
    }
} catch (error) {
    if (error.name === 'CastError') {
        logger.error("invalid work experience id")
        throw new BadRequestError("invalid work experience id")
    } else {
        throw error
    }
}
}

// creating new work experience
const createexp= async(experiencedata)=>{
    try {
        await experiencevalid.validateAsync(experiencedata)
        const result = await WorkExperience.create(experiencedata)
        if (result) {
            logger.info("work experience created successfully")
            // seekerProfile.WorkExperiences.push(result._id)
            // await seekerProfile.save()
            return result
        } else {
            logger.error("error in creating work experience")
            throw new BadRequestError("error in create new work experience")
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            logger.error(`validation error : ${error.message}`)
            throw new ValidationError(error.message)
        } else {
            throw error
        }
    }
}

//updating work experience
const updateexp= async(experienceid,experiencedata)=>{
try {
    const result = await WorkExperience.findByIdAndUpdate(experienceid,experiencedata)
    if (result) {
        logger.info("work experience updated successfully")
        return result
    } else {
        logger.error("work experience not found with specific id")
        throw new NotFoundError("work experience not found with specific id")
    }
} catch (error) {
    if (error.name === "CastError") {
        logger.error("invalid work experience id")
        throw new BadRequestError("invalid work experience id")
    }else if (error.name === "ValidationError") {
        logger.error(`validation error : ${error.message}`)
        throw new ValidationError(error.message)
    }
}
}

//deleting work experience
const deleteexp= async(experienceid)=>{
    try {
        const result = await WorkExperience.findByIdAndDelete(experienceid)
        if (result) {
            logger.info("work experience deleted successfully")
            return result
        } else {
            logger.error("error in deleting work experience")
            throw new NotFoundError("work experience not found with specific id")
        }
    } catch (error) {
        if (error.name === "CastError") {
            logger.error("invalid work experience id")
            throw new BadRequestError("invalid work experience id")
        } else {
            throw error
        }
    }
}


export default { getallexp, getexpbyid, createexp, updateexp, deleteexp}