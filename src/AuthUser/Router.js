import express from 'express'
import controller from './Controller.js'
const router = express.Router()

router.post('/:id',controller.createauthuser)


export default router