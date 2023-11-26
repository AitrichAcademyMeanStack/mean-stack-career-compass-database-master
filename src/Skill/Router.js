import express from 'express' // importing express
import controller from './Controller.js' //importing controller
const router = express()

/**
 * @swagger
 *  components:
 *      schemas:
 *          skill:
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
 * /api/v1/skills:
 *  get:
 *      summary: get all skill details
 *      description: this api is used to get all skills list
 *      tags:
 *          - skill
 *      responses:
 *          200:
 *              description:  returns an array of skills
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/skill'
 */
router.get('/:key',controller.getallskills)

/**
 * @swagger
 * /api/v1/skills/{id}:
 *  get:
 *      summary: get skill details with specific id
 *      description: this is is used to get skill details with specific id
 *      tags:
 *          - skill
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: skill retrived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/skill' 
 */
router.get('/:id',controller.getskillbyid)

/**
 * @swagger
 * /api/v1/skills:
 *  post:
 *      summary: create new skill details
 *      description: this api is used to create new skill details
 *      tags:
 *          - skill
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/skill'
 *      responses:
 *          201:
 *              description: skill added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/skill'
 *          400:
 *              description: not found error, check request body
 * 
 */
router.post('/',controller.createskill)

/**
 * @swagger
 * /api/v1/skills/{id}:
 *  put:
 *      summary: update skill details
 *      description: this api is used to update skill details
 *      tags:
 *          - skill
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
 *                      $ref: '#/components/schemas/skill'
 *      responses:
 *          200:
 *              description: skill updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/skill'
 *          400:
 *              description: not found error , check request body
 *                  
 */
router.put('/:id',controller.updateskill)

/**
 * @swagger
 * /api/v1/skills/{id}:
 *  delete:
 *      summary: delete skill details
 *      description: this api is used to delete skill details
 *      tags:
 *          - skill
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: numeric id is required
 *            schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: skill deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/skill'
 * 
 */
router.delete('/:id',controller.deleteskill)



export default router