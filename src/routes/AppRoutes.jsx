import { Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HospitalRegister from "../pages/auth/HospitalRegister";
import SelectAccount from "../pages/auth/SelectAccount";
import Landing from "../pages/auth/Landing";
import GoogleCompleteRegistration from "../pages/auth/GoogleCompleteRegistration";

//User Pages
import UserDashboard from "../pages/user/Dashboard";
import RequestDetails from "../pages/user/RequestDetails";
import ViewAllRequests from "../pages/user/ViewAllRequests";
import HelpSupport from "../pages/user/HelpSupport";
import ContactUs from "../pages/user/ContactUs";
import CreateRequest from "../pages/user/CreateRequest";
import MyRequests from "../pages/user/MyRequest";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hospital-register" element={<HospitalRegister />} />
      <Route path="/select-account" element={<SelectAccount />} />
      <Route
        path="/google-complete-registration"
        element={<GoogleCompleteRegistration />}
      />

      {/* User Routes */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/request/:id" element={<RequestDetails />} />
      <Route path="/user/emergency-requests" element={<ViewAllRequests />} />
      <Route path="/help" element={<HelpSupport />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/user/create-request" element={<CreateRequest />} />
      <Route path="/user/my-requests" element={<MyRequests />} />
    </Routes>
  );
}

export default AppRoutes;
