import express from 'express' //import express
import controller from './Controller.js' //importing controller

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          jobseekerprofile:
 *              type: object
 *              required:
 *                  - profileName
 *                  - profileSummary
 *                  - qualifications
 *                  - workExperiences
 *                  - skills
 *              properties:
 *                  profileName:
 *                      type: string
 *                  profileSummary:
 *                      type: string
 *                  qualifications:
 *                      type: array
 *                      items:
 *                          type: String
 *                  workExperiences:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              jobTitle:
 *                                  type: String
 *                              companyName:
 *                                  type: String
 *                              summary:
 *                                  type: String
 *                              serviceStart:
 *                                  type: String
 *                              serviceEnd:
 *                                  type: String
 *                  skills:
 *                      type: array
 *                      items:
 *                          type: String
 */


/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles:
 *  post:
 *      summary: create new job seeker profile details
 *      description: this api is used to create new job seeker profile
 *      tags:
 *          - jobseeker-profile
 *      parameters:
 *          - in: path
 *            name: seekerid
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/jobseekerprofile'
 *      responses:
 *          201:
 *              description: job-seeker profile created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseekerprofile'
 *          400:
 *              description: not found error, check request body
 * 
 */
router.post('/:id/profiles',controller.createprofile)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}:
 *  put:
 *      summary: update jobseeker profile details
 *      description: this api is used to update  jobseeker profile details
 *      tags:
 *          - jobseeker-profile
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/jobseekerprofile'
 *      responses:
 *          200:
 *              description: jobseeker profile updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseekerprofile'
 *          400:
 *              description: not found error , check request body
 *                  
 */
router.put('/:id1/profiles/:id2',controller.profileupdate)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}:
 *  delete:
 *      summary: delete jobseeker profile details
 *      description: this api is used to delete jobseeker profile details
 *      tags:
 *          - jobseeker-profile
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
 *      responses:
 *          200:
 *              description: job-seeker profile deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseekerprofile'
 * 
 */
router.delete('/:id1/profiles/:id2',controller.deleteprofile)


export default router