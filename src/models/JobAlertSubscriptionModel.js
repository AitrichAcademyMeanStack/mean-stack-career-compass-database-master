import mongoose,{Schema} from "mongoose"; //importing mongoose

//importing job alert subscription schema model
const subscriptionschema = new Schema({
    Subsriber:{
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        phone: Number,
      },
    SubscribedCompany:{        
        legalName:{type: String},
        summary:{type: String},
        industry:[String],
        email:{type: String},
        phone: {type: Number},
        address: {type: String},
        website:{type: String},
        location:[String]
    },
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