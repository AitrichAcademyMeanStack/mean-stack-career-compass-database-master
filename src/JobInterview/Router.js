import express from 'express';
const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          JobInterview:
 *                  type: object
 *                  required: 
 *                      - job
 *                      - interviewee
 *                      - jobApplication
 *                      - scheduledBy
 *                      - dateScheduled
 *                      - status
 *                  properties:
 *                      job:
 *                          type: object
 *                          items:
 *                              type: string
 *                      interviewee:
 *                          type: object
 *                          items: 
 *                              type: string
 *                      jobApplication:
 *                          type: object
 *                          items:
 *                              type: string
 *                      scheduledBy:
 *                              type: string
 *                      dateScheduled: 
 *                              type: string
 *                      status:
 *                          type: enum
*/        


/**
 * @swagger
 *  components:
 *      /api/v1/jobPosts/{jobPostId}/jobInterview:
 *          post:
 *              summary: Job Interview for Posted Job
 *              tags:
 *                  - JobInterview
 *              parameters:
 *                  - in: path
 *                    name: jobPostId
 *                    required: true
 *                    schema:
 *                      type: string
 *                    description: ID of the Posted Job
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json: 
 *                              schema:
 *                                  $ref: '#/components/schemas/JobInterview'
 *              responses:
 *                  201:
 *                      description: Job Interview Posted
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                          $ref: '#/components/schemas/JobInterview'
 *                  400:
 *                      description: Bad request, check request body
 *                      
 *           
 */




export default router