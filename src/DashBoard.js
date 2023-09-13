import React from "react";
import "./DashBoard.css"; // Import the CSS file for Dashboard component
import crm from "./Images/crm.jpg"; // Import the sample image file
import crmimage from "./Images/crm image.jpg";
import { Link } from "react-router-dom";
// import { Default } from "react-toastify/dist/utils";

function DashBoard() {
  const confirmation = (e) => {
    e.preventDefault();
    confirm("Press Ok if you are a Manager or Admin");
  };
  return (
    <div className="root">
      <div className="nav-bar">
        <img src={crm} className="crm-logo" alt="logo" />
        <h1 className="crm-heading">CRM_DASHBOARD</h1>
        <div className="nav-links">
          <Link to="/">
            <span className="nav-item">Home</span>
          </Link>
          <Link to="/">
            <span className="nav-item">About</span>
          </Link>
          <Link to="/login" className="nav-item">
            Login
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="user-container">
          <img src={crmimage} className="crm-image" alt="logo" />
          <h1 className="user-list">Have a Good Day!!!?</h1>
          <div className="user-options">
            <Link to="/register">
              <h1 className="user-option">Register</h1>
            </Link>
            <Link to="/login">
              <h1 className="user-option">Login</h1>
            </Link>
            <Link to="/adduser">
              <h1 className="user-option">AddUser</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
