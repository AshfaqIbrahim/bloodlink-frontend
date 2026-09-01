import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Droplet, MapPin, Loader, ArrowLeft } from "lucide-react";
import { getMe } from "../../api/authApi";
import { updateProfile } from "../../api/userApi";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-[#5a554a] mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
      )}
      <input
        {...props}
        className={`w-full h-11 pl-9 pr-3 rounded-xl border border-[#8C8579]/20 text-[#1C2321] placeholder:text-[#8C8579]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 ${
          props.readOnly ? "bg-[#F6F3EC] text-[#8C8579]" : "bg-white"
        }`}
      />
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        const u = res.data.user;
        setForm({
          firstName: u.firstName || "",
          lastName: u.lastName || "",
          email: u.email || "",
          phone: u.phone || "",
          bloodGroup: u.bloodGroup || "",
          district: u.address?.district || "",
          state: u.address?.state || "",
          pincode: u.address?.pincode || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        bloodGroup: form.bloodGroup,
        address: {
          district: form.district,
          state: form.state,
          pincode: form.pincode,
        },
      });
      alert(res.data.message || "Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F3EC] flex items-center justify-center">
        <Loader size={32} className="text-[#7A2F2F] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F3EC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate("/user/dashboard")}
          className="flex items-center gap-1.5 text-sm text-[#8C8579] hover:text-[#1C2321] mb-4 transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </button>

        <div className="bg-[#FCFBF8] rounded-3xl border border-gray-200/60 shadow-sm p-6 sm:p-8">
          <h1 className="font-poppins font-bold text-2xl text-[#1C2321] mb-1">
            My Profile
          </h1>
          <p className="text-sm text-[#8C8579] mb-6">
            Update your personal information.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <InputField
                icon={User}
                label="First Name"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
              <InputField
                icon={User}
                label="Last Name"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              readOnly
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <InputField
                icon={Phone}
                label="Phone Number"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <div className="mb-4">
                <label className="block text-xs font-medium text-[#5a554a] mb-1">
                  Blood Group
                </label>
                <div className="relative">
                  <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
                  <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    className="w-full h-11 pl-9 pr-7 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <InputField
                icon={MapPin}
                label="District"
                type="text"
                name="district"
                placeholder="e.g. Kozhikode"
                value={form.district}
                onChange={handleChange}
              />
              <InputField
                icon={MapPin}
                label="State"
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <InputField
              icon={MapPin}
              label="Pincode"
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full h-11 mt-2 rounded-xl font-semibold text-sm bg-[#7A2F2F] text-white hover:bg-[#631f1f] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
