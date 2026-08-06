// ============================================
// FILE: src/components/landing/ContactSection.jsx
// ============================================
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  User,
  Building2,
  Heart,
  CheckCircle,
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@bloodlink.com",
      color: "#7A2F2F",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      color: "#3F6B5C",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kasaragod, Kerala, India",
      color: "#C23B22",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full bg-[#F6F3EC] py-16 md:py-20 lg:py-24 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block text-sm font-semibold text-[#7A2F2F] bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full mb-4">
                Get In Touch
              </span>
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#1C2321] leading-tight">
                Let's Connect
              </h2>
              <p className="text-[#5a554a] text-base md:text-lg mt-3 leading-relaxed">
                Have questions, feedback, or want to partner with BloodLink?
                Reach out to us.
              </p>
              <p className="text-[#8C8579] text-sm mt-2">
                Hospitals, organizations, and volunteers are welcome to connect.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FCFBF8] rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-[#8C8579]/5 group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}12`,
                      color: item.color,
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#8C8579] uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-[#1C2321]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#3F6B5C] bg-[#3F6B5C]/10 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" />
                Response within 24 hours
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#7A2F2F] bg-[#7A2F2F]/10 px-3 py-1.5 rounded-full">
                <Heart className="w-3.5 h-3.5" />
                Trusted by 500+ hospitals
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-[#FCFBF8] rounded-3xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-[#8C8579]/5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-[#7A2F2F]" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-[#1C2321]">
                Send Us a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#1C2321] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm placeholder:text-[#8C8579]/60 focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#1C2321] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm placeholder:text-[#8C8579]/60 focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-[#1C2321] mb-1.5">
                  Subject
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm placeholder:text-[#8C8579]/60 focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#1C2321] mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 text-[#8C8579] w-4 h-4" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm placeholder:text-[#8C8579]/60 focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7A2F2F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#631f1f] transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

              {/* Success Message */}
              {isSubmitted && (
                <div className="flex items-center gap-2 p-3 bg-[#3F6B5C]/10 rounded-xl border border-[#3F6B5C]/20 animate-fadeIn">
                  <CheckCircle className="w-4 h-4 text-[#3F6B5C]" />
                  <p className="text-sm text-[#3F6B5C] font-medium">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Response Time Note */}
              <p className="text-center text-xs text-[#8C8579] pt-2">
                <Heart className="w-3 h-3 inline mr-1 text-[#7A2F2F]" />
                We'll get back to you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
