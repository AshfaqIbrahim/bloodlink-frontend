// src/pages/admin/Requests.jsx
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  MapPin,
  Clock,
  Hospital,
  User,
  Loader,
  Ban,
  Droplet,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getAllEmergencyRequests,
  forceCancelEmergencyRequest,
} from "../../api/adminApi";

const TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
  { value: "expired", label: "Expired" },
];

const statusConfig = {
  active: { label: "Active", className: "bg-[#C23B22]/10 text-[#C23B22]" },
  fulfilled: {
    label: "Fulfilled",
    className: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-[#8C8579]/10 text-[#8C8579]",
  },
  expired: { label: "Expired", className: "bg-[#8C8579]/10 text-[#8C8579]" },
};

const urgencyColors = {
  critical: "#C23B22",
  urgent: "#7A2F2F",
  normal: "#3F6B5C",
};

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const getRequesterName = (request) => {
  if (request.requesterType === "hospital") {
    return request.hospital?.hospitalName || "Hospital";
  }
  if (request.requestedByUser) {
    const { firstName, lastName } = request.requestedByUser;
    return `${firstName || ""} ${lastName || ""}`.trim() || "Individual";
  }
  return "Requester Not Available";
};

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actioningId, setActioningId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [activeTab]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllEmergencyRequests(activeTab);
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      setError("Unable to load emergency requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleForceCancel = async (id) => {
    if (!window.confirm("Cancel this request as an admin?")) return;

    setActioningId(id);
    try {
      await forceCancelEmergencyRequest(id);
      await fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel request.");
    } finally {
      setActioningId(null);
    }
  };

  return (
    <AdminLayout
      title="Emergency Request Oversight"
      subtitle="Monitor all emergency requests across the platform."
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#F6F3EC] p-1 rounded-xl w-fit mb-6 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.value
                ? "text-[#7A2F2F] bg-[#FCFBF8] shadow-sm"
                : "text-[#8C8579] hover:text-[#1C2321]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader size={32} className="text-[#7A2F2F] animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="bg-[#FCFBF8] rounded-2xl p-8 text-center border border-gray-200/60">
          <AlertCircle size={36} className="text-[#C23B22] mx-auto mb-3" />
          <p className="text-[#1C2321] font-medium">{error}</p>
          <button
            onClick={fetchRequests}
            className="mt-3 px-6 py-2 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="bg-[#FCFBF8] rounded-2xl p-12 text-center border border-gray-200/60">
          <AlertCircle size={36} className="text-[#8C8579] mx-auto mb-3" />
          <p className="text-[#1C2321] font-medium">
            No requests in this category.
          </p>
        </div>
      )}

      {!loading && !error && requests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((request) => {
            const status = statusConfig[request.status] || statusConfig.active;
            const urgencyColor =
              urgencyColors[request.urgency] || urgencyColors.normal;
            const isBusy = actioningId === request._id;

            return (
              <div
                key={request._id}
                className="bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${urgencyColor}12` }}
                    >
                      <span
                        className="text-lg font-bold"
                        style={{ color: urgencyColor }}
                      >
                        {request.bloodGroup}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${status.className}`}
                        >
                          {status.label}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            request.requesterType === "hospital"
                              ? "bg-[#3F6B5C]/10 text-[#3F6B5C]"
                              : "bg-[#7A2F2F]/10 text-[#7A2F2F]"
                          }`}
                        >
                          {request.requesterType === "hospital" ? (
                            <Hospital size={11} />
                          ) : (
                            <User size={11} />
                          )}
                          {request.requesterType === "hospital"
                            ? "Hospital"
                            : "Individual"}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#1C2321] mt-1">
                        {getRequesterName(request)}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4 text-sm text-[#8C8579]">
                  <div className="flex items-center gap-2">
                    <Droplet size={14} />
                    {request.unitsRequired} unit
                    {request.unitsRequired > 1 ? "s" : ""} needed &middot;{" "}
                    <span style={{ color: urgencyColor }}>
                      {capitalize(request.urgency)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {request.location || request.district}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Required by{" "}
                    {new Date(request.requiredBy).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {request.status === "active" && (
                  <button
                    onClick={() => handleForceCancel(request._id)}
                    disabled={isBusy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#C23B22]/30 text-[#C23B22] rounded-lg text-xs font-medium hover:bg-[#C23B22]/5 transition-colors duration-200 disabled:opacity-60"
                  >
                    <Ban size={13} />
                    {isBusy ? "Cancelling..." : "Force Cancel"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRequests;
