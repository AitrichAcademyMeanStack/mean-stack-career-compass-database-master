import express from 'express' //import express
import controller from './controller.js'

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          jobcategory:
 *              type:object
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
 *  
 */

router.get('/',controller.getallcategories)
router.post('/',controller.createcategory)
router.put('/:id',controller.updatecategory)
router.delete('/:id',controller.deletecategory)
router.get('/:id',controller.getcontrollerbyid)



export default router