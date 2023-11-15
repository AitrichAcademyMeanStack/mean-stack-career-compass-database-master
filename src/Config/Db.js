import mongoose from 'mongoose' //importing mongoose
import logger from '../middleware/Logger.js'


//to establish connect to database
const connecttodatabase = async()=>{
    try {
        // mongoose connection setup
        await mongoose.connect(process.env.MONGO_URL)
        logger.info("Mongo Db Connected Successfully")
    } catch (error) {
        logger.error("Error In Coonnecting database")
        process.exit()
    }
}

export default connecttodatabase