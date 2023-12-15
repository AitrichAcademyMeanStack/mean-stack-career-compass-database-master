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
 *  /api/v1/jobPosts/{jobPostId}/jobSeeker/{jobSeekerId}/jobApplication/{jobApplicationId}:
 *      post:
 *          summary: Post Job Interview
 *          tags:
 *              - JobInterview
 *          parameters:
 *              - in: path
 *                name: jobPostId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the JobPost
 *              - in: path
 *                name: jobSeekerId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the JobSeeker
 *              - in: path
 *                name: jobApplicationId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the JobApplication
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

router.post('/:jobPostId/jobSeeker/:jobSeekerId/jobApplication/:jobApplicationId/jobInterview',Controller.addJobInterview)

export default router