import CompanyUser from "../models/CompanyUserModel.js";
import NotFoundError from "../Exceptions/NotFoundError.js";
import BadRequestError from "../Exceptions/BadRequestError.js";
import ValidationError from "../Exceptions/ValidationError.js";
import logger from "../middleware/logger.js";
import systemuser from "../models/SystemUserModel.js";
import AuthUser from "../models/AuthUserModel.js";
import JobProviderCompany from "../models/JobProviderCompanyModel.js";
import { companyUserValidate } from "../middleware/ValidationSchema.js";

// Fetchng all CompanyUser
const getAllCompanyUsers = async (id) => {
  try {
    const jobProviderCompany = await JobProviderCompany.findById(id);
    if (!jobProviderCompany) {
      throw new NotFoundError("JobProviderCompany not found");
    } else {
      const users = await CompanyUser.find();
      logger.info(users)
      return users;
    }
  } catch (error) {
    throw new NotFoundError("CompanyUser not found");
  }
};

// Fetching CompanyUser by ID
const getCompanyUserById = async (id) => {
  try {
    const user = await CompanyUser.findById(id);
    if (user) {
      logger.info("CompanyUser\n:", user);
      return user;
    } else {
      logger.error("CompanyUser ID not found");
      throw new NotFoundError("CompanyUser not found");
    }
  } catch (error) {
    throw new BadRequestError("Error while fetching CompanyUser");
  }
};

