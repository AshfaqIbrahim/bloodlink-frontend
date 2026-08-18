// src/pages/user/CreateRequest.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Droplet,
  Droplets,
  AlertTriangle,
  Calendar,
  MapPin,
  Navigation,
  FileText,
  X,
  Send,
} from "lucide-react";
import { createEmergencyRequest } from "../../api/emergencyRequestApi";

const FormField = ({
  icon: Icon,
  name,
  type = "text",
  placeholder,
  options,
  required = true,
  value,
  onChange,
}) => (
  <div>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4" />
      )}
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 appearance-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="4"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] placeholder:text-[#8C8579]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200 resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] placeholder:text-[#8C8579]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
        />
      )}
      {Icon && !["select", "textarea"].includes(type) && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8579] w-4 h-4 pointer-events-none" />
      )}
    </div>
  </div>
);

const CreateRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    urgency: "",
    requiredBy: "",
    district: "",
    location: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Critical", "Urgent", "Normal"];
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.bloodGroup ||
      !formData.unitsRequired ||
      !formData.urgency ||
      !formData.requiredBy ||
      !formData.district ||
      !formData.location
    ) {
      return alert("Please fill all required fields");
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        unitsRequired: Number(formData.unitsRequired),
        urgency: formData.urgency.toLowerCase(),
      };

      const res = await createEmergencyRequest(payload);

      alert(res.data.message || "Request created successfully!");
      navigate("/user/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/user/dashboard");
  };

  return (
    <div className="w-full bg-[#F6F3EC] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header - Matching welcome section style */}
        <div className="mb-6">
          <h1 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321] tracking-tight">
            Request Blood
          </h1>
          <p className="text-[#8C8579] text-sm md:text-base mt-2">
            Create a blood request and let nearby donors know you need help.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#FCFBF8] rounded-2xl p-6 md:p-8 shadow-sm border border-[#8C8579]/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Name */}
            <FormField
              icon={User}
              name="patientName"
              type="text"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
            />

            {/* Blood Group */}
            <FormField
              icon={Droplet}
              name="bloodGroup"
              type="select"
              placeholder="Blood Group"
              options={bloodGroups}
              value={formData.bloodGroup}
              onChange={handleChange}
            />

            {/* Units Required + Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                icon={Droplets}
                name="unitsRequired"
                type="number"
                placeholder="Units Required"
                value={formData.unitsRequired}
                onChange={handleChange}
              />
              <FormField
                icon={AlertTriangle}
                name="urgency"
                type="select"
                placeholder="Urgency"
                options={urgencyLevels}
                value={formData.urgency}
                onChange={handleChange}
              />
            </div>

            {/* Required By */}
            <FormField
              icon={Calendar}
              name="requiredBy"
              type="datetime-local"
              placeholder="Required By"
              value={formData.requiredBy}
              onChange={handleChange}
            />

            {/* District */}
            <FormField
              icon={MapPin}
              name="district"
              type="select"
              placeholder="District"
              options={districts}
              value={formData.district}
              onChange={handleChange}
            />

            {/* Location */}
            <FormField
              icon={Navigation}
              name="location"
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />

            {/* Description */}
            <FormField
              icon={FileText}
              name="description"
              type="textarea"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#8C8579]/10">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-[#F6F3EC] text-[#1C2321] rounded-xl hover:bg-[#E8E3D9] transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631f1f] transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Send size={18} />
                {submitting ? "Submitting..." : "Create Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
