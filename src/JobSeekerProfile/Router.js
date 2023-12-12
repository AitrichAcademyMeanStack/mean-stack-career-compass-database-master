import express from 'express' //import express
import controller from './Controller.js' //importing controller
import upload from '../utils/FileUpload.js';

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
 *                  - resume
 *                  - qualifications
 *                  - workExperiences
 *                  - skills
 *              properties:
 *                  profileName:
 *                      type: string
 *                  profileSummary:
 *                      type: string
 *                  resume:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: String
 *                          resume:
 *                              type: String
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
 * /api/v1/jobseekers/{seeekerid}/profiles/{profileid}:
 *  get:
 *      summary: get all job-seeker profile details with specific id
 *      description: this is is used to get all job-seeker profile details with specific id
 *      tags:
 *          - JobSeeker-Profile
 *      parameters:
 *          - in: path
 *            name: seeekerid
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
 *              description: get all job-seeker profile detailes retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseekerprofile' 
 */
router.get('/:id1/profiles/:id2',controller.getallprofile)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles:
 *  post:
 *      summary: create new job seeker profile details
 *      description: this api is used to create new job seeker profile
 *      tags:
 *          - JobSeeker-Profile
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
router.post('/:id1/profiles/:id2',controller.createprofile)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}:
 *  put:
 *      summary: update jobseeker profile details
 *      description: this api is used to update  jobseeker profile details
 *      tags:
 *          - JobSeeker-Profile
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
 *          - JobSeeker-Profile
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


// /**
//  * @swagger
//  * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/resume:
//  *  put:
//  *      summary: update jobseeker resume details
//  *      description: this api is used to update  jobseeker resume details
//  *      tags:
//  *          - JobSeeker-Profile
//  *      parameters:
//  *          - in: path
//  *            name: seekerid
//  *            required: true
//  *            description: numeric id is required
//  *            schema:
//  *                  type: string
//  *          - in: path
//  *            name: profileid
//  *            required: true
//  *            description: numeric id is required
//  *            schema:
//  *                  type: string
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: '#/components/schemas/jobseekerprofile'
//  *      responses:
//  *          200:
//  *              description: jobseeker resume updated successfully
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/jobseekerprofile'
//  *          400:
//  *              description: not found error , check request body
//  *                  
//  */
router.put('/:seekerid/profiles/:profileid/resume',controller.resumeupload)
router.put('/:seekerid/profiles/:profileid/skill',controller.addskill)
router.put('/:seekerid/profiles/:profileid/qualification',controller.addqualification)
router.put('/:seekerid/profiles/:profileid/profilepicture',controller.addprofilepicture)
router.put('/:seekerid/profiles/:profileid/profilename',controller.addprofilename)
router.put('/:seekerid/profiles/:profileid/profilesummary',controller.addprofilesummary)
router.put('/:seekerid/profiles/:profileid/workexperience',controller.addworkexperience)



export default router