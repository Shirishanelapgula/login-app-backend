const mongoose = require("mongoose")

const User = require("../models/userModels")

const asyncHandler = require("express-async-handler")


const createUser = asyncHandler(async (req,res) => {
    try{

        const existingUserData = await User.find({})


        for (each of existingUserData){
            console.log(each)
            if (each.name === req.body.name && each.email === req.body.email) {
                throw new Error("User already exists")
            }
        }

        const response = await User.create(req.body)
        res.status(200).json(response)

    }catch(error){
        res.status(500).json({message: error.message})
    }

})

const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.params
    try{

        const userData = await User.findById(id)

        if(!userData){
            throw new Error("No user found")
        }

        await User.findByIdAndDelete(id)
        res.status(200).json({message : "User Deleted Successfully"})

    }catch(error){
        res.status(500).json({message: error.message})
    }

})


const userLogin = asyncHandler(async(req,res)=>{
    try{

        const existingUserData = await User.find({})

        let userExist = false

        existingUserData.filter((each)=>{
            if (each.name === req.body.name && each.email === req.body. email){
                userExist = true
                res.status(200).json({message: "You logged in successfully"})
            }
            else if (each.name === req.body.name && each.email !== req.body. email){
                userExist = true
                res.status(401).json({message: "Incorrect email"})
            }
            else if (each.name !== req.body.name && each.email === req.body. email){
                userExist = true
                res.status(401).json({message: "Incorrect name"})
            }
        })

        if(!userExist){
            res.status(404).json({message: "Please register before login"})

        }



    }catch(error){
        res.status(404).json({message:error.message})
    }

})


const getAllUsers = asyncHandler(async(req,res)=>{
    try{

        const allUsers = await User.find({})
        res.status(200).json(allUsers)

    }catch(error){
        res.status(500).json({message:error.message})

    }

})

const updateUser= asyncHandler(async (req,res)=>{
    try{
     const {id}= req.params
     const user= await User.findByIdAndUpdate(id,req.body);
     if(!user){
        throw new Error("user not found")
     }
     const newUser=await User.findById(id)
     res.status(200).json(newUser)
    }
    catch(err){
        if (err instanceof mongoose.Error.CastError) {
            throw new Error('User does not exits found');
          }
        res.status(500)
        throw new Error(err.message)
    }
 })

module.exports = {createUser , deleteUser , userLogin, getAllUsers , updateUser}
