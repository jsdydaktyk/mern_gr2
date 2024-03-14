const express = require("express")
const mongoose = require("mongoose")


const app = express()
const PORT = 8000

app.use(express.json())

const myDataBase= "myDB"
const url = `mongodb://localhost:27017/${myDataBase}`
mongoose.connect(url)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>console.log("Connection error: ", err.message))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const User = mongoose.model("User",userSchema)

app.get("/api/users", async (req,res)=>{
    try{
        const users = await User.find({})
        res.json(users)
        
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


app.listen(PORT, ()=>console.log(`Server express is running ${PORT}`))

process.on('SIGINT', ()=>{
    console.log("Closing MongoDB")
    mongoose.disconnect()
        .then(()=>console.log("MongoDB connection closed"))
        .finally(()=>process.exit())
})
