import React from "react";
import {
  Heart,
  Droplet,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      icon: Heart,
      label: "Donations",
      value: "12",
      supportingText: "+2 this month",
      trend: "up",
      color: "#C23B22",
      bgGradient: "from-[#C23B22]/5 to-[#C23B22]/10",
    },
    {
      icon: Droplet,
      label: "Lives Helped",
      value: "36",
      supportingText: "Every donation can help multiple lives.",
      trend: "neutral",
      color: "#7A2F2F",
      bgGradient: "from-[#7A2F2F]/5 to-[#7A2F2F]/10",
    },

    {
      icon: Star,
      label: "Reliability Score",
      value: "96%",
      supportingText: "Excellent",
      trend: "up",
      color: "#7A2F2F",
      bgGradient: "from-[#7A2F2F]/5 to-[#7A2F2F]/10",
    },
  ];

  return (
    <section className="w-full bg-[#F6F3EC] p-4 md:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321] tracking-tight">
            Your Impact
          </h2>
          <p className="text-[#8C8579] text-sm mt-1.5">
            Track your contribution to the BloodLink community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${stat.bgGradient} bg-[#FCFBF8] rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] border border-[#8C8579]/5 relative overflow-hidden`}
            >
              {/* Subtle background decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                <stat.icon className="w-6 h-6" />
              </div>

              {/* Label */}
              <p className="text-xs font-medium text-[#8C8579] uppercase tracking-wider mb-1.5">
                {stat.label}
              </p>

              {/* Value */}
              <div className="flex items-end gap-2 mb-1.5">
                <span className="font-poppins font-bold text-3xl text-[#1C2321] leading-none">
                  {stat.value}
                </span>
                {stat.trend === "up" && (
                  <TrendingUp className="w-4 h-4 text-[#3F6B5C] mb-1" />
                )}
              </div>

              {/* Supporting Text */}
              <p className="text-sm text-[#5a554a] leading-relaxed">
                {stat.supportingText}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: stat.color }}
              />
            </div>
          ))}
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

export default QuickStats;
