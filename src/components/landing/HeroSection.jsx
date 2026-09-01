import { useNavigate } from "react-router-dom";
import { Heart, Check, ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import Button from "../common/Button";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-[70vh] flex items-center pt-16 bg-[#F6F3EC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full text-sm font-medium text-[#7A2F2F] mb-5">
              <Heart className="w-4 h-4" />
              Saving Lives Through Technology
            </div>

            <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#1C2321] mb-3">
              Find the Right Blood Donor
              <br />
              When <span className="text-[#7A2F2F]">Every Minute Matters.</span>
            </h1>

            <p className="text-lg text-[#5a554a] max-w-lg leading-relaxed mb-6">
              BloodLink intelligently connects nearby compatible blood donors,
              recipients, and hospitals in real time using smart location
              matching and emergency notifications.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <Button size="lg" onClick={() => navigate("/register")}>
                Become a Donor
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <span className="flex items-center gap-2 text-[#1C2321]">
                <Check className="w-4 h-4 text-[#3F6B5C]" /> Free to Join
              </span>
              <span className="flex items-center gap-2 text-[#1C2321]">
                <Check className="w-4 h-4 text-[#3F6B5C]" /> Secure Platform
              </span>
              <span className="flex items-center gap-2 text-[#1C2321]">
                <Check className="w-4 h-4 text-[#3F6B5C]" /> Real-Time Matching
              </span>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#7A2F2F]/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#3F6B5C]/5 rounded-full blur-3xl" />

              <div className="relative bg-[#FCFBF8] rounded-3xl p-8 shadow-xl shadow-[#1C2321]/5 border border-[#8C8579]/5">
                <div className="absolute -top-4 -right-4 bg-[#FCFBF8] rounded-xl shadow-lg p-3 border border-[#8C8579]/10 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3F6B5C] rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-[#1C2321]">
                      2 Donors Nearby
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-[#FCFBF8] rounded-xl shadow-lg p-3 border border-[#8C8579]/10 animate-float-delay">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#C23B22] rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-[#1C2321]">
                      Emergency Request
                    </span>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#FCFBF8] rounded-xl shadow-lg p-3 border border-[#8C8579]/10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7A2F2F]" />
                    <span className="text-xs font-medium text-[#1C2321]">
                      3.2 km away
                    </span>
                  </div>
                </div>

                <svg
                  className="w-full h-auto"
                  viewBox="0 0 400 300"
                  fill="none"
                >
                  <rect
                    x="30"
                    y="120"
                    width="80"
                    height="90"
                    rx="4"
                    fill="#7A2F2F"
                    opacity="0.06"
                  />
                  <rect
                    x="35"
                    y="125"
                    width="70"
                    height="80"
                    rx="2"
                    fill="#7A2F2F"
                    opacity="0.08"
                  />
                  <rect
                    x="45"
                    y="135"
                    width="8"
                    height="14"
                    rx="1"
                    fill="#7A2F2F"
                    opacity="0.15"
                  />
                  <rect
                    x="60"
                    y="135"
                    width="8"
                    height="14"
                    rx="1"
                    fill="#7A2F2F"
                    opacity="0.15"
                  />
                  <rect
                    x="75"
                    y="135"
                    width="8"
                    height="14"
                    rx="1"
                    fill="#7A2F2F"
                    opacity="0.15"
                  />
                  <rect
                    x="55"
                    y="115"
                    width="12"
                    height="8"
                    rx="1"
                    fill="#7A2F2F"
                    opacity="0.12"
                  />
                  <path
                    d="M110 165 C160 145, 180 170, 230 155"
                    stroke="#7A2F2F"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <path
                    d="M120 180 C170 200, 190 175, 240 185"
                    stroke="#3F6B5C"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.25"
                  />
                  <circle
                    cx="230"
                    cy="150"
                    r="14"
                    fill="#7A2F2F"
                    opacity="0.1"
                  />
                  <circle
                    cx="230"
                    cy="150"
                    r="5"
                    fill="#7A2F2F"
                    opacity="0.4"
                  />
                  <circle
                    cx="270"
                    cy="135"
                    r="12"
                    fill="#3F6B5C"
                    opacity="0.1"
                  />
                  <circle
                    cx="270"
                    cy="135"
                    r="4"
                    fill="#3F6B5C"
                    opacity="0.4"
                  />
                  <circle
                    cx="260"
                    cy="180"
                    r="12"
                    fill="#7A2F2F"
                    opacity="0.1"
                  />
                  <circle
                    cx="260"
                    cy="180"
                    r="4"
                    fill="#7A2F2F"
                    opacity="0.4"
                  />
                  <circle
                    cx="230"
                    cy="150"
                    r="22"
                    stroke="#7A2F2F"
                    strokeWidth="1"
                    opacity="0.08"
                  />
                  <circle
                    cx="270"
                    cy="135"
                    r="20"
                    stroke="#3F6B5C"
                    strokeWidth="1"
                    opacity="0.06"
                  />
                  <path
                    d="M200 220 C200 213, 206 207, 212 207 C218 207, 224 213, 224 220 C224 227, 212 237, 212 237 C212 237, 200 227, 200 220Z"
                    fill="#C23B22"
                    opacity="0.08"
                  />
                  <path
                    d="M210 212 L210 216 L214 216 L214 220 L210 220 L210 224 L208 224 L208 220 L204 220 L204 216 L208 216 L208 212 Z"
                    fill="#C23B22"
                    opacity="0.12"
                  />
                  <circle
                    cx="70"
                    cy="150"
                    r="10"
                    fill="#7A2F2F"
                    opacity="0.08"
                  />
                  <circle
                    cx="70"
                    cy="140"
                    r="5"
                    fill="#7A2F2F"
                    opacity="0.12"
                  />
                  <circle
                    cx="70"
                    cy="160"
                    r="8"
                    fill="#7A2F2F"
                    opacity="0.06"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
