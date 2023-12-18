import logger from "../middleware/logger.js" 
import AuthUser from "../models/AuthUserModel.js"
import systemuser from "../models/SystemUserModel.js"
import BadRequestError from "../Exceptions/Badrequesterror.js"
import NotFoundError from "../Exceptions/NotFoundError.js"
import ValidationError from "../Exceptions/ValidationError.js"
import PlatformAdmin from "../models/PlatformAdminModel.js"
import JobProviderCompany from "../models/JobProviderCompanyModel.js"

const getadmin = async()=>{
    try {
        const result = await PlatformAdmin.find()
        console.log(result);
        if (result) {
            logger.info("PlatformAdmin is : ",result)
            return result
        } else {
            logger.error("Error occured in getting platform admin")
            throw new NotFoundError("Error occured in getting admin")
        }
    } catch (error) {
        throw error
    }
}


const createadmin = async(admindata) => {
    try {
        const findadmin = await PlatformAdmin.findOne({email:admindata.email})
        if (!findadmin) {
            const adminresult = await PlatformAdmin.create(admindata);
            logger.info("admin created successfully");
    
            if (adminresult) {
                const systemuserdata = {
                    _id: adminresult._id,
                    role: adminresult.role,
                };
                const systemresult = await systemuser.create(systemuserdata);
                logger.info("System user created successfully");
    
                if (systemresult) {
                    const authuserdata = {
                        _id: systemresult._id,
                        userName: adminresult.userName,
                        password: "12345",
                        role: systemresult.role,
                    };
                    await AuthUser.create(authuserdata);
                    logger.info("Auth user created successfully");
                } else {
                    logger.error("Error in creating system user");
                    return null;
                }
            } else {
                logger.error("Error in creating admin ");
            }
            return adminresult;
        } else {
            logger.error("email already existing")
            throw new ValidationError("email already existing")
        }
    } catch (error) {
        throw error;
    }
};

const getAllJobProviders = async () => {
    try {
        const providers = await JobProviderCompany.find()
        if (providers) {
            logger.info(providers)
            return providers
        } else {
            throw new NotFoundError("JobProviders not found")
        }
    } catch (error) {
        throw new BadRequestError("Something went wrong")
    }
}



export default{getadmin,createadmin,getAllJobProviders}