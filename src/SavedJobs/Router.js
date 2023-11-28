import express from 'express' //importing express
import controller from './Controller.js' //importing controller

const router = express.Router()


router.post('/:id/savedjobs',controller.createsavedjobs) //creating savedjobs
router.get('/:id/savedjobs',controller.getallsavedjobs) //getting all savedjobs
router.delete('/:id1/savedjobs/:id2',controller.deletesavedjobs) //deleting savedjobs


export default router