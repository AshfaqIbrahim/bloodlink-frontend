import React from "react";
import {
  MapPin,
  Droplet,
  Zap,
  Building,
  Shield,
  BarChart3,
} from "lucide-react";
import { features } from "../../data/features";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-[#FCFBF8] rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#8C8579]/5 group">
    <div className="w-14 h-14 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#7A2F2F] transition-all duration-300">
      <Icon className="w-6 h-6 text-[#7A2F2F] group-hover:text-white transition-all duration-300" />
    </div>
    <h3 className="font-poppins font-semibold text-lg text-[#1C2321] mb-2">
      {title}
    </h3>
    <p className="text-[#8C8579] text-sm leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#7A2F2F] bg-[#7A2F2F]/10 px-4 py-1.5 rounded-full mb-4">
            Features
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#1C2321] mb-4">
            Powerful Features for Life-Saving Connections
          </h2>
          <p className="text-[#8C8579] max-w-2xl mx-auto">
            Everything you need to connect donors and recipients in critical
            moments
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
