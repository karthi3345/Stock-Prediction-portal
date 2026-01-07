import { useState } from 'react'
import'./assets/css/style.css'
import Header from './components/Header.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import AuthProvider from './AuthProvider.jsx'
import Dashboard from "./components/dashboard/Dashboard";
import Privateroute from './components/Privateroute.jsx'
import Publicroute from './components/Publicroute.jsx'




function App() {
 

  return (
    <>
   <AuthProvider>
     <BrowserRouter>
    
         <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
         <Route path="register" element={<Publicroute><Register/></Publicroute>}/>
           <Route path="login" element={<Publicroute><Login/></Publicroute>}/>
            <Route path="/dashboard" element={<Privateroute><Dashboard /></Privateroute>} />
        </Routes>
            <Footer/>

            
      </BrowserRouter>
      </AuthProvider>
  
     
      
    </>
  )
}

export default App
