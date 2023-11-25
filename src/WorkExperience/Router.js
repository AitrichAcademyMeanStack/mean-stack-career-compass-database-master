import express from 'express' // importing express
import controller from './Controller.js' // importing controller

const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          workexperience:
 *              type: object
 *              required:
 *                  - jobTitle
 *                  - companyName
 *                  - summary
 *                  - serviceStart
 *                  - serviceEnd
 *              properties:
 *                  jobTitle:
 *                      type: string
 *                  companyName:
 *                      type: string
 *                  summary:
 *                      type: string
 *                  serviceStart:
 *                      type: Date
 *                  serviceEnd:
 *                      type: Date
 */

/**
 * @swagger
 *  /api/v1/workexperiences:
 *      get:
 *          summary: Get all workexperiences
 *          tags:
 *              - workexperience
 *          responses: 
 *              200:
 *               description: Return array of workexperiences
 *               content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref:  '#/components/schemas/workexperience'
 */
router.get('/',controller.getallexp) //get all work experiences

/**
 * @swagger
 *  /api/v1/workexperiences/{id}:
 *      get:
 *          summary: Get workexperience by ID
 *          tags:
 *              - workexperience
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description:  ID of the workexperience
 *          responses:
 *              200:
 *                description:  workexperience retrieved Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schema/workexperience'
 *              400:
 *                description: workexperience not found
 */
router.get('/:id',controller.getexpbyid) //get work experience with specific id

/**
 * @swagger
 *  /api/v1/workexperiences:
 *      post:
 *          summary: Add a new workexperience
 *          tags:
 *              - workexperience
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/workexperience'
 *          responses:
 *              201:
 *                  description: workexperience Added Successfully
 *                  content:
 *                        application/json:
 *                            schema:
 *                              $ref: '#/components/schemas/workexperience'
 *              400:
 *                      description: Bad request , check the request body
 *              
 */
router.post('/',controller.createexp) // create new work experience

/**
 * @swagger
 *  /api/v1/workexperiences/{id}:
 *      put:
 *          summary: Update workexperience by ID
 *          tags:
 *              - workexperience
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true        
 *                schema:
 *                  type: string
 *                description: ID of the workexperience to update
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/workexperience'
 *  
 *          responses:
 *              200:
 *                  description: workexperience updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/workexperience'
 *              400:
 *                  decription: workexperience not found      
 */
router.put('/:id',controller.updateexp) //update work experience

/**
 * @swagger
 *  /api/v1/workexperiences/{id}:
 *      delete:
 *          summary: Delete workexperience by ID
 *          tags:
 *              - workexperience 
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the workexperience to delete
 *          responses:
 *              200:
 *                  description: workexperience Deleted Successfully
 *              404:
 *                  description: workexperience ID not found             
 */
router.delete('/:id',controller.deleteexp) // delete work experience


export default router