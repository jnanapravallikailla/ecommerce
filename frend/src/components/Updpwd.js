import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const Updpwd = () => {
    let [data,setData]=useState({"pwd":"","otp":""})
    let{uid}=useParams()
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }
    let resetpwd=()=>{
        axios.post("http://localhost:5000/resetpwd",{...data,"uid":uid}).then((res)=>{
            navigate("/login")
        })
    }
  return (
    <div>
        <input type='text' placeholder='Enter password' onChange={fun} name='pwd'/>
        <input type='text' placeholder='enter otp' onChange={fun} name='otp'/>
        <button onClick={resetpwd}>RESETPWD</button>
    </div>
  )
}

export default Updpwd