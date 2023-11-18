import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler

//create new system users
const createsystemuser =asyncerrorhandler(async(req,res)=>{
    const systemdata = req.body
    const newuser = await service.createsystemuser(systemdata)
    res.status(201).json(newuser)
})


export default {createsystemuser}