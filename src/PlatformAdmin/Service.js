import logger from "../middleware/logger.js" 
import AuthUser from "../models/AuthUserModel.js"
import systemuser from "../models/SystemUserModel.js"
import NotFoundError from "../Exceptions/NotFoundError.js"
import ValidationError from "../Exceptions/ValidationError.js"
import PlatformAdmin from "../models/PlatformAdminModel.js"


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



const loginAdmin = async (data) => {
    try {
      const existingAuth = await AuthUser.findOne({
        password: data.password,
        email: data.email,
        role: "Platform Admin",
      });
  
      if (existingAuth) {
        logger.info("Admin login successful");
        return existingAuth;
      } else {
        logger.error("Incorrect email or password for admin");
        throw new Error("Incorrect email or password");
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        // Handle CastError (invalid data format)
        logger.error("Invalid data format");
        throw new BadRequestError("Invalid data format");
      } else {
        logger.error(`Error in login admin: ${error.message}`);
        throw error;
      }
    }
  };
  //change password for changepassword
  const changepassword = async (data) => {
    try {
      // Assuming you have a mongoose model named "AuthUser" for authentication
      const authValue = await AuthUser.findOne({ role: "Platform Admin" });
  
      if (authValue) {
        if (data.oldpassword && data.oldpassword !== authValue.password) {
          logger.error("Old password does not match the current password");
          throw new BadRequestError("Old password does not match");
        }
  
        authValue.password = data.newpassword;
  
        if (authValue.password === data.confirmpassword) {
          const existingauth = await AuthUser.findOneAndUpdate(
            { role: "Platform Admin" }, // Update based on your schema
            { $set: { password: authValue.password } },
            { new: true }
          );
  
          if (existingauth) {
            logger.info("Platform admin password changed successfully");
            return existingauth;
          } else {
            logger.error("Error occurred in changing password");
            throw new BadRequestError("Error occurred in changing password");
          }
        } else {
          logger.error("New password and confirm password do not match");
          throw new BadRequestError(
            "New password and confirm password do not match"
          );
        }
      } else {
        logger.error("Platform admin authentication not found");
        throw new NotFoundError("Platform admin authentication not found");
      }
    } catch (error) {
      logger.error(`Error in changing password of admin: ${error.message}`);
      throw error;
    }
  };
  


export default{getadmin,createadmin,loginAdmin,changepassword}