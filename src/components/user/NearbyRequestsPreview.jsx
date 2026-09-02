import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Droplets,
  AlertCircle,
  Hospital,
  User,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { getNearbyEmergencyRequests } from "../../api/emergencyRequestApi";

const RequesterBadge = ({ request }) => {
  const isHospital = request.requesterType === "hospital";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
        isHospital
          ? "bg-[#3F6B5C]/10 text-[#3F6B5C]"
          : "bg-[#7A2F2F]/10 text-[#7A2F2F]"
      }`}
    >
      {isHospital ? (
        <Hospital className="w-3 h-3" />
      ) : (
        <User className="w-3 h-3" />
      )}
      {isHospital ? "Hospital" : "Individual"}
    </span>
  );
};

const NearbyRequestsPreview = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getNearbyEmergencyRequests();

        // Get only the 3 most recent requests
        const allRequests = response.data.requests || [];
        const recentRequests = allRequests.slice(0, 3);
        setRequests(recentRequests);
      } catch (error) {
        console.error("Failed to fetch emergency requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getUrgencyColor = (urgency) => {
    if (urgency === "critical") return "#C23B22";
    if (urgency === "urgent") return "#7A2F2F";
    return "#3F6B5C";
  };

  const getUrgencyBadge = (urgency, color) => {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: `${color}12`,
          color: color,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />
        {urgency}
      </span>
    );
  };

  const getRequesterName = (request) => {
    if (request.requesterType === "hospital") {
      return request.hospital?.hospitalName || "Hospital";
    }
    if (request.requestedByUser) {
      const { firstName, lastName } = request.requestedByUser;
      return (
        `${firstName || ""} ${lastName || ""}`.trim() || "Individual Requester"
      );
    }
    return "Individual Requester";
  };

  return (
    <section className="w-full bg-[#F6F3EC] p-4 md:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321] tracking-tight">
            Nearby Emergency Requests
          </h2>
          <p className="text-[#8C8579] text-sm mt-1.5">
            People currently waiting for blood near your location.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-[#8C8579]">
            Loading emergency requests...
          </p>
        )}

        {/* Requests List */}
        {!loading && (
          <div className="space-y-4 md:space-y-5">
            {requests.map((request) => {
              const urgencyColor = getUrgencyColor(request.urgency);

              return (
                <div
                  key={request._id}
                  className="group bg-[#FCFBF8] rounded-3xl p-6 md:p-7 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.005] border border-[#8C8579]/5 cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle background decoration */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                    {/* Blood Group & Urgency */}
                    <div className="flex items-center gap-4 lg:flex-shrink-0">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${urgencyColor}12`,
                          color: urgencyColor,
                        }}
                      >
                        <Droplets className="w-7 h-7" />
                      </div>
                      <div className="lg:hidden">
                        <div className="font-poppins font-bold text-xl text-[#1C2321]">
                          {request.bloodGroup}
                        </div>
                        {getUrgencyBadge(request.urgency, urgencyColor)}
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="flex-1 min-w-0">
                      <div className="hidden lg:flex lg:items-center lg:justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-poppins font-bold text-2xl text-[#1C2321]">
                            {request.bloodGroup}
                          </span>
                          {getUrgencyBadge(request.urgency, urgencyColor)}
                        </div>
                      </div>

                      {/* Hospital Info */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <RequesterBadge request={request} />
                          <span className="text-sm font-medium text-[#1C2321]">
                            {getRequesterName(request)}
                          </span>
                        </div>

                        {request.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#8C8579] flex-shrink-0" />
                            <span className="text-xs text-[#8C8579]">
                              {request.location}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#8C8579]" />
                            <span className="text-xs text-[#8C8579]">
                              {request.district}
                            </span>
                          </div>

                          <div className="w-px h-3 bg-[#8C8579]/20" />

                          <div className="flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-[#8C8579]" />
                            <span className="text-xs font-medium text-[#8C8579]">
                              Required by{" "}
                              {new Date(request.requiredBy).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#5a554a] mt-2 leading-relaxed">
                        {request.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="flex lg:flex-col items-center gap-3 lg:gap-2 lg:flex-shrink-0">
                      <button
                        onClick={() => navigate(`/user/request/${request._id}`)}
                        className="px-5 py-2.5 text-sm font-medium bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631f1f] transition-all duration-200 hover:shadow-md active:scale-[0.98] whitespace-nowrap w-full lg:w-auto"
                      >
                        View Details
                      </button>
                      <ChevronRight className="w-5 h-5 text-[#8C8579] lg:hidden" />
                    </div>
                  </div>

                  {/* Mobile blood group & urgency (hidden on desktop) */}
                  <div className="lg:hidden flex items-center gap-3 mt-3 pt-3 border-t border-[#8C8579]/10">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-poppins font-bold text-lg text-[#1C2321]">
                          {request.bloodGroup}
                        </span>
                        {getUrgencyBadge(request.urgency, urgencyColor)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/user/emergency-requests")}
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#7A2F2F] bg-[#FCFBF8] rounded-xl border border-[#7A2F2F]/20 hover:bg-[#7A2F2F] hover:text-white transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          >
            View All Requests
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default NearbyRequestsPreview;
