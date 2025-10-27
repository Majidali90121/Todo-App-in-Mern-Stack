import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import API from "../API"
import './signUp.css'
export default function Signup(){
  const [form,setForm]=useState({username:"",email:"",password:""})
  const navigate=useNavigate();

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      await API.post("auth/signup",form);
      alert ("SignUp Suceesfully! Please login again");
      navigate("/login");
    }catch(err){
      alert(err.response?.data?.message||"signup failed")
    }
  }
  function seitch(){
   navigate('/login')
  }
  return (
    <div className="Card">
      <div className="a">
      <h2>SignUp</h2>
      </div>
      <div className="b">
      <form onSubmit={handleSubmit} className='form'>
        <input type="text" name='username' placeholder='username' onChange={handleChange} required/>
        <input type="email" name='email' placeholder='Email' onChange={handleChange} />
        <input type="password" name="password" placeholder='Password' onChange={handleChange} />
        <button type='submit' className='btn'>Signup</button>
      </form>
      <p onClick={seitch}>Already have an account go to login page?</p>
    </div>
    </div>
  )
}