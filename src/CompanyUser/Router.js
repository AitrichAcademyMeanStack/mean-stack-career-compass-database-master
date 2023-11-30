import express from "express";
import userController from "./Controller.js";

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          CompanyUser:
 *              type: object
 *              required:
 *                  - firstName
 *                  - role
 *                  - lastName
 *                  - userName
 *                  - email
 *                  - phone
 *              properties:
 *                  firstName:
 *                      type: string
 *                  role:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  userName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: string
 * 
 * 
 */

/**
 * @swagger
 *  /api/v1/CompanyUsers:
 *      get:
 *          summary: Get all CompanyUsers
 *          tags:
 *              - CompanyUser
 *          responses: 
 *              200:
 *               description: Return array of CompanyUsers
 *               content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref:  '#/components/schemas/CompanyUser'
 *  
 *  
 * 
 */
router.get("/",userController.getAllCompanyUsers);
/**
 * @swagger
 *  /api/v1/CompanyUsers/{id}:
 *      get:
 *          summary: Get CompanyUser by ID
 *          tags:
 *              - CompanyUser
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description:  ID of the CompanyUser
 *          responses:
 *              200:
 *                description:  CompanyUser retrieved Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schema/CompanyUser'
 *              400:
 *                description: CompanyUser not found
 * 
 *  
 */

router.get("/:id",userController.getCompanyUserById);


/**
 * @swagger
 *  /api/v1/CompanyUsers/{id}:
 *      post:
 *          summary: Add a new CompanyUser
 *          tags:
 *              - CompanyUser
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description:  ID of the JobProviderComapny
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CompanyUser'
 *          responses:
 *              201:
 *                  description: CompanyUser Added Successfully
 *                  content:
 *                        application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/CompanyUser'
 *              400:
 *                      description: Bad request , check the request body
 *              
 */

router.post("/:id",userController.addCompanyUser);

/**
 * @swagger
 *  /api/v1/CompanyUsers/{id}:
 *      put:
 *          summary:    Update CompanyUser by ID
 *          tags:
 *              - CompanyUser
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true        
 *                schema:
 *                  type: string
 *                description: ID of the CompanyUser to update
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/CompanyUser'
 *  
 *          responses:
 *              200:
 *                  description: CompanyUser updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CompanyUser'
 *              400:
 *                  decription: CompanyUser not found
 *                                 
 * 
 *  
 *       
 */
router.put("/:id",userController.updateCompanyUser);
/**
 * @swagger
 *  /api/v1/CompanyUsers/{id}:
 *      delete:
 *          summary: Delete CompanyUser by ID
 *          tags:
 *              - CompanyUser 
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the CompanyUser to delete
 *          responses:
 *              204:
 *                  description: CompanyUser Deleted Successfully
 *              404:
 *                  description: CompanyUser ID not found
 * 
 *              
 */
router.delete("/:id",userController.deleteCompanyUser);


export default router