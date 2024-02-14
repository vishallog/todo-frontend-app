/* eslint-disable react-hooks/rules-of-hooks */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { useState } from "react"
import Home from "./pages/Home"
import Header from "./components/header"
import Login from "./components/login"
import Register from "./components/register"
import Profile from "./components/profile"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { context, server } from "./main"
import UpdateTodo from "./components/UpdateTodo"

function App() {
  const {user, setUser,loading, setLoading, setIsAuthenticated} = useContext(context)

  useEffect(() => {
    setLoading(true)
    if(user){
     axios.get(`${server}/getuser`, {
      withCredentials: true,
  }).then((res)=>{
    setIsAuthenticated(true)
    setUser(res.data.user)
    
    setLoading(false)
  }).catch((error)=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)

      console.log(error)
  })
}
  }, [])
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      <Router>
      <Header></Header>
       {!loading &&  <Routes>
          <Route path="/" element={<Home/>}/>
      
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/updateTodo" element={<UpdateTodo/>}/>
        </Routes>}
        <Toaster/>
      </Router>

    </>
  )
}

export default App
