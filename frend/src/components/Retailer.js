import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
const API = "https://ecommerce-production-b6e8.up.railway.app"
const Retailer = () => {
  const [prod, setProd] = useState([])
  const [f, setF] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let x = Cookies.get("lc")
    if (!x) {
      navigate("/login")
    } else {
      x = JSON.parse(x)
      axios.get(`${API}/getrt/${x.uid}`).then((res) => {
        setProd(res.data)
      })
    }
  }, [f])

  const edit = (pobj) => {
    Cookies.set("prod", JSON.stringify(pobj))
    navigate("/edit")
  }

  const del = (pid) => {
    axios.delete(`${API}/delprod/${pid}`).then(() => {
      setF(!f)
    })
  }

  return (
    <div className="container py-4">
      <h3 className="text-center fw-bold mb-4">📦 My Products</h3>
      <div className="row g-4">
        {prod.map((pobj, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img
  src={`${API}/pic/${pobj.pimg}`}
  alt={pobj.name}
  className="card-img-top img-fluid rounded-top"
  style={{ height: '240px', objectFit: 'cover', borderBottom: '1px solid #dee2e6' }}
/>

              <div className="card-body">
                <h5 className="card-title fw-semibold">{pobj.name}</h5>
                <h6 className="text-success mb-2">₹ {pobj.price}</h6>
                <p className="card-text text-muted" style={{ minHeight: '60px' }}>{pobj.desc}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-outline-info btn-sm" onClick={() => navigate(`/km/${pobj._id}`)}>
                  🔍 View
                </button>
                <button className="btn btn-warning btn-sm" onClick={() => edit(pobj)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => del(pobj._id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Retailer
