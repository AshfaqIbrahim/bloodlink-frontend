import React from "react";
import { motion } from "framer-motion";
import {
  Droplet,
  Clock,
  MapPin,
  Hospital,
  ChevronRight,
  Heart,
} from "lucide-react";

// ============================================
// DATA
// ============================================
const requests = [
  {
    id: 1,
    bloodGroup: "O+",
    patientName: "Rajesh Kumar",
    hospital: "City General Hospital",
    district: "Kochi",
    unitsRequired: "3 Units",
    timePosted: "12 min ago",
    urgency: "Critical",
  },
  {
    id: 2,
    bloodGroup: "A-",
    patientName: "Priya Sharma",
    hospital: "St. Mary's Medical Center",
    district: "Trivandrum",
    unitsRequired: "2 Units",
    timePosted: "28 min ago",
    urgency: "High",
  },
  {
    id: 3,
    bloodGroup: "B+",
    patientName: "Amit Patel",
    hospital: "Mount Sinai Hospital",
    district: "Calicut",
    unitsRequired: "4 Units",
    timePosted: "45 min ago",
    urgency: "Moderate",
  },
  {
    id: 4,
    bloodGroup: "AB+",
    patientName: "Sneha Nair",
    hospital: "Lakeside Hospital",
    district: "Kochi",
    unitsRequired: "2 Units",
    timePosted: "1 hour ago",
    urgency: "High",
  },
  {
    id: 5,
    bloodGroup: "O-",
    patientName: "Vikram Singh",
    hospital: "Aster Medical Centre",
    district: "Kannur",
    unitsRequired: "1 Unit",
    timePosted: "1.5 hours ago",
    urgency: "Critical",
  },
  {
    id: 6,
    bloodGroup: "A+",
    patientName: "Meera Nair",
    hospital: "Sunrise Hospital",
    district: "Mangalore",
    unitsRequired: "3 Units",
    timePosted: "2 hours ago",
    urgency: "Moderate",
  },
];

// ============================================
// COMPONENTS
// ============================================

const UrgencyBadge = ({ urgency }) => {
  const colors = {
    Critical: "text-[#C23B22] bg-[#C23B22]/10",
    High: "text-[#7A2F2F] bg-[#7A2F2F]/10",
    Moderate: "text-[#3F6B5C] bg-[#3F6B5C]/10",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[urgency] || colors.Moderate}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${urgency === "Critical" ? "bg-[#C23B22] animate-pulse" : "bg-current"}`}
      />
      {urgency}
    </span>
  );
};

const RequestCard = ({ request, index }) => {
  const isCritical = request.urgency === "Critical";

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

      {/* Patient Name */}
      <h3 className="font-poppins font-semibold text-base text-[#1C2321] mb-1">
        {request.patientName}
      </h3>

      {/* Hospital */}
      <div className="flex items-center gap-1.5 text-xs text-[#5a554a] mb-0.5">
        <Hospital className="w-3.5 h-3.5 text-[#8C8579]" />
        <span>{request.hospital}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-[#5a554a] mb-3">
        <MapPin className="w-3.5 h-3.5 text-[#8C8579]" />
        <span>{request.district}</span>
      </div>

      {/* Details */}
      <div className="flex items-center gap-3 text-xs text-[#8C8579] mb-3">
        <span className="flex items-center gap-1">
          <Droplet className="w-3.5 h-3.5" />
          {request.unitsRequired}
        </span>
        <span className="w-px h-3 bg-[#8C8579]/20" />
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {request.timePosted}
        </span>
      </div>

      {/* Urgency & Actions */}
      <div className="flex items-center justify-between">
        <UrgencyBadge urgency={request.urgency} />
        <div className="flex gap-1.5">
          <button className="px-3.5 py-1.5 text-xs font-medium bg-[#7A2F2F] text-white rounded-lg hover:bg-[#631f1f] transition-colors">
            View
          </button>
          <button className="px-3.5 py-1.5 text-xs font-medium bg-white text-[#1C2321] rounded-lg border border-[#8C8579]/20 hover:bg-[#F6F3EC] transition-colors">
            Donate
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const LiveEmergencyRequests = () => {
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-xl px-4 py-3 shadow-sm border border-[#8C8579]/10 flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C23B22] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#1C2321]">
              {requests.length} active requests
            </span>
            <span className="text-xs text-[#8C8579]">• Just updated</span>
          </div>
          <button className="text-sm text-[#7A2F2F] hover:text-[#631f1f] transition-colors flex items-center gap-1 group">
            View all
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Request Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request, index) => (
            <RequestCard key={request.id} request={request} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveEmergencyRequests;
