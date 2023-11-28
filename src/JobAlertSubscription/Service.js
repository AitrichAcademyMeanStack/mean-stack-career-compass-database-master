import logger from "../middleware/logger.js"; //importing logger
import JobAlertSubscription from "../models/JobAlertSubscriptionModel.js";//importing job alert subscription model
import jobseeker from "../models/JobSeekerModel.js"; //importing job seeker model

//create new job alert subscription
const createsubscription = async(seekerid,subscriptiondata)=>{
    try {
        const existingseeker = await jobseeker.findById(seekerid)
        if (existingseeker) {
            subscriptiondata.Subsriber={
                firstName: existingseeker.firstName,
                lastName: existingseeker.lastName,
                userName: existingseeker.userName,
                email: existingseeker.email,
                phone: existingseeker.phone,
            }

        const newsubscription =await  JobAlertSubscription.create(subscriptiondata)
        if (newsubscription) {
            logger.info("new subscription created successfully")
            return newsubscription
        } else {
            logger.error("error in creating new job alert subscription")
        }
        } else {
            logger.error("jobseeker not found with specific id")
        }
    } catch (error) {
        throw error
    }
}


export default {createsubscription}