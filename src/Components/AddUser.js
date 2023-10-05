import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file
import "../Style/AddUser.css"; // Import your CSS file

// Initialize react-toastify

const AddUser = ({ userRole }) => {
  const navigate = useNavigate();

  // State for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("employee"); // Default role

  // Function to handle form submission
  const handleAddUser = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!username || !password || !confirmPassword) {
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      // Make an API request to create a user (replace with your backend API endpoint)
      const response = await axios.post(
        "https://crm-backend-lr4o.onrender.com/adduser",
        {
          username,
          password,
          role,
        }
      );

      // Assuming the backend returns a success message
      if (response.status === 200) {
        // Display a success toast
        toast.success("User created successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Redirect to the dashboard or appropriate page
        navigate("/");
      } else {
        // Display an error toast
        toast.error("Failed to create user.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error(error);
      // Display an error toast
      toast.error("An error occurred while adding the user.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="add-user-container">
      <h1 className="header">Add User</h1>
      <form onSubmit={handleAddUser}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Role selection */}
        {userRole === "manager" && (
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        )}

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
