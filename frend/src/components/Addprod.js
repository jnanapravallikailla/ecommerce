import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import axios from 'axios'
import Ct from './Ct'
const API = "https://ecommerce-production-b6e8.up.railway.app"
const Addprod = () => {
  const [msg, setMsg] = useState("")
  const [uid, setUid] = useState("")
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const obj = useContext(Ct)

  const [data, setData] = useState({
    name: "",
    desc: "",
    price: "",
    cat: "",
    pimg: ""
  })

  useEffect(() => {
    const x = Cookies.get("lc")
    if (x !== undefined) {
      const parsed = JSON.parse(x)
      setUid(parsed.uid)
    } else {
      navigate("/login")
    }
  }, [])

  const fun = (e) => {
    console.log(e)
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const fun1 = (e) => {
    setData({ ...data, pimg: e.target.files[0] })
  }

  const add = () => {
    const fd = new FormData()
    for (let key in data) {
      fd.append(key, data[key])
    }
    fd.append("rid", uid)

    axios.post(`${API}`, fd, {
      headers: {
        "Authorization": obj.state.token,
        "uid": obj.state.uid
      }
    }).then((res) => {
      setMsg(res.data.msg)
      setData({ name: "", desc: "", price: "", cat: "", pimg:"" })
      if (fileRef.current) fileRef.current.value = ""
    })
  }


  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card shadow p-4 bg-info-subtle" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.95)' }}>
        <h4 className="text-center mb-4 fw-bold">🛍️ Add New Product</h4>

        {msg && <div className="alert alert-info">{msg}</div>}

        <div className="mb-3">
          <label className="form-label fw-semibold">Product Name</label>
          <input type='text' className="form-control" placeholder='Enter product name' value={data.name} name='name' onChange={fun} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Product Description</label>
          <textarea className="form-control" placeholder='Write product details...' value={data.desc} name='desc' onChange={fun} rows="3" />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <input type='text' className="form-control" placeholder='e.g. Electronics, Fashion' value={data.cat} name='cat' onChange={fun} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Price (₹)</label>
          <input type='number' className="form-control" placeholder='Enter price in rupees' value={data.price} name='price' onChange={fun} />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Upload Product Image</label>
          <input type='file' className="form-control" onChange={fun1}  ref={fileRef} />
        </div>

        <button className="btn btn-primary w-100" onClick={add}>➕ Add Product</button>
      </div>
    </div>
  )
}

export default Addprod
