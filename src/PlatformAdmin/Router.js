import express from 'express' //import express
import controller from './Controller.js' //importing controller

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          PlatFormAdmin:
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
 * /api/v1/platFormAdmin:
 *  get:
 *      summary: get all job-seekers details
 *      description: this api is used to get all job seekers list
 *      tags:
 *          - PlatFormAdmin
 *      responses:
 *          200:
 *              description:  returns an array of platformadmin
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/PlatFormAdmin'
 */
router.get('/',controller.getadmin)



/**
 * @swagger
 * /api/v1/platFormAdmin:
 *  post:
 *      summary: create new job admin details
 *      description: this api is used to create new admin
 *      tags:
 *          - PlatFormAdmin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PlatFormAdmin'
 *      responses:
 *          201:
 *              description: platformadmin added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PlatFormAdmin'
 *          400:
 *              description: not found error, check request body
 * 
 */
router.post('/',controller.createadmin)

/**
 * @swagger
 * /api/v1/platformadmin/login:
 *  post:
 *      summary: PlatformAdmin Login
 *      description: PlatformAdmin Login
 *      tags:
 *          - PlatFormAdmin
 *     
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                         email:
 *                          type: string
 *                         password:
 *                          type: string
 *      responses:
 *          201:
 *              description: Login Successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ PlatFormAdmin'
 *          400:
 *              description: not found error, check request body
 */
router.post("/login", controller.loginAdmin)



/**
 * @swagger
 * /api/v1/platformadmin/changepassword:
 *  put:
 *      summary: Platformadmin change password
 *      description: this api is used  to change password
 *      tags:
 *          - PlatFormAdmin
 *     
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                         oldpassword:
 *                          type: string
 *                         newpassword:
 *                          type: string
 *                         confirmpassword:
 *                          type: string
 *      responses:
 *          201:
 *              description: password changes  successfullly
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/platformadmin'
 *          400:
 *              description: not found error, check request body
 */
router.put('/changepassword')



/**
 * @swagger
 * /api/v1/platformadmin/{id}:
 *  put:
 *      summary: update platformadmin details
 *      description: this api is used to update  platformadmin details
 *      tags:
 *          - PlatFormAdmin
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
 *                      $ref: '#/components/schemas/PlatFormAdmin'
 *      responses:
 *          200:
 *              description: platformadmin updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PlatFormAdmin'
 *          400:
 *              description: not found error , check request body
 *                  
 */
router.put('/:id',controller.changepassword)

/**
 * @swagger
 * /api/v1/platformadmin:
 *  delete:
 *      summary: delete platformadmin details
 *      description: this api is used to deleteplatformadmin details
 *      tags:
 *          - PlatFormAdmin
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
 *                              $ref: '#/components/schemas/PlatFormAdmin'
 * 
 */
router.delete('/:id',controller.deleteadmin)





export default router