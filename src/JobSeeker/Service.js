import logger from "../middleware/logger.js" //importing logger middleware
import AuthUser from "../models/AuthUserModel.js" // importing authetication model
import systemuser from "../models/SystemUserModel.js" //importing system user model
import BadRequestError from "../Exceptions/Badrequesterror.js" //importing bad request error handler
import NotFoundError from "../Exceptions/NotFoundError.js" //importing not found error handler
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
const createseeker = async(seekerdata) => {
    try {
        const seekerresult = await jobseeker.create(seekerdata);
        logger.info("Job seeker created successfully");

        if (seekerresult) {
            const systemuserdata = {
                _id: seekerresult._id,
                firstName: seekerresult.firstName,
                lastName: seekerresult.lastName,
                email: seekerresult.email,
                phone: seekerresult.phone,
                role: "Job Seeker",
            };
            const systemresult = await systemuser.create(systemuserdata);
            logger.info("System user created successfully");

            if (systemresult) {
                const authuserdata = {
                    _id: systemresult._id,
                    userName: seekerresult.userName,
                    password: "12345",
                    firstName: systemresult.firstName,
                    lastName: systemresult.lastName,
                    email: systemresult.email,
                    phone: systemresult.phone,
                    role: systemresult.role,
                };
                await AuthUser.create(authuserdata);
                logger.info("Auth user created successfully");
            } else {
                logger.error("Error in creating system user");
                return null;
            }
        } else {
            logger.error("Error in creating job seeker");
        }

        return seekerresult;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// // //update job seeker with specific id
const updateseeker = async(seekerid,seekerdata)=>{
    try {
        const seekerresult = await jobseeker.findByIdAndUpdate(seekerid,seekerdata)
        logger.info("job seeker updated successfully")
        if (seekerresult) {
            const systemresult = await systemuser.findByIdAndUpdate(seekerid,seekerdata)
            logger.info("system user updated successfully")
            if (systemresult) {
                await AuthUser.findByIdAndUpdate(seekerid,seekerdata)
                logger.info("auth user updated successfully")
            } else {
                logger.error("error in updating system user")
            }
        } else {
            logger.info("error in updating job seeker")
        }
        return seekerresult
    } catch (error) {
        throw error
    }
}

// //delete job seeker with specific id
const deleteseeker = async(seekerid)=>{
    try {
        const seekerresult = await jobseeker.findByIdAndDelete(seekerid)
        logger.info("job seeker deleted successfully")
        if (seekerresult) {
            const systemresult = await systemuser.findByIdAndDelete(seekerid)
            logger.info("system user deleted successfully")
            if (systemresult) {
                await AuthUser.findByIdAndDelete(seekerid)
                logger.info("auth user deleted successfully")
            } else {
                logger.error("error in deleting system user")
            }
        } else {
            logger.info("error in deleting job seeker")
        }
        return seekerresult
    } catch (error) {
        throw error
    }
}


export default {getallseekers,getseekerbyid,createseeker,updateseeker,deleteseeker}