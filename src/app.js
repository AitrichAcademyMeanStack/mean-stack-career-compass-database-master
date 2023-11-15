import express from "express"; // importing express
import dotenv from "dotenv";   // importing .env file
import swaggerjsdoc from 'swagger-jsdoc' // importing swagger-jsdoc
import swaggerui from 'swagger-ui-express' // imorting swagger-ui-express
import connecttodatabase from './Config/db.js'
import {errorhandler} from "./middleware/Errorhandler.js";
import jobcategoryrouter from './job_category/router.js'

dotenv.config({     // configuring .env file
    path:"./env"
})


const app = express(); 

connecttodatabase() //connect to database

app.use(express.json()) //defining middleware

// Setup swagger
const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title:"JOB_PORTAL API",
            version:"1.0.0",
            description:"API FOR MANAGING JOB_PORTAL SYSTEM"
        }

    },
    servers:[
        {
            url: process.env.PORT
        }
    ],
    apis:[]
}

const swaggerspecs = swaggerjsdoc(options)
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerspecs))

app.use('/api/v1/job-categories',jobcategoryrouter)

app.use(errorhandler)

app.listen(process.env.PORT || 5000 , () => console.log("Server up and running 🚀"));