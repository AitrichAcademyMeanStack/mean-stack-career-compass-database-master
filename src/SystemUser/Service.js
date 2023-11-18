import systemuser from "../models/SystemUserModel.js"
import logger from '../middleware/logger.js'

const createsystemuser = async(systemdata)=>{
    try {
        const result = systemuser.create(systemdata)
        if (result) {
            logger.info("systemuser created successfully")
            return result
        } else {
            logger.error("error in creating new systemuser")
        }
    } catch (error) {
        throw error
    }
}


export default {createsystemuser}