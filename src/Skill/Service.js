import logger from '../middleware/logger.js'
import Badrequesterror from '../Exceptions/Badrequesterror.js'
import Notfounderror from '../Exceptions/NotFoundError.js'
import ValidationError from '../Exceptions/ValidationError.js'
import skill from '../models/SkillModel.js'
import authschema from '../middleware/ValidationSchema.js'

const getallskills = async()=>{
    try {
        const result =await skill.find()
        if (result) {
            logger.info("all skills : ",result)
            return result
        } else {
            logger.error("skills not found")
            throw new Notfounderror("skills not found")
        }
    } catch (error) {
        throw error
    }
}

const getskillbyid = async(skillid)=>{
    try {
        const result = await skill.findById(skillid)
        if (result) {
            logger.info("skill with id : ",result)
            return result
        } else {
            logger.error("skill not found with specific id")
            throw new Notfounderror("skill not found with specific id")
        }
    } catch (error) {
        if (error.name === 'CastError') {
            logger.error("invalid skill id")
            throw new Badrequesterror("invalid skill id")
        } else {
            throw error
        }
    }
}

const createskill = async(skilldata)=>{
    try {
        await authschema.validateAsync(skilldata)
        const result =await skill.create(skilldata)
        if (result) {
            logger.info("new skill created successfully")
            return result
        } else {
            logger.error("error in create new skill")
            throw new Badrequesterror("error in create new skill")
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

const updateskill = async(skillid,skilldata)=>{
    try {
        await authschema.validateAsync(skilldata)
        const result = await skill.findByIdAndUpdate(skillid,skilldata,{new:true})
        if (result) {
            logger.info("skill updated successfully")
            return result
        } else {
            logger.error("skill not found with id")
            throw new Notfounderror("skill data is not found with specific id")

        }
    } catch (error) {
        if (error.name === "CastError") {
            logger.error("invalid skill id")
            throw new Badrequesterror("invalid skill id")
        } else if(error.name === 'ValidationError'){
            logger.error(`validation Error : ${error.message}`)
            throw new ValidationError(error.message)
        }else{
            throw error
        }
    }
}

const deleteskill = async(skillid)=>{
    try {
        const result =await skill.findByIdAndDelete(skillid)
        if (result) {
            logger.info("skill deleted successfully")
            return result
        } else {
            logger.error("skill not found with id")
            throw new Notfounderror("skill data is not found with specific id")
        }
        
    } catch (error) {
        if (error.name === "CastError") {
            logger.error("invalid skill id")
            throw new Badrequesterror("invalid skill id")
        } else {
            throw error
        }
    }
}

export default { getallskills,getskillbyid, createskill,updateskill,deleteskill}

