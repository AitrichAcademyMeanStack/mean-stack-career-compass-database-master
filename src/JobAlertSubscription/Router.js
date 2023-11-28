import express from 'express' //importing express
import controller from './Controller.js' //importing controller

const router = express.Router()

router.post('/:id/jobsubscription',controller.createsubscription) //creating new job alert subscription


export default router //exporting router