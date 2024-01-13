import Badrequesterror from "../Exceptions/BadRequestError.js";
import Notfounderror from "../Exceptions/NotFoundError.js";
import logger from "../middleware/logger.js";
import Location from "../models/LocationModel.js";
import ValidationError from "../Exceptions/ValidationError.js";
import { commonvalidation } from "../middleware/Validation/CommonModule.js";
import JobPost from "../models/JobPostModel.js";
import JobProviderCompany from "../models/JobProviderCompanyModel.js";
import mongoose from "mongoose";

// fetching all locations
const getAllLocations = async () => {
  try {
    return await Location.find();
  } catch (error) {
    throw new Notfounderror("Locations not found");
  }
};

// fetching location by ID
const getLocationById = async (id) => {
  try {
    const result = await Location.findById(id);
    if (result) {
      logger.info("location :", result);
      return result;
    } else {
      logger.error("Error while fetching location");
      throw new Notfounderror("Location ID not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("ID not found");
      throw new Notfounderror("Location ID not found");
    } else {
      throw error;
    }
  }
};

// Adding new location
const addLocation = async (data) => {
  try {
    await commonvalidation.validateAsync(data);
    const newData = await Location.create(data);
    if (newData) {
      logger.info("New location :", newData);
      return newData;
    } else {
      logger.error("Error while adding location");
      throw new Badrequesterror("Error while adding new location");
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
const updateLocation = async (id, updateData) => {
  const session=await mongoose.startSession()
  session.startTransaction()
  try {
    await commonvalidation.validateAsync(updateData);
    const update = await Location.findByIdAndUpdate(id, updateData,{new:true});
    if (update) {
      logger.info("Location updated Successfull");
      await JobPost.updateMany({'jobLocation.locationId':id},{$set:{'jobLocation.name':updateData.name}},{new:true},session)
      await JobProviderCompany.updateMany({'location.locationId':id},
                                          {$set:{'location.name':updateData.name}},
                                          {new:true},
                                          session)
    } 

    await session.commitTransaction()
    session.endSession()
    return update;
  } catch (error) {
    if (error.name === "CastError") {
      logger.error(`Location not found`);
      throw new Notfounderror("Location ID not found");
    } else if (error.name === "ValidationError") {
      logger.error(`validation error ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

// Deleting location
// const deleteLocation = async (id) => {
//   try {
//     const deleteData = await Location.findByIdAndDelete(id);
//     if (deleteData) {
//       logger.info("Location Deleted Successfully");
//       return deleteData;
//     } else {
//       logger.error("Location ID not found");
//       throw new Notfounderror("Location ID not found");
//     }
//   } catch (error) {
//     if (error.name === "CastError") {
//       logger.error("Error while deleting Location");
//       throw new Badrequesterror("Location unable to delete");
//     }
//   }
// };




 const deleteLocation = async (id) => {
  const session=await Location.startSession();
  session.startTransaction();
  try {
    const result=await Location.findByIdAndDelete(id).session(session)
  
    if ( result) {
      await JobPost.deleteMany({'jobLocation.locationId':id}).session(session)
      
      await session.commitTransaction();
      session.endSession();
      logger.info("joblocation deleted successfully")

    } 
  } 
  catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error.name === "CastError") {
          logger.error("invalid joblocation id");
          throw new Badrequesterror("invalid joblocation id");
        } else {
          throw error;
        }
      }
};


export default {
  getAllLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
};
