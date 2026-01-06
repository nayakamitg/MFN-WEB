import React from "react";
import "../assets/footer.css";
import { NavLink } from "react-router";
const Footer = () => {
  return (
    <div className="FooterContainer">
      <div className="FooterBox">
        <NavLink to="/">
          <img src="mfn-logo.png" height="80" alt="" />
        </NavLink>
      </div>
      <div className="FooterBox">
        <h5 className="FooterHeader underline">All Categories</h5>
        <NavLink
          className="text-white text-decoration-none"
          to="/missing-person"
        >
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

        <NavLink
          className="text-white text-decoration-none"
          to="/unidentified-bodies"
        >
          {({ isActive }) => (
            <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
              UnIdentified DeadBodies
            </p>
          )}
        </NavLink>
      </div>

      <div className="FooterBox">
        <h5 className="FooterHeader underline">Links & Policies</h5>
        <NavLink className="text-white text-decoration-none" to="/disclaimer">
          {({ isActive }) => (
            <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
              Legal Disclaimer
            </p>
          )}
        </NavLink>

        <NavLink
          className="text-white text-decoration-none"
          to="/data-usage-policy"
        >
          {({ isActive }) => (
            <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
              Data Usage Policy
            </p>
          )}
        </NavLink>

        <NavLink
          className="text-white text-decoration-none"
          to="/terms-and-conditions"
        >
          {({ isActive }) => (
            <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
              Terms & Conditions
            </p>
          )}
        </NavLink>
        <NavLink
          className="text-white text-decoration-none"
          to="/data-deletion"
        >
          {({ isActive }) => (
            <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
              Data Deletion
            </p>
          )}
        </NavLink>

        <NavLink
          className="text-white text-decoration-none"
          to="/user-content-policy"
        >
          {({ isActive }) => (
            <p style={{ fontWeight: isActive ? "bold" : "normal" }}>
              User Content Policy
            </p>
          )}
        </NavLink>
      </div>

      <div className="FooterBox">
        <h3>Download App</h3>
        <img src="/playStore.webp" height="50" alt="" />
      </div>
    </div>
  );
};

export default Footer;
