import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { User, Phone, Droplet } from "lucide-react";
import { completeGoogleRegistration } from "../../api/authApi";

const InputField = ({
  icon: Icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  readOnly,
}) => (
  <div className="mb-3">
    {label && (
      <label className="block text-xs font-medium text-[#5a554a] mb-1">
        {label}
      </label>
    )}
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
        readOnly={readOnly}
        className={`w-full h-11 pl-9 pr-3 rounded-xl border border-[#8C8579]/20 text-[#1C2321] placeholder:text-[#8C8579]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 ${
          readOnly ? "bg-[#F6F3EC] text-[#8C8579]" : "bg-white"
        }`}
      />
    </div>
  </div>
);

const SelectField = ({ icon: Icon, options, value, onChange, name }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-[#5a554a] mb-1">
      Blood Group
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-11 pl-9 pr-7 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 appearance-none"
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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function GoogleCompleteRegistration() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from Login.jsx via navigate(..., { state })
  const googleUser = location.state;

  const [form, setForm] = useState({
    firstName: googleUser?.firstName || "",
    lastName: googleUser?.lastName || "",
    phone: "",
    bloodGroup: "",
  });
  const [loading, setLoading] = useState(false);

  // If someone lands here directly (e.g. page refresh, no state), send them
  // back to login instead of showing a broken form.
  if (!googleUser?.email || !googleUser?.googleId) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.phone || !form.bloodGroup) {
      return alert("Please fill all required fields");
    }

    setLoading(true);
    try {
      const res = await completeGoogleRegistration({
        googleId: googleUser.googleId,
        email: googleUser.email,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        bloodGroup: form.bloodGroup,
      });

      alert(res.data.message);
      navigate("/user/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-[#F6F3EC] animate-fadeIn">
      <div className="w-full max-w-md bg-[#FCFBF8] rounded-3xl p-8 shadow-xl shadow-[#1C2321]/5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
            <div className="w-3 h-3 bg-[#7A2F2F] rounded-full" />
          </div>
          <span className="font-poppins font-bold text-lg text-[#1C2321]">
            BloodLink
          </span>
        </div>

        <h1 className="font-poppins font-bold text-2xl text-[#1C2321] mt-3 mb-1">
          Complete Your Profile
        </h1>
        <p className="text-sm text-[#5a554a] mb-6">
          Just a few more details to finish setting up your account.
        </p>

        <form onSubmit={handleSubmit}>
          <InputField
            icon={User}
            label="First Name"
            type="text"
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
          />
          <InputField
            icon={User}
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Last name (optional)"
            value={form.lastName}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={googleUser.email}
            readOnly
          />
          <InputField
            icon={Phone}
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
          />
          <SelectField
            icon={Droplet}
            name="bloodGroup"
            options={bloodGroups}
            value={form.bloodGroup}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-2 rounded-xl font-semibold text-sm bg-[#7A2F2F] text-white hover:bg-[#631f1f] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GoogleCompleteRegistration;
