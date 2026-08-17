// src/pages/user/MyRequests.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Droplet,
  Droplets,
  MapPin,
  Clock,
  AlertTriangle,
  Calendar,
  Plus,
  ChevronRight,
  Eye,
  Search,
} from "lucide-react";

const MyRequests = () => {
  const navigate = useNavigate();

  const [requests] = useState([
    {
      id: 1,
      bloodGroup: "O+",
      unitsRequired: 2,
      urgency: "Critical",
      location: "Mangalore",
      district: "Kasaragod",
      requiredBy: "2026-08-17T20:00:00",
      createdAt: "2026-08-16T14:30:00",
      status: "Active",
      description: "Emergency surgery required",
    },
    {
      id: 2,
      bloodGroup: "A+",
      unitsRequired: 1,
      urgency: "Urgent",
      location: "Kasaragod",
      district: "Kasaragod",
      requiredBy: "2026-08-18T10:00:00",
      createdAt: "2026-08-15T09:15:00",
      status: "Fulfilled",
      description: "Blood required for delivery",
    },
    {
      id: 3,
      bloodGroup: "B+",
      unitsRequired: 3,
      urgency: "Normal",
      location: "Kanhangad",
      district: "Kasaragod",
      requiredBy: "2026-08-20T14:30:00",
      createdAt: "2026-08-14T16:45:00",
      status: "Cancelled",
      description: "Scheduled surgery",
    },
    {
      id: 4,
      bloodGroup: "AB-",
      unitsRequired: 1,
      urgency: "Critical",
      location: "Mangalore",
      district: "Kasaragod",
      requiredBy: "2026-08-15T18:00:00",
      createdAt: "2026-08-13T11:00:00",
      status: "Expired",
      description: "Emergency accident case",
    },
  ]);

  const getStatusConfig = (status) => {
    const configs = {
      Active: {
        label: "Searching for Donors",
        color: "#C23B22",
        bgColor: "bg-[#C23B22]/10",
        borderColor: "border-[#C23B22]/20",
      },
      Fulfilled: {
        label: "Fulfilled",
        color: "#3F6B5C",
        bgColor: "bg-[#3F6B5C]/10",
        borderColor: "border-[#3F6B5C]/20",
      },
      Cancelled: {
        label: "Cancelled",
        color: "#8C8579",
        bgColor: "bg-[#8C8579]/10",
        borderColor: "border-[#8C8579]/20",
      },
      Expired: {
        label: "Expired",
        color: "#8C8579",
        bgColor: "bg-[#8C8579]/10",
        borderColor: "border-[#8C8579]/20",
      },
    };
    return configs[status] || configs["Active"];
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      Critical: "#C23B22",
      Urgent: "#7A2F2F",
      Normal: "#3F6B5C",
    };
    return colors[urgency] || "#7A2F2F";
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

  const getTimeRemaining = (requiredBy) => {
    const now = new Date();
    const required = new Date(requiredBy);
    const diff = required - now;

    if (diff < 0) return "Past due";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    } else if (hours > 0) {
      return `${hours}h remaining`;
    } else {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutes}m remaining`;
    }
  };

  const handleCreateRequest = () => {
    navigate("/user/create-request");
  };

  const handleViewDetails = (id) => {
    navigate(`/user/request/${id}`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321] tracking-tight">
              My Blood Requests
            </h1>
            <p className="text-[#8C8579] mt-1">
              Track the blood requests you have created.
            </p>
          </div>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          // Empty State
          <div className="bg-[#FCFBF8] rounded-3xl shadow-sm border border-gray-200/60 p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-20 h-20 bg-[#7A2F2F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={36} className="text-[#7A2F2F]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C2321] mb-2">
                No blood requests yet
              </h3>
              <p className="text-[#8C8579] text-sm mb-6">
                Create a request when you or someone you care for needs blood.
              </p>
              <button
                onClick={handleCreateRequest}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium"
              >
                <Plus size={18} />
                Create Request
              </button>
            </div>
          </div>
        ) : (
          // Requests Grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((request) => {
              const urgencyColor = getUrgencyColor(request.urgency);
              const statusConfig = getStatusConfig(request.status);

              return (
                <div
                  key={request.id}
                  className="bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 p-5 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Header: Blood Group + Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${urgencyColor}12` }}
                      >
                        <span
                          className="text-xl font-bold"
                          style={{ color: urgencyColor }}
                        >
                          {request.bloodGroup}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.borderColor}`}
                            style={{ color: statusConfig.color }}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-[#8C8579]">
                            {request.unitsRequired} unit
                            {request.unitsRequired > 1 ? "s" : ""} needed
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: urgencyColor }}
                          >
                            {request.urgency}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#8C8579]">
                        Created {formatDate(request.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-[#8C8579] mb-2">
                    <MapPin
                      size={15}
                      className="text-[#7A2F2F] flex-shrink-0"
                    />
                    <span>{request.location || request.district}</span>
                  </div>

                  {/* Required By */}
                  <div className="flex items-center gap-2 text-sm text-[#8C8579] mb-2">
                    <Clock size={15} className="text-[#7A2F2F] flex-shrink-0" />
                    <span>Required by: {formatDate(request.requiredBy)}</span>
                    <span className="text-xs text-[#3F6B5C] bg-[#3F6B5C]/10 px-2 py-0.5 rounded-full">
                      {getTimeRemaining(request.requiredBy)}
                    </span>
                  </div>

                  {/* Description */}
                  {request.description && (
                    <p className="text-sm text-[#8C8579] line-clamp-1 mb-3">
                      {request.description}
                    </p>
                  )}

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(request.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7A2F2F] hover:text-[#631F1F] transition-colors duration-200 group"
                  >
                    View Details
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform duration-200"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
