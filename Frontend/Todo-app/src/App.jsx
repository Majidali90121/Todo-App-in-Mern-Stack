import React from "react"
import {Routes,Route,Navigate} from "react-router-dom"
import Login from "./Login/Login"
import Signup from "./Login/signUp"
import Todo from './Page/Todo'
import './App.css'
function App(){
  
  return(
    <>
      <div className="container">
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/todos' element={localStorage.getItem("token") ? <Todo/>:<Navigate to='/login'/>}/>
        <Route path='/todo' element={<Todo/>}/>
      </Routes>
      </div>  
       
        </>  
  )
}
export default App;