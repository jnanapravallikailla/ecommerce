import axios from "axios"
import { useContext, useState } from "react"
import Cookies from 'js-cookie'
import { Link, useNavigate } from "react-router-dom"
import Ct from "./Ct"
const API = "https://ecommerce-production-b6e8.up.railway.app"

const Login = () => {
  const [data, setData] = useState({ "_id": "", "pwd": "" })
  const obj = useContext(Ct)
  const [msg, setmsg] = useState("")
  const navigate = useNavigate()

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const log = () => {
    axios.post(`${API}/login`, data).then((res) => {
      if (res.data.token !== undefined) {
        Cookies.set("lc", JSON.stringify(res.data), { expires: 1 })
        obj.stateupd(res.data)
        navigate("/")
      } else {
        setmsg(res.data.msg)
      }
    })
  }

  return (
    <div className="login-bg d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "16px", backdropFilter: "blur(8px)", backgroundColor: "rgba(255,255,255,0.85)" }}>
        <h4 className="text-center mb-4 fw-bold">Login</h4>

        {msg && <div className="alert alert-danger py-2">{msg}</div>}

        <input
          type='email'
          placeholder='Enter Email'
          value={data._id}
          onChange={fun}
          name='_id'
          className="form-control mb-3"
        />

        <input
          type='password'
          placeholder='Enter Password'
          value={data.pwd}
          onChange={fun}
          name='pwd'
          className="form-control mb-3"
        />

        <button className="btn btn-primary w-100 mb-2" onClick={log}>Login</button>

        <div className="text-center">
          <Link to="/reset" className="text-decoration-none text-secondary">Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
