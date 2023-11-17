import express from "express"; // importing express
import dotenv from "dotenv";   // importing .env file
import swaggerjsdoc from 'swagger-jsdoc' // importing swagger-jsdoc
import swaggerui from 'swagger-ui-express' // imorting swagger-ui-express
import connecttodatabase from './Config/db.js'
import path , { dirname }  from 'path';
import Notfounderror from './Exceptions/Notfounderror.js'
import { fileURLToPath } from 'url';
import {errorhandler} from "./middleware/errorhandler.js";
import skillrouter from './Skill/Router.js'
import jobcategoryrouter from './Job_Category/router.js'
import locationRouter from "./job_location/router.js"
const __dirname = dirname(fileURLToPath(import.meta.url));

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

const options = {
    swaggerDefinition,
    apis: [
        path.join(__dirname,"job_location" , "router.js"),
        path.join(__dirname,"Job_Category","router.js")
    ],
};


const swaggerspecs = swaggerjsdoc(options);
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerspecs));

app.use('/api/v1/job-categories',jobcategoryrouter); // configuring routes for Job Category
app.use('/api/v1/locations',locationRouter); // configuring routes for Location
app.use('/api/v1/skills',skillrouter); // configuring routes for skill


// route for unmatched url
app.all('*',(req,res,next)=>{
    const error = new Notfounderror("invalid url")
    next(error)
})

app.use(errorhandler); // middleware for global error handler

app.listen(process.env.PORT || 5000 , () => console.log("Server up and running 🚀"));