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
 *      summary: get all jroles
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

export default router


