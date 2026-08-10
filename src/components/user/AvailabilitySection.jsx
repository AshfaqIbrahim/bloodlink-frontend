import React, { useEffect, useState } from "react";
import { getMe } from "../../api/authApi";
import { updateAvailability } from "../../api/userApi";

import {
  Clock,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Droplet,
} from "lucide-react";

const AvailabilitySection = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setIsAvailable(response.data.user.isAvailable);
      } catch (error) {
        console.error("Failed to fetch availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const toggleAvailability = async () => {
    try {
      setUpdating(true);

      const newStatus = !isAvailable;
      const response = await updateAvailability(newStatus);

      setIsAvailable(response.data.user.isAvailable);
    } catch (error) {
      console.error("Failed to update availability:", error);
    } finally {
      setUpdating(false);
    }
  };

  const infoCards = [
    {
      icon: Clock,
      label: "Last Updated",
      value: "Today, 10:30 AM",
      color: "#8C8579",
    },
    {
      icon: Calendar,
      label: "Next Eligible Donation",
      value: "15 August 2026",
      color: "#3F6B5C",
    },
    {
      icon: MapPin,
      label: "Donation Radius",
      value: "15 km",
      color: "#7A2F2F",
    },
    {
      icon: Droplet,
      label: "Blood Type",
      value: "O+",
      color: "#C23B22",
    },
  ];

  return (
    <section className="w-full bg-[#F6F3EC] p-4 md:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Same as other components */}
        <div className="mb-8">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321] tracking-tight">
            Availability Status
          </h2>
          <p className="text-[#8C8579] text-sm mt-1.5">
            Manage your donor availability and visibility.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#FCFBF8] rounded-3xl p-6 md:p-7 shadow-md hover:shadow-lg transition-all duration-300 border border-[#8C8579]/5">
          {/* Toggle Section */}
          <div className="bg-[#F6F3EC] rounded-2xl p-5 md:p-6 mb-6 transition-all duration-300 hover:shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isAvailable ? "bg-[#3F6B5C]" : "bg-[#8C8579]"
                    }`}
                  />
                  <p className="text-sm font-semibold text-[#1C2321]">
                    You are currently{" "}
                    {isAvailable ? "Available" : "Unavailable"}
                  </p>
                </div>
                <p className="text-xs text-[#8C8579] mt-1 ml-5">
                  {isAvailable
                    ? "Visible for emergency requests and donor searches."
                    : "Hidden from emergency donor searches."}
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={toggleAvailability}
                disabled={updating}
                className={`relative w-16 h-9 rounded-full transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md ${
                  isAvailable ? "bg-[#7A2F2F]" : "bg-[#8C8579]/40"
                }`}
                role="switch"
                aria-checked={isAvailable}
                aria-label="Toggle availability"
              >
                <div
                  className={`absolute top-1.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                    isAvailable ? "right-1.5" : "left-1.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5a554a] leading-relaxed mb-6 pl-1">
            When you are available, hospitals and recipients nearby can find and
            contact you during emergencies.
          </p>

          {/* Information Grid - 4 Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {infoCards.map((card, index) => (
              <div
                key={index}
                className="bg-[#F6F3EC] rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FCFBF8] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <card.icon
                      className="w-4 h-4"
                      style={{ color: card.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-[#8C8579] uppercase tracking-wider">
                      {card.label}
                    </p>
                    <p className="text-sm font-semibold text-[#1C2321] mt-0.5 truncate">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info Card */}
          <div className="flex items-start gap-4 p-5 bg-[#7A2F2F]/5 rounded-2xl border border-[#7A2F2F]/10 hover:bg-[#7A2F2F]/8 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#7A2F2F]/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-[#7A2F2F]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1C2321]">
                Availability Notice
              </p>
              <p className="text-sm text-[#5a554a] leading-relaxed mt-0.5">
                Turning off your availability will temporarily hide you from
                emergency donor searches.
              </p>
            </div>
          </div>
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
      `}</style>
    </section>
  );
};

export default AvailabilitySection;
