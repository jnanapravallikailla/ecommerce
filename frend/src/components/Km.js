import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

const API = "https://ecommerce-production-b6e8.up.railway.app"
const Km = () => {
  const { pid } = useParams()
  const [prod, setProd] = useState("")
  const [f, setF] = useState(true)
  const [value, setValue] = useState(2)
  const [hover, setHover] = useState(-1)
  const ipt = useRef()
  const obj = useContext(Ct)

  useEffect(() => {
    axios.get(`${API}/getbyid/${pid}`).then((res) => {
      setProd(res.data)
    })
  }, [f])

  const add = () => {
    axios.put(`${API}/addcomm`, {
      pid: pid,
      name: obj.state.name,
      text: ipt.current.value,
      rt: value
    }).then(() => {
      setF(!f)
      setProd("")
      ipt.current.value = ""
      setValue(2)
    })
  }

  return (
    <>
      {prod !== "" && (
        <div className="container mt-5 classy-detail">
          <div className="row g-4">
            <div className="col-md-6">
              <img
                src={`${API}/pic/${prod.pimg}`}
                alt={prod.name}
                className="img-fluid rounded shadow-sm classy-img"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">{prod.name}</h2>
              <h4 className="text-success mb-3">₹{prod.price}</h4>
              <p>{prod.desc}</p>
              <p><strong>Category:</strong> {prod.cat}</p>
            </div>
          </div>

          {/* Comments Section */}
          {prod.comm.length > 0 && (
            <div className="mt-5">
              <h4 className="mb-3">💬 Comments</h4>
              {prod.comm.map((cm, i) => (
                <div key={i} className="p-3 rounded shadow-sm mb-3 classy-comment">
                  <p className="mb-1"><strong>{cm.name}</strong></p>
                 <p className="fst-italic text-secondary">“{cm.text}”</p>


                  <Rating value={cm.rt} precision={0.5} readOnly />
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          {obj.state.token !== "" && (
            <div className="mt-5">
              <h5 className="mb-3">📝 Add a Comment</h5>
              <input
                type="text"
                ref={ipt}
                className="form-control mb-3"
                placeholder="Write your comment..."
              />
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(e, newVal) => setValue(newVal)}
                onChangeActive={(e, newHover) => setHover(newHover)}
                emptyIcon={<StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
              />
              <br />
              <button className="btn btn-primary mt-3" onClick={add}>
                Add Comment
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Km
