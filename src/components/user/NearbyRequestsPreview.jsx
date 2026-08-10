import React from "react";
import {
  Droplets,
  AlertCircle,
  Hospital,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const NearbyRequestsPreview = () => {
  // Mock data - easily replaceable with backend data
  const requests = [
    {
      id: 1,
      bloodGroup: "O+",
      urgency: "Critical",
      hospitalName: "City General Hospital",
      address: "123 Healthcare Blvd, New York",
      distance: "2.3 km away",
      requiredTime: "Needed within 45 minutes",
      description: "Emergency surgery requires immediate O+ blood supply.",
      urgencyColor: "#C23B22",
    },
    {
      id: 2,
      bloodGroup: "A-",
      urgency: "High",
      hospitalName: "St. Mary's Medical Center",
      address: "456 Medical Drive, Brooklyn",
      distance: "4.1 km away",
      requiredTime: "Needed within 2 hours",
      description: "Patient with severe trauma needs A- blood transfusion.",
      urgencyColor: "#7A2F2F",
    },
    {
      id: 3,
      bloodGroup: "B+",
      urgency: "Medium",
      hospitalName: "Mount Sinai Hospital",
      address: "789 Health Avenue, Queens",
      distance: "6.8 km away",
      requiredTime: "Needed within 4 hours",
      description: "Scheduled surgery requires B+ blood on standby.",
      urgencyColor: "#3F6B5C",
    },
  ];

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

        {/* Requests List */}
        <div className="space-y-4 md:space-y-5">
          {requests.map((request) => (
            <div
              key={request.id}
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
                      backgroundColor: `${request.urgencyColor}12`,
                      color: request.urgencyColor,
                    }}
                  >
                    <Droplets className="w-7 h-7" />
                  </div>
                  <div className="lg:hidden">
                    <div className="font-poppins font-bold text-xl text-[#1C2321]">
                      {request.bloodGroup}
                    </div>
                    {getUrgencyBadge(request.urgency, request.urgencyColor)}
                  </div>
                </div>

                {/* Request Details */}
                <div className="flex-1 min-w-0">
                  <div className="hidden lg:flex lg:items-center lg:justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-poppins font-bold text-2xl text-[#1C2321]">
                        {request.bloodGroup}
                      </span>
                      {getUrgencyBadge(request.urgency, request.urgencyColor)}
                    </div>
                  </div>

                  {/* Hospital Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Hospital className="w-4 h-4 text-[#8C8579] flex-shrink-0" />
                      <span className="text-sm font-medium text-[#1C2321]">
                        {request.hospitalName}
                      </span>
                    </div>
                    {request.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#8C8579] flex-shrink-0" />
                        <span className="text-xs text-[#8C8579]">
                          {request.address}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#8C8579]" />
                        <span className="text-xs text-[#8C8579]">
                          {request.distance}
                        </span>
                      </div>
                      <div className="w-px h-3 bg-[#8C8579]/20" />
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#8C8579]" />
                        <span className="text-xs font-medium text-[#8C8579]">
                          {request.requiredTime}
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
                  <button className="px-5 py-2.5 text-sm font-medium bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631f1f] transition-all duration-200 hover:shadow-md active:scale-[0.98] whitespace-nowrap w-full lg:w-auto">
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
                    {getUrgencyBadge(request.urgency, request.urgencyColor)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#7A2F2F] bg-[#FCFBF8] rounded-xl border border-[#7A2F2F]/20 hover:bg-[#7A2F2F] hover:text-white transition-all duration-200 hover:shadow-md active:scale-[0.98]">
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
