import express from "express";
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
 *                  - postedDate
 *              properties :
 *                  jobTitle:
 *                      type: string
 *                  jobSummary
 *                      type: string
 *                  jobLocation
 *                      type: string
 *                  company
 *                      type: string
 *                  category
 *                      type: string
 *                  qualification
 *                      type: string
 *                  skills:
 *                      type: string
 *                  industry:
 *                      type: string
 *                  jobResponsibilities:
 *                      type: string
 *                  postedBy:
 *                      type: string
 *                  postedDate:
 *                      type: string
 *                  
 *                      
 */
