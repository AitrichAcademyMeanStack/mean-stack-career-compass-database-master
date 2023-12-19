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
 *  /api/v1/jobApplication/{jobApplicationId}/schedule-interview:
 *      post:
 *          summary: Post Job Interview
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

export default router