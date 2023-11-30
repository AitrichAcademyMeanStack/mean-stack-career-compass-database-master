import logger from '../middleware/logger.js' //importing logger middleware
import Badrequesterror from '../Exceptions/Badrequesterror.js' //importing badrequest error handler
import Notfounderror from '../Exceptions/NotFoundError.js' // importing notfound error handler
import ValidationError from '../Exceptions/ValidationError.js' // importing validation error handler
import skill from '../models/SkillModel.js' // importing skill module schema
import {authschema} from '../middleware/ValidationSchema.js' // importing validation schema

//fetching all skills
const getallskills = async(skillkey)=>{
    try {
        const result =await skill.find({"$or":[{name:{$regex:skillkey, $options: 'i' }}]},{name:true,_id:0}).limit(10)
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

const getskills = async()=>{
    try {
        const result = await skill.find({},{name:true,_id:false})
        if (result.length>0) {
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

//fetching skill with specific id
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

// create new skill
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

//update skill
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

//delete skill
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

export default { getallskills,getskillbyid, createskill,updateskill,deleteskill,getskills}

