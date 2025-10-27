import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API"
import './Login.css'
export default function Login(){
  const [form,setForm]=useState({email:"",password:""});
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const res=await API.post("/auth/login",form)
      localStorage.setItem("token",res.data.token);
      alert('login succesfully')
      navigate("/todos")
    }catch(err){
      alert(err.message?.data?.message||"login failed")
      console.log(res.message)
      alert(res.message)
    }
  }
  function seitch(){
   navigate('/signup')
  }
  return(
    <div className="card">
      <div className="a">
      <h2>Login</h2></div>
      <div className="b">
      <form onSubmit={handleSubmit} className="form">
        <input type="email" name="email" placeholder="Email"onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
        <button type='submit' className="btn">Login</button>
      </form>
      <p onClick={seitch}>If new one then move to signup ?</p>
    </div>
    </div>
  )
}