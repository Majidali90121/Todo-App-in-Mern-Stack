import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import API from '../API'
import './Todo.css'
export default function Todo(){
    const [todos,setTodos]=useState([])
    const [text,setText]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
     fetchTodos()
    },[])

    const fetchTodos=async()=>{
        try{
            const res=await API.get("/todos",{text});
            setTodos(res.data)
        }catch(err){
            alert("Error in loading")
        }
    }
    const addTodo=async()=>{
        if(!text.trim()) return
        const res =await API.post("/todos",{text})
        setTodos([...todos,res.data])
        setText("")
    };
    const toggleTodo=async (id,completed)=>{
      const res=await API.put(`/todos/${id}`,{completed:!completed})
      setTodos(todos.map((t)=>(t._id===id?res.data:t)))
    }
   const deleteTodo=async (id)=>{
    await API.delete(`/todos/${id}`)
    setTodos(todos.filter((t)=>t._id!==id))
   }
   const logout=()=>{
    localStorage.removeItem("token")
    navigate("/login")
   }
   return(
    <div className="card">
     <div className="a">   <h2>Your Todos</h2><br/>
        <button onClick={logout} className="btn logout">Logout</button></div>
      <div className="b">  <div className="todo-input">
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="New Todo" required/>
            <button onClick={addTodo} className="btn">Add</button>
            <ul className="todo-list">
                {todos.map((todo)=>(<li key={todo._id} className="todo-item">
                    <span style={{textDecoration:todo.completed?"line-through":""}} onClick={()=>toggleTodo(todo._id,todo.completed)}>{todo.text}</span>
                    <button onClick={()=>deleteTodo(todo._id)} className="btn">deleted</button>
                </li>))}
            </ul>
        </div>
        </div>
    </div>
   )
}