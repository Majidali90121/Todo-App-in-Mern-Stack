const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/User")
//signup
router.post("/signup",async (req,res)=>{
    try{
        const {username,email,password}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"User already exsist"})
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({username,email,password: hashedPassword});
        await newUser.save()
        res.json({message:"User registered in a system"});
    }catch(err){
        res.status(500).json({error:err.message})
    }
})
//login
router.post("/login",async (req,res)=>{
    try{
        console.log("Request body: ",req.body)
        const {email, password}=req.body;
        const user=await User.findOne({email});
        if(!user)return res.status(400).json({message:"User is not exsist in a system"})
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Wrong password"})
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET||"mysecretkey",{expiresIn:'6h'})
        res.json({token,user:{id:user._id,username:user.username,email:user.email}});

    }catch(err){
        res.status(500).json({error:err.message})
    }
})
module.exports=router;