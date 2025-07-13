import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const [data, setData] = useState([])
  const [f, setF] = useState(false)
  const obj = useContext(Ct)
  const [ct, setTotal] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let x = Cookies.get("lc")
    if (x !== undefined) {
      x = JSON.parse(x)
      obj.stateupd(x)
      axios.get(`http://localhost:5000/getcart/${x.uid}`).then((res) => {
        let t = 0
        for (let cobj of res.data) {
          t += cobj.qty * cobj.price
        }
        setTotal(t)
        setData(res.data)
      })
    } else {
      navigate("/login")
    }
  }, [f])

  const del = (cid) => {
    axios.delete(`http://localhost:5000/del/${cid}`).then(() => {
      setF(!f)
    })
  }

  const dec = (cid, qty) => {
    if (qty > 1) {
      axios.get(`http://localhost:5000/dec/${cid}`).then(() => {
        setF(!f)
      })
    } else {
      del(cid)
    }
  }

  const inc = (cid) => {
    axios.get(`http://localhost:5000/inc/${cid}`).then(() => {
      setF(!f)
    })
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">🛒 Your Shopping Cart</h2>

      {/* Empty Cart Message */}
      {data.length === 0 && (
        <div className="text-center text-muted my-5">
          <h5>Your cart is empty.</h5>
          <p>Looks like you haven’t added anything yet.</p>
        </div>
      )}

      {/* Cart Items */}
      <div className="row g-4">
        {data.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card shadow-sm h-100">
              <img
                src={`http://localhost:5000/pic/${p.pimg}`}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt={p.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{p.name}</h5>
                <p className="text-muted mb-1">Unit Price: ₹{p.price}</p>

                <div className="d-flex align-items-center my-2">
                  <button onClick={() => dec(p._id, p.qty)} className="btn btn-outline-secondary btn-sm me-2">−</button>
                  <span>{p.qty}</span>
                  <button onClick={() => inc(p._id)} className="btn btn-outline-secondary btn-sm ms-2">+</button>
                </div>

                <p className="mb-2 fw-semibold">Item Total: ₹{p.qty * p.price}</p>

                <button className="btn btn-danger mt-auto" onClick={() => del(p._id)}>
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grand Total */}
      {data.length > 0 && (
        <div className="text-end mt-5">
          <h4 className="fw-bold text-primary">🧾 Total Payable: ₹{ct}</h4>
        </div>
      )}
    </div>
  )
}

export default Cart
