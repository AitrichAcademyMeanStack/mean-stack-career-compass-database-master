import systemuser from "../models/SystemUserModel.js" //importing sysytemuser
import logger from '../middleware/logger.js' //importing logger
import ValidationError from "../Exceptions/ValidationError.js" //importing validation error

//create new system user
const createsystemuser = async (systemdata) => {
    try {
        const result = await systemuser.create(systemdata);
        if (result) {
            logger.info("System user created successfully");
            return result;
        } else {
            logger.error("Error in creating new system user: Result is falsy");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            logger.error(`Validation Error: ${error.message}`);
            throw new ValidationError(error.message);
        } else {
            throw error;
        }
    }
};

//update system user
const updatesystemuser = async (systemdata,userid) => {
    try {
        const result = await systemuser.findByIdAndUpdate(userid,systemdata,{new:true})
        if (result) {
            logger.info("System user updated successfully");
            return result;
        } else {
            logger.error("Error in updating system user");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            logger.error(`Validation Error: ${error.message}`);
            throw new ValidationError(error.message);
        } else {
            throw error;
        }
    }
};

//delete system user
const deletesystemuser = async (userid) => {
    try {
        const result = await systemuser.findByIdAndDelete(userid)
        if (result) {
            logger.info("System user deleted successfully");
            return result;
        } else {
            logger.error("Error in deleting system user");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            logger.error(`Validation Error: ${error.message}`);
            throw new ValidationError(error.message);
        } else {
            throw error;
        }
    }
};

export default { createsystemuser,deletesystemuser,updatesystemuser };