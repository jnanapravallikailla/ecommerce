import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
const API = "https://ecommerce-production-b6e8.up.railway.app"
const Edit = () => {
  const [data, setData] = useState({ _id: "", name: "", desc: "", cat: "", price: "" })
  const [file, setFile] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const x = Cookies.get("prod")
    if (!x) {
      navigate("/")
    } else {
      setData({ ...JSON.parse(x) })
    }
  }, [])

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const fun1 = (e) => {
    setFile(e.target.files[0])
  }

  const upd = () => {
    axios.put(`${API}/upd`, data).then(() => {
      setData({ name: "", desc: "", cat: "", price: "" })
      navigate("/retailer")
    })
  }

  const updimg = () => {
    const fd = new FormData()
    fd.append("_id", data._id)
    fd.append("pimg", file)

    axios.post(`${API}/updimg`, fd).then((res) => {
      setMsg(res.data.msg)
      navigate("/retailer")
    })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
         <div className="card shadow p-4 bg-info-subtle" style={{ borderRadius: "16px" }}>

            <h4 className="text-center mb-4 fw-bold">✏️ Edit Product Details</h4>

            {msg && <div className="alert alert-info">{msg}</div>}

            <div className="mb-3">
              <label className="form-label fw-semibold">Product Name</label>
              <input type="text" className="form-control" placeholder="Enter name" value={data.name} onChange={fun} name="name" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Product Description</label>
              <input type="text" className="form-control" placeholder="Enter description" value={data.desc} onChange={fun} name="desc" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input type="text" className="form-control" placeholder="Enter category" value={data.cat} onChange={fun} name="cat" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input type="number" className="form-control" placeholder="Enter price" value={data.price} onChange={fun} name="price" />
            </div>

            <button className="btn btn-success w-100 mb-3" onClick={upd}>💾 Update Product</button>

            <hr />

            <div className="mb-3">
              <label className="form-label fw-semibold">Update Product Image</label>
              <input type="file" className="form-control" onChange={fun1} accept=".jpg,.jpeg,.png" />
            </div>

            <button className="btn btn-primary w-100" onClick={updimg}>🖼️ Update Image</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
