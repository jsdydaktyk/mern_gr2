const express = require("express")
const router = express.Router()
const User = require("../models/User")


//get data of all users
router.get("/", async (req,res)=>{
    try{
        const users = await User.find({})
        res.json(users)
        
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// add a new user
router.post("/", async (req,res)=>{
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json(newUser)

    } catch(err){
        console.log(`post error ${err.message}`)
        res.status(400).json(err)
    }
})

// delete one user

router.delete("/:id", async (req, res)=>{
    const userId = req.params.id
    try{
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.status(404).json({message:"User not found"})
        }
        res.json({message:"User deleted hurrraaa!"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports=router 



