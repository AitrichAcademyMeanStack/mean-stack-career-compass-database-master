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
 * /api/v1/jobseekerprofiles/{profileid}/jobpost/{jobpostid}/jobapplication:
 *  get:
 *      summary: getting all job applications
 *      description: this api is used to getting all job applications
 *      tags:
 *          - JobApplication
 *      parameters:
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
 *      responses:
 *          200:
 *              description: returns an array of Job Applications
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/jobapplication'
 *          400:
 *              description: not found error, check request body
 */
router.get('/:profileid/jobpost/:jobpostid/jobapplication',controller.getallapplications) //get all job applications

/**
 * @swagger
 * /api/v1/jobseekerprofiles/{profileid}/jobpost/{jobpostid}/jobapplication/{applicationid}:
 *  delete:
 *      summary: deleting job application with id
 *      description: this api is used to delete job application with id
 *      tags:
 *          - JobApplication
 *      parameters:
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
router.delete('/:profileid/jobpost/:jobpostid/jobapplication/:applicationid',controller.deleteapplication) //delete job application with specific id

/**
 * @swagger
 * /api/v1/jobseekerprofiles/{profileid}/jobpost/{jobpostid}/jobapplication:
 *  post:
 *      summary: added new job application
 *      description: this api is used to add new job application
 *      tags:
 *          - JobApplication
 *      parameters:
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
router.post('/:profileid/jobpost/:jobpostid/jobapplication',controller.createapplication) //add new job application


export default router
