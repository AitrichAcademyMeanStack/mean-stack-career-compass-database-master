import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler
import service from './Service.js'//importing service

//creating new job alert subscription
const createsubscription=asyncerrorhandler(async(req,res)=>{
    const seekerid = req.params.id
    const subscriptiondata = req.body
    const newalert = await service.createsubscription(seekerid,subscriptiondata)
    res.status(201).json(newalert)
})


export default {createsubscription}