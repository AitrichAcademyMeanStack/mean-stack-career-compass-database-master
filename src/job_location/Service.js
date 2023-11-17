import Badrequesterror from "../Exceptions/Badrequesterror.js";
import Notfounderror from "../Exceptions/Notfounderror.js";
import logger from "../middleware/logger.js";
import Location from "../models/LocationModel.js"

// fetching all locations
const getAllLocations = async() => {
    try {
        return await Location.find();
    } catch (error) {
        throw new Notfounderror("Locations not found");
    }

}

// fetching location by ID
const getLocationById = async(id) => {
    try {
        const result =  await Location.findById(id)
        if (result) {
            logger.info("location :", result)
            return result
        }else {
            logger.error("Error while fetching location");
            throw new Notfounderror("Location ID not found")
        }
    } catch (error) {
        throw error
    }
}

// Adding new location
const addLocation = async(data) => {
    try {
        const newData =  await Location.create(data);
        if (newData) {
            logger.info("New location :", newData)
            return newData;
        }else {
            logger.error("Error while adding location");
            throw new Badrequesterror("Error while adding new location")
        }

    } catch (error) {
        throw error
    }

}

// Updating location
const updateLocation = async(id , updateData) => {
    try {
        const update =  await Location.findByIdAndUpdate(id,updateData)
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
        const deleteData = await Location.findByIdAndDelete(id)
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
