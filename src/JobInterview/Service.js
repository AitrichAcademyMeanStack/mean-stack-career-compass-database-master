import JobInterview from "../models/JobInterviewModel"
import logger from "../middleware/logger.js"
import BadRequestError from "../Exceptions/BadRequestError.js"

// Adding Job Interview
const addJobInterview = async(data) => {
    try {
        const addInterview = await JobInterview.create(data)
        if(addInterview){
            logger.info("Interview Added")
            return addInterview
        }else {
            throw new BadRequestError("Error while Adding Job Intervie")
        }
    } catch (error) {
        throw error
    }
}

export default addJobInterview