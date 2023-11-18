import service from './Service.js'
import asyncerrorhandler from '../utils/asyncerrorhandler.js'

const createauthuser = asyncerrorhandler(async(req,res)=>{
    const authdata = req.body
    const systemuserid = req.params.id
    const newauth = await service.createauthuser(authdata,systemuserid)
    res.status(201).json(newauth)
})


export default {createauthuser}