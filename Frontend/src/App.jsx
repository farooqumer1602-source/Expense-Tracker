import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Login from './components/Login'
import Register from "./components/Register"
import { Navigate } from 'react-router-dom'
const App = () => {
  const [loading, setloading] = useState(true);
const [user, setuser] = useState(null);
  useEffect(() => {
   const fetchuser = async ()=>{
    try{
      const token = localStorage.getItem('token');
      if(!token) return;
      const {data} = await axios.get('/api/me',{
        headers: { Authorization: `Bearer ${token}` },
      })
      setuser(data);
    }catch(err){
      localStorage.removeItem('token')
    }finally{
      setloading(false)
    }
   }
   fetchuser()
  }, []);
  if (loading) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-xl text-white">Loading...</div>
    </div>
  );
}
  return (
    <div>
       <Routes>
        <Route path='/login' element={user? <Navigate to="/" />: <Login setuser={setuser}/> }/>
        <Route path='/register' element={user? <Navigate to="/" />: <Register setuser={setuser}/>}/>
        <Route path='/' element={user? <Home user={user} setuser={setuser}/>: <Navigate to={"/login"}/>}/>
      </Routes>
    </div>
  )
}

export default App
