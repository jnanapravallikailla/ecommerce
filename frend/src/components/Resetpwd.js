import { useScrollTrigger } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Resetpwd = () => {
  let[uid,setProd]=useState("")
  let [msg,setMsg] =useState("")
  let navigate=useNavigate()
    let fun=(e)=>{
        setProd(e.target.value)
    }
    let sendotp=()=>{
      axios.get(`http://localhost:5000/sendotp/${uid}`).then((res)=>{
        if(res.data.msg=="otp sent")
        {
          navigate(`/upd/${uid}`)
        }
        else{
          setMsg(res.data.msg)
        }
      })
    }
  return (
    <div>
        <input type='text' placeholder='Enter Your email'onChange={fun}/>
        <button onClick={sendotp}>SENDOTP</button>
    </div>
  )
}

export default Resetpwd