const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const Todo=require("../models/Todo")

//Middle ware to verify

function auth(req,res,next){
    const token=req.header("Authorization")
    console.log(token)
    if(!token) return res.status(401).json({message:"Authorization failed"})
    try{
     const verified=jwt.verify(token,process.env.JWT_SECRET||"mysecretkey")
     req.user=verified
     next()
    }catch(err){
        res.status(400).json({message:"Not verify"})
    }
}

//get all todos
 router.get("/",auth,async (req,res)=>{
    const todos=await Todo.find({userId:req.user.id})
    res.json(todos)
 })
 //create todo
 router.post("/",auth,async (req,res)=>{
    const newTodo=new Todo({userId:req.user.id,text:req.body.text})
    await newTodo.save();
    res.json(newTodo)
 })
 //Update todo
 router.put("/:id",auth,async (req,res)=>{
    const updateTodo=await Todo.findOneAndUpdate(
        {_id:req.params.id,userId:req.user.id},
        req.body,
        {new:true}
    )
    res.json(updateTodo)
 })
//Delete Todo
router.delete("/:id",auth,async (req,res)=>{
    await Todo.findOneAndDelete({_id:req.params.id,userId:req.user.id})
    res.json({message:"Todo deleted successfully"})
})
module.exports=router;