import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles/app.scss";
import { createContext } from 'react';
export const context = createContext({ isAuthenticated: false });
export const server = 'https://nodejs-todoapp-u941.onrender.com/api'

const AppWrapper = () =>{
  const [user,setUser] = useState({})
  const [loading,setLoading] = useState(false)
  const [isAuthenticated  ,setIsAuthenticated] = useState(false)
  const [updateInfo, setUpdateInfo] = useState({})
  return (  
    <context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      loading,
      setLoading,
      user,
      setUser,
      updateInfo, 
      setUpdateInfo}}>
    <App />
  </context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AppWrapper/>
  </React.StrictMode>,
)
