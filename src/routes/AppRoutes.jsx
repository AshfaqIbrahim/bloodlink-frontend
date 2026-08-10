import { Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HospitalRegister from "../pages/auth/HospitalRegister";
import SelectAccount from "../pages/auth/SelectAccount";
import Landing from "../pages/auth/Landing";

//User Pages
import UserDashboard from "../pages/user/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hospital-register" element={<HospitalRegister />} />
      <Route path="/select-account" element={<SelectAccount />} />

      {/* User Routes */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
