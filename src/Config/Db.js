import mongoose from 'mongoose' //importing mongoose
import logger from '../middleware/logger.js' // importing logger
import JobCategoryModel from '../models/JobCategoryModel.js' // importing job category model
import locationModel from '../models/LocationModel.js' // importing location model
import jobcategory from '../../data/JobCategory.json' assert{type:'json'} //importing job category json data
import location from '../../data/Location.json' assert{type: 'json'}// importing location json data
import skillmodel from '../models/SkillModel.js'
import Qualificationmodel from '../models/QualificationModel.js'
import skill from '../../data/Skill.json' assert{type: 'json'}
import qualification from '../../data/Qualification.json' assert{type: 'json'}
import Industry from '../models/IndustryModel.js'
import industryData from '../../data/Industry.json' assert{type: 'json'}
 


//to establish connect to database
const connecttodatabase = async()=>{
    try {
        // mongoose connection setup
        await mongoose.connect(process.env.MONGO_URL)
        logger.info("🍀 MongoDb Connected Successfully")
        await insertcategorydata() // inserting data into collection
        await insertLocationData() // inserting data into collection
        await insertqualificationsdata() // inserting data into collection
        await insertskillsdata() // inserting data into collection
        await insertIndustryData()  // inserting data into collection
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
            logger.info("Category Data already exists in the collection.")
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
            logger.info("Location Data already exists in the collection")
        }
    } catch (error) {
        logger.error("Error while Inserting Data")
        
    }
}

const insertskillsdata = async()=>{
    try {
        const existingdata = await skillmodel.find()
        if (existingdata.length === 0) {
            await skillmodel.insertMany(skill)
            logger.info("skills added successfully")
        } else {
            logger.info("skills Data already exists in the collection.")
        }

    } catch (error) {
        logger.error("error inserting data")
    }
}

const insertqualificationsdata = async()=>{
    try {
        const existingdata = await Qualificationmodel.find()
        if (existingdata.length === 0) {
            await Qualificationmodel.insertMany(qualification)
            logger.info("qualifications added successfully")
        } else {
            logger.info("qualifications Data already exists in the collection.")
        }

    } catch (error) {
        logger.error("error inserting data")
    }
}

const insertIndustryData = async() => {
    try {
        const existingData = await Industry.find()
        if (existingData.length === 0) {
            await Industry.insertMany(industryData)
            logger.info("Industry added successfull")
        }else {
            logger.info("Industry Data Already Exists in the Collection")
        }
    } catch (error) {
        logger.error("Error while loading data")
    }
}

export default connecttodatabase