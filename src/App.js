import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import ForgotPasswordForm from "./Components/ForgotPassword";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ResetPassword from "./Components/ResetPassword";
import AddUser from "./Components/AddUser";

function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />}></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordForm />}
          ></Route>
          <Route
            path="/resetpassword/:token"
            element={<ResetPassword />}
          ></Route>
          <Route path="/adduser" element={<AddUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
