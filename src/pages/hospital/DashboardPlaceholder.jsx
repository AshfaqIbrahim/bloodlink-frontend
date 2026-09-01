import React from "react";
import { useNavigate } from "react-router-dom";
import { Hospital, Construction, LogOut } from "lucide-react";
import { logoutUser } from "../../api/authApi";

const HospitalDashboardPlaceholder = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center bg-[#FCFBF8] rounded-3xl border border-gray-200/60 shadow-sm p-8">
        <div className="w-16 h-16 rounded-2xl bg-[#3F6B5C]/10 flex items-center justify-center mx-auto mb-5">
          <Construction size={28} className="text-[#3F6B5C]" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Hospital size={18} className="text-[#7A2F2F]" />
          <h1 className="font-poppins font-bold text-xl text-[#1C2321]">
            Hospital Dashboard
          </h1>
        </div>
        <p className="text-sm text-[#8C8579] mb-6">
          Your login was successful. The hospital dashboard is currently under
          construction and will be available soon.
        </p>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 text-sm font-medium"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default HospitalDashboardPlaceholder;
