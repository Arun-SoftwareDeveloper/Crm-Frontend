import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/LoginForm.css";
import crmlogin from "../Images/crmlogin.jpg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log("Login successful");
        toast("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setLoginSuccess(true);
        navigate("/");
        // Save the token to local storage or session storage
        // Example: localStorage.setItem('token', token);
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  useEffect(() => {
    // Reset login success after a delay
    const timer = setTimeout(() => {
      setLoginSuccess(false); // Start animation by hiding the message
      setTimeout(() => {
        setLoginSuccess(true); // Show the message after the animation delay
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h2 className="header">CRM - LOGIN</h2>
      <img src={crmlogin} className="crmlogin" alt="CRM Login" />
      <form className="login-form" onSubmit={handleLogin}>
        <span className="back-btn">
          <Link to="/">
            <i className="fa-solid fa-circle-arrow-left"></i>
          </Link>
        </span>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
        <p className="signup">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="reg">register</span>
          </Link>
        </p>
        <Link to="/forgotpassword">
          <span className="forgot">Forgot Password?</span>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
