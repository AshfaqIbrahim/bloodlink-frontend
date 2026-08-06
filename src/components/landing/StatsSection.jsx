import React, { useState, useEffect } from "react";
import { Users, Building, Heart, Clock } from "lucide-react";

const StatCard = ({ number, label, icon: Icon }) => (
  <div className="bg-[#FCFBF8] rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#8C8579]/5">
    <div className="w-12 h-12 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
      <Icon className="w-6 h-6 text-[#7A2F2F]" />
    </div>
    <div className="font-poppins font-bold text-3xl text-[#1C2321]">
      {number}
    </div>
    <p className="text-sm text-[#8C8579] mt-1.5">{label}</p>
  </div>
);

const StatsSection = () => {
  const [counts, setCounts] = useState({
    donors: 0,
    hospitals: 0,
    donations: 0,
  });

  useEffect(() => {
    const targetDonors = 15000;
    const targetHospitals = 500;
    const targetDonations = 50000;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts({
        donors: Math.floor(targetDonors * progress),
        hospitals: Math.floor(targetHospitals * progress),
        donations: Math.floor(targetDonations * progress),
      });
      if (currentStep >= steps) {
        setCounts({
          donors: targetDonors,
          hospitals: targetHospitals,
          donations: targetDonations,
        });
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      number: `${counts.donors.toLocaleString()}+`,
      label: "Registered Donors",
    },
    { icon: Building, number: `${counts.hospitals}+`, label: "Hospitals" },
    {
      icon: Heart,
      number: `${counts.donations.toLocaleString()}+`,
      label: "Successful Donations",
    },
    { icon: Clock, number: "24/7", label: "Emergency Availability" },
  ];

  return (
    <section className="py-16 bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
