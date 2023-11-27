import NotFoundError from '../Exceptions/NotFoundError.js';
import logger from '../middleware/logger.js'//importing logger
import Resume from '../models/ResumeModel.js'//importing resume model


//uploading file
const createresume = async (req) => {
    try {
        const file = {
            title: req.file.originalname,
            resume: req.file.path
        };
        if (!file.title || !file.resume) {
            logger.error("Invalid file data");
            throw new Error("Invalid file data");
        }

        const newfile = await Resume.create(file);

        if (newfile) {
            logger.info("File uploaded successfully");
            return newfile
        } else {
            logger.error("Error occurred in file uploading");
            throw new Error("Error occurred in file uploading");
        }
    } catch (error) {
        console.log(error);
        logger.error("Error in createresume:", error.message);
        throw error;
    }
};

//deleting file
const deleteresume = async(fileid)=>{
    try {
        const deletefile = await Resume.findByIdAndDelete(fileid)
        if (deletefile) {
            logger.info("File deleted successfully")
            return deletefile
        } else {
            logger.error("error occured in deleting File")
            throw new NotFoundError("file is not found with specific id")
        }
    } catch (error) {
        throw error
    }
}

export default {createresume,deleteresume};


