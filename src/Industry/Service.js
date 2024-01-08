import BadRequestError from "../Exceptions/BadRequestError.js";
import Notfounderror from "../Exceptions/NotFoundError.js";
import logger from "../middleware/logger.js";
import Industry from "../models/IndustryModel.js";
import ValidationError from "../Exceptions/ValidationError.js";
import { commonvalidation } from "../middleware/Validation/CommonModule.js";

// fetching all Industries
const getAllIndustries = async (industry) => {
  try {
    const result = await Industry.find(
      {"$or":[{name:{$regex: industry, $options: 'i' }}]},{name:true,_id:0}).limit(10)
      if (result) {
        logger.info("Industry Fetched",result)
        return result
      }else {
        logger.error("Industry Not Found")
        throw new Notfounderror("Industries not found")

      }
  } catch (error) {
    throw error
  }
};



// Adding new Industry
const addIndustry = async (data) => {
  try {
    await commonvalidation.validateAsync(data)
    const newData = await Industry.create(data);
    if (newData) {
      logger.info("New Industry :", newData);
      return newData;
    } else {
      logger.error("Error while adding industry");
      throw new BadRequestError("Error while adding new industry");
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

// Updating Industry
const updateIndustry = async (id, updateData) => {
  try {
    await authschema.validateAsync(updateData);
    const update = await Industry.findByIdAndUpdate(id, updateData);
    if (update) {
      logger.info("Industry updated Successfull");
      return update;
    } else {
      logger.error("Industry not found");
      throw new Notfounderror("Industry not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error(`Industry not found`);
      throw new Notfounderror("Industry ID not found");
    } else if (error.name === "ValidationError") {
      logger.error(`validation error ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

// Deleting Industry
const deleteIndustry = async (id) => {
  try {
    const deleteData = await Industry.findByIdAndDelete(id);
    if (deleteData) {
      logger.info("Industry Deleted Successfully");
      return deleteData;
    } else {
      logger.error("Industry ID not found");
      throw new Notfounderror("Industry ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("Error while deleting Industry");
      throw new BadRequestError("Industry unable to delete");
    }
  }
};

export default {
    getAllIndustries,
    addIndustry,
    updateIndustry,
    deleteIndustry,
  };
