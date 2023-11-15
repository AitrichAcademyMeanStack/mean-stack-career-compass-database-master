import express from 'express' //import express
import controller from './Controller.js'

const router = express()

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

router.get('',controller.getallcategories)
router.post('',controller.createcategory)
router.put('',controller.updatecategory)
router.delete('',controller.deletecategory)
router.get('',controller.getcontrollerbyid)



export default router