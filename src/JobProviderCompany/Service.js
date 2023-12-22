import Badrequesterror from "../Exceptions/BadRequestError.js";
import Notfounderror from "../Exceptions/NotFoundError.js";
import logger from "../middleware/logger.js";
import JobProviderCompany from "../models/JobProviderCompanyModel.js";
import {authschema} from "../middleware/ValidationSchema.js";
import ValidationError from "../Exceptions/ValidationError.js";
import Industry from "../models/IndustryModel.js";

// fetching all JobProviderCompany
const getAllJobProviders = async (page,limit) => {
  try {
    const totalPosts = await JobProviderCompany.countDocuments();
    const totalPages = Math.ceil(totalPosts/limit);
    if (page > totalPages) {
      logger.error("Page Not Found");
      throw new Notfounderror("Page Not Found")
    }

    const jobProviders =  await JobProviderCompany.find().skip((page -1) * limit).limit(limit).exec();
    if (jobProviders) {
      return jobProviders
    }else {
      throw new Notfounderror("Job provider not found")
    }
  } catch (error) {
    throw new Notfounderror("OOPS! something went wrong");
  }
};

// fetching JobProviderCompany by ID
const getJobProviderById = async (id) => {
  try {
    const result = await JobProviderCompany.findById(id);
    if (result) {
      logger.info("JobProviderCompany :", result);
      return result;
    } else {
      logger.error("Error while fetching JobProviderCompany");
      throw new Notfounderror("JobProviderCompany ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("ID not JobProviderCompany");
      throw new Notfounderror("JobProviderCompany ID not JobProviderCompany");
    } else {
      throw error;
    }
  }
};

// Adding new JobProviderCompany
const addJobProvider = async (data) => {
  try {
    // await authschema.validateAsync(data);
    const newData = await JobProviderCompany.insertMany(data);
    if (newData) {
      logger.info("New JobProviderCompany :", newData);
      return newData;
    } else {
      logger.error("Error while adding JobProviderCompany");
      throw new Badrequesterror("Error while adding new JobProviderCompany");
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

// Updating JobProviderCompany
const updateJobProvider = async (id, updateData) => {
  try {
    await authschema.validateAsync(updateData);
    const update = await JobProviderCompany.findByIdAndUpdate(id, updateData);
    if (update) {
      logger.info("JobProviderCompany updated Successfull");
      return update;
    } else {
      logger.error("JobProviderCompany not found");
      throw new Notfounderror("JobProviderCompany not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error(`JobProviderCompany not found`);
      throw new Notfounderror("JobProviderCompany ID not found");
    } else if (error.name === "ValidationError") {
      logger.error(`validation error ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

// Deleting JobProviderCompany
const deleteJobProvider = async (id) => {
  try {
    const deleteData = await JobProviderCompany.findByIdAndDelete(id);
    if (deleteData) {
      logger.info("JobProviderCompany Deleted Successfully");
      return deleteData;
    } else {
      logger.error("JobProviderCompany ID not found");
      throw new Notfounderror("JobProviderCompany ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("Error while deleting JobProviderCompany");
      throw new Badrequesterror("JobProviderCompany unable to delete");
    }
  }
};

const gettotalprovider = async()=>{
  try {
    const resultcount = await  JobProviderCompany.aggregate([
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          }
        }
      },
             {
          $project:{
              _id:0,
              count:1
          }
        }
    ])
    if (resultcount) {
      logger.info("successfully getting all count of providers")
      return resultcount
    } else {
      logger.error("error occured in getting all providers count")
    }
  } catch (error) {
    throw error
  }
}

export default {
    getAllJobProviders,
    getJobProviderById,
    addJobProvider,
    updateJobProvider,
    deleteJobProvider,
    gettotalprovider
  };
