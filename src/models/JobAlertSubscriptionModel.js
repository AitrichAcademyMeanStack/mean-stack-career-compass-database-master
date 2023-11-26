import mongoose,{Schema} from "mongoose";

const subscriptionschema = new Schema({
    Subsriber:{
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        phone: String,
      },
    SubscribedCompany:{},
    Industry:{
        name:String,
        description: String
    },
    Category:{
        name:String,
        description: String
    },
    Location:{
        name:String,
        description: String
    },
    Skill:{
        name:String,
        description: String
    }
})

const collectionName = "JobAlertSubscription"
const JobAlertSubscription = mongoose.model("jobalertsubscription",subscriptionschema,collectionName)

export default JobAlertSubscription