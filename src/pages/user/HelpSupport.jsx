// src/pages/user/HelpSupport.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Clock,
  User,
  Eye,
  AlertTriangle,
  Mail,
  Phone,
} from "lucide-react";

const HelpSupport = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      icon: Clock,
      question: "How do I change my availability?",
      answer:
        "You can change your availability status from your dashboard. Look for the 'Availability Status' section and click on the toggle button to switch between 'Available' and 'Unavailable' modes. This helps us show you only relevant emergency requests.",
    },
    {
      id: 2,
      icon: MessageCircle,
      question: "How do I respond to an emergency blood request?",
      answer:
        "To respond to an emergency request, navigate to the 'Emergency Requests' page, find a request that matches your blood group, and click on 'View Details'. From there, you can click the 'I Can Donate' button to offer your help.",
    },
    {
      id: 3,
      icon: User,
      question: "How can I update my profile?",
      answer:
        "Go to your profile page by clicking on your name in the top navigation bar and selecting 'Profile'. From there, you can update your personal information, contact details, and blood group preferences.",
    },
    {
      id: 4,
      icon: Eye,
      question: "Why can't I see some emergency requests?",
      answer:
        "You can only see emergency requests that match your blood group and are within your location. Some requests may also be restricted based on your availability status or the hospital's privacy settings.",
    },
    {
      id: 5,
      icon: AlertTriangle,
      question: "How can I report an incorrect request?",
      answer:
        "If you notice an incorrect or suspicious emergency request, please report it by clicking on the 'Report' button on the request details page. Our team will review the request and take appropriate action within 24 hours.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1C2321]">
            Help & Support
          </h1>
          <p className="text-[#8C8579] mt-1">
            Find answers to common questions or get help with your BloodLink
            account.
          </p>
        </div>

        {/* FAQ Card */}
        <div className="bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
          <div className="divide-y divide-gray-200/60">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openIndex === index;

              return (
                <div key={faq.id} className="p-5 sm:p-6">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start gap-3 text-left group"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-xl bg-[#7A2F2F]/10 flex items-center justify-center">
                        <Icon size={18} className="text-[#7A2F2F]" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-medium text-[#1C2321] group-hover:text-[#7A2F2F] transition-colors duration-200">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 text-[#8C8579]">
                          {isOpen ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>
                      {isOpen && (
                        <div className="mt-3 text-sm text-[#8C8579] leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Card */}
        <div className="mt-8 bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 p-6 sm:p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-[#7A2F2F]/10 rounded-2xl flex items-center justify-center mb-4">
              <HelpCircle size={28} className="text-[#7A2F2F]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1C2321] mb-1">
              Still need help?
            </h3>
            <p className="text-[#8C8579] text-sm max-w-md mb-6">
              Contact our support team and we'll be happy to assist you.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium"
            >
              <Mail size={18} />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
