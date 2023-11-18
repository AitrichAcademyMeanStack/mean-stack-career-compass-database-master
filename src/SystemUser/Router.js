import express from 'express' //importing express
import controller from './Controller.js' //importing controller

const router = express.Router()

router.post('/',controller.createsystemuser) //defining post request
// router.get('/',controller.getallsystemusers)
// router.get('/',controller.getuserbyid)
// router.put('/',controller.updatesystemuser)
// router.delete('/',controller.deletesystemuser)



export default router
