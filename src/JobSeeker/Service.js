import logger from "../middleware/logger.js" //importing logger middleware
import AuthUser from "../models/AuthUserModel.js" // importing authetication model
import systemuser from "../models/SystemUserModel.js" //importing system user model
import BadRequestError from "../Exceptions/Badrequesterror.js" //importing bad request error handler
import NotFoundError from "../Exceptions/Notfounderror.js" //importing not found error handler
import ValidationError from "../Exceptions/ValidationError.js" // importing validation error handler
import jobseeker from "../models/JobSeekerModel.js" //importing job seeker

//get all job seekers
const getallseekers = async()=>{
    try {
        const result = await jobseeker.find()
        console.log(result);
        if (result) {
            logger.info("All job seekers are : ",result)
            return result
        } else {
            logger.error("Error occured in getting all job seekers")
            throw new NotFoundError("Error occured in getting all job seekers")
        }
    } catch (error) {
        throw error
    }
}

//get jobseeker with specific id
const getseekerbyid = async(seekerid)=>{
    try {
        const result = await jobseeker.findById(seekerid)
        console.log(result);
        if (result) {
            logger.info("job seeker is : ",result)
            return result
        } else {
            logger.error("error occured in getting job seeker with specific id")
            throw new NotFoundError("error occured in getting job seeker with specific id")
        }
    } catch (error) {
        throw error
    }
}

//create new job seeker
const createseeker = async(seekerdata)=>{
    try {
        const seekerresult = await jobseeker.create(seekerdata)
        logger.info("job seeker created successfully")
        if (seekerresult) {
            const systemresult = await systemuser.create(seekerdata)
            logger.info("system user created successfully")
            if (systemresult) {
                await AuthUser.create(seekerdata)
                logger.info("auth user created successfully")
            } else {
                logger.error("error in creating system user")
            }
        } else {
         logger.error("error in creating job seeker")   
        }
    } catch (error) {
        console.log(error);
        throw error
    }
}

// //update job seeker with specific id
// const updateseeker = async(seekerid,seekerdata)=>{
    
// }

// //delete job seeker with specific id
// const deleteseeker = async(seekerid)=>{
    
// }


export default {getallseekers,getseekerbyid,createseeker}