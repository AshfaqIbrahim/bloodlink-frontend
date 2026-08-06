import React from "react";
import { Heart, Globe, Share2, Link2 } from "lucide-react";

const Footer = () => {
  const quickLinks = ["About", "Features", "Contact"];
  const resources = ["Privacy Policy", "Terms", "Support"];

  return (
    <footer className="bg-[#1C2321] text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/5">
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
            <h4 className="font-semibold text-white text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {resources.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white/40 hover:text-white group"
                aria-label="Website"
              >
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white/40 hover:text-white group"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white/40 hover:text-white group"
                aria-label="Link"
              >
                <Link2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <p>
            &copy; {new Date().getFullYear()} BloodLink. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
