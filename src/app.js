import express from "express"; 
import dotenv from "dotenv";
 
dotenv.config()


const app = express();

app.use(express.json())

app.get("/v1/api/users",(req,res)=>{
    res.send("hello world")
})

app.listen(process.env.PORT || 5000 , () => console.log("Server up and running 🚀"));