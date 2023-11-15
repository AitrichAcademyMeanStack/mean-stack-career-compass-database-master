import express from "express"; // importing express
import dotenv from "dotenv";   // importing .env file

dotenv.config({     // configuring .env file
    path:"./env"
})


const app = express(); 

app.use(express.json())

app.listen(process.env.PORT || 5000 , () => console.log("Server up and running 🚀"));