import express from 'express' //import express
import controller from './controller.js' //importing controller

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          jobcategory:
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
 * /api/v1/job-categories:
 *  get:
 *      summary: get all job-category details
 *      description: this api is used to get all job-category list
 *      tags:
 *          - JobCategory
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
router.get('/',controller.getallcategories)

/**
 * @swagger
 * /api/v1/job-categories/{id}:
 *  get:
 *      summary: get job-category details with specific id
 *      description: this is is used to get category details with specific id
 *      tags:
 *          - JobCategory
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: job-category retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobcategory' 
 */
router.get('/:id',controller.getcategorybyid)

/**
 * @swagger
 * /api/v1/job-categories:
 *  post:
 *      summary: create new job category details
 *      description: this api is used to create new job category
 *      tags:
 *          - JobCategory
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/jobcategory'
 *      responses:
 *          201:
 *              description: job-category added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobcategory'
 *          400:
 *              description: not found error, check request body
 * 
 */
router.post('/',controller.createcategory)

/**
 * @swagger
 * /api/v1/job-categories/{id}:
 *  put:
 *      summary: update category details
 *      description: this api is used to update job category details
 *      tags:
 *          - JobCategory
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/jobcategory'
 *      responses:
 *          200:
 *              description: category updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobcategory'
 *          400:
 *              description: not found error , check request body
 *                  
 */
router.put('/:id',controller.updatecategory)

/**
 * @swagger
 * /api/v1/job-categories/{id}:
 *  delete:
 *      summary: delete category details
 *      description: this api is used to delete category details
 *      tags:
 *          - JobCategory
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: job-category deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobcategory'
 * 
 */
router.delete('/:id',controller.deletecategory)





export default router