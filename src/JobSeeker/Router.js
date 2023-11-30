import express from 'express' //import express
import controller from './Controller.js' //importing controller

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          jobseeker:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - userName
 *                  - email
 *                  - phone
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  userName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: string
 */


/**
 * @swagger
 * /api/v1/jobseekers:
 *  get:
 *      summary: get all job-seekers details
 *      description: this api is used to get all job seekers list
 *      tags:
 *          - JobSeeker
 *      responses:
 *          200:
 *              description:  returns an array of job-seekers
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseeker'
 */
router.get('/',controller.getallseekers)

/**
 * @swagger
 * /api/v1/jobseekers/{id}:
 *  get:
 *      summary: get job-seeker details with specific id
 *      description: this is is used to get job-seeker details with specific id
 *      tags:
 *          - JobSeeker
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: job-seeker retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseeker' 
 */
router.get('/:id',controller.getseekerbyid)

/**
 * @swagger
 * /api/v1/jobseekers:
 *  post:
 *      summary: create new job seeker details
 *      description: this api is used to create new job seeker
 *      tags:
 *          - JobSeeker
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/jobseeker'
 *      responses:
 *          201:
 *              description: job-seeker added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseeker'
 *          400:
 *              description: not found error, check request body
 * 
 */
router.post('/',controller.createseeker)

/**
 * @swagger
 * /api/v1/jobseekers/{id}:
 *  put:
 *      summary: update jobseeker details
 *      description: this api is used to update  jobseeker details
 *      tags:
 *          - JobSeeker
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
 *                      $ref: '#/components/schemas/jobseeker'
 *      responses:
 *          200:
 *              description: jobseeker updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseeker'
 *          400:
 *              description: not found error , check request body
 *                  
 */
router.put('/:id',controller.updateseeker)

/**
 * @swagger
 * /api/v1/jobseekers/{id}:
 *  delete:
 *      summary: delete jobseeker details
 *      description: this api is used to delete jobseeker details
 *      tags:
 *          - JobSeeker
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: job-seeker deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseeker'
 * 
 */
router.delete('/:id',controller.deleteseeker)


export default router