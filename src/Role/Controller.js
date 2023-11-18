import asyncerrorhandler from "../utils/asyncerrorhandler";
import roleService from './Service'

const getRoles = asyncerrorhandler( async(req,res) => {
    const roles = await roleService.getAllRoles();
    res.status(200).json(roles);
})

export default getRoles