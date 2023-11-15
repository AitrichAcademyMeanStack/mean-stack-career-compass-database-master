import express from 'express' //import express
import controller from './controller.js'

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          jobcategory:
 *              type:object
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
router.get('/',controller.getallcategories)

/**
 * @swagger
 * /api/v1/job-categories:
 *  get:
 *      summary: create new job category
 *      description: this api is used to create new job category
 *      tags:
 *          - job-category
 *      responses:
 *          201:
 *              description:  job category added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/jobcategory'
 *          400:
 *              description: Not found error, check request body
 */
router.post('/',controller.createcategory)


router.put('/:id',controller.updatecategory)
router.delete('/:id',controller.deletecategory)


router.get('/:id',controller.getcontrollerbyid)



export default router