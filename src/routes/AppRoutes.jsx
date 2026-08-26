import { Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HospitalRegister from "../pages/auth/HospitalRegister";
import SelectAccount from "../pages/auth/SelectAccount";
import Landing from "../pages/auth/Landing";
import GoogleCompleteRegistration from "../pages/auth/GoogleCompleteRegistration";
import VerifyOtp from "../pages/auth/VerifyOtp";

//User Pages
import UserDashboard from "../pages/user/Dashboard";
import RequestDetails from "../pages/user/RequestDetails";
import ViewAllRequests from "../pages/user/ViewAllRequests";
import HelpSupport from "../pages/user/HelpSupport";
import ContactUs from "../pages/user/ContactUs";
import CreateRequest from "../pages/user/CreateRequest";
import MyRequests from "../pages/user/MyRequest";

//Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminHospitals from "../pages/admin/Hospitals";
import AdminUsers from "../pages/admin/Users";
import AdminRequests from "../pages/admin/Requests";
import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
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

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/hospitals"
        element={
          <ProtectedAdminRoute>
            <AdminHospitals />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedAdminRoute>
            <AdminUsers />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <ProtectedAdminRoute>
            <AdminRequests />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
