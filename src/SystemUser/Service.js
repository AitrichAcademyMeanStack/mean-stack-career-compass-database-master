import systemuser from "../models/SystemUserModel.js"
import logger from '../middleware/logger.js'
import ValidationError from "../Exceptions/ValidationError.js"

const createsystemuser = async(systemdata)=>{
    try {

        const result =await systemuser.create(systemdata)
        if (result) {
            logger.info("systemuser created successfully")
            return result
        } else {
            logger.error("error in creating new systemuser")
        }
    } catch (error) {
       if (error.name === 'ValidationError') {
        throw new ValidationError(error.message)
       } else {
        throw error
       }
        
    }
}


export default {createsystemuser}