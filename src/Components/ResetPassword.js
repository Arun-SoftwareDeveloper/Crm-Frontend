import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams from react-router-dom
import crmreset from "../Images/forgotpassword.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/ResetPassword.css";

function ResetPassword() {
  const { token } = useParams(); // Get the token parameter from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // You can use the 'token' parameter here if needed
    console.log("Token from URL:", token);
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Add validation logic here
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword === confirmPassword) {
      toast.success("Password Reset Successfully!!!");
      return;
    }

    try {
      // Use the 'token' parameter in your API call if necessary
      const response = await axios.post(
        `http://localhost:4000/resetpassword/${token}`,
        {
          newPassword,
          confirmPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error("Error occurred");
      }
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="header">Reset Password</h1>
      <div className="resetpassword-container">
        <form onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default ResetPassword;
