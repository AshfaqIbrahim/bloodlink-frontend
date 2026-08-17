// components/user/UserFooter.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Droplet, Heart, HelpCircle, Mail } from "lucide-react";

const UserFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#17211F] text-[#E8E3D9] mt-auto border-t border-[#2A3A36]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-6 border-b border-[#2A3A36]/30">
          {/* Brand Section */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#7A2F2F]/20 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#7A2F2F]" />
              </div>
              <span className="font-poppins font-bold text-lg text-white">
                Blood<span className="text-[#7A2F2F]">Link</span>
              </span>
            </a>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              Intelligent blood donor emergency platform connecting donors,
              recipients, and hospitals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#B0A99A] uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#welcome"
                  className="text-sm text-[#E8E3D9] hover:text-[#D9C5A1] transition-colors duration-200"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <Link
                  to="/user/emergency-requests"
                  className="text-sm text-[#E8E3D9] hover:text-[#D9C5A1] transition-colors duration-200"
                >
                  Emergency Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold text-[#B0A99A] uppercase tracking-wider mb-3">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-sm text-[#E8E3D9] hover:text-[#D9C5A1] transition-colors duration-200"
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-[#E8E3D9] hover:text-[#D9C5A1] transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Tagline */}
          <div className="lg:col-span-1">
            <div className="bg-[#1F2D29] rounded-xl p-4 border border-[#2A3A36]/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#7A2F2F]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Droplet size={16} className="text-[#7A2F2F]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#FCFBF8]">
                    Emergency Help
                  </p>
                  <p className="text-xs text-[#B0A99A] mt-0.5">
                    Need blood urgently? Create a request now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
          <div className="text-xs text-[#B0A99A]">
            BloodLink © {currentYear}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/privacy"
              className="text-[#B0A99A] hover:text-[#D9C5A1] transition-colors duration-200"
            >
              Privacy
            </Link>
            <span className="text-[#2A3A36]/50">·</span>
            <Link
              to="/terms"
              className="text-[#B0A99A] hover:text-[#D9C5A1] transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
