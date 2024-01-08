import BadRequestError from "../Exceptions/BadRequestError.js"; // importing Custom Exception Handler
import Notfounderror from "../Exceptions/NotFoundError.js"; // importing Custom Exception Handler
import ValidationError from "../Exceptions/ValidationError.js"; // importing Custom Exception Handler
import { commonvalidation } from "../middleware/Validation/CommonModule.js";
import logger from "../middleware/logger.js"; // importing logger
import Qualification from "../models/QualificationModel.js"; // importing Schema


// Fetching all qualifications
const getAllQualifications = async () => {
  try {
    const data = await Qualification.find({},{name:true})
    if (data) {
      logger.info("All Qualifications: ", data);
      return data;
    }
  } catch (error) {
    throw new Notfounderror("Error while fetching");
  }
};

// Fetching qualification by ID
const getQualificationById = async (id) => {
  try {
    const data = await Qualification.findById(id);
    if (data) {
      logger.info("Qualification :", data);
      return data;
    } else {
      logger.error("Invalid ID");
      throw new Notfounderror("ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("ID not found");
      throw new BadRequestError("Error while fetching ID");
    } else {
      throw error;
    }
  }
};

// Adding new location
const addQualification = async (data) => {
  try {
    await commonvalidation.validateAsync(data)
    const newData = await Qualification.create(data);
    if (newData) {
      logger.info("New Qualification Added :", newData);
      return newData;
    } else {
      logger.error("Error while adding location");
      throw new BadRequestError("Error while adding new location");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      logger.error(`validaion error : ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

// Updating location
const updateQualification = async (id, updateData) => {
  try {
    await authschema.validateAsync(updateData);
    const update = await Qualification.findByIdAndUpdate(id, updateData);
    if (update) {
      logger.info("Qualification updated Successfull");
      return update;
    } else {
      logger.error("Qualification not found");
      throw new Notfounderror("Qualification not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error(`Qualification not found`);
      throw new Notfounderror("Qualification ID not found");
    } else if (error.name === "ValidationError") {
      logger.error(`validation error ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

// Deleting location
const deleteQualification = async (id) => {
  try {
    const deleteData = await Qualification.findByIdAndDelete(id);
    if (deleteData) {
      logger.info("Qualification Deleted Successfully");
      return deleteData;
    } else {
      logger.error("Qualification ID not found");
      throw new Notfounderror("Qualification ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("Error while deleting Qualification");
      throw new BadRequestError("Qualification unable to delete");
    }
  }
};

export default {
  getAllQualifications,
  getQualificationById,
  addQualification,
  updateQualification,
  deleteQualification,
};
