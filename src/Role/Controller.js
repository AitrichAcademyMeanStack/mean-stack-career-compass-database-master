import asyncerrorhandler from "../utils/asyncerrorhandler.js";
import roleService from './Service.js'

// fetching roles
const getRoles = asyncerrorhandler( async(req,res) => {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
})

// Adding Description
const addDescription = asyncerrorhandler( async (req,res) => {
    const desc = req.body;
    const addDes = await roleService.addDescription(desc)
    res.status(201).json(addDes)
})

export default {getRoles , addDescription}