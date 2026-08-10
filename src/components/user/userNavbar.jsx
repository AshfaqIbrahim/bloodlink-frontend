import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  AlertCircle,
  History,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Droplet,
  Heart,
} from "lucide-react";

const UserNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Mock user data - replace with actual user from context/props
  const userData = user || {
    name: "Ibrahim",
    email: "ibrahim@hospital.com",
    bloodGroup: "B+",
    availability: "Available",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Call your existing logout API here
    // Example: await logout();
    console.log("Logging out...");
    navigate("/login");
  };

  const navLinks = [
    { to: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      to: "/user/emergency-requests",
      label: "Emergency Requests",
      icon: AlertCircle,
    },
    { to: "/user/activity", label: "My Activity", icon: History },
  ];

  const mobileNavLinks = [
    ...navLinks,
    { to: "/user/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-[#FCFBF8] border-b border-gray-200/60 h-[68px] flex items-center sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-full">
          {/* Left - Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#7A2F2F]/20 transition-colors">
              <Heart className="w-4 h-4 text-[#7A2F2F]" />
            </div>
            <span className="text-[#1C2321] font-medium text-lg tracking-tight">
              BloodLink
            </span>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#7A2F2F] bg-[#7A2F2F]/10"
                      : "text-[#8C8579] hover:text-[#1C2321] hover:bg-gray-100/80"
                  }`
                }
              >
                <link.icon size={18} strokeWidth={1.8} />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right - Notifications + Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-200">
              <Bell size={20} className="text-[#8C8579]" strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7A2F2F] rounded-full border-2 border-[#FCFBF8]"></span>
            </button>

            {/* Profile Section */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100/80 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-[#7A2F2F]/10 flex items-center justify-center">
                  <span className="text-[#7A2F2F] font-medium text-sm">
                    {userData.name.charAt(0)}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-[#1C2321] leading-tight">
                    {userData.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#7A2F2F] font-medium">
                      {userData.bloodGroup}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#8C8579]"></span>
                    <span className="text-[#3F6B5C]">
                      {userData.availability}
                    </span>
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#FCFBF8] rounded-xl shadow-lg border border-gray-200/60 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#7A2F2F]/10 flex items-center justify-center">
                        <span className="text-[#7A2F2F] font-medium text-base">
                          {userData.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-[#1C2321]">
                          {userData.name}
                        </div>
                        <div className="text-sm text-[#8C8579]">
                          {userData.email}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-medium text-[#7A2F2F]">
                            {userData.bloodGroup}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#8C8579]"></span>
                          <span className="text-xs text-[#3F6B5C]">
                            {userData.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1">
                    <NavLink
                      to="/user/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-[#1C2321] hover:bg-gray-100/80 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User
                        size={16}
                        strokeWidth={1.8}
                        className="text-[#8C8579]"
                      />
                      Profile
                    </NavLink>
                  </div>

                  <div className="border-t border-gray-200/60 py-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-[#7A2F2F] hover:bg-gray-100/80 transition-colors duration-200 w-full"
                    >
                      <LogOut size={16} strokeWidth={1.8} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-[#1C2321]" />
              ) : (
                <Menu size={24} className="text-[#1C2321]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-[68px] left-0 right-0 bg-[#FCFBF8] border-b border-gray-200/60 shadow-lg md:hidden animate-in slide-in-from-top-2 duration-200"
        >
          <div className="px-4 py-3 space-y-1">
            {mobileNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#7A2F2F] bg-[#7A2F2F]/10"
                      : "text-[#8C8579] hover:text-[#1C2321] hover:bg-gray-100/80"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon size={18} strokeWidth={1.8} />
                <span>{link.label}</span>
              </NavLink>
            ))}

            <div className="border-t border-gray-200/60 my-2 pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#7A2F2F] hover:bg-gray-100/80 transition-colors duration-200 w-full"
              >
                <LogOut size={18} strokeWidth={1.8} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
