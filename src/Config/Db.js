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
import JobTitle from '../models/JobTitle.js'
import jobtitle from '../../data/JobTitle.json' assert{type:'json'}
 


//to establish connect to database
const connectToDatabase = () => {
    // mongoose connection setup
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

    mongoose.connection.on("connected", async() => {
        logger.info("🍀 MongoDB Connected Successfully");
        await insertIndustryData()
        await insertLocationData()
        await insertcategorydata()
        await insertskillsdata()
        await insertjobtitledata()
        await insertqualificationsdata()
    });

    mongoose.connection.on("error", (err) => {
        logger.error("Error while connecting to database: " + err);
    });

    mongoose.connection.on("disconnected", () => {
        logger.warn("MongoDB connection disconnected");
    });
};


//importing json data
const insertcategorydata = async()=>{
    try {
        const existingdata = await JobCategoryModel.find()
        if (existingdata.length === 0) {
            await JobCategoryModel.insertMany(jobcategory)
            logger.info("job_category added successfully")
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
        }

    } catch (error) {
        logger.error("error inserting data")
    }
}

const insertjobtitledata = async()=>{
    try {
        const existingdata = await JobTitle.find()
        if (existingdata.length === 0) {
            await JobTitle.insertMany(jobtitle)
            logger.info("jobtitle added successfully")
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
        }
    } catch (error) {
        logger.error("Error while loading data")
    }
}

export default connectToDatabase