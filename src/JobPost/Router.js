import express from "express";
import jobPostController from "./Controller.js"
const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          JobPost:
 *              type: object
 *              required:
 *                  - jobTitle
 *                  - jobSummary
 *                  - jobLocation
 *                  - category
 *                  - qualification
 *                  - skills
 *                  - industry
 *                  - jobResponsibilities
 *              properties :
 *                  jobTitle:
 *                      type: string
 *                  jobSummary:
 *                      type: string
 *                  jobLocation:
 *                      type: array
 *                      items:
 *                          type: string
 *                  category:
 *                      type: array
 *                      items:
 *                          type: string
 *                  qualifications:
 *                      type: array
 *                      items:
 *                          type: string
 *                  skills:
 *                      type: array
 *                      items: 
 *                          type: string
 *                  industry:
 *                      type: array
 *                      items:
 *                          type: string
 *                  jobResponsibilities:
 *                          type: string
 *                      
 */

/**
 * @swagger
 *  /api/v1/jobPosts:
 *      get:
 *          summary: Get all JobPosts
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: query
 *                name: page
 *                description: Enter Page Number
 *                schema:
 *                      type: string
 *              - in: query
 *                name: limit
 *                description: Enter the limit
 *                schema:
 *                      type: string
 *              - in: query
 *                name: jobtitle
 *                description: filter with jobtitle
 *                schema:
 *                      type: string
 *              - in: query
 *                name: sort
 *                description: newest or oldest
 *                schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Return Array of JobPosts
 *                  content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref:   '#/components/schemas/JobPost'
 *                        
 */
router.get("/jobPosts",jobPostController.getAllJobPosts);

/**
 * @swagger
 *  /api/v1/companyUsers/{companyUserId}/jobPosts:
 *      post:
 *          summary: Add a new Job Post
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: path
 *                name: companyUserId
 *                required: true
 *                schema:
 *                  type: string
 *                description:  ID of the companyUser
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/JobPost'
 *          responses:
 *              201:
 *                  description: JobPost Added Successfully
 *                  content:
 *                          application/json:
 *                                  schema:
 *                                      $ref:   '#/components/schemas/JobPost'
 *              400:
 *                  description: Bad request, check request body
 *                                  
 *          
 *  
 */
router.post("/companyUsers/:companyUserId/jobPosts",jobPostController.createJobPost)

/**
 * @swagger
 * /api/v1/jobposts/count:
 *  get:
 *      summary: get all job-posts count 
 *      description: this api is used to get all job posts count
 *      tags:
 *          - JobPost
 *      responses:
 *          200:
 *              description:  returns the count of all job posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */
router.get('/jobposts/count', jobPostController.getTotalJobPosts);

/**
 * @swagger
 *  /api/v1/companyUser/{companyUserId}/jobPosts/{jobPostId}:
 *      get:
 *          summary: Get JobPost By Id
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: path
 *                name: companyUserId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the CompanyUser
 *              - in: path
 *                name: jobPostId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the JobPost
 *          responses:
 *              200:
 *                  description: JobPost Retrieved Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref:   '#/components/schemas/JobPost'
 *              400:
 *                  description: JobPost not found
 *                          
 */
router.get("/companyUsers/:companyUserId/jobPosts/:jobPostId",jobPostController.getJobPostById)

/**
 * @swagger
 *  /api/v1/companyUsers/{companyUserId}/jobPosts/{jobPostId}:
 *      put:
 *          summary: Update JobPost By ID
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: path
 *                name: companyUserId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the Company User
 *              - in: path
 *                name: jobPostId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the JobPost
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/JobPost'
 *          responses:
 *              200:
 *                  description: Job Post Updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref:   '#/components/schemas/JobPost'
 *              400:
 *                  description:  Job Post Not Found
 *      
 *          
 */
router.put("/companyUsers/:companyUserId/jobPosts/:jobPostId",jobPostController.updateJobPost)

/**
 * @swagger
 *  /api/v1/companyUsers/{companyUserId}/jobPosts/{jobPostId}:
 *      delete:
 *          summary: Delete Job Post By ID
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: path
 *                name: companyUserId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the CompanyUser
 *              - in: path
 *                name: jobPostId
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the Job Post to Delete
 *          responses:
 *              204:
 *                  description: JobPost Deleted Successfully
 *              404:
 *                  description: PostId not found
 */
router.delete("/companyUsers/:companyUserId/jobPosts/:jobPostId",jobPostController.deleteJobPost)

export default router