import logger from "../middleware/logger.js"; //importing logger middleware
import BadRequestError from "../Exceptions/Badrequesterror.js"; //importing badrequest error handler
import NotFoundError from "../Exceptions/NotFoundError.js"; //importing notfound error handler
import ValidationError from "../Exceptions/ValidationError.js"; //importing Validation error handler
import JobTitle from "../models/JobTitle.js";
import { authschema } from "../middleware/ValidationSchema.js";

const getalljobtitle = async () => {
  try {
    const result = await JobTitle.find({}, { name: true });
    if (result.length > 0) {
      logger.info("all Jobtitle : ", result);
      return result;
    } else {
      logger.error("Jobtitle not found");
      throw new NotFoundError("jobtitle not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      logger.error("invalid Jobtitle id");
      throw new BadRequestError("invalid Jobtitle id");
    } else {
      throw error;
    }
  }
};

const createJobTitle=async(jobtitledata)=>{
    try {
        const result =await JobTitle.create(jobtitledata)
        if (result) {
            logger.info("new jobtitle created successfully")
            return result
        } else {
            logger.error("error in create new jobtitle")
            throw new BadRequestError("error in create new jobtitle")
        }

    }
    catch(error)
    { if (error.name === "ValidationError") {
        logger.error(`validation error : ${error.message}`)
        throw new ValidationError(error.message)
    } else {
        throw error
    }

    }
}

const deleteJobTitle=async(jobtitleid)=>{
 try{
    const result= await JobTitle.findByIdAndDelete(jobtitleid)
    if(result)
    {
        logger. info("jobtitle deleted successfully")
    }
    else{
        logger.error("jobtitle not found with id")
            throw new NotFoundError("jobtitle data is not found with specific id")
 }
}
catch (error) {
    if (error.name === "CastError") {
        logger.error("invalid jobtitle id")
        throw new Badrequesterror("invalidjobtitle id")
    } else {
        throw error
    }
}
}







export default {getalljobtitle,createJobTitle,deleteJobTitle};
