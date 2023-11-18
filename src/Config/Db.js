import mongoose from 'mongoose' //importing mongoose
import logger from '../middleware/logger.js' // importing logger
import JobCategoryModel from '../models/JobCategoryModel.js' // importing job category model
import locationModel from '../models/LocationModel.js' // importing location model
import jobcategory from '../../data/JobCategory.json' assert{type:'json'} //importing job category json data
import location from '../../data/Location.json' assert{type: 'json'}// importing location json data
 


//to establish connect to database
const connecttodatabase = async()=>{
    try {
        // mongoose connection setup
        await mongoose.connect(process.env.MONGO_URL)
        logger.info("Mongo Db Connected Successfully")
        await insertcategorydata() // inserting data into collection
        await insertLocationData() // inserting data into collection
    } catch (error) {
        logger.error("Error In Coonnecting database")
        process.exit()
    }
}

//importing json data
const insertcategorydata = async()=>{
    try {
        const existingdata = await JobCategoryModel.find()
        if (existingdata.length === 0) {
            await JobCategoryModel.insertMany(jobcategory)
            logger.info("job_category added successfully")
        } else {
            logger.info("Data already exists in the collection.")
        }

    } catch (error) {
        logger.error("error inserting data")
    }
}


const insertLocationData = async() => {
    try {
        const data = await locationModel.find()
        if (data.length === 0) {
            await locationModel.insertMany(location)
            logger.info("Location data added")
        }else {
            logger.info("Data already exists in the collection")
        }
    } catch (error) {
        logger.error("Error while Inserting Data")
        
    }
}

export default connecttodatabase