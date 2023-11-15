import location from "../models/LocationModel"

const getAllLocations = async() => {
    try {
        return await location.find();
    } catch (error) {
        throw error
    }

}

const getLocationById = async(id) => {
    try {
        return await location.findById(id)
    } catch (error) {
        throw error
    }
}

const addLocation = async(data) => {
    try {
        return await location.create(data)
    } catch (error) {
        throw error
    }

}

const updateLocation = async(id , updateData) => {
    try {
        return await location.findByIdAndUpdate(id,updateData)
    } catch (error) {
        throw error
    }

}

const deleteLocation = async(id) => {
    try {
        return await location.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }
}

export {getAllLocations , getLocationById , addLocation , updateLocation , deleteLocation}