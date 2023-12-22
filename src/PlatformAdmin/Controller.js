import service from './Service.js' //importing service
import asyncerrorhandler from '../utils/asyncerrorhandler.js' //importing asynchronous error handler

const getadmin = asyncerrorhandler(async(req,res)=>{
    const getadmin = await service.getadmin()
    res.status(200).json(getadmin)
});


//create new job seeker
const createadmin = asyncerrorhandler(async(req,res)=>{
  const admindata = req.body 
  const create = await service.createadmin(admindata)
  res.status(201).json(create) 
})

//update job seeker by specific id
const updateadmin = asyncerrorhandler(async(req,res)=>{
    const adminid = req.params.id
    const admindata = req.body
    const update = await service.updateadmin(adminid,admindata)
    res.status(200).json(update)
})

// delete admin with specific id
const deleteadmin = asyncerrorhandler(async(req,res)=>{
    const adminid = req.params.id
    await service.adminseeker(adminid)
    res.status(200).json("admin deleted successfully")
})

//Login admin
const loginAdmin = asyncerrorhandler(async(req,res)=>{
    const data=req.body
    await service.loginAdmin(data)
    res.status(200).json("Admin Login successfully!!")
})

const changepassword = asyncerrorhandler(async(req,res)=>{
  
    const data = req.body
    await service.changepassword(data)
    res.status(200).json("platform admin password changed successfully")
})



export default {getadmin,createadmin,updateadmin,deleteadmin,loginAdmin,changepassword}