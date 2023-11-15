import mongoose from 'mongoose' //importing mongoose


//to establish connect to database
const connecttodatabase = async()=>{
    try {
        // mongoose connection setup
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        process.exit()
    }
}

export default connecttodatabase