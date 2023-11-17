import Notfounderror from "../Exceptions/Notfounderror.js";
import location from "../models/LocationModel.js"

// fetching all locations
const getAllLocations = async() => {
    try {
        return await location.find();
    } catch (error) {
        throw new Notfounderror("Locations not found")
    }

}

// fetching location by ID
const getLocationById = async(id) => {
    try {
        const result =  await location.findById(id)
        if (result) {
            return result
        }else {
            throw new Notfounderror("Location ID not found")
        }
    } catch (error) {
        throw error
    }
}

// Adding new location
const addLocation = async(data) => {
    try {
        const newData =  await location.create(data);
        if (!newData) {
            throw new Badrequesterror("Error while Adding location")
        }

    } catch (error) {
        throw error
    }

}

// Updating location
const updateLocation = async(id , updateData) => {
    try {
        const update =  await location.findByIdAndUpdate(id,updateData)
        if (update) {
            return update
        }else {
            throw new Badrequesterror("Error while updating Location")
        }
    } catch (error) {
        throw error
    }

}

// Deleting location
const deleteLocation = async(id) => {
    try {
        const deleteData = await location.findByIdAndDelete(id)
        if (deleteData) {
            return deleteData
        }
        else {
            throw new Badrequesterror("Error while deleting Location")

        }
    } catch (error) {
        throw error
    }
}

export default {getAllLocations , getLocationById , addLocation , updateLocation , deleteLocation}