// Adding new CompanyUser
const addCompanyUser = async (companyId, data) => {
  try {
    await companyUserValidate.validateAsync(data)
    const jobProvider = await JobProviderCompany.findById(companyId);
    if (!jobProvider) {
      logger.error("JobProvider not found with Id:", companyId);
      return { error: "JobProvider not found" };
    }
``
    data.company = {
      companyId: jobProvider._id,
      legalName: jobProvider.legalName,
      summary: jobProvider.summary,
      industry: jobProvider.industry,
      email: jobProvider.email,
      phone: jobProvider.phone,
      address: jobProvider.address,
      website: jobProvider.website,
      location: jobProvider.location,
    };
    const newCompanyUser = await CompanyUser.create(data);
    logger.info("New Company Registered");

    if (newCompanyUser) {
      let systemUserRole;

      // Check the role of the new company user
      if (newCompanyUser.role === "Company Admin") {
        systemUserRole = "Company Admin";
      } else if (newCompanyUser.role === "Hiring Manager") {
        systemUserRole = "Hiring Manager";
      }
      const systemUser = {
        _id: newCompanyUser._id,
        firstName: newCompanyUser.firstName,
        lastName: newCompanyUser.lastName,
        email: newCompanyUser.email,
        phone: newCompanyUser.phone,
        role: systemUserRole,
      };

      const newSystemUser = await systemuser.create(systemUser);
      logger.info("System user created successfully");

      if (newSystemUser) {
        const authUser = {
          _id: newSystemUser._id,
          userName: newCompanyUser.userName,
          password: "12345",
          firstName: newSystemUser.firstName,
          lastName: newSystemUser.lastName,
          email: newSystemUser.email,
          phone: newSystemUser.phone,
          role: newSystemUser.role,
        };

        const companyAuthUser = await AuthUser.create(authUser);
        logger.info("Auth user created successfully", companyAuthUser);
      } else {
        logger.error("Error while creating system user");
        return null;
      }
    } else {
      logger.error("Error while creating CompanyUser");
    }
    return newCompanyUser;
  } catch (error) {
    if (error.name === "ValidationError") {
      logger.error(`validation error ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

// Updating companyUser
const updateCompanyUser = async (id) => {
  try {
    const updateUser = await CompanyUser.findByIdAndUpdate(id);
    if (updateUser) {
      logger.info("CompanyUser updated Successfull");

      return updateUser;
    } else {
      logger.error("CompanyUser not found");

      throw new NotFoundError("CompanyUser ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error(`CompanyUser not found`);
      throw new NotFoundError("CompanyUser ID not found");
    } else if (error.name === "ValidationError") {
      logger.error(`validation error ${error.message}`);
      throw new ValidationError(error.message);
    }
  }
};

// Deleting CompanyUser
const deleteCompanyUser = async (jobProviderCompanyId, userId) => {
  try {
    const jobProviderCompany = await JobProviderCompany.findById(
      jobProviderCompanyId
    );
    if (jobProviderCompany) {
      const deleteData = await CompanyUser.findByIdAndDelete(userId);
      if (deleteData) {
        logger.info("CompanyUser Deleted Successfully");
        return deleteData;
      } else {
        logger.error("CompanyUser ID not found");
        throw new NotFoundError("CompanyUser ID not found");
      }
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("Error while deleting CompanyUser");
      throw new BadRequestError("CompanyUser unable to delete");
    }
  }
};

// CompanyUser Login
const loginCompanyUser = async(jobProviderId , companyUserId , data) => {
  try {
    const jobProvider = await JobProviderCompany.findById(jobProviderId);
    if (jobProvider) {
      const companyUser = await CompanyUser.findById(companyUserId)
      if (companyUser) {
        const authUser = await AuthUser.findById(companyUserId)
        if (authUser && authUser.role === "Company Admin" || "Hiring Manager") {
          const existingAuthUser = await AuthUser.findOne({
            _id:companyUserId,
            email:data.email,
            password:data.password
          })
          if (existingAuthUser) {
            logger.info("Login Successfull")
            return existingAuthUser
          }else {
            logger.error("Login Failed")
            throw new BadRequestError("Login failed , check Request Body")
          }
          
        }else {
          logger.error("Auth user with particular role not found")
          throw new NotFoundError("Auth user with particular role not found")
        }
      }else {
        logger.error("Company User Not Found  With Specific Id")
        throw new NotFoundError("Company User Not Found  With Specific Id")
      }
    }else {
      logger.error("JobProvider Not Found With Specific Id")
      throw new NotFoundError("JobProvider Not Found With Specific Id")
    }
  } catch (error) {
    throw error
  }

}

// CompnayUser change password
const changeUserPassword = async (jobProviderId , companyUserId , data) => {
  try {
    const jobProvider = await JobProviderCompany.findById(jobProviderId);
    if (jobProvider) {
      const companyUser = await CompanyUser.findById(companyUserId)
      if (companyUser) {
        const authUser = await AuthUser.findById(companyUserId)
        if (authUser && authUser.role === "Company Admin" || "Hiring Manager") {
          if (data.OldPassword && data.OldPassword === authUser.password) {
            authUser.password = data.NewPassword
            if (authUser.password === data.ConfirmPassword) {
              const updatePassword = await AuthUser.findOneAndUpdate(
                {_id: companyUserId},
                {$set: {password: authUser.password}},
                {new: true}
              );
              if (updatePassword) {
                logger.info("Password Changed Successfully")
                return updatePassword
              }else {
                logger.error("Error while changing password")
                throw new BadRequestError("Error while changing password")
              }
              
            }else {
              logger.error("Password didn't Match")
              throw new BadRequestError("Password didn't Match")
            }
          }else {
            logger.error("Old Password did'nt Match")
            throw new BadRequestError("Old Password did'nt Match")
          }
        }else {
          logger.error("Auth user with particular role not found")
          throw new NotFoundError("Auth user with particular role not found")
        }
      }else {
        logger.error("Company User Not Found  With Specific Id")
        throw new NotFoundError("Company User Not Found  With Specific Id")
      }
    }else {
      logger.error("JobProvider Not Found With Specific Id")
      throw new NotFoundError("JobProvider Not Found With Specific Id")
    }
  } catch (error) {
    throw error
  }


}

export default {
  getAllCompanyUsers,
  getCompanyUserById,
  addCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
  loginCompanyUser,
  changeUserPassword
};
