import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Droplet,
  Lock,
  Eye,
  EyeOff,
  Check,
  MapPin,
  Zap,
  Heart,
} from "lucide-react";

const InputField = ({
  icon: Icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  rightIcon,
  onRightIconClick,
  name,
}) => (
  <div className="mb-2">
    <label className="block text-xs font-medium text-[#1C2321] mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-8 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] placeholder:text-[#8C8579]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
      />
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8579] hover:text-[#1C2321] transition-colors"
        >
          {rightIcon}
        </button>
      )}
    </div>
  </div>
);

const SelectField = ({ icon: Icon, label, options, value, onChange, name }) => (
  <div className="mb-2">
    <label className="block text-xs font-medium text-[#1C2321] mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-10 pl-9 pr-7 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 appearance-none"
      >
        <option value="">Select Blood Group</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-3 h-3 text-[#8C8579]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
);

const Button = ({ children, variant = "primary", className, ...props }) => {
  const base =
    "w-full h-11 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm";
  const variants = {
    primary:
      "bg-[#7A2F2F] text-white hover:bg-[#631f1f] shadow-sm hover:shadow-md active:scale-[0.98]",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-start gap-2 text-xs text-[#1C2321] cursor-pointer group">
    <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer appearance-none w-4 h-4 border border-[#8C8579]/40 rounded checked:border-[#7A2F2F] checked:bg-[#7A2F2F] transition-all duration-200 cursor-pointer"
      />
      <Check className="absolute text-white w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
    <span className="select-none leading-relaxed">{label}</span>
  </label>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/50 hover:bg-white hover:shadow-sm transition-all duration-200">
    <div className="w-8 h-8 rounded-xl bg-[#7A2F2F]/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-[#7A2F2F]" />
    </div>
    <div>
      <h4 className="font-medium text-[#1C2321] text-xs">{title}</h4>
      <p className="text-[#8C8579] text-[10px] leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

function UserRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    password: "",
    confirm: "",
  });
  const [agreed, setAgreed] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-[#F6F3EC] animate-fadeIn relative overflow-hidden">
      {/* Page Label */}
      <div className="absolute top-4 left-4 bg-[#7A2F2F]/10 text-[#7A2F2F] px-3 py-1 rounded-full text-xs font-medium border border-[#7A2F2F]/20 z-10">
        User Register Page
      </div>

      <div className="w-full max-w-[1200px] h-[92vh] max-h-[700px] grid grid-cols-1 lg:grid-cols-[42%_58%] bg-[#F6F3EC] rounded-3xl overflow-hidden shadow-2xl shadow-[#1C2321]/5">
        {/* LEFT PANEL */}
        <div className="p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-[#7A2F2F] rounded-full" />
            </div>
            <span className="font-poppins font-bold text-lg text-[#1C2321]">
              BloodLink
            </span>
          </div>

          <div className="mb-4 flex justify-center">
            <svg
              className="w-full max-w-[180px]"
              viewBox="0 0 240 100"
              fill="none"
            >
              <circle cx="60" cy="45" r="18" fill="#7A2F2F" opacity="0.05" />
              <circle cx="140" cy="42" r="15" fill="#3F6B5C" opacity="0.05" />
              <path
                d="M60 32 L70 22 L80 32 L90 22 L100 32 L110 28 L100 45 L110 55 L100 55 L90 45 L80 55 L70 45 L60 55 L50 45 L60 32Z"
                fill="#7A2F2F"
                opacity="0.06"
              />
            </svg>
          </div>

          <h1 className="font-poppins font-bold text-3xl leading-tight text-[#1C2321] mb-2">
            Become a BloodLink Member
          </h1>
          <p className="text-sm text-[#5a554a] max-w-md leading-relaxed mb-4">
            Join thousands of people helping save lives by donating blood or
            requesting help during emergencies.
          </p>

          <div className="space-y-1.5 max-w-sm">
            <FeatureCard
              icon={Heart}
              title="Donate Blood"
              description="Help nearby patients during emergencies."
            />
            <FeatureCard
              icon={MapPin}
              title="Find Nearby Donors"
              description="Connect with compatible blood donors instantly."
            />
            <FeatureCard
              icon={Zap}
              title="Real-Time Emergency Alerts"
              description="Receive and respond to emergency blood requests."
            />
          </div>
        </div>

        {/* RIGHT PANEL - Registration Card */}
        <div className="p-6 lg:p-8 flex items-center justify-center order-1 lg:order-2 bg-[#FCFBF8] lg:bg-transparent">
          <div className="w-full max-w-md bg-[#FCFBF8] rounded-3xl p-6 lg:p-8 shadow-xl shadow-[#1C2321]/5 animate-slideUp">
            {/* Card Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#7A2F2F] rounded-full" />
                </div>
                <span className="font-poppins font-bold text-lg text-[#1C2321]">
                  BloodLink
                </span>
              </div>
              <h2 className="font-poppins font-semibold text-xl text-[#1C2321]">
                Create Your Account
              </h2>
              <p className="text-[#8C8579] text-xs">
                Register once. Donate or request blood whenever needed.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  icon={User}
                  label="First Name"
                  type="text"
                  placeholder="John"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              {/* Phone */}
              <InputField
                icon={Phone}
                label="Phone Number"
                type="tel"
                placeholder="+91 00000-00000"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              {/* Blood Group Dropdown */}
              <SelectField
                icon={Droplet}
                label="Blood Group"
                options={bloodGroups}
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
              />

              {/* Password */}
              <InputField
                icon={Lock}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                value={form.password}
                onChange={handleChange}
                rightIcon={
                  showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
              />

              {/* Confirm Password */}
              <InputField
                icon={Lock}
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                rightIcon={
                  showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )
                }
                onRightIconClick={() => setShowConfirm(!showConfirm)}
              />

              {/* Checkbox */}
              <div className="mt-2 mb-3">
                <Checkbox
                  label="I agree to the Terms & Privacy Policy."
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
              </div>

              {/* CREATE ACCOUNT BUTTON */}
              <Button>Create Account</Button>

              {/* Login Link */}
              <p className="text-center text-xs text-[#8C8579] mt-3">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-[#7A2F2F] font-semibold hover:underline"
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
}

export default UserRegisterPage;
