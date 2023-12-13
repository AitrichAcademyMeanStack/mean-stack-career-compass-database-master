import express from 'express' //import express
import controller from './Controller.js' //importing controller
import {uploadresume,uploadprofilepicture} from '../utils/FileUpload.js'

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
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/resume:
 *  put:
 *      summary: update jobseeker resume details
 *      description: This API is used to update jobseeker resume details.
 *      consumes:
 *        - multipart/form-data
 *      tags:
 *        - JobSeeker-Profile
 *      parameters:
 *        - in: path
 *          name: seekerid
 *          required: true
 *          description: Numeric ID is required.
 *          schema:
 *            type: string
 *        - in: path
 *          name: profileid
 *          required: true
 *          description: Numeric ID is required.
 *          schema:
 *            type: string
 *        - in: formData
 *          name: Resume
 *          type: file
 *          required: true
 *          description: The file Resume to upload
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: '#/components/schemas/Resume'
 *      responses:
 *        200:
 *          description: Jobseeker resume updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/jobseekerprofile'
 *        400:
 *          description: Not found error, check the request body
 */

router.put('/:seekerid/profiles/:profileid/resume',uploadresume.single('Resume'),controller.resumeupload)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/skill:
 *  put:
 *      summary: update skills in jobseeker profile
 *      description: this api is used to update  skills in jobseeker profile
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
router.put('/:seekerid/profiles/:profileid/skill',controller.addskill)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/qualification:
 *  put:
 *      summary: update qualifications in jobseeker profile
 *      description: this api is used to update qualifications in jobseeker profile
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
router.put('/:seekerid/profiles/:profileid/qualification',controller.qualificationupdate)

router.put('/:seekerid/profiles/:profileid/profilepicture',uploadprofilepicture.single('ProfilePicture'),controller.addprofilepicture)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/profilename:
 *  put:
 *      summary: update profilename in jobseeker profile
 *      description: this api is used to update profilename in jobseeker profile
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
router.put('/:seekerid/profiles/:profileid/profilename',controller.addprofilename)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/profilesummary:
 *  put:
 *      summary: update profilesummary in jobseeker profile
 *      description: this api is used to update profilesummary in jobseeker profile
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
router.put('/:seekerid/profiles/:profileid/profilesummary',controller.updateprofilesummary)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/workexperience:
 *  put:
 *      summary: update workexperience in jobseeker profile
 *      description: this api is used to update  workexperience in jobseeker profile
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
router.put('/:seekerid/profiles/:profileid/workexperience',controller.addworkexperience)

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/skills/{skillname}:
 *  delete:
 *      summary: update skills in jobseeker profile
 *      description: this api is used to update  skills in jobseeker profile
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
 *          - in: path
 *            name: skillname
 *            required: true
 *            description: skill name is required
 *            schema:
 *                  type: string
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
router.delete('/:seekerid/profiles/:profileid/skills/:skillname',controller.deleteskills)
// router.delete('/:seekerid/profiles/:profileid/qualification',controller.deletequalification)
// router.delete('/:seekerid/profiles/:profileid/workexperience',controller.deleteworkexperience)
// router.delete('/:seekerid/profiles/:profileid/resume',controller.deleteresume)
// router.delete('/:seekerid/profiles/:profileid/profilepicture',controller.deleteprofilepictre)



export default router