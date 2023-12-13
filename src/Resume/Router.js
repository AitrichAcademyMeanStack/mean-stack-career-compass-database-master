import express from "express"; //importing express
import controller from './Controller.js' //importing controller
import { uploadresume } from "../utils/FileUpload.js";

const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          Resume:
 *              type: object
 *              properties:
 *                  resume:
 *                      type: string   
 *                      format: binary
 *                  
 */


/**
 * @swagger
 *  /api/v1/resume:
 *      post:
 *          summary: Upload Resume
 *          tags:
 *              - Resume
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Resume'
 *          parameters:
 *            - name: Resume
 *              in: formData
 *              description: The resume file to upload
 *              required: true
 *              type: file
 *          responses:
 *              201:
 *                  description: Resume Added Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Resume' 
 *              400:
 *                  description: Bad request 
 */


router.post('/', uploadresume.single('Resume'), controller.createresume);


router.delete('/:id',controller.deleteresume) //delete uploaded file
export default router