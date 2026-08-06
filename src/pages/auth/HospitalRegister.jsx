import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Building2,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Activity,
  Users,
  Bell,
  Shield,
  Award,
  ChevronDown,
  Hospital,
  User,
  KeyRound,
  Clipboard,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    className="flex items-start gap-4 p-0"
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.15 * (delay + 1), duration: 0.5, ease: "easeOut" }}
  >
    <div className="w-10 h-10 rounded-full bg-[#F8F4EC] flex items-center justify-center text-[#8B2E2E] shrink-0 mt-0.5">
      <Icon size={20} strokeWidth={1.6} />
    </div>
    <div>
      <h4 className="font-semibold text-[#2E2E2E] text-sm tracking-tight">
        {title}
      </h4>
      <p className="text-[#7A7A7A] text-xs leading-relaxed mt-0.5 max-w-[220px]">
        {desc}
      </p>
    </div>
  </motion.div>
);

const StatItem = ({ value, label, delay = 0 }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 + delay * 0.1, duration: 0.4 }}
  >
    <div className="text-xl font-bold text-[#2E2E2E] tracking-tight">
      {value}
    </div>
    <div className="text-[#7A7A7A] text-[11px] font-medium uppercase tracking-wider mt-0.5">
      {label}
    </div>
  </motion.div>
);

const HospitalRegistration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    hospitalName: "",
    email: "",
    phone: "",
    license: "",
    district: "Kasaragod",
    password: "",
    confirm: "",
    agree1: false,
    agree2: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const districts = [
    "Kasaragod",
    "Kannur",
    "Kozhikode",
    "Malappuram",
    "Wayanad",
    "Palakkad",
    "Thrissur",
    "Ernakulam",
    "Idukki",
    "Kottayam",
    "Alappuzha",
    "Pathanamthitta",
    "Kollam",
    "Thiruvananthapuram",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Form submitted:", form);
    alert("Hospital account created successfully!");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EC] p-4">
      {/* Main card - split screen */}
      <div className="w-full max-w-[1440px] bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col lg:flex-row min-h-[780px] relative">
        {/* Floating medical illustrations background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <span className="absolute right-[-30px] bottom-[-40px] text-[18rem] rotate-[-8deg]">
            🩸⚕️🏥
          </span>
          <span className="absolute left-[-20px] top-[20%] text-[10rem] rotate-[12deg]">
            💉🧬
          </span>
        </div>

        {/* ---------- LEFT SIDE (45%) ---------- */}
        <div className="lg:w-[45%] w-full bg-[#F8F4EC] p-8 lg:p-12 flex flex-col relative z-10">
          {/* Logo + Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#8B2E2E] rounded-xl flex items-center justify-center text-white text-sm font-bold">
                BL
              </div>
              <span className="text-[#2E2E2E] font-semibold text-lg tracking-tight">
                BloodLink
              </span>
            </div>
            <div className="bg-[#D9C5A1] text-[#2E2E2E] px-3.5 py-1 rounded-full text-[0.7rem] font-semibold uppercase tracking-wide">
              Verified Hospital Portal
            </div>
          </div>

          {/* Heading */}
          <motion.h1
            className="text-3xl lg:text-4xl font-bold text-[#2E2E2E] leading-tight mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Partner with <span className="text-[#8B2E2E]">BloodLink</span>
          </motion.h1>
          <motion.p
            className="text-[#7A7A7A] text-sm mt-3 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Join Kerala's growing emergency blood donation network. Create
            verified emergency requests, instantly reach nearby donors, and save
            lives faster.
          </motion.p>

          {/* Feature Cards */}
          <div className="mt-8 space-y-5">
            <FeatureCard
              icon={Activity}
              title="Real-Time Emergency Requests"
              desc="Create and manage emergency blood requests in seconds."
              delay={0}
            />
            <FeatureCard
              icon={Users}
              title="Verified Donor Network"
              desc="Instantly connect with nearby verified blood donors."
              delay={1}
            />
            <FeatureCard
              icon={Bell}
              title="Instant Notifications"
              desc="Receive donor responses and request updates in real time."
              delay={2}
            />
          </div>

          {/* Statistics */}
          <div className="mt-auto pt-10 flex flex-wrap gap-8 border-t border-[#D9C5A1]/30">
            <StatItem value="250+" label="Verified Hospitals" delay={0} />
            <StatItem value="12K+" label="Registered Donors" delay={1} />
            <StatItem value="24/7" label="Emergency Support" delay={2} />
          </div>
        </div>

        {/* ---------- RIGHT SIDE (55%) ---------- */}
        <div className="lg:w-[55%] w-full bg-white p-6 lg:p-10 flex flex-col">
          <div className="max-w-md mx-auto w-full">
            {/* Logo inside card */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-[#8B2E2E] rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
                BL
              </div>
              <span className="text-[#2E2E2E] font-semibold text-md tracking-tight">
                BloodLink
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[#2E2E2E]">
                Create Hospital Account
              </h2>
              <p className="text-[#7A7A7A] text-sm mt-1 mb-6">
                Register your hospital to request emergency blood donations and
                join the BloodLink healthcare network.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hospital Name */}
              <div>
                <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                  Hospital Name *
                </label>
                <input
                  name="hospitalName"
                  value={form.hospitalName}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B2E2E] focus:shadow-[0_0_0_3px_rgba(139,46,46,0.12)] transition-all bg-white"
                  placeholder="e.g. KIMS Hospital"
                  required
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                    Official Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B2E2E] focus:shadow-[0_0_0_3px_rgba(139,46,46,0.12)] transition-all"
                    placeholder="hospital@mail.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                    Hospital Phone *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B2E2E] focus:shadow-[0_0_0_3px_rgba(139,46,46,0.12)] transition-all"
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>
              </div>

              {/* License + District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                    Hospital License Number *
                  </label>
                  <input
                    name="license"
                    value={form.license}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B2E2E] focus:shadow-[0_0_0_3px_rgba(139,46,46,0.12)] transition-all"
                    placeholder="License ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                    District *
                  </label>
                  <div className="relative">
                    <select
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:border-[#8B2E2E] focus:shadow-[0_0_0_3px_rgba(139,46,46,0.12)] transition-all pr-9"
                    >
                      {districts.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* State - Prefilled */}
              <div>
                <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                  State
                </label>
                <input
                  value="Kerala"
                  disabled
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-[#7A7A7A] cursor-not-allowed"
                />
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                    Password *
                  </label>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B2E2E] focus:shadow-[0_0_0_3px_rgba(139,46,46,0.12)] transition-all pr-9"
                    required
                  />
                  <div
                    className="absolute right-3 top-[34px] cursor-pointer text-[#7A7A7A]"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-xs font-medium text-[#2E2E2E] mb-1">
                    Confirm Password *
                  </label>
                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirm}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B2E2E] focus:shadow-[0_0_0_3px_rgba(139,46,46,0.12)] transition-all pr-9"
                    required
                  />
                  <div
                    className="absolute right-3 top-[34px] cursor-pointer text-[#7A7A7A]"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </div>
                </div>
              </div>

              {/* Checkboxes - Added more spacing above */}
              <div className="space-y-2 pt-4 mt-2">
                <label className="flex items-start gap-2 text-sm text-[#2E2E2E]">
                  <input
                    type="checkbox"
                    name="agree1"
                    checked={form.agree1}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#8B2E2E] focus:ring-[#8B2E2E]/30"
                  />
                  <span>
                    I certify that the information provided is accurate.
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm text-[#2E2E2E]">
                  <input
                    type="checkbox"
                    name="agree2"
                    checked={form.agree2}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#8B2E2E] focus:ring-[#8B2E2E]/30"
                  />
                  <span>
                    I agree to the{" "}
                    <span className="text-[#8B2E2E] font-medium">Terms</span>{" "}
                    &amp;{" "}
                    <span className="text-[#8B2E2E] font-medium">
                      Privacy Policy
                    </span>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-[#8B2E2E] text-white font-semibold py-3.5 rounded-2xl text-sm transition-colors hover:bg-[#742626] mt-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Create Hospital Account
              </motion.button>

              {/* Bottom Text with Login Link */}
              <p className="text-center text-sm text-[#7A7A7A] mt-4">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={handleLoginClick}
                  className="text-[#8B2E2E] font-semibold hover:underline transition-colors"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegistration;
