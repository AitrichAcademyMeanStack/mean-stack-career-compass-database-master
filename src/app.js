import express from "express"; // importing express
import cors from 'cors'
import dotenv from "dotenv";   // importing .env file
import swaggerjsdoc from 'swagger-jsdoc' // importing swagger-jsdoc
import swaggerui from 'swagger-ui-express' // imorting swagger-ui-express
import connecttodatabase from './Config/Db.js' // importing connection to database
import path , { dirname }  from 'path'; // importing path , dirname API'S from path module
import Notfounderror from './Exceptions/NotFoundError.js' // importing Custom Error Handler
import { fileURLToPath } from 'url'; // importing url module
import {errorhandler} from "./middleware/errorhandler.js"; // importing global error handler
import skillrouter from './Skill/Router.js' // importing routes for skill  module
import jobcategoryrouter from './Job_Category/router.js' // importing routes for category  module
import locationRouter from "./job_location/router.js" // importing routes for location  module
import qualificationRouter from "./Qualification/Router.js" // importing routes for qualification  module
import rolesRouter from "./Role/Router.js" // importing routes for Role  module
import workexperience from './WorkExperience/Router.js' //importing routes for work experience module
import seekerrouter from './JobSeeker/Router.js' //importing routes for seeker module
import seekerprofile from './JobSeekerProfile/Router.js' //importing routes for job seeker profile module
import companyUserRouter from './CompanyUser/Router.js' 
import savedjobrouter from './SavedJobs/Router.js' //importing routes for saved jobs module
import resumerouter from "./Resume/Router.js"; //importing routes for resume module
import industryRouter from './Industry/Router.js'  //importing routes for Industry
import jobProviderCompanyRouter from './JobProviderCompany/Router.js' //importing routes for JobProviderCompany
import JobSubscriptionRouter from './JobAlertSubscription/Router.js'//importing routes for job alert subscription
import jobInterviewRoute from './JobInterview/Router.js' // importing routes for job interview
import jobPostRouter from "./JobPost/Router.js" // importing routes for Job Post
import jobapplicationrouter from './JobApplication/Router.js' //importing routes for job application
import JobTitleRouter from './JobTitle/Router.js'
const __dirname = dirname(fileURLToPath(import.meta.url)); // Configuring dirname path


// configuring .env file
dotenv.config({     
    path:"./.env"
})


const app = express(); 

app.use(cors())
connecttodatabase() //connect to database

app.use(express.json()) //defining middleware

// Setup swagger
const swaggerDefinition = {
        openapi: "3.0.0",
        info:{
            title:"JOB_PORTAL_API",
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
        path.join(__dirname,"Industry","Router.js"),
        path.join(__dirname,"JobProviderCompany","Router.js"),
        path.join(__dirname,"JobSeeker","Router.js"),
        path.join(__dirname,"JobSeekerProfile","Router.js"),
        path.join(__dirname,"CompanyUser","Router.js"),
        path.join(__dirname,"JobPost","Router.js"),
        path.join(__dirname,"SavedJobs","Router.js"),
        path.join(__dirname,"JobInterview","Router.js"),
        path.join(__dirname,"JobApplication","Router.js"),
        path.join(__dirname,"JobTitle","Router.js"),
    ],
};


const swaggerspecs = swaggerjsdoc(options);
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerspecs,{
    swaggerOptions: {
        docExpansion: "none",
    },
    customSiteTitle: "JobPortal API",
    customCss: `
    .swagger-ui {background-color: #1e1e1e; color: #fff}
    .swagger-ui .topbar { display: none; }
    .body { background-color: #1e1e1e; color: #fff }
    .swagger-ui .opblock-description-wrapper {background-color:#1e1e1e}
    .swagger-ui .opblock-description-wrapper p{color:#fff}
    .swagger-ui .scheme-container{background-color:#1e1e1e; color:#fff}
    .swagger-ui .parameter__name , .parameter_type{color:#fff}
    .swagger-ui .opblock .opblock-summary-description{color:#fff}
    .swagger-ui a.nostyle, .swagger-ui a.nostyle:visited {color:#fff }
    .swagger-ui .info .title, .swagger-ui .renderedMarkdown p {color:#fff}
    .opblock-tag { background-color: #1e1e1e; color: #fff } 
    .opblock-summary { background-color: #1e1e1e; color: #fff } 
    .opblock { border: 1px solid #1e1e1e; color: #fff }
    .opblock-section-header { background-color: #1e1e1e; color: #fff } 
    .opblock-description { background-color: #1e1e1e; color: #fff }
    .swagger-ui .response-col_description {color:#fff}
    .swagger-ui table thead tr th {color:#fff}
    .swagger-ui .parameters-col_description{color:#fff}
    .swagger-ui .parameter__type {color:#fff}
    .swagger-ui .tab li button.tablinks {background-color: #1e1e1e; color:#fff}
    .parameter__name { color: #1e1e1e; color: #fff } 
    .responses-wrapper { background-color: #1e1e1e; color: #fff } 
    .swagger-ui .response-col_status {color: #fff } 
    .swagger-ui .model, .model-title, {color: #fff}
    .swagger-ui .info {margin:0 ; padding-top:25px}
    .swagger-ui section.models.is-open, {margin:0}
    .swagger-ui section.models{margin:0}
    .swagger-ui .models-control{color:#fff}
   
  `,
}));

// Defining routes
app.use('/api/v1/job-categories',jobcategoryrouter); // configuring routes for Job Category
app.use('/api/v1/locations',locationRouter); // configuring routes for Location
app.use('/api/v1/qualifications',qualificationRouter) //configuring routes for qulaification
app.use('/api/v1/skills',skillrouter); // configuring routes for skill
app.use('/api/v1/roles', rolesRouter); // Configuring routes for roles
app.use('/api/v1/jobseekers',seekerrouter) //configuring routes for seeker
app.use('/api/v1/jobseekers',seekerprofile) //configuring routes for seeker profile
app.use('/api/v1/jobseekers',JobSubscriptionRouter) //configuring routes for job alert subscription
app.use('/api/v1/jobseekers',savedjobrouter) //configuring routes for saved jobs module
app.use('/api/v1/jobseekerprofiles',jobapplicationrouter) //configuring routes for job application module
app.use('/api/v1/industries', industryRouter) // Configuring routes for industry
app.use('/api/v1/jobProviderCompanies', jobProviderCompanyRouter) // Configuring routes for JobProviderCompany
app.use('/api/v1/jobProviderCompany', companyUserRouter) // Configuring routes for JobProviderCompany
app.use('/api/v1/workexperiences',workexperience) //configuring routes for work experience
app.use('/api/v1/resume',resumerouter)//configuring routes for resume
app.use('/api/v1/companyUsers',jobPostRouter) // configuring routes for JobPosts
app.use('/api/v1/jobPosts',jobInterviewRoute) // configuring routes for JobInterview
app.use('/api/v1/jobtitle',JobTitleRouter)// configuring routes for jobtitle





// Handling unmatched URLs.
app.all('*',(req,res,next)=>{
    const error = new Notfounderror("Invalid Url")
    next(error)
})

app.use(errorhandler); // middleware for global error handler

app.listen(process.env.PORT || 5000 , () => console.log("Server up and running 🚀"));