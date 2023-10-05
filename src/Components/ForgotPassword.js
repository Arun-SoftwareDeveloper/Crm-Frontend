import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/ForgotPassword.css";
import forgotpassword from "../Images/forgotpassword.jpg";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Define message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email format
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!email.match(emailRegex)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const response = await fetch(
        "https://crm-backend-lr4o.onrender.com/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      // Update the message state with the response message
      setMessage(data.message);
      setEmail("");
      toast.success("Reset Link sent Successfully");
    } catch (error) {
      console.error(error);
      // Update the message state with an error message
      setMessage("An error occurred while processing your request");
      toast.error("An error occurred while processing your request", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <h1 className="header">Forgot Password</h1>
      <img
        src={forgotpassword}
        className="forgotpassword"
        alt="Forgot Password"
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {/* Display the message */}
      {message && <p className="message">{message}</p>}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ForgotPasswordForm;
