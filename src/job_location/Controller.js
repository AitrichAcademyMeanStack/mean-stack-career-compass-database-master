import asyncerrorhandler from "../utils/asyncerrorhandler.js";
import locationService from "./service.js"

// fetching all locations
const getAllLocations = asyncerrorhandler ( async (req,res) => {
    await locationService.getAllLocations();
    res.status(200).json({message: "List of locations"})

})

// fetching location by ID
const getLocationById = asyncerrorhandler ( async (req,res) => {
    const locationId = req.params.id;
    await locationService.getLocationById(locationId);
    res.status(200).json({message: "Fetched location"})

})

// adding location
const addLocation = asyncerrorhandler (async (req,res) => {
    const newLocation = req.body;
    const location = await locationService.addLocation(newLocation)
    res.status(201).json(location)

})

// updating location
const updateLocation = asyncerrorhandler ( async (req ,res) => {
    const locationId = req.params.id;
    const Location = req.body;
    const updateData = await locationService.updateLocation(locationId , Location);
    res.status(200).json(updateData)
})

// Deleting location
const deleteLocation = asyncerrorhandler (async (req,res) => {
    const locationId = req.param.id;
    await locationService.deleteLocation(locationId)
    res.status(200).json({message: "Location deleted Successfully"})

})

export default {getAllLocations , getLocationById , addLocation , updateLocation , deleteLocation}
