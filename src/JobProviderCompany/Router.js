import express from 'express';
import jobProviderController from './Controller.js'
const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          JobProviderCompany:
 *              type: object
 *              required:
 *                  - legalName
 *                  - summary
 *                  - industry
 *                  - email
 *                  - phone
 *                  - address
 *                  - website
 *                  - location
 *              properties:
 *                  legalName:
 *                      type: string
 *                  summary:
 *                      type: string
 *                  industry:
 *                      type: array
 *                      items:
 *                          type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: number
 *                  address:
 *                      type: string
 *                  website:
 *                      type: string
 *                  location:
 *                      type: array
 *                      items:
 *                          type: string
 * 
 * 
 */

/**
 * @swagger
 *  /api/v1/jobProviderCompanies:
 *      get:
 *          summary: Get all JobProviderCompany
 *          tags:
 *              - JobProviderCompany
 *          parameters:
 *              - in: query
 *                name: page
 *                description: the number of page 
 *                schema:
 *                     type: string
 *              - in: query
 *                name: limit
 *                description: the number of limit
 *                schema:
 *                   type: string
 *          responses: 
 *              200:
 *               description: Return array of JobProviderCompany
 *               content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref:  '#/components/schemas/JobProviderCompany'
 *  
 *  
 * 
 */
router.get("/",jobProviderController.getAllJobProviders);

/**
 * @swagger
 * /api/v1/jobproviderCompanies/count:
 *  get:
 *      summary: get all job-providers count 
 *      description: this api is used to get all job providers count
 *      tags:
 *          - JobProviderCompany
 *      responses:
 *          200:
 *              description:  returns the count of all job providers
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.get("/count",jobProviderController.gettotalprovider)

/**
 * @swagger
 *  /api/v1/jobProviderCompanies:
 *      post:
 *          summary: Add a new JobProviderCompany
 *          tags:
 *              - JobProviderCompany
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/JobProviderCompany'
 *          responses:
 *              201:
 *                  description: JobProviderCompany Added Successfully
 *                  content:
 *                        application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/JobProviderCompany'
 *              400:
 *                      description: Bad request , check the request body
 *              
 */
router.post("/",jobProviderController.addJobProvider);

/**
 * @swagger
 *  /api/v1/jobProviderCompanies/{id}:
 *      get:
 *          summary: Get JobProviderCompany by ID
 *          tags:
 *              - JobProviderCompany
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description:  ID of the JobProviderCompany
 *          responses:
 *              200:
 *                description:  JobProviderCompany retrieved Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schema/JobProviderCompany'
 *              400:
 *                description: JobProviderCompany not found
 * 
 *  
 */
router.get("/:id",jobProviderController.getJobProviderById)

/**
 * @swagger
 *  /api/v1/jobProviderCompanies/{id}:
 *      put:
 *          summary:    Update JobProviderCompany by ID
 *          tags:
 *              - JobProviderCompany
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true        
 *                schema:
 *                  type: string
 *                description: ID of the JobProviderCompany to update
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/JobProviderCompany'
 *  
 *          responses:
 *              200:
 *                  description: JobProviderCompany updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/JobProviderCompany'
 *              400:
 *                  decription: JobProviderCompany not found
 *                                 
 * 
 *  
 *       
 */
router.put("/:id",jobProviderController.updateJobProvider);

/**
 * @swagger
 *  /api/v1/jobProviderCompanies/{id}:
 *      delete:
 *          summary: Delete JobProviderCompany by ID
 *          tags:
 *              - JobProviderCompany 
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the JobProviderCompany to delete
 *          responses:
 *              204:
 *                  description: JobProviderCompany Deleted Successfully
 *              404:
 *                  description: JobProviderCompany ID not found
 * 
 *              
 */
router.delete("/:id",jobProviderController.deleteJobProvider);


export default router