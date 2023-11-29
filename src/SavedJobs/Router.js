import express from 'express' //importing express
import controller from './Controller.js' //importing controller

const router = express.Router()


router.post('/:id1/jobpost/:id2/savedjobs',controller.createsavedjobs) //creating savedjobs
router.get('/:id1/jobpost/:id2/savedjobs',controller.getallsavedjobs) //getting all savedjobs
router.delete('/:id1/jobpost/:id2/savedjobs/:id3',controller.deletesavedjobs) //deleting savedjobs


export default router