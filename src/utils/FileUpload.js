import multer from "multer";
import resumefileFilter from "../middleware/ResumeUpload.js";
import profilepicturefilefilter from "../middleware/ProfilePicUpload.js"

const resumestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/File/Resume');
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}__${file.originalname}`;
        cb(null, filename);
    }
});

const profilepicturestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './data/File/ProfilePicture');
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}__${file.originalname}`;
        cb(null, filename);
    }
});




const uploadresume = multer({ storage: resumestorage, fileFilter: resumefileFilter });

const uploadprofilepicture = multer({ storage: profilepicturestorage, fileFilter: profilepicturefilefilter });

export {uploadresume,uploadprofilepicture}