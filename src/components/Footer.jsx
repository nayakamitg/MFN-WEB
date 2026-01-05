import React from 'react'
import "../assets/footer.css"
import { NavLink } from 'react-router'
const Footer = () => {
  return (
    <div className='FooterContainer'>
        <div className="FooterBox">
          <NavLink to="/">
            <img src="mfn-logo.png" height="80" alt="" />
            </NavLink>
        </div>
      <div className="FooterBox">
        <h5 className="FooterHeader">All Categories</h5>
      <NavLink className="text-white text-decoration-none" to="/missing-person">
  {({ isActive }) => (
    <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
      Missing Persons
    </p>
  )}
</NavLink>

     <NavLink className="text-white text-decoration-none" to="/found-person">
  {({ isActive }) => (
    <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
      Found Persons
    </p>
  )}
</NavLink>

<NavLink className="text-white text-decoration-none" to="/unidentified-bodies">
  {({ isActive }) => (
    <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
      UnIdentified DeadBodies
    </p>
  )}
</NavLink>
      </div>
     
      <div className="FooterBox">
       <h3>Download App</h3>
       <img src="/playStore.webp" height="50" alt="" />
      </div>
    </div>
  )
}

export default Footer
