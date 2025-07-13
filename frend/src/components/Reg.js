import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Reg = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({ "_id": "", "name": "", "pwd": "", "role": "" })
  const [msg, setmsg] = useState("")

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const reg = () => {
    axios.post("http://localhost:5000/reg", data).then((res) => {
      setmsg(res.data.msg)
      setData({ "_id": "", "name": "", "pwd": "", "role": "" })
      navigate("/login")
    })
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 classy-bg">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "16px", backdropFilter: "blur(8px)", backgroundColor: "rgba(255,255,255,0.85)" }}>
        <h4 className="text-center mb-4 fw-bold">Register</h4>
        {msg && <div className="alert alert-info py-2">{msg}</div>}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter E-Mail"
          value={data._id}
          name="_id"
          onChange={fun}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Name"
          value={data.name}
          name="name"
          onChange={fun}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={data.pwd}
          name="pwd"
          onChange={fun}
        />

        <div className="mb-3 d-flex justify-content-around">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="user" onChange={fun} name="role" checked={data.role === "user"} />
            <label className="form-check-label">User</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="retailer" onChange={fun} name="role" checked={data.role === "retailer"} />
            <label className="form-check-label">Retailer</label>
          </div>
        </div>

        <button onClick={reg} className="btn btn-primary w-100">Register</button>
      </div>
    </div>
  )
}

export default Reg
