const express =require("express")
const mongose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
dotenv.config();
const app=express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
const authRoutes=require('./routes/auth')
const todoRoutes=require("./routes/todo")
app.use("/api/auth",authRoutes)
app.use("/api/todos",todoRoutes)
//mongosse connection
mongose.connect("mongodb://127.0.0.1:27017/todoapp")
.then(()=>console.log("mongoDb is connected"))
.catch(err=>console.log(err))
app.listen(5000,()=>console.log('server is running on Port 5000'))