import React, { useState } from "react";
import "../Style/RegisterForm.css";
import crmregister from "../Images/crm-register.jpg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          userType,
        }),
      });

      if (response.ok) {
        console.log("User registered successfully");
        // toast.success("User registered successfully");
        setRegistrationSuccess(true);
        // Reset the form fields
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setUserType("");
      } else if (response.status === 409) {
        setUserExists(true);
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <>
      <h1 className="header">CRM REGISTRATION</h1>
      {registrationSuccess && (
        <div className="registration-success-container">
          {toast("Registered successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })}
          ;
        </div>
      )}
      {userExists && (
        <div>
          {toast("User already exists!!! !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })}
          ;
        </div>
      )}
      <img src={crmregister} className="crmregister" alt="CRM Register" />

      <form className="register-form" onSubmit={handleRegister}>
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <select
          className="register-input"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="">Select User Type</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <button className="register-button" type="submit">
          Register
        </button>
        <p className="login-user">
          Already a User{" "}
          <Link to="/login">
            <span className="login-btn">Login</span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
