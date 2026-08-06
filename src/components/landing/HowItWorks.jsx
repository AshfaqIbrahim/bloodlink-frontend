// ============================================
// FILE: src/components/landing/HowItWorks.jsx
// ============================================
import React from "react";
import { User, Droplet, MapPin, Heart, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: User,
      step: "01",
      title: "Create Account",
      desc: "Register as User or Hospital",
    },
    {
      icon: Droplet,
      step: "02",
      title: "Request or Donate",
      desc: "Create emergency requests or become available",
    },
    {
      icon: MapPin,
      step: "03",
      title: "Smart Matching",
      desc: "Automatically finds nearby compatible donors",
    },
    {
      icon: Heart,
      step: "04",
      title: "Save Lives",
      desc: "Real-time communication connects people faster",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#7A2F2F] bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#1C2321] mb-4">
            How BloodLink Works
          </h2>
          <p className="text-[#8C8579] max-w-2xl mx-auto">
            Four simple steps to connect donors with those in need
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Card with fixed height using flex */}
              <div className="bg-[#F6F3EC] rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center">
                <div className="w-16 h-16 bg-[#7A2F2F]/10 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0">
                  <item.icon className="w-7 h-7 text-[#7A2F2F]" />
                </div>
                <div className="text-xs font-mono font-semibold text-[#8C8579] mb-1">
                  Step {item.step}
                </div>
                <h3 className="font-poppins font-semibold text-lg text-[#1C2321] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8C8579] leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-[#8C8579]/20">
                  <ArrowRight className="w-8 h-8" strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
