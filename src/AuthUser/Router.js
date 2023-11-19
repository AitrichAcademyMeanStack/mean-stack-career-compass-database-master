import express from 'express' //importing express
import controller from './Controller.js' //importing controller
const router = express.Router()

router.post('/:id',controller.createauthuser) //post request


export default router