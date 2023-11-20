import controller from './Controller.js' //importing controller
import express from 'express' //importing express

const router = express.Router()

router.get('/',controller.getallseekers)
router.get('/',controller.getseekerbyid)
router.post('/',controller.createseeker)
router.put('/:id',controller.updateseeker)
router.delete('/:id',controller.deleteseeker)


export default router