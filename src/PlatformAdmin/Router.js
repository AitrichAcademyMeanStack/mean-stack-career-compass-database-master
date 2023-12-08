import express from 'express' //import express
import controller from './Controller.js' //importing controller

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          PlatformAdmin:
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
 * /api/v1/platformadmin:
 *  get:
 *      summary: get all job-seekers details
 *      description: this api is used to get all job seekers list
 *      tags:
 *          - Platformadmin
 *      responses:
 *          200:
 *              description:  returns an array of platformadmin
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/platformadmin'
 */
router.get('/',controller.getadmin)



/**
 * @swagger
 * /api/v1/platformadmin:
 *  post:
 *      summary: create new job admin details
 *      description: this api is used to create new admin
 *      tags:
 *          - Platform admin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/platformadmin'
 *      responses:
 *          201:
 *              description: platformadmin added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/platformadmin'
 *          400:
 *              description: not found error, check request body
 * 
 */
router.post('/',controller.createadmin)

/**
 * @swagger
 * /api/v1/platformadmin/{id}:
 *  put:
 *      summary: update platformadmin details
 *      description: this api is used to update  platformadmin details
 *      tags:
 *          - platformadmin
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
 *                      $ref: '#/components/schemas/platformadmin'
 *      responses:
 *          200:
 *              description: platformadmin updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/platformadmin'
 *          400:
 *              description: not found error , check request body
 *                  
 */
router.put('/:id',controller.updateadmin)

/**
 * @swagger
 * /api/v1/platformadmin/{id}:
 *  delete:
 *      summary: delete platformadmin details
 *      description: this api is used to deleteplatformadmin details
 *      tags:
 *          - platformadmin
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: platformadmin deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/platformadmin'
 * 
 */
router.delete('/:id',controller.deleteadmin)


export default router