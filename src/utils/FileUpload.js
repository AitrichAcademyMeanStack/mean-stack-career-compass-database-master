import multer from "multer";
import Payloadtoolargeerror from "../Exceptions/Payloadtoolargeerror.js";
import unsupportedmediatypeerror from "../Exceptions/unsupportedmediatypeerror.js";
import logger from "../middleware/logger.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/File');
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}__${file.originalname}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
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

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload.single('Resume');