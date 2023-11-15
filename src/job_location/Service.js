import location from "../models/LocationModel"

// fetching all locations
const getAllLocations = async() => {
    try {
        return await location.find();
    } catch (error) {
        throw error
    }

}

// fetching location by ID
const getLocationById = async(id) => {
    try {
        return await location.findById(id)
    } catch (error) {
        throw error
    }
}

// Adding new location
const addLocation = async(data) => {
    try {
        return await location.create(data)
    } catch (error) {
        throw error
    }

}

// Updating location
const updateLocation = async(id , updateData) => {
    try {
        return await location.findByIdAndUpdate(id,updateData)
    } catch (error) {
        throw error
    }

}

// Deleting location
const deleteLocation = async(id) => {
    try {
        return await location.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }
}

export default {getAllLocations , getLocationById , addLocation , updateLocation , deleteLocation}