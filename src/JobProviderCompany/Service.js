import Badrequesterror from "../Exceptions/BadRequestError.js";
import logger from "../middleware/logger.js";
import JobProviderCompany from "../models/JobProviderCompanyModel.js";
import { jobProviderValidate } from "../middleware/Validation/JobProviderValidation.js";
import ValidationError from "../Exceptions/ValidationError.js";
import mongoose from "mongoose";
import JobPost from "../models/JobPostModel.js";
import CompanyUser from "../models/CompanyUserModel.js";
import NotFoundError from "../Exceptions/NotFoundError.js";
import location from "../models/LocationModel.js";

// fetching all JobProviderCompany
const getAllJobProviders = async (page, limit) => {
  try {
    const totalPosts = await JobProviderCompany.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    if (page > totalPages) {
      logger.error("Page Not Found");
      throw new NotFoundError("Page Not Found");
    }

    const jobProviders = await JobProviderCompany.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (jobProviders) {
      return jobProviders;
    } else {
      throw new NotFoundError("Job provider not found");
    }
  } catch (error) {
    throw new NotFoundError("OOPS! something went wrong");
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
      throw new NotFoundError("JobProviderCompany ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("ID not JobProviderCompany");
      throw new NotFoundError("JobProviderCompany ID not JobProviderCompany");
    } else {
      throw error;
    }
  }
};

// Adding new JobProviderCompany
const addJobProvider = async (data) => {
  try {
    await jobProviderValidate.validateAsync(data);
    const locationdata = await location.findOne({name:data.location})
    if (locationdata) {
      data.location={
        locationId:locationdata._id,
        name:locationdata.name
      }
      const newData = await JobProviderCompany.create(data);
      if (newData) {
        logger.info("JobProviderCompany Created");
        return newData;
      } else {
        logger.error("Error while adding JobProviderCompany");
        throw new Badrequesterror("Error while adding new JobProviderCompany");
      }
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

  // Starting a session
  const session = await mongoose.startSession();

  // Starting transaction
  session.startTransaction();

  let update;
  try {
     update = await JobProviderCompany.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );
    if (update) {
      logger.info("JobProviderCompany updated Successfull");

      // updating JobProvider in JobPost
      const job = await JobPost.updateMany(
        { "company.companyId": id },
        {
          $set: {
            "company.legalName": updateData.legalName,
            "company.summary": updateData.summary,
            "company.industry": updateData.industry,
            "company.email": updateData.email,
            "company.phone": updateData.phone,
            "company.address": updateData.address,
            "company.website": updateData.website,
            "company.location": updateData.location,
          },
        }
      ).session(session);
      if (!job) {
        throw new NotFoundError("Job not found with specific ID")
      }
      logger.info("JobProvider updated in jobPost")

      // updating JobProvider in CompanyUser
      const user = await CompanyUser.updateMany(
        { "company.companyId": id },
        {
          $set: {
            "company.legalName": updateData.legalName,
            "company.summary": updateData.summary,
            "company.industry": updateData.industry,
            "company.email": updateData.email,
            "company.phone": updateData.phone,
            "company.address": updateData.address,
            "company.website": updateData.website,
            "company.location": updateData.location,
          },
        }
      ).session(session);
      if (!user) {
        throw new NotFoundError("Company not found with specific ID")
      } 
      logger.info("JobProvider updated in companyUser")
     
    
      // commiting session
      await session.commitTransaction();
      session.endSession();
    } else {
      logger.error("JobProviderCompany not found");
      throw new NotFoundError("JobProviderCompany not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error(`JobProviderCompany not found`);
      throw new NotFoundError("JobProviderCompany ID not found");
    } else if (error.name === "ValidationError") {
      logger.error(`validation error ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  } finally {

    // Aborting transaction
    session.endSession()
  }
  return update;

};

// Deleting JobProviderCompany
const deleteJobProvider = async (id) => {
  try {
    const deleteData = await JobProviderCompany.deleteOne(id);
    if (deleteData) {
      logger.info("JobProviderCompany Deleted Successfully");
      return deleteData;
    } else {
      logger.error("JobProviderCompany ID not found");
      throw new NotFoundError("JobProviderCompany ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("Error while deleting JobProviderCompany");
      throw new Badrequesterror("JobProviderCompany unable to delete");
    }
  }
};

const gettotalprovider = async () => {
  try {
    const resultcount = await JobProviderCompany.aggregate([
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);
    if (resultcount) {
      logger.info("successfully getting all count of providers");
      return resultcount;
    } else {
      logger.error("error occured in getting all providers count");
    }
  } catch (error) {
    throw error;
  }
};

export default {
  getAllJobProviders,
  getJobProviderById,
  addJobProvider,
  updateJobProvider,
  deleteJobProvider,
  gettotalprovider,
};
