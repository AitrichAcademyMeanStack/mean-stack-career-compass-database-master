import express from 'express' //import express
import controller from './Controller.js' //importing controller
import {uploadresume,uploadprofilepicture} from '../utils/FileUpload.js' //importing resume upload and profile picture upload function

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          JobSeeker-Profile:
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
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: String
 *                              institution:
 *                                  type: String
 *                              startdate:
 *                                  type: String
 *                              enddate:
 *                                  type: String
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
router.get('/:id1/profiles/:id2',controller.getallprofile) //getting all profiles


router.get('/:seekerid/profiles/:profileid/skills')


//get all qualification
/**
 * @swagger
 * /api/v1/jobseekers/{seeekerid}/profiles/{profileid}/qualifications:
 *  get:
 *      summary: get  job-seeker qualification
 *      description: this is is used to get all job-seeker qualification
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
 *              description: job-seeker qualification retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseekerprofile' 
 */
router.get('/:seekerid/profiles/:profileid/qualifications',controller.getqualification)

router.get('/:seekerid/profiles/:profileid/qualifications')
router.get('/:seekerid/profiles/:profileid/workexperiences',controller.getWorkExperience)
router.get('/:seekerid/profiles/:profileid/resume')
router.get('/:seekerid/profiles/:profileid/profilepicture')

//get profilename
/**
 * @swagger
 * /api/v1/jobseekers/{seeekerid}/profiles/{profileid}/profilename:
 *  get:
 *      summary: get all job-seeker profile name with specific id
 *      description: this is is used to get all job-seeker profile name with specific id
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
 *              description: job-seeker profile name retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseekerprofile' 
 */
router.get('/:seekerid/profiles/:profileid/profilename',controller.getprofilename)

//get profile summary
/**
 * @swagger
 * /api/v1/jobseekers/{seeekerid}/profiles/{profileid}/profilesummary:
 *  get:
 *      summary: get  job-seeker profile summary 
 *      description: this is  used to get job-seeker profile summary with specific id
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
 *              description: job-seeker profile summary retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobseekerprofile' 
 */
router.get('/:seekerid/profiles/:profileid/profilesummary',controller.getprofilesummary)


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
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                Resume:
 *                  type: string
 *                  format: binary
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
router.put('/:seekerid/profiles/:profileid/resume',uploadresume.single('Resume'),controller.resumeupload) //adding resume

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
 *                      properties:
 *                          skills:
 *                              type: array
 *                              items:
 *                                  type: String
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
router.put('/:seekerid/profiles/:profileid/skill',controller.addskill) //adding skills

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
 *                      properties:
 *                       qualifications:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: String
 *                                  institution:
 *                                      type: String
 *                                  startdate:
 *                                      type: String
 *                                  enddate:
 *                                      type: String
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
router.put('/:seekerid/profiles/:profileid/qualification',controller.qualificationupdate) //adding qualifications

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/profilepicture:
 *  put:
 *      summary: add profilepicture in jobseeker profilepicture details
 *      description: This API is used to add profilepicture in jobseeker profile.
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
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                ProfilePicture:
 *                  type: string
 *                  format: binary
 *      responses:
 *        200:
 *          description: Jobseeker ProfilePicture updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/jobseekerprofile'
 *        400:
 *          description: Not found error, check the request body
 */
router.put('/:seekerid/profiles/:profileid/profilepicture',uploadprofilepicture.single('ProfilePicture'),controller.addprofilepicture) //adding profile picture

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
 *                      properties:
 *                         profileName:
 *                          type: string
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
router.put('/:seekerid/profiles/:profileid/profilename',controller.addprofilename) //adding profile name

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
 *                      properties:
 *                         profileSummary:
 *                          type: string
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
router.put('/:seekerid/profiles/:profileid/profilesummary',controller.updateprofilesummary) //adding profile summary

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
 *                      properties:
 *                       workExperiences:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  jobTitle:
 *                                      type: String
 *                                  companyName:
 *                                      type: String
 *                                  summary:
 *                                      type: String
 *                                  serviceStart:
 *                                      type: String
 *                                  serviceEnd:
 *                                      type: String
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
router.put('/:seekerid/profiles/:profileid/workexperience',controller.addworkexperience) //adding work experience

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/skills/{skillname}:
 *  delete:
 *      summary: delete skills in jobseeker profile
 *      description: this api is used to delete  skills in jobseeker profile
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
 *              description: skill deleted from jobseeker profile successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseekerprofile'
 *          400:
 *              description: not found error , check request body
 *                  
 */
router.delete('/:seekerid/profiles/:profileid/skills/:skillname',controller.deleteskills) //deleting skills

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/qualifications/{qualificationid}:
 *  delete:
 *      summary: delete qualifications in jobseeker profile
 *      description: this api is used to delete  qualifications in jobseeker profile
 *      tags:
 *          - JobSeeker-Profile
 *      parameters:
 *          - in: path
 *            name: seekerid
 *            required: true
 *            description: seeker id is required
 *            schema:
 *                  type: string
 *          - in: path
 *            name: profileid
 *            required: true
 *            description: profile id is required
 *            schema:
 *                  type: string
 *          - in: path
 *            name: qualificationid
 *            required: true
 *            description: qualification id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: qualification deleted from jobseeker profile successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseekerprofile'
 *          400:
 *              description: not found error , check request body  
 */
router.delete('/:seekerid/profiles/:profileid/qualifications/:qualificationid',controller.deletequalification) //deleting qualifications

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/workexperiences/{workexperienceid}:
 *  delete:
 *      summary: delete workexperiences in jobseeker profile
 *      description: this api is used to delete  workexperiences in jobseeker profile
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
 *            name: workexperienceid
 *            required: true
 *            description: qualification name is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: workexperiences deleted from jobseeker profile successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseekerprofile'
 *          400:
 *              description: not found error , check request body  
 */
router.delete('/:seekerid/profiles/:profileid/workexperiences/:workexperienceid',controller.deleteworkexperience) //deleting work experiences

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/resume:
 *  delete:
 *      summary: delete resume in jobseeker profile
 *      description: this api is used to delete  resume in jobseeker profile
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
 *              description: resume deleted from jobseeker profile successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseekerprofile'
 *          400:
 *              description: not found error , check request body  
 */
router.delete('/:seekerid/profiles/:profileid/resume',controller.deleteresume) // deleting resume

/**
 * @swagger
 * /api/v1/jobseekers/{seekerid}/profiles/{profileid}/profilepicture:
 *  delete:
 *      summary: delete profilepicture in jobseeker profile
 *      description: this api is used to delete  profilepicture in jobseeker profile
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
 *              description: profilepicture deleted from jobseeker profile successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobseekerprofile'
 *          400:
 *              description: not found error , check request body  
 */
router.delete('/:seekerid/profiles/:profileid/profilepicture',controller.deleteprofilepictre) //deleting profile picture



export default router