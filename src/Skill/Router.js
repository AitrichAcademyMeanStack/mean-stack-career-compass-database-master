import express from 'express'
const router = express()

/**
 * @swagger
 *  components:
 *      schemas:
 *          skill:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 */


/**
 * @swagger
 * /api/v1/skill:
 *  get:
 *      summary: get all job-category details
 *      description: this api is used to get all job-category list
 *      tags:
 *          - job-category
 *      responses:
 *          200:
 *              description:  returns an array of job_categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobcategory'
 */




export default router