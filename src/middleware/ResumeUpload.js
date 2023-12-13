import Payloadtoolargeerror from "../Exceptions/Payloadtoolargeerror.js";
import unsupportedmediatypeerror from "../Exceptions/unsupportedmediatypeerror.js";
import logger from "./logger.js";

const resumefileFilter = (req, file, cb) => {
    const filesize = parseInt(req.headers['content-length'])
    const maxsize = 3*1024*1024
    if (file.mimetype !== 'application/pdf') {
        logger.error("only supprting PDF files")
        const error = new unsupportedmediatypeerror("only supprting PDF file")
        return cb(error);
    }else if (filesize > maxsize) {
        logger.error("file size exceeded 3 MB limit")
        const error = new Payloadtoolargeerror("file size exceeded 3MB limit")
        return cb(error)
    }
    cb(null, true);

};


export default resumefileFilter