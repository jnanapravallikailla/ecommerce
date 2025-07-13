import React, { useContext, useEffect } from 'react'
import Ct from './Ct'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    Cookies.remove("lc")
    obj.stateupd({"token":"","name":"","uid":"","role":""})
    navigate("/")
  },[])

  return (
    <div>Logout</div>
  )
}

export default Logout