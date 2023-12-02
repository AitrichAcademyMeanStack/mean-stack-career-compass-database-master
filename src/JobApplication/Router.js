import  Express  from "express"; //importing express
import controller from './Controller.js'//importing controller

const router = Express.Router()

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobapplication:
 *  get:
 *      summary: getting all job applications
 *      description: this api is used to getting all job applications
 *      tags:
 *          - JobApplication
 *      parameters:
 *          - in: path
 *            name: seekerid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: returns an array of Job Applications
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *          400:
 *              description: not found error, check request body
 */
router.get('/:id1/jobapplication',controller.getallapplications) //get all job applications

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobapplication/{applicationid}:
 *  delete:
 *      summary: deleting job application with id
 *      description: this api is used to delete job application with id
 *      tags:
 *          - JobApplication
 *      parameters:
 *          - in: path
 *            name: seekerid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *          - in: path
 *            name: applicationid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: job application deleted successfully
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *          400:
 *              description: not found error, check request body
 */
router.delete('/:id1/jobapplication/:id2',controller.deleteapplication) //delete job application with specific id

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobpost/{jobpostid}/jobapplication:
 *  post:
 *      summary: added new job application
 *      description: this api is used to add new job application
 *      tags:
 *          - JobApplication
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
 *              description: job application added successfully
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *          400:
 *              description: not found error, check request body
 */
router.post('/:id1/jobpost/:id2/jobapplication',controller.createapplication) //add new job application


export default router
