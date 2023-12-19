import  Express  from "express"; //importing express
import controller from './Controller.js'//importing controller

const router = Express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          jobapplication:
 *              type: object
 *              required:
 *                  - coverletter
 *                  - status
 *              properties:
 *                  coverletter:
 *                      type: string
 *                  status:
 *                      type: string
 */



/**
 * @swagger
 * /api/v1/jobapplications?page={pagenumber}&limit={limit}:
 *  get:
 *      summary: getting all job applications
 *      description: this api is used to getting all job applications
 *      tags:
 *          - JobApplication
 *      parameters:
 *          
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
 *              description: returns an array of all Job Applications
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/jobapplication'
 *          400:
 *              description: not found error, check request body
 */
router.get('/jobapplications',controller.getalljobapplications) 


//get all jobapplication by seeker
/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobapplications?page={pagenumber}&limit={limit}:
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
 *              description: returns an array of all Job Applications
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/jobapplication'
 *          400:
 *              description: not found error, check request body
 */
router.get('/jobseekers/:seekerid/jobapplications',controller.getallapplications) //get all job applications

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/jobapplications/{applicationid}:
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
 *                          $ref: '#/components/schemas/jobapplication'
 *          400:
 *              description: not found error, check request body
 */
router.delete('/jobseekers/:seekerid/jobapplications/:applicationid',controller.deleteapplication) //delete job application with specific id

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/jobposts/{jobpostid}/jobapplications:
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
 *            name: profileid
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/jobapplication'
 *      responses:
 *          201:
 *              description: job application added successfully
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/jobapplication'
 *          400:
 *              description: not found error, check request body
 */
router.post('/jobseekers/:seekerid/profiles/:profileid/jobposts/:jobpostid/jobapplications',controller.createapplication) //add new job application


export default router
