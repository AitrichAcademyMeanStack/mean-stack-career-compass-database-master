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
 *                  - company
 *                  - category
 *                  - qualification
 *                  - skills
 *                  - industry
 *                  - jobResponsibilities
 *                  - postedBy
 *              properties :
 *                  jobTitle:
 *                      type: string
 *                  jobSummary:
 *                      type: string
 *                  jobLocation:
 *                      type: string
 *                  company:
 *                      type: string
 *                  category:
 *                      type: string
 *                  qualification:
 *                      type: string
 *                  skills:
 *                      type: string
 *                  industry:
 *                      type: string
 *                  jobResponsibilities:
 *                      type: string
 *                  postedBy:
 *                      type: string
 *                      
 */
/**
 * @swagger
 *  /api/v1/jobPosts:
 *      get:
 *          summary: Get all JobPosts
 *          tags:
 *              - JobPost
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
router.get("/",jobPostController.getAllJobPosts);

/**
 * @swagger
 *  /api/v1/jobPosts:
 *      post:
 *          summary: Add a new Job Post
 *          tags:
 *              - JobPost
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
router.post("/",jobPostController.createJobPost)

/**
 * @swagger
 *  /api/v1/jobPosts/{id}:
 *      get:
 *          summary: Get JobPost By Id
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: path
 *                name: id
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
router.get("/:id",jobPostController.getJobPostById)

/**
 * @swagger
 *  /api/v1/jobPosts/{id}:
 *      put:
 *          summary:    Update JobPost By ID
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the JobPost to Update
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
router.put("/:id",jobPostController.updateJobPost)

/**
 * @swagger
 *  /api/v1/jobPosts/{id}:
 *      delete:
 *          summary: Delete Job Post By ID
 *          tags:
 *              - JobPost
 *          parameters:
 *              - in: path
 *                name: id
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
router.delete("/:id",jobPostController.deleteJobPost)

export default router