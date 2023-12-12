import express from "express"; //importing express
import controller from './Controller.js' //importing controller
import FileUpload from "../utils/FileUpload.js"; //importing file upload

const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          Resume:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
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
 *                   multipart/form-data:
 *                              schema:
 *                                  $ref:   '#/components/schemas/Resume'
 *          responses:
 *                 201:
 *                      description: Resume Added Successfully
 *                      content:
 *                              application/json:
 *                                  schema:
 *                                      $ref:   '#/components/schemas/Resume' 
 *                 400:
 *                      description: Bad request 
 *                
 * 
 *                  
 *              
 *            
 *          
 */
router.post('/',FileUpload,controller.createresume) //upload file
router.delete('/:id',controller.deleteresume) //delete uploaded file
export default router