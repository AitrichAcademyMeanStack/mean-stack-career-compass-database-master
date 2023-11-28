import express from "express";
import industryController from "./Controller.js";

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Industry:
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
 *  /api/v1/industries:
 *      get:
 *          summary: Get all Industries
 *          tags:
 *              - Industry
 *          responses: 
 *              200:
 *               description: Return array of industries
 *               content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref:  '#/components/schemas/Industry'
 *  
 *  
 * 
 */
router.get("/:key",industryController.getAllIndustries);


/**
 * @swagger
 *  /api/v1/industries:
 *      post:
 *          summary: Add a new Industry
 *          tags:
 *              - Industry
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Industry'
 *          responses:
 *              201:
 *                  description: Industry Added Successfully
 *                  content:
 *                        application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/Industry'
 *              400:
 *                      description: Bad request , check the request body
 *              
 */

router.post("/",industryController.addIndustry);

/**
 * @swagger
 *  /api/v1/industries/{id}:
 *      put:
 *          summary:    Update Industry by ID
 *          tags:
 *              - Industry
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true        
 *                schema:
 *                  type: string
 *                description: ID of the Industry to update
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/Industry'
 *  
 *          responses:
 *              200:
 *                  description: Industry updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Industry'
 *              400:
 *                  decription: Industry not found
 *                                 
 * 
 *  
 *       
 */
router.put("/:id",industryController.updateIndustry);
/**
 * @swagger
 *  /api/v1/industries/{id}:
 *      delete:
 *          summary: Delete Industry by ID
 *          tags:
 *              - Industry 
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the Industry to delete
 *          responses:
 *              204:
 *                  description: Industry Deleted Successfully
 *              404:
 *                  description: Industry ID not found
 * 
 *              
 */
router.delete("/:id",industryController.deleteIndustry);


export default router