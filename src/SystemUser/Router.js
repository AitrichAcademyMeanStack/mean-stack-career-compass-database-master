import express from 'express' //importing express
import controller from './Controller.js' //importing controller

const router = express.Router()

router.post('/',controller.createsystemuser) //defining post request
router.put('/:id',controller.updatesystemuser) //defining put request
router.delete('/:id',controller.deletesystemuser) //defining delete request



export default router
