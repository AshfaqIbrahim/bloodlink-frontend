// src/pages/RequestDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Droplet,
  Hospital,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Loader,
} from "lucide-react";
import axios from "axios";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:5000/api/emergency-requests/public/${id}`,
          { withCredentials: true },
        );
        setRequest(response.data.request);
      } catch (err) {
        console.error("Error fetching request details:", err);
        setError("Unable to load this emergency request.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/user/dashboard");
  };

  const handleDonate = () => {
    // TODO: Implement donation response API
    console.log("Donation response for request:", id);
    alert("Donation response feature will be implemented soon.");
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F3EC] flex items-center justify-center">
        <div className="text-center">
          <Loader
            size={40}
            className="text-[#7A2F2F] animate-spin mx-auto mb-4"
          />
          <p className="text-[#8C8579] font-medium">
            Loading request details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !request) {
    return (
      <div className="min-h-screen bg-[#F6F3EC] flex items-center justify-center p-4">
        <div className="bg-[#FCFBF8] rounded-3xl shadow-sm border border-gray-200/60 p-8 max-w-md w-full text-center">
          <AlertCircle size={48} className="text-[#C23B22] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#1C2321] mb-2">
            Unable to Load Request
          </h3>
          <p className="text-[#8C8579] mb-6">
            {error || "This emergency request could not be found."}
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get urgency styles
  const getUrgencyStyles = (urgency) => {
    const styles = {
      Critical: "bg-[#C23B22]/10 text-[#C23B22]",
      Urgent: "bg-[#7A2F2F]/10 text-[#7A2F2F]",
      Normal: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
    };
    return styles[urgency] || styles.Normal;
  };

  // Get status styles
  const getStatusStyles = (status) => {
    const styles = {
      Active: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
      Fulfilled: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
      Cancelled: "bg-[#C23B22]/10 text-[#C23B22]",
      Expired: "bg-[#C23B22]/10 text-[#C23B22]",
    };
    return styles[status] || styles.Active;
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#8C8579] hover:text-[#1C2321] transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-medium">Back to Requests</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1C2321] tracking-tight">
            Emergency Request
          </h1>
          <p className="text-[#8C8579] mt-1">
            Review the details of this blood request before responding.
          </p>
        </div>

        {/* Main Request Card */}
        <div className="bg-[#FCFBF8] rounded-3xl shadow-sm border border-gray-200/60 p-6 sm:p-8">
          {/* Header Section - Blood Group & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-gray-200/60">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#7A2F2F]/5 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-[#7A2F2F]">
                  {request.bloodGroup}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#8C8579] text-sm">
                  <Droplet size={16} />
                  <span>{request.unitsRequired} Units Required</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyStyles(request.urgency)}`}
                  >
                    {request.urgency}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(request.status)}`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blood Requirement */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-[#8C8579]">Blood Group</p>
              <p className="text-lg font-semibold text-[#1C2321]">
                {request.bloodGroup}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#8C8579]">Units Required</p>
              <p className="text-lg font-semibold text-[#1C2321]">
                {request.unitsRequired} Unit
                {request.unitsRequired > 1 ? "s" : ""}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#8C8579]">Required By</p>
              <p className="text-lg font-semibold text-[#1C2321] flex items-center gap-2">
                <Clock size={16} className="text-[#8C8579]" />
                {formatDate(request.requiredBy)}
              </p>
            </div>
          </div>

          {/* Hospital Information */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-medium text-[#8C8579] uppercase tracking-wider mb-4">
              Hospital Information
            </h3>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#7A2F2F]/5 rounded-xl flex-shrink-0">
                <Hospital size={20} className="text-[#7A2F2F]" />
              </div>
              <div>
                <p className="font-semibold text-[#1C2321]">
                  {request.hospital?.hospitalName ||
                    "Hospital Name Not Available"}
                </p>
                <p className="text-[#8C8579] text-sm mt-0.5">
                  {request.hospital?.district ||
                    request.district ||
                    "Location not specified"}
                  {request.hospital?.state && `, ${request.hospital.state}`}
                </p>
              </div>
            </div>
          </div>

          {/* Patient & Request Information */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-medium text-[#8C8579] uppercase tracking-wider mb-4">
              Patient & Request Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#8C8579]">Patient Name</p>
                <p className="text-[#1C2321] font-medium">
                  {request.patientName || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8C8579]">Blood Group</p>
                <p className="text-[#1C2321] font-medium">
                  {request.bloodGroup}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8C8579]">Units Required</p>
                <p className="text-[#1C2321] font-medium">
                  {request.unitsRequired}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8C8579]">Urgency</p>
                <p
                  className={`font-medium ${request.urgency === "Critical" ? "text-[#C23B22]" : request.urgency === "Urgent" ? "text-[#7A2F2F]" : "text-[#3F6B5C]"}`}
                >
                  {request.urgency}
                </p>
              </div>
            </div>
          </div>

          {/* Request Location */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#7A2F2F] flex-shrink-0" />
              <div>
                <p className="font-medium text-[#1C2321]">Location</p>
                <p className="text-[#8C8579] text-sm">
                  {request.location || "Location not specified"}
                  {request.district && `, ${request.district}`}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {request.description && (
            <div className="mt-8 pt-6 border-t border-gray-200/60">
              <h3 className="text-sm font-medium text-[#8C8579] uppercase tracking-wider mb-3">
                Request Details
              </h3>
              <div className="bg-[#F6F3EC] rounded-2xl p-4">
                <p className="text-[#1C2321] leading-relaxed">
                  {request.description}
                </p>
              </div>
            </div>
          )}

          {/* Required By / Time */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-[#7A2F2F] flex-shrink-0" />
              <div>
                <p className="font-medium text-[#1C2321]">Required By</p>
                <p className="text-[#8C8579] text-sm">
                  {formatDate(request.requiredBy)}
                </p>
              </div>
            </div>
          </div>

          {/* Donor Action */}
          <div className="mt-10 pt-6 border-t border-gray-200/60">
            <button
              onClick={handleDonate}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#7A2F2F] text-white rounded-2xl font-medium hover:bg-[#631F1F] transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              I Can Donate
            </button>
            <p className="text-xs text-[#8C8579] mt-3">
              By clicking "I Can Donate", you confirm your willingness to donate
              blood for this emergency request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
