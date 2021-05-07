import React from "react";
import "./footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

/**
 * Name: footer
 * Function: displays footer and show its content
 * used in App.js file as layout
 */
const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p className="footerp" style={{ margin: "10px" }}>
        <Link to="../about" style={{ color: "#ffffff" }}>
          About Us
        </Link>
      </p>
      <p className="footerp" style={{ margin: "10px" }}>
        @ 2021 - Hodophiles
      </p>
    </div>
  );
};

export default Footer;
