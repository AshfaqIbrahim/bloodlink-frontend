// src/components/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { getMe, logoutUser } from "../../api/authApi";

const AdminLayout = ({ title, subtitle, children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getMe();
        setAdmin(res.data.user);
      } catch (err) {
        console.error("Failed to load admin info:", err);
      }
    };
    fetchAdmin();
  }, []);

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
    <div className="min-h-screen bg-[#F6F3EC]">
      <AdminSidebar isOpen={isSidebarOpen} />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-[#FCFBF8] border-b border-gray-200/60 sticky top-0 z-20">
          <div className="flex items-center justify-between px-5 sm:px-8 h-[72px]">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsSidebarOpen((o) => !o)}
                className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100/80 flex-shrink-0"
              >
                {isSidebarOpen ? (
                  <X size={22} className="text-[#1C2321]" />
                ) : (
                  <Menu size={22} className="text-[#1C2321]" />
                )}
              </button>
              <div className="min-w-0">
                <h1 className="font-poppins font-bold text-lg sm:text-xl text-[#1C2321] truncate">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-[#8C8579] truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {admin && (
                <div className="hidden sm:flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#7A2F2F]/10 flex items-center justify-center">
                    <span className="text-[#7A2F2F] font-semibold text-sm">
                      {admin.firstName?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div className="text-right leading-tight">
                    <p className="text-sm font-medium text-[#1C2321]">
                      {admin.firstName} {admin.lastName}
                    </p>
                    <p className="text-xs text-[#8C8579] capitalize">
                      {admin.role}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium bg-[#C23B22]/10 text-[#C23B22] hover:bg-[#C23B22]/15 transition-colors duration-200"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-5 sm:px-8 py-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
