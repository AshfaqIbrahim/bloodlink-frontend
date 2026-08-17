// src/pages/user/ViewAllRequests.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Droplet,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const ViewAllRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/emergency-requests/nearby");
      setRequests(response.data.requests || []);
    } catch (err) {
      console.error("Error fetching emergency requests:", err);
      setError("Unable to load emergency requests");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/user/dashboard");
  };

  const handleViewDetails = (requestId) => {
    navigate(`/user/request/${requestId}`);
  };

  const getUrgencyColors = (urgency) => {
    const colors = {
      Critical: "bg-[#C23B22]/10 text-[#C23B22] border-[#C23B22]/20",
      Urgent: "bg-[#7A2F2F]/10 text-[#7A2F2F] border-[#7A2F2F]/20",
      Normal: "bg-[#3F6B5C]/10 text-[#3F6B5C] border-[#3F6B5C]/20",
    };
    return colors[urgency] || colors.Normal;
  };

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

  return (
    <div className="min-h-screen bg-[#F6F3EC] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#8C8579] hover:text-[#1C2321] transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#1C2321]">
            Emergency Requests
          </h1>
          <p className="text-[#8C8579] mt-1">
            View all emergency blood requests in your area.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-[#7A2F2F] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-[#8C8579]">Loading emergency requests...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#FCFBF8] rounded-2xl p-8 text-center border border-gray-200/60">
            <AlertCircle size={40} className="text-[#C23B22] mx-auto mb-3" />
            <p className="text-[#1C2321] font-medium">{error}</p>
            <button
              onClick={fetchRequests}
              className="mt-3 px-6 py-2 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && requests.length === 0 && (
          <div className="bg-[#FCFBF8] rounded-2xl p-8 text-center border border-gray-200/60">
            <div className="w-16 h-16 bg-[#7A2F2F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplet size={28} className="text-[#7A2F2F]" />
            </div>
            <h3 className="text-lg font-medium text-[#1C2321] mb-1">
              No requests found
            </h3>
            <p className="text-[#8C8579] text-sm">
              There are currently no emergency blood requests in your area.
            </p>
          </div>
        )}

        {/* Request Cards */}
        {!loading && !error && requests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-[#FCFBF8] rounded-2xl p-5 shadow-sm border border-gray-200/60 hover:shadow-md transition-shadow duration-200"
              >
                {/* Header: Blood Group + Urgency Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#7A2F2F]/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-[#7A2F2F]">
                        {request.bloodGroup}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getUrgencyColors(request.urgency)}`}
                        >
                          {request.urgency}
                        </span>
                        <span className="text-xs text-[#8C8579]">
                          {request.unitsRequired} unit
                          {request.unitsRequired > 1 ? "s" : ""} needed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#8C8579]">
                    <Droplet size={14} />
                    <span>Blood</span>
                  </div>
                </div>

                {/* Hospital & Location */}
                <div className="mb-2">
                  <h3 className="font-semibold text-[#1C2321]">
                    {request.hospital?.hospitalName ||
                      "Hospital Name Not Available"}
                  </h3>
                  <p className="text-sm text-[#8C8579]">
                    {request.patientName || "Patient name not specified"}
                  </p>
                </div>

                {/* Location & Required By */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-sm text-[#8C8579]">
                    <MapPin
                      size={15}
                      className="text-[#7A2F2F] flex-shrink-0"
                    />
                    <span>
                      {request.location ||
                        request.district ||
                        "Location not specified"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8C8579]">
                    <Clock size={15} className="text-[#7A2F2F] flex-shrink-0" />
                    <span>Required by: {formatDate(request.requiredBy)}</span>
                  </div>
                </div>

                {/* Description */}
                {request.description && (
                  <p className="text-sm text-[#8C8579] line-clamp-2 mb-3">
                    {request.description}
                  </p>
                )}

                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(request._id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7A2F2F] hover:text-[#631F1F] transition-colors duration-200 group"
                >
                  View Details
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllRequests;
