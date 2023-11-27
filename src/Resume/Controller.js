import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler


//create file upload
const createresume = asyncerrorhandler(async(req,res)=>{
    await service.createresume(req);
    res.status(201).json({ message: "Resume uploaded successfully" });
})

//delete file upload
const deleteresume = asyncerrorhandler(async(req,res)=>{
    const fileid = req.params.id
    await service.deleteresume(fileid)
    res.status(200).json("File deleted successfully")
})

export default {createresume,deleteresume}