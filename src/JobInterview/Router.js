import express from 'express';
import Controller from './Controller.js';
const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          JobInterview:
 *                  type: object
 *                  required: 
 *                      - dateScheduled
 *                      - status
 *                  properties:
 *                      dateScheduled: 
 *                              type: string
 *                      status:
 *                          type: enum
*/     


/**
 * @swagger
 *  /api/v1/job-Application/{jobApplicationId}/schedule-interview:
 *      post:
 *          summary: Schedule Interview
 *          tags:
 *              - JobInterview
 *          parameters:
 *              - in: path
 *                name: jobApplicationId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the Job-Application
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/JobInterview'
 *          responses:
 *              201:
 *                  description: JobInteriew Posted Successfully
 *                  content:
 *                          application/json:
 *                                      schema:
 *                                          $ref:   '#/componenets/schemas/JobInterview'
 *              400:
 *                  description: Bad request , check request body
*/

router.post('/:jobApplicationId/schedule-interview',Controller.addJobInterview)

/**
 * @swagger
 *  /api/v1/job-Application/scheduled-interview?page={pagenumber}&limit={limit}:
 *      get:
 *          summary: Get All Interview
 *          tags: 
 *              - JobInterview
 *          parameters:
 *              - in: query
 *                name: page
 *                required: true
 *                description: Page number
 *                schema:
 *                      type: string
 *              - in: query
 *                name: limit
 *                required: true
 *                description: Enter the limit
 *                schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Return array of Interview
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                   $ref:  '#/compnenets/schemas/JobInterview'
 *  
 */
router.get('/',Controller.getAllJobInterview)
/**
 * @swagger
 *  /api/v1/job-Application/{jobApplicationId}/schedule-interview/{jobInterviewId}:
 *      delete:
 *          summary: Delete Interview
 *          tags:
 *              - JobInterview
 *          parameters:
 *              - in: path
 *                name: jobApplicationId
 *                required: true
 * 
 *                description: Application ID
 *                schema:
 *                      type: string
 *              - in: path
 *                name: jobInterviewId
 *                required: true
 *                description: Interview ID
 *                schema:
 *                      type: string
 *          responses:
 *              202:
 *                  description: Interview Deleted
 *                  content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/componenets/schemas/JobInterview'
 *                 
 */
router.delete('/:jobApplicationId/schedule-interview/:jobInterviewId',Controller.deleteJobInterview)


export default router