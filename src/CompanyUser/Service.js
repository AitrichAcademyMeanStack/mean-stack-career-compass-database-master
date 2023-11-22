import CompanyUser from "../models/CompanyUserModel.js";
import NotFoundError from "../Exceptions/NotFoundError.js";
import BadRequestError from "../Exceptions/Badrequesterror.js";
import ValidationError from "../Exceptions/ValidationError.js";
import logger from "../middleware/logger.js";

// Fetchng all CompanyUser
const getAllCompanyUsers = async () => {
  try {
    const users = await CompanyUser.find();
    return users;
  } catch (error) {
    throw new NotFoundError("CompanyUsers not found");
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
const addCompanyUser = async (data) => {
  try {
    const addNewUser = await CompanyUser.create(data);
    if (addNewUser) {
      logger.info("New CompanyUser :", addNewUser);

      return addNewUser;
    } else {
      logger.error("Error while adding CompanyUser");

      throw new BadRequestError("Error while creating new CompanyUser");
    }
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
const deleteCompanyUser = async (id) => {
  try {
    const deleteData = await CompanyUser.findByIdAndDelete(id);
    if (deleteData) {
      logger.info("CompanyUser Deleted Successfully");
      return deleteData;
    } else {
      logger.error("CompanyUser ID not found");
      throw new NotFoundError("CompanyUser ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("Error while deleting CompanyUser");
      throw new BadRequestError("CompanyUser unable to delete");
    }
  }
};

export default {
  getAllCompanyUsers,
  getCompanyUserById,
  addCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
};
