import Payloadtoolargeerror from "../Exceptions/Payloadtoolargeerror.js"
import unsupportedmediatypeerror from "../Exceptions/unsupportedmediatypeerror.js"
import logger from "./logger.js"


const profilepicturefilefilter =  (req,file,cb)=>{
    const filesize = parseInt(req.headers['content-length'])
    const maxsize = 3*1024*1024
    if (file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/jpeg") {
        logger.error("only supprting png,jpg,jpeg files")
        const error = new unsupportedmediatypeerror("only supprting png,jpg,jpeg files")
        return cb(error);
    }else if (filesize > maxsize) {
        logger.error("file size exceeded 3 MB limit")
        const error = new Payloadtoolargeerror("file size exceeded 3MB limit")
        return cb(error)
    }
    cb(null, true);

}

export default profilepicturefilefilter