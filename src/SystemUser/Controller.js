import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler

//create new system users
const createsystemuser =asyncerrorhandler(async(req,res)=>{
    const systemdata = req.body
    const newuser = await service.createsystemuser(systemdata)
    res.status(201).json(newuser)
})

//update system user
const updatesystemuser =asyncerrorhandler(async(req,res)=>{
    const userid = req.params.id
    const systemdata = req.body
    const updateuser = await service.updatesystemuser(systemdata,userid)
    res.status(200).json(updateuser)
})

//delete system user
const deletesystemuser =asyncerrorhandler(async(req,res)=>{
    const userid = req.params.id
    await service.deletesystemuser(userid)
    res.status(200).json("system user deleted successfully")
})




export default {createsystemuser,updatesystemuser,deletesystemuser}