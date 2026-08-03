import { useState } from "react";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Check,
  Zap,
  Users,
  AlertCircle,
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
  optional = false,
}) => (
  <div className="mb-2">
    <label className="block text-xs font-medium text-[#1C2321] mb-1">
      {label}{" "}
      {optional && (
        <span className="text-[#8C8579] font-normal">(optional)</span>
      )}
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
        className="w-full h-11 pl-9 pr-8 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] placeholder:text-[#8C8579]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
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

const Button = ({ children, variant = "primary", className, ...props }) => {
  const base =
    "w-full h-11 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm";
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
  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/50 hover:bg-white transition-all duration-200">
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

function HospitalRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    hospitalName: "",
    email: "",
    phone: "",
    registrationNumber: "",
    emergencyContact: "",
    emergencyPhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirm: "",
  });
  const [certify, setCertify] = useState(false);
  const [agree, setAgree] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-[#F6F3EC] animate-fadeIn relative overflow-hidden">
      <div className="absolute top-4 left-4 bg-[#7A2F2F]/10 text-[#7A2F2F] px-3 py-1 rounded-full text-xs font-medium border border-[#7A2F2F]/20 z-10">
        Hospital Register Page
      </div>

      <div className="w-full max-w-[1300px] h-[95vh] max-h-[850px] grid grid-cols-1 lg:grid-cols-[38%_62%] bg-[#F6F3EC] rounded-3xl overflow-hidden shadow-2xl shadow-[#1C2321]/5">
        {/* LEFT PANEL */}
        <div className="p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-[#7A2F2F]" />
            </div>
            <span className="font-poppins font-bold text-xl text-[#1C2321]">
              BloodLink
            </span>
            <span className="ml-1 text-[10px] font-medium text-[#8C8579] bg-[#8C8579]/10 px-2 py-0.5 rounded-full">
              Hospitals
            </span>
          </div>

          <div className="mb-4 flex justify-center">
            <svg
              className="w-full max-w-[190px]"
              viewBox="0 0 240 120"
              fill="none"
            >
              <rect
                x="30"
                y="45"
                width="60"
                height="55"
                rx="3"
                fill="#7A2F2F"
                opacity="0.05"
              />
              <rect
                x="35"
                y="50"
                width="50"
                height="45"
                rx="2"
                fill="#7A2F2F"
                opacity="0.06"
              />
              <rect
                x="42"
                y="57"
                width="6"
                height="8"
                rx="1"
                fill="#7A2F2F"
                opacity="0.12"
              />
              <rect
                x="52"
                y="57"
                width="6"
                height="8"
                rx="1"
                fill="#7A2F2F"
                opacity="0.12"
              />
              <rect
                x="62"
                y="57"
                width="6"
                height="8"
                rx="1"
                fill="#7A2F2F"
                opacity="0.12"
              />
              <path
                d="M100 75 C130 60, 150 75, 180 65"
                stroke="#7A2F2F"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.25"
              />
              <circle cx="180" cy="62" r="8" fill="#7A2F2F" opacity="0.08" />
              <circle cx="180" cy="62" r="3" fill="#7A2F2F" opacity="0.3" />
              <circle cx="200" cy="52" r="7" fill="#3F6B5C" opacity="0.08" />
              <circle cx="200" cy="52" r="3" fill="#3F6B5C" opacity="0.3" />
            </svg>
          </div>

          <h1 className="font-poppins font-bold text-3xl lg:text-4xl leading-tight text-[#1C2321] mb-2">
            Partner With BloodLink
          </h1>
          <p className="text-sm text-[#5a554a] max-w-md leading-relaxed mb-4">
            Register your hospital to create emergency blood requests, connect
            with nearby verified donors, and save lives through real-time
            intelligent matching.
          </p>

          <div className="space-y-2 max-w-sm">
            <FeatureCard
              icon={Zap}
              title="Real-time Blood Requests"
              description="Create and manage emergency blood requests instantly."
            />
            <FeatureCard
              icon={Users}
              title="Intelligent Nearby Donor Matching"
              description="Connect with compatible blood donors in your area."
            />
            <FeatureCard
              icon={AlertCircle}
              title="Instant Emergency Notifications"
              description="Receive real-time alerts when donors respond."
            />
          </div>
        </div>

        {/* RIGHT PANEL - Removed overflow constraints */}
        <div className="p-6 lg:p-8 flex items-center justify-center order-1 lg:order-2 bg-[#FCFBF8] lg:bg-transparent">
          <div className="w-full max-w-lg bg-[#FCFBF8] rounded-3xl p-8 shadow-xl shadow-[#1C2321]/5 animate-slideUp">
            <div className="mb-4">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
                  <Building className="w-4 h-4 text-[#7A2F2F]" />
                </div>
                <span className="font-poppins font-bold text-xl text-[#1C2321]">
                  BloodLink
                </span>
              </div>
              <h2 className="font-poppins font-semibold text-xl text-[#1C2321]">
                Hospital Registration
              </h2>
              <p className="text-[#8C8579] text-sm">
                Create your hospital account to start managing emergency blood
                requests.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-1">
              <div className="grid grid-cols-2 gap-2.5">
                <InputField
                  icon={Building}
                  label="Hospital Name"
                  type="text"
                  placeholder="City Hospital"
                  name="hospitalName"
                  value={form.hospitalName}
                  onChange={handleChange}
                />
                <InputField
                  icon={Mail}
                  label="Official Email"
                  type="email"
                  placeholder="admin@hospital.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <InputField
                  icon={Phone}
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <InputField
                  icon={Shield}
                  label="Registration Number"
                  type="text"
                  placeholder="Optional ID"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  optional
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <InputField
                  icon={User}
                  label="Emergency Contact"
                  type="text"
                  placeholder="Dr. Smith"
                  name="emergencyContact"
                  value={form.emergencyContact}
                  onChange={handleChange}
                />
                <InputField
                  icon={Phone}
                  label="Emergency Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  name="emergencyPhone"
                  value={form.emergencyPhone}
                  onChange={handleChange}
                />
              </div>
              <InputField
                icon={MapPin}
                label="Street Address"
                type="text"
                placeholder="123 Healthcare Blvd"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
              <div className="grid grid-cols-3 gap-2.5">
                <InputField
                  label="City"
                  type="text"
                  placeholder="New York"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
                <InputField
                  label="State"
                  type="text"
                  placeholder="NY"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
                <InputField
                  label="Pincode"
                  type="text"
                  placeholder="10001"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
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
              </div>

              <div className="space-y-1.5 mt-2">
                <Checkbox
                  label="I certify that this information is accurate."
                  checked={certify}
                  onChange={() => setCertify(!certify)}
                />
                <Checkbox
                  label="I agree to the Terms & Privacy Policy."
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                />
              </div>

              <Button className="mt-3">Register Hospital</Button>

              <p className="text-center text-xs text-[#8C8579] mt-3">
                Already registered?{" "}
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

export default HospitalRegisterPage;
