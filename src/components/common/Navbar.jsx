import React, { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "How It Works", "Features", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F6F3EC]/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#7A2F2F]/20 transition-colors">
              <Heart className="w-4 h-4 text-[#7A2F2F]" />
            </div>
            <span className="font-poppins font-bold text-xl text-[#1C2321]">
              BloodLink
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={
                  link === "Home"
                    ? "#"
                    : `#${link.toLowerCase().replace(/\s+/g, "-")}`
                }
                className="text-sm text-[#5a554a] hover:text-[#1C2321] transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7A2F2F] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-[#5a554a] hover:text-[#1C2321] transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link to="/select-account">
              <Button variant="outline" size="sm">
                Create Account
              </Button>
            </Link>
            <Link to="/select-account">
              <Button size="sm">Get Started</Button>
            </Link>{" "}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden w-10 h-10 rounded-xl hover:bg-[#7A2F2F]/5 transition-colors flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#8C8579]/10 animate-fadeIn">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={
                    link === "Home"
                      ? "#"
                      : `#${link.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  className="text-sm text-[#5a554a] hover:text-[#1C2321] px-4 py-2.5 rounded-xl hover:bg-[#7A2F2F]/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-[#8C8579]/10">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-[#5a554a] hover:text-[#1C2321] px-4 py-2.5 rounded-xl hover:bg-[#7A2F2F]/5 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/select-account"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link
                  to="/select-account"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button size="sm" className="w-full justify-center">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
