import NotFoundError from "../Exceptions/Notfounderror"
import logger from "../middleware/logger"
import Role from "../models/RoleModel"

const getAllRoles = async() => {
    try {
        const roles = await Role.find()
        if (roles) {
            return roles
        }else {
            logger.error("Error while Fetching Roles")
            throw new NotFoundError("Error while fetching Roles")
        }
    } catch (error) {
        throw error
    }
}

export default getAllRoles