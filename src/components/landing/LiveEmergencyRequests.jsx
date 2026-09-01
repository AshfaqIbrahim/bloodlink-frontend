import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Droplet,
  Clock,
  MapPin,
  Hospital,
  User,
  ChevronRight,
  Loader,
} from "lucide-react";
import { getLandingEmergencyRequests } from "../../api/emergencyRequestApi";

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const getTimeAgo = (dateString) => {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

// COMPONENTS
const UrgencyBadge = ({ urgency }) => {
  const colors = {
    critical: "text-[#C23B22] bg-[#C23B22]/10",
    urgent: "text-[#7A2F2F] bg-[#7A2F2F]/10",
    normal: "text-[#3F6B5C] bg-[#3F6B5C]/10",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[urgency] || colors.normal}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${urgency === "critical" ? "bg-[#C23B22] animate-pulse" : "bg-current"}`}
      />
      {capitalize(urgency)}
    </span>
  );
};

const RequestCard = ({ request, index, onRespond }) => {
  const isCritical = request.urgency === "critical";
  const isHospital = request.requesterType === "hospital";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border ${isCritical ? "border-[#C23B22]/20" : "border-[#8C8579]/10"}`}
    >
      {/* Blood Group & Live Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-12 h-12 rounded-full bg-[#7A2F2F] flex items-center justify-center">
          <span className="font-poppins font-bold text-lg text-white">
            {request.bloodGroup}
          </span>
        </div>
        {isCritical && (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#C23B22] rounded-full animate-pulse" />
            <span className="text-xs font-medium text-[#C23B22]">LIVE</span>
          </div>
        )}
      </div>

      {/* Requester */}
      <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1C2321] mb-1">
        {isHospital ? (
          <Hospital className="w-3.5 h-3.5 text-[#8C8579]" />
        ) : (
          <User className="w-3.5 h-3.5 text-[#8C8579]" />
        )}
        <span>{request.requesterLabel}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-[#5a554a] mb-3">
        <MapPin className="w-3.5 h-3.5 text-[#8C8579]" />
        <span>{request.district || "Location not specified"}</span>
      </div>

      {/* Details */}
      <div className="flex items-center gap-3 text-xs text-[#8C8579] mb-3">
        <span className="flex items-center gap-1">
          <Droplet className="w-3.5 h-3.5" />
          {request.unitsRequired} Unit{request.unitsRequired > 1 ? "s" : ""}
        </span>
        <span className="w-px h-3 bg-[#8C8579]/20" />
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {getTimeAgo(request.createdAt)}
        </span>
      </div>

      {/* Urgency & Actions */}
      <div className="flex items-center justify-between">
        <UrgencyBadge urgency={request.urgency} />
        <div className="flex gap-1.5">
          <button
            onClick={onRespond}
            className="px-3.5 py-1.5 text-xs font-medium bg-[#7A2F2F] text-white rounded-lg hover:bg-[#631f1f] transition-colors"
          >
            Donate
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// MAIN COMPONENT
const LiveEmergencyRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getLandingEmergencyRequests();
        setRequests(res.data.requests || []);
      } catch (err) {
        console.error("Failed to load landing requests:", err);
        setError("Unable to load active requests right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Signing in is required to respond to a request
  const handleRespond = () => navigate("/login");

  return (
    <section className="w-full bg-[#F6F3EC] py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full text-xs font-medium text-[#7A2F2F] mb-3">
            <span className="w-1.5 h-1.5 bg-[#C23B22] rounded-full animate-pulse" />
            LIVE REQUESTS
          </div>
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321]">
            Blood Needed <span className="text-[#7A2F2F]">Right Now</span>
          </h2>
          <p className="text-sm text-[#8C8579] mt-2 max-w-lg mx-auto">
            Nearby patients waiting for blood donors
          </p>
        </motion.div>

        {/* Status Bar */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-xl px-4 py-3 shadow-sm border border-[#8C8579]/10 flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C23B22] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#1C2321]">
                {requests.length} active request
                {requests.length !== 1 ? "s" : ""}
              </span>
              <span className="text-xs text-[#8C8579]">
                &bull; Updated live
              </span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-[#7A2F2F] hover:text-[#631f1f] transition-colors flex items-center gap-1 group"
            >
              View all
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader size={32} className="text-[#7A2F2F] animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12 text-sm text-[#8C8579]">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#1C2321] font-medium mb-1">
              No active requests right now
            </p>
            <p className="text-sm text-[#8C8579]">
              Check back soon, or sign up to be notified.
            </p>
          </div>
        )}

        {/* Request Grid */}
        {!loading && !error && requests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((request, index) => (
              <RequestCard
                key={request.id}
                request={request}
                index={index}
                onRespond={handleRespond}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveEmergencyRequests;
