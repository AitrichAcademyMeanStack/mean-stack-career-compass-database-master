import logger from "../middleware/logger.js";
import ValidationError from "../Exceptions/ValidationError.js";
import AuthUser from "../models/AuthUserModel.js";
import systemuser from "../models/SystemUserModel.js";

const createauthuser = async (authdata, systemuserid) => {
    try {
        const existingsystemuser = await systemuser.findById(systemuserid);

        if (existingsystemuser) {
            authdata._id = existingsystemuser._id;
            authdata.firstName = existingsystemuser.firstName;
            authdata.role = existingsystemuser.role;
            authdata.lastName = existingsystemuser.lastName;
            authdata.email = existingsystemuser.email;
            authdata.phone = existingsystemuser.phone;

            const result = await AuthUser.create(authdata);

            if (result) {
                logger.info("Auth user created successfully");
                return result;
            } else {
                logger.error("Error in creating new auth user");
            }
        } else {
            logger.error("Error finding system user with id");
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            logger.error(`Validation Error: ${error.message}`);
            throw new ValidationError(error.message);
        } else {
            logger.error(`Error creating auth user: ${error.message}`);
            throw error;
        }
    }
};



export default {createauthuser}