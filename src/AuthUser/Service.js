import logger from "../middleware/logger.js";
import { ObjectId } from "mongoose";
import ValidationError from "../Exceptions/ValidationError.js";
import AuthUser from "../models/AuthUserModel.js";
import systemuser from "../models/SystemUserModel.js";

const createauthuser = async(authdata,systemuserid)=>{
    try {
        const existingsystemuser = systemuser.findById(systemuserid)
        if (existingsystemuser) {
            authdata._id = new ObjectId(systemuserid)
            authdata.firstName = existingsystemuser.firstName
            authdata.Role = existingsystemuser.Role
            authdata.lastName =existingsystemuser.lastName
            authdata.email =existingsystemuser.email
            authdata.phone=existingsystemuser.phone
            const result = await AuthUser.create(authdata)
            if (result) {
                logger.info("auth user created successfully")
                return result
            } else {
                logger.error("error in creating new authuser")
            }
        } else {
            logger.error("error for finding system user with id")
        }
     
    } catch (error) {
        throw error
        
    }
}

export default {createauthuser}