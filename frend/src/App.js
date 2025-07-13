import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Reg from "./components/Reg"
import Login from "./components/Login"
import Cart from "./components/Cart"
import Addprod from "./components/Addprod"
import Nav from "./components/Nav"
import Logout from "./components/Logout"
import { useEffect, useState } from "react"
import Ct from "./components/Ct"
import Cookies from 'js-cookie'
import './App.css'
import Km from "./components/Km"
import Carousel from "./components/Carousel"
import axios from "axios"
import Retailer from "./components/Retailer"
import Edit from "./components/Edit"
import Resetpwd from "./components/Resetpwd"
import Updpwd from "./components/Updpwd"
const App = () => {
  let [state,setstate]=useState({"token":"","name":"","uid":"","role":""})
  let stateupd=(sobj)=>{
    setstate({...state,...sobj})
  }
  let obj={"state":state,"stateupd":stateupd}
  useEffect(()=>{
      let x=Cookies.get("lc")
      if(x!=undefined)
      {
        stateupd(JSON.parse(x))
      }
  },[])
  
  return (
    <BrowserRouter>
    <Ct.Provider value={obj} >
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/reg" element={<Reg/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/addprod"  element={<Addprod/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/km/:pid" element={<Km/>}/>
     <Route path="/retailer" element={<Retailer/>}/>
     <Route path="/edit" element={<Edit/>}/>
     <Route path="/reset" element={<Resetpwd/>}/>
     <Route path="/upd/:uid" element={<Updpwd/>}/>
    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App