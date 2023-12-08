import BadRequestError from "../Exceptions/Badrequesterror.js";
import NotFoundError from "../Exceptions/NotFoundError.js";
import ValidationError from "../Exceptions/ValidationError.js";
import logger from "../middleware/logger.js";
import Role from "../models/RoleModel.js";

const getAllRoles = async () => {
  try {
    const roles = await Role.find();
    if (roles) {
      return roles;
    } else {
      logger.error("Error while Fetching Roles");
      throw new NotFoundError("Error while fetching Roles");
    }
  } catch (error) {
    throw error;
  }
};

const addDescription = async (desc) => {
  try {
    const addDesc = await Role.create(desc);
    if (addDesc) {
      return addDesc;
    } else {
      logger.error("Error while adding description");
      throw new BadRequestError("Error while adding description");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      logger.error(`validation error: ${error.message}`);
      throw new ValidationError(error.message);
    } else {
      throw error;
    }
  }
};

export default { getAllRoles, addDescription };
