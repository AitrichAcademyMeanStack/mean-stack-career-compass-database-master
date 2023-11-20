import express from 'express'
import roleController from './Controller.js'
const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 */


/**
 * @swagger
 * /api/v1/roles:
 *  get:
 *      summary: Get all roles
 *      description: this api is used to get all roles
 *      tags:
 *          - Role
 *      responses:
 *          200:
 *              description:  returns an array of roles
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Role'
 */
router.get('/',roleController.getRoles)
/**
 * @swagger
 * /api/v1/roles:
 *  post:
 *      summary: Add roles
 *      tags:
 *          - Role
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *      responses:
 *          201:
 *              description: Role added Successfully
 *              content:
 *                  application/json:
 *                          schema:
 *                              ref: '#/components/schemas/Role'
 *          400:
 *              description: Bad request, check the request body
 *                    
 *  
 *      
 */
router.post('/',roleController.addDescription)

export default router


