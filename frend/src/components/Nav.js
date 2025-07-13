import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
  const obj = useContext(Ct)

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: '#d9f1fb' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          🛍️ ShopEase
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/"></Link>
            </li>

            {obj.state.token === "" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/reg">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/login">Sign In</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/cart">My Cart</Link>
                </li>
                {obj.state.role !== "user" && (
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/addprod">Add Product</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/logout">Sign Out</Link>
                </li>
                {obj.state.role === "retailer" && (
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/retailer">Manage Products</Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {obj.state.token && (
            <span className="navbar-text text-dark fw-semibold">
              👤 {obj.state.name}
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
