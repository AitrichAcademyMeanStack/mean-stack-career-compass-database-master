import express from "express";
import qualificationController from "./Controller.js";

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Qualification:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 * 
 * 
 */

/**
 * @swagger
 *  /api/v1/qualifications:
 *      get:
 *          summary: Get all Qualifications
 *          tags:
 *              - Qualification
 *          responses: 
 *              200:
 *               description: Return array of Qualifications
 *               content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref:  '#/components/schemas/Qualification'
 *  
 *  
 * 
 */
router.get("/:key",qualificationController.getAllQualifications);


/**
 * @swagger
 *  /api/v1/qualifications:
 *      post:
 *          summary: Add a new qualification
 *          tags:
 *              - Qualification
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Qualification'
 *          responses:
 *              201:
 *                  description: Qualification Added Successfully
 *                  content:
 *                        application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/Qualification'
 *              400:
 *                      description: Bad request , check the request body
 *              
 */

router.post("/",qualificationController.addQualification);
/**
 * @swagger
 *  /api/v1/qualifications/{id}:
 *      get:
 *          summary: Get Qualification by ID
 *          tags:
 *              - Qualification
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description:  ID of the Qualification
 *          responses:
 *              200:
 *                description:  Qualification retrieved Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schema/Qualification'
 *              400:
 *                description: Qualification not found
 * 
 *  
 */

router.get("/:id",qualificationController.getQualificationById);
/**
 * @swagger
 *  /api/v1/qualification/{id}:
 *      put:
 *          summary:    Update Qualification by ID
 *          tags:
 *              - Qualification
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true        
 *                schema:
 *                  type: string
 *                description: ID of the Qualification to update
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/Qualification'
 *  
 *          responses:
 *              200:
 *                  description: Qualification updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Qualification'
 *              400:
 *                  decription: Qualification not found
 *                                 
 * 
 *  
 *       
 */
router.put("/:id",qualificationController.updateQualification);
/**
 * @swagger
 *  /api/v1/qualifications/{id}:
 *      delete:
 *          summary: Delete Qualification by ID
 *          tags:
 *              - Qualification 
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the Qualification to delete
 *          responses:
 *              200:
 *                  description: Qualification Deleted Successfully
 *              404:
 *                  description: Qualification ID not found
 * 
 *              
 */
router.delete("/:id",qualificationController.deleteQualification);


export default router