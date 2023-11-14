import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path:"./env"
})

const app = express();

app.listen(process.env.PORT || 5000 , () => console.log("Server up and running 🚀"));