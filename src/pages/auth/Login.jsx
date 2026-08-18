import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { loginHospital } from "../../api/hospitalApi";

import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api/authApi";

const InputField = ({
  icon: Icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  rightIcon,
  onRightIconClick,
}) => (
  <div className="mb-4">
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8579] w-5 h-5" />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-14 pl-11 pr-11 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] placeholder:text-[#8C8579]/60 text-base focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
      />
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C8579] hover:text-[#1C2321] transition-colors"
        >
          {rightIcon}
        </button>
      )}
    </div>
  </div>
);

const Button = ({ children, variant = "primary", className, ...props }) => {
  const base =
    "w-full h-14 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-base";
  const variants = {
    primary:
      "bg-[#7A2F2F] text-white hover:bg-[#631f1f] shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-white text-[#1C2321] border border-[#8C8579]/30 hover:border-[#8C8579]/60 hover:bg-[#F6F3EC]/50 active:scale-[0.98]",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2.5 text-sm text-[#1C2321] cursor-pointer group">
    <div className="relative flex items-center justify-center w-5 h-5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer appearance-none w-5 h-5 border border-[#8C8579]/40 rounded checked:border-[#7A2F2F] checked:bg-[#7A2F2F] transition-all duration-200 cursor-pointer"
      />
      <Check className="absolute text-white w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
    </div>
    <span className="select-none">{label}</span>
  </label>
);

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginType, setLoginType] = useState("user");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (loginType === "hospital") {
        res = await loginHospital({
          email,
          password,
        });

        alert(res.data.message);
        navigate("/hospital-dashboard");
      } else {
        res = await loginUser({
          email,
          password,
        });

        alert(res.data.message);
        navigate("/user/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  //GOOGLE AUTH
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await googleLogin(credentialResponse.credential);

      alert(res.data.message);

      if (res.data.isNewUser) {
        navigate("/google-complete-registration", {
          state: res.data.user,
        });
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      alert(
        err.response?.data?.message || "Google login failed. Please try again.",
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-[#F6F3EC] animate-fadeIn relative overflow-hidden">
      {/* Page Label */}
      <div className="absolute top-6 left-6 bg-[#7A2F2F]/10 text-[#7A2F2F] px-4 py-1.5 rounded-full text-sm font-medium border border-[#7A2F2F]/20 z-10">
        Login Page
      </div>

      <div className="w-full max-w-[1200px] h-[90vh] max-h-[800px] grid grid-cols-1 lg:grid-cols-[42%_58%] bg-[#F6F3EC] rounded-3xl overflow-hidden shadow-2xl shadow-[#1C2321]/5">
        {/* LEFT PANEL */}
        <div className="p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-6 flex justify-center">
            <svg
              className="w-full max-w-[240px]"
              viewBox="0 0 280 130"
              fill="none"
            >
              <path
                d="M40 100 C80 50, 120 35, 160 70 C200 105, 240 85, 260 60"
                stroke="#7A2F2F"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                opacity="0.3"
              />
              <circle cx="60" cy="85" r="10" fill="#7A2F2F" opacity="0.12" />
              <circle cx="120" cy="60" r="14" fill="#3F6B5C" opacity="0.1" />
              <circle cx="200" cy="75" r="10" fill="#7A2F2F" opacity="0.1" />
              <path
                d="M90 45 L98 30 L106 45 L120 42 L110 53 L115 68 L100 60 L90 70 L83 58 L73 60 L77 45 L90 45Z"
                fill="#7A2F2F"
                opacity="0.06"
              />
            </svg>
          </div>
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl leading-tight text-[#1C2321] mb-3">
            Connecting Donors.
            <br />
            Saving Lives.
          </h1>
          <p className="text-base text-[#5a554a] max-w-md mb-5 leading-relaxed">
            BloodLink intelligently connects nearby blood donors, recipients,
            and hospitals in real time during emergencies.
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="font-poppins font-semibold text-2xl text-[#1C2321]">
                15,000+
              </span>
              <p className="text-sm text-[#8C8579]">Registered Donors</p>
            </div>
            <div>
              <span className="font-poppins font-semibold text-2xl text-[#1C2321]">
                500+
              </span>
              <p className="text-sm text-[#8C8579]">Hospitals</p>
            </div>
            <div>
              <span className="font-poppins font-semibold text-2xl text-[#1C2321]">
                24/7
              </span>
              <p className="text-sm text-[#8C8579]">Emergency Support</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 lg:p-12 flex items-center justify-center order-1 lg:order-2 bg-[#FCFBF8] lg:bg-transparent">
          <div className="w-full max-w-md bg-[#FCFBF8] rounded-3xl p-8 lg:p-10 shadow-xl shadow-[#1C2321]/5 animate-slideUp">
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-9 h-9 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#7A2F2F] rounded-full" />
                </div>
                <span className="font-poppins font-bold text-xl text-[#1C2321]">
                  BloodLink
                </span>
              </div>

              <p className="text-[#8C8579] text-sm">
                {loginType === "hospital"
                  ? "Login to your hospital account to manage emergency blood requests."
                  : "Login to your account to continue."}
              </p>

              <div className="mb-6">
                <p className="text-sm font-medium text-[#1C2321] mb-2">
                  Login as
                </p>

                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F6F3EC] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setLoginType("user")}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                      loginType === "user"
                        ? "bg-white text-[#7A2F2F] shadow-sm"
                        : "text-[#8C8579] hover:text-[#1C2321]"
                    }`}
                  >
                    Donor / Recipient
                  </button>

                  <button
                    type="button"
                    onClick={() => setLoginType("hospital")}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                      loginType === "hospital"
                        ? "bg-white text-[#7A2F2F] shadow-sm"
                        : "text-[#8C8579] hover:text-[#1C2321]"
                    }`}
                  >
                    Hospital
                  </button>
                </div>
              </div>

              <p className="text-[#8C8579] text-sm">
                Login to your account to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                icon={Lock}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightIcon={
                  showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
              />
              <div className="flex items-center justify-between mb-4">
                <Checkbox
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#7A2F2F] font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button className="mb-4">
                {loginType === "hospital" ? "Hospital Login" : "Log In"}
              </Button>
              <div className="relative flex items-center my-4">
                <div className="flex-grow border-t border-[#8C8579]/20"></div>
                <span className="flex-shrink mx-4 text-xs text-[#8C8579] font-medium uppercase tracking-wider">
                  or
                </span>
                <div className="flex-grow border-t border-[#8C8579]/20"></div>
              </div>
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    alert("Google login failed. Please try again.");
                  }}
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  width="100%"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>
              <p className="text-center text-sm text-[#8C8579] mt-4">
                Don't have an account?{" "}
                <Link
                  to="/select-account"
                  className="text-[#7A2F2F] font-semibold hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
