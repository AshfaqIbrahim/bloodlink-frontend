// src/components/admin/ProtectedAdminRoute.jsx
import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { ShieldAlert, Loader, ArrowLeft } from "lucide-react";
import { getMe } from "../../api/authApi";

// Wrap any admin page with this to gate it behind role === "admin".
// - Not logged in at all -> redirect to /login
// - Logged in but not an admin -> show a clean "Access Restricted" screen
// - Logged in as admin -> render the page normally
const ProtectedAdminRoute = ({ children }) => {
  const [status, setStatus] = useState("checking");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await getMe();
        const userRole = res.data.user?.role;
        setRole(userRole);
        setStatus(userRole === "admin" ? "authorized" : "forbidden");
      } catch (err) {
        setStatus("unauthenticated");
      }
    };
    checkAccess();
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC]">
        <Loader size={32} className="text-[#7A2F2F] animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "forbidden") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] px-6">
        <div className="max-w-sm w-full text-center bg-[#FCFBF8] rounded-3xl border border-gray-200/60 shadow-sm p-8">
          <div className="w-16 h-16 rounded-2xl bg-[#C23B22]/10 flex items-center justify-center mx-auto mb-5">
            <ShieldAlert size={28} className="text-[#C23B22]" />
          </div>
          <h1 className="font-poppins font-bold text-xl text-[#1C2321] mb-2">
            Access Restricted
          </h1>
          <p className="text-sm text-[#8C8579] mb-6">
            This area is reserved for administrators. Your account doesn't have
            permission to view this page.
          </p>
          <Link
            to={role === "user" ? "/user/dashboard" : "/login"}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to your dashboard
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedAdminRoute;
