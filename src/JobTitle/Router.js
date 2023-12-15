import express from 'express' // importing express
import controller from './Controller.js' //importing controller
const router = express.Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          jobtitle:
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
@swagger
 * /api/v1/jobtitle:
 *  get:
 *      summary: get all  jobtitles
 *      description: this is is used to get  all jobtitles
 *      tags:
 *          - JobTitle
 *      responses:
 *          200:
 *              description: Jobtitle retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobtitle' 
 */
router.get('/',controller.getalljobtitle)



//create new jobtitle
/**
 * @swagger
 * /api/v1/jobtitle:
 *  post:
 *      summary: create new jobtitle details
 *      description: this api is used to create new jobtitle details
 *      tags:
 *          - JobTitle
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/jobtitle'
 *      responses:
 *          201:
 *              description: jobtitle added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobtitle'
 *          400:
 *              description: not found error, check request body
 */
router.post('/',controller.createJobTitle)



//delete jobtitle
/**
 * @swagger
 * /api/v1/jobtitle/{id}:
 *  delete:
 *      summary: delete JobTitle details
 *      description: this api is used to delete JobTitle details
 *      tags:
 *          - JobTitle
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: jobtitle deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/jobtitle'
 * 
 */

router.delete('/:id',controller.deleteJobTitle)



//update jobtitle
/**
 * @swagger
 * /api/v1/jobtitle/{id}:
 *  put:
 *      summary: update jobtitle details
 *      description: this api is used to update jobtitle details
 *      tags:
 *          - JobTitle
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
 *                      $ref: '#/components/schemas/jobtitle'
 *      responses:
 *          200:
 *              description: jobtitle updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/jobtitle'
 *          400:
 *              description: not found error , check request body
 *                  
 */

router.put('/:id',controller.updateJobTitle)



export default router
