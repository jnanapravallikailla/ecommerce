import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ct from "./Ct";
import Carousel from "./Carousel";
const API = "https://ecommerce-production-b6e8.up.railway.app"

const Home = () => {
  const [prod, setProd] = useState([]);
  const [f, setF] = useState(false);
  const [msg, setMsg] = useState("");
  const obj = useContext(Ct);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/get`).then((res) => {
      setProd(res.data);
    });
  }, []);

  const addcart = (p) => {
    if (obj.state.token === "") {
      navigate("/login");
    } else {
      axios
        .post(`${API}/addcart`, {
          uid: obj.state.uid,
          pid: p._id,
          name: p.name,
          price: p.price,
          pimg: p.pimg,
          qty: 1,
        })
        .then(() => {
          setF(true);
        });
    }
  };

  useEffect(() => {
    if (f) {
      const iid = setTimeout(() => {
        setF(false);
      }, 3000);
      return () => clearTimeout(iid);
    }
  }, [f]);

  const search = (e) => {
    axios
      .post(`${API}/search`, { search: e.target.value })
      .then((res) => {
        setProd(res.data);
      });
  };

  return (
    <>
    {f && (
        <div className="pop"  >
          ✅ Product added to cart!
        </div>
      )}
    <div className="container my-5 classy-home">
      

      <input
        type="text"
        className="form-control classy-search mb-4"
        placeholder="Search for products..."
        onChange={search}
      />

      <h2 className="text-center classy-heading mb-5">Featured Products</h2>

      <Carousel />

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
  {prod.map((p) => (
    <div className="col" key={p._id}>
      <div className="card h-100 shadow-sm border-0">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "220px", backgroundColor: "#f8f9fa" }}>
          <img
            src={`${API}/pic/${p.pimg}`}
            alt={p.name}
            style={{ maxHeight: "200px", objectFit: "contain" }}
            className="img-fluid p-2"
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-semibold">{p.name}</h5>
          <p className="card-text text-muted" style={{ minHeight: "40px", fontSize: "0.9rem" }}>{p.desc}</p>
          <p className="fw-bold text-success">₹{p.price}</p>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-sm btn-outline-primary" onClick={() => addcart(p)}>
              Add to Cart
            </button>
            <button
              className="btn btn-sm btn-dark"
              onClick={() => navigate(`/km/${p._id}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  </>);
};

export default Home;
