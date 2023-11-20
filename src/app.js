import express from "express"; // importing express
import dotenv from "dotenv";   // importing .env file
import swaggerjsdoc from 'swagger-jsdoc' // importing swagger-jsdoc
import swaggerui from 'swagger-ui-express' // imorting swagger-ui-express
import connecttodatabase from './Config/db.js'
import path , { dirname }  from 'path'; // importing path , dirname API'S from path module
import Notfounderror from './Exceptions/NotFoundError.js' // importing Custom Error Handler
import { fileURLToPath } from 'url'; // importing url module
import {errorhandler} from "./middleware/errorhandler.js"; // importing global error handler
import skillrouter from './Skill/Router.js' // importing routes for skill  module
import jobcategoryrouter from './Job_Category/router.js' // importing routes for category  module
import locationRouter from "./job_location/router.js" // importing routes for location  module
import qualificationRouter from "./Qualification/Router.js" // importing routes for qualification  module
import rolesRouter from "./Role/Router.js" // importing routes for Role  module
import systemuserrouter from './SystemUser/Router.js' //importing routes for systemuser module
import authuserrouter from './AuthUser/Router.js' //importing routes for auth user
import industryRouter from './Industry/Router.js'
const __dirname = dirname(fileURLToPath(import.meta.url)); // Configuring dirname path


// configuring .env file
dotenv.config({     
    path:"./env"
})


const app = express(); 

connecttodatabase() //connect to database

app.use(express.json()) //defining middleware

// Setup swagger
const swaggerDefinition = {
        openapi: "3.0.0",
        info:{
            title:"JOB_PORTAL API",
            version:"1.0.0",
            description:"API FOR MANAGING JOB_PORTAL SYSTEM"
        },
    servers: [
        {
            url: "http://localhost:7000",
        },
    ],
    
}

// Swagger routes
const options = {
    swaggerDefinition,
    apis: [
        path.join(__dirname,"job_location" , "router.js"),
        path.join(__dirname,"Job_Category","router.js"),
        path.join(__dirname,"Qualification","Router.js"),
        path.join(__dirname,"skill","Router.js"),
        path.join(__dirname,"Role","Router.js"),
        path.join(__dirname,"Industry","Router.js")

    ],
};


const swaggerspecs = swaggerjsdoc(options);
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerspecs));

// Defining routes
app.use('/api/v1/job-categories',jobcategoryrouter); // configuring routes for Job Category
app.use('/api/v1/locations',locationRouter); // configuring routes for Location
app.use('/api/v1/qualification',qualificationRouter)
app.use('/api/v1/skills',skillrouter); // configuring routes for skill
app.use('/api/v1/roles', rolesRouter); // Configuring routes for roles
app.use('/api/v1/systemusers',systemuserrouter) //configuring routes for system users
app.use('/api/v1/authusers',authuserrouter)
app.use('/api/v1/industries', industryRouter) // Configuring routes fro industry


// Handling unmatched URLs.
app.all('*',(req,res,next)=>{
    const error = new Notfounderror("Invalid Url")
    next(error)
})

app.use(errorhandler); // middleware for global error handler

app.listen(process.env.PORT || 5000 , () => console.log("Server up and running 🚀"));