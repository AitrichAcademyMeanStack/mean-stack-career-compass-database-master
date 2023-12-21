import express from 'express' //importing express
import controller from './Controller.js' //importing controller
const router = express.Router()



/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobpost/{jobpostid}/savedjobs?page={pagenumber}&limit={limit}:
 *  get:
 *      summary: getting all saved jobs
 *      description: this api is used to getting all saved jobs
 *      tags:
 *          - SavedJobs
 *      parameters:
 *          - in: path
 *            name: seekerid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *          - in: path
 *            name: jobpostid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *          - in: query
 *            name: page
 *            required: true
 *            description: the number of page 
 *            schema:
 *                  type: string
 *          - in: query
 *            name: limit
 *            required: true
 *            description: the number of limit
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: returns an array of saved jobs
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *          400:
 *              description: not found error, check request body
 */
router.get('/:seekerid/jobpost/:jobpostid/savedjobs',controller.getallsavedjobs) //getting all savedjobs


/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobpost/{jobpostid}/savedjobs:
 *  post:
 *      summary: jobs are added to the saved jobs
 *      description: this api is used to add the jobs into saved jobs
 *      tags:
 *          - SavedJobs
 *      parameters:
 *          - in: path
 *            name: seekerid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *          - in: path
 *            name: jobpostid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          201:
 *              description: saved jobs added successfully
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *          400:
 *              description: not found error, check request body
 */
router.post('/:seekerid/jobpost/:jobpostid/savedjobs',controller.createsavedjobs) //creating savedjobs



/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobpost/{jobpostid}/savedjobs/{savedjobid}:
 *  delete:
 *      summary: deleting saved job with id
 *      description: this api is used to delete saved job with id
 *      tags:
 *          - SavedJobs
 *      parameters:
 *          - in: path
 *            name: seekerid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *          - in: path
 *            name: jobpostid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *          - in: path
 *            name: savedjobid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: saved job deleted successfully
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *          400:
 *              description: not found error, check request body
 */
router.delete('/:seekerid/jobpost/:jobpostid/savedjobs/:savedjobid',controller.deletesavedjobs) //deleting savedjobs


export default router