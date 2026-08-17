// src/pages/user/ContactUs.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

const ContactUs = () => {
  const navigate = useNavigate();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@bloodlink.com",
      href: "mailto:support@bloodlink.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 90000 00000",
      href: "tel:+919000000000",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kasaragod, Kerala, India",
    },
    {
      icon: Clock,
      label: "Support Hours",
      value: "Monday – Saturday\n9:00 AM – 6:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F3EC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/user/dashboard")}
          className="flex items-center gap-2 text-[#8C8579] hover:text-[#1C2321] transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1C2321]">Contact Us</h1>
          <p className="text-[#8C8579] mt-1">
            Have a question, feedback, or need assistance? We're here to help.
          </p>
        </div>

        {/* Contact Information Card */}
        <div className="bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 p-6 sm:p-8 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              const isHours = item.label === "Support Hours";

              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-[#7A2F2F]/10 flex items-center justify-center">
                      <Icon size={20} className="text-[#7A2F2F]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#8C8579] uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-[#1C2321] hover:text-[#7A2F2F] transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className={`text-sm text-[#1C2321] ${isHours ? "whitespace-pre-line" : ""}`}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Card */}
        <div className="bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 p-6 sm:p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-[#7A2F2F]/10 rounded-2xl flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-[#7A2F2F]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1C2321] mb-1">
              Need assistance?
            </h3>
            <p className="text-[#8C8579] text-sm max-w-lg mb-6">
              Reach out to the BloodLink support team for help with your
              account, emergency requests, or other platform-related questions.
            </p>
            <button
              onClick={() => navigate("/user/dashboard")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
