import React from "react";
import {
  Heart,
  Users,
  Building2,
  Zap,
  CheckCircle,
  MapPin,
  Clock,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Users,
      title: "Intelligent Matching",
      description:
        "Our algorithm connects donors with recipients based on blood type, location, and availability.",
      color: "#7A2F2F",
    },
    {
      icon: Building2,
      title: "Verified Hospitals",
      description:
        "All hospitals are verified to ensure authenticity and trust in the network.",
      color: "#3F6B5C",
    },
    {
      icon: Zap,
      title: "Real-Time Emergency Alerts",
      description:
        "Instant notifications to nearby donors when a blood request is created.",
      color: "#C23B22",
    },
  ];

  const stats = [
    { value: "15,000+", label: "Registered Donors", icon: Heart },
    { value: "500+", label: "Verified Hospitals", icon: Building2 },
    { value: "50,000+", label: "Lives Impacted", icon: Award },
  ];

  return (
    <section
      id="about"
      className="w-full bg-[#FCFBF8] py-16 md:py-20 lg:py-24 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main Illustration Card */}
              <div className="bg-[#F6F3EC] rounded-3xl p-8 shadow-lg border border-[#8C8579]/5 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7A2F2F]/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#3F6B5C]/5 rounded-full blur-2xl" />

                {/* SVG Illustration */}
                <svg
                  className="w-full h-auto max-w-md mx-auto"
                  viewBox="0 0 400 340"
                  fill="none"
                >
                  {/* Background circles */}
                  <circle
                    cx="200"
                    cy="170"
                    r="120"
                    fill="#7A2F2F"
                    opacity="0.03"
                  />
                  <circle
                    cx="200"
                    cy="170"
                    r="90"
                    fill="#7A2F2F"
                    opacity="0.04"
                  />
                  <circle
                    cx="200"
                    cy="170"
                    r="60"
                    fill="#7A2F2F"
                    opacity="0.05"
                  />

                  {/* Hospital Building */}
                  <rect
                    x="60"
                    y="140"
                    width="80"
                    height="100"
                    rx="6"
                    fill="#7A2F2F"
                    opacity="0.08"
                  />
                  <rect
                    x="65"
                    y="145"
                    width="70"
                    height="90"
                    rx="4"
                    fill="#7A2F2F"
                    opacity="0.06"
                  />
                  <rect
                    x="75"
                    y="155"
                    width="10"
                    height="16"
                    rx="2"
                    fill="#7A2F2F"
                    opacity="0.15"
                  />
                  <rect
                    x="95"
                    y="155"
                    width="10"
                    height="16"
                    rx="2"
                    fill="#7A2F2F"
                    opacity="0.15"
                  />
                  <rect
                    x="115"
                    y="155"
                    width="10"
                    height="16"
                    rx="2"
                    fill="#7A2F2F"
                    opacity="0.15"
                  />
                  <rect
                    x="90"
                    y="135"
                    width="20"
                    height="10"
                    rx="2"
                    fill="#7A2F2F"
                    opacity="0.12"
                  />
                  <path
                    d="M90 165 L95 160 L100 165 L100 170 L90 170 L90 165Z"
                    fill="#C23B22"
                    opacity="0.10"
                  />

                  {/* Connection Lines */}
                  <path
                    d="M140 180 C190 160, 210 190, 260 175"
                    stroke="#7A2F2F"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    opacity="0.3"
                  />
                  <path
                    d="M150 195 C200 215, 220 190, 270 200"
                    stroke="#3F6B5C"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    opacity="0.25"
                  />

                  {/* Donor Pins */}
                  <circle
                    cx="260"
                    cy="170"
                    r="16"
                    fill="#7A2F2F"
                    opacity="0.08"
                  />
                  <circle
                    cx="260"
                    cy="170"
                    r="8"
                    fill="#7A2F2F"
                    opacity="0.12"
                  />
                  <circle
                    cx="260"
                    cy="170"
                    r="4"
                    fill="#7A2F2F"
                    opacity="0.4"
                  />

                  <circle
                    cx="300"
                    cy="155"
                    r="14"
                    fill="#3F6B5C"
                    opacity="0.08"
                  />
                  <circle
                    cx="300"
                    cy="155"
                    r="7"
                    fill="#3F6B5C"
                    opacity="0.12"
                  />
                  <circle
                    cx="300"
                    cy="155"
                    r="3.5"
                    fill="#3F6B5C"
                    opacity="0.4"
                  />

                  <circle
                    cx="280"
                    cy="195"
                    r="14"
                    fill="#7A2F2F"
                    opacity="0.08"
                  />
                  <circle
                    cx="280"
                    cy="195"
                    r="7"
                    fill="#7A2F2F"
                    opacity="0.12"
                  />
                  <circle
                    cx="280"
                    cy="195"
                    r="3.5"
                    fill="#7A2F2F"
                    opacity="0.4"
                  />

                  {/* Pulse Rings */}
                  <circle
                    cx="260"
                    cy="170"
                    r="26"
                    stroke="#7A2F2F"
                    strokeWidth="1.5"
                    opacity="0.08"
                  />
                  <circle
                    cx="300"
                    cy="155"
                    r="22"
                    stroke="#3F6B5C"
                    strokeWidth="1.5"
                    opacity="0.06"
                  />

                  {/* Heart Icon */}
                  <path
                    d="M185 270 C185 260, 195 252, 205 252 C215 252, 225 260, 225 270 C225 280, 205 295, 205 295 C205 295, 185 280, 185 270Z"
                    fill="#C23B22"
                    opacity="0.08"
                  />
                  <path
                    d="M200 262 L200 268 L206 268 L206 274 L200 274 L200 280 L196 280 L196 274 L190 274 L190 268 L196 268 L196 262 Z"
                    fill="#C23B22"
                    opacity="0.12"
                  />

                  {/* Blood Drop Icon */}
                  <path
                    d="M330 120 C330 100, 345 80, 345 80 C345 80, 360 100, 360 120 C360 135, 348 145, 345 145 C342 145, 330 135, 330 120Z"
                    fill="#C23B22"
                    opacity="0.08"
                  />
                </svg>

                {/* Floating Stat Card */}
                <div className="absolute -bottom-4 -left-4 bg-[#FCFBF8] rounded-2xl shadow-lg p-4 border border-[#8C8579]/5 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-[#7A2F2F]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#8C8579]">
                        Active Donors
                      </p>
                      <p className="font-poppins font-bold text-lg text-[#1C2321]">
                        1,284
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -top-4 -right-4 bg-[#FCFBF8] rounded-2xl shadow-lg p-4 border border-[#8C8579]/5 animate-float-delay">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#3F6B5C]/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#3F6B5C]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#8C8579]">
                        Avg Response
                      </p>
                      <p className="font-poppins font-bold text-lg text-[#1C2321]">
                        8 mins
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="inline-block text-sm font-semibold text-[#7A2F2F] bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full mb-4">
                About BloodLink
              </span>
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#1C2321] leading-tight">
                Connecting Lifesavers
                <br />
                <span className="text-[#7A2F2F]">
                  With Those Who Need Them Most.
                </span>
              </h2>
            </div>

            <p className="text-[#5a554a] text-base md:text-lg leading-relaxed">
              BloodLink helps hospitals, donors, and recipients connect faster
              during emergencies using intelligent matching and real-time
              notifications. Our platform ensures that the right blood reaches
              the right patient at the right time.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3 pt-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-[#F6F3EC] rounded-2xl hover:bg-[#F6F3EC]/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${feature.color}12`,
                      color: feature.color,
                    }}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1C2321] text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[#8C8579] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement Card */}
        <div className="mt-12 md:mt-16">
          <div className="bg-gradient-to-br from-[#7A2F2F]/5 to-[#7A2F2F]/10 rounded-3xl p-8 md:p-10 text-center border border-[#7A2F2F]/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#7A2F2F]/10 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#7A2F2F]" />
              </div>
              <h3 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321]">
                Our Mission
              </h3>
            </div>
            <p className="text-[#5a554a] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              To reduce delays in blood availability by connecting the right
              donor to the right patient at the right time.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#FCFBF8] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-[#8C8579]/5"
            >
              <div className="w-12 h-12 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-[#7A2F2F]" />
              </div>
              <p className="font-poppins font-bold text-2xl text-[#1C2321]">
                {stat.value}
              </p>
              <p className="text-sm text-[#8C8579] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatDelay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: floatDelay 3.5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
