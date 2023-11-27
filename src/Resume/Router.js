import express from "express"; //importing express
import controller from './Controller.js' //importing controller
import FileUpload from "../utils/FileUpload.js"; //importing file upload

const router = express.Router()


router.post('/',FileUpload,controller.createresume) //upload file
router.delete('/:id',controller.deleteresume) //delete uploaded file
export default router