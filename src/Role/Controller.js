import asyncerrorhandler from "../utils/asyncerrorhandler";
import roleService from './Service'

const getRoles = asyncerrorhandler( async(req,res) => {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
})

const addDescription = asyncerrorhandler( async (req,res) => {
    const desc = req.body;
    const addDes = await roleService.addDescription(desc)
    res.status(201).json(addDes)
})

export default {getRoles , addDescription}