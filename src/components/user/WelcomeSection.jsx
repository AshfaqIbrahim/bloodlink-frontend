import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../api/authApi";
import { getMyDonationStats } from "../../api/donationApi";
import {
  User,
  Droplet,
  Clock,
  MapPin,
  Heart,
  Calendar,
  Shield,
} from "lucide-react";

const WelcomeSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [donationStats, setDonationStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, statsRes] = await Promise.all([
          getMe(),
          getMyDonationStats(),
        ]);
        setUser(meRes.data.user);
        setDonationStats(statsRes.data.stats);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //temp==========
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Unable to load user</div>;
  }
  //===============

  // Get current date
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  // Time-based greeting
  const hour = today.getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17) greeting = "Good Evening";

  const formatShortDate = (dateInput) => {
    if (!dateInput) return "--";
    return new Date(dateInput).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formatFullDate = (dateInput) => {
    if (!dateInput) return "--";
    return new Date(dateInput).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      id="welcome"
      className="scroll-mt-20 w-full bg-[#F6F3EC] p-4 md:p-6 lg:p-8 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT SIDE - Greeting & Content */}
          <div className="space-y-6">
            {/* Greeting */}
            <div className="animate-slideUp">
              <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-[#1C2321] leading-tight">
                {greeting}, {user.firstName} 👋
              </h1>
              <p className="text-[#8C8579] text-sm md:text-base mt-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </p>
            </div>

            {/* Motivational Text */}
            <div className="bg-[#FCFBF8] rounded-2xl p-6 shadow-sm border border-[#8C8579]/5 animate-fadeIn">
              <h2 className="font-poppins font-semibold text-xl text-[#1C2321] mb-2">
                Ready to make a difference today?
              </h2>
              <p className="text-[#5a554a] text-sm md:text-base leading-relaxed">
                Your willingness to donate could save someone's life. Every drop
                counts in our mission to connect donors with those in need.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fadeIn">
              <button
                onClick={() => navigate("/user/emergency-requests")}
                className="flex-1 bg-[#7A2F2F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#631f1f] transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Find Nearby Requests
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Premium Summary Card */}
          <div className="animate-slideUp">
            <div className="bg-[#FCFBF8] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#8C8579]/5 h-full">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#7A2F2F]/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-[#7A2F2F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-poppins font-semibold text-lg text-[#1C2321] truncate">
                    {user.firstName}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-[#7A2F2F]/10 text-[#7A2F2F] px-2.5 py-0.5 rounded-full">
                      <Droplet className="w-3 h-3" />
                      {user.bloodGroup}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-[#3F6B5C]/10 text-[#3F6B5C] px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      {user.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#F6F3EC] rounded-xl p-3 text-center">
                  <p className="text-[#8C8579] text-xs font-medium">
                    Total Donations
                  </p>
                  <p className="text-[#1C2321] text-sm font-semibold mt-0.5">
                    {donationStats?.totalDonations ?? "--"}
                  </p>
                </div>
                <div className="bg-[#F6F3EC] rounded-xl p-3 text-center">
                  <p className="text-[#8C8579] text-xs font-medium">District</p>
                  <p className="text-[#1C2321] text-sm font-semibold mt-0.5 truncate">
                    {user.address?.district || "Not set"}
                  </p>
                </div>
                <div className="bg-[#F6F3EC] rounded-xl p-3 text-center">
                  <p className="text-[#8C8579] text-xs font-medium">
                    Member Since
                  </p>
                  <p className="text-[#1C2321] text-sm font-semibold mt-0.5">
                    {formatShortDate(user.createdAt)}
                  </p>
                </div>
                <div className="bg-[#F6F3EC] rounded-xl p-3 text-center">
                  <p className="text-[#8C8579] text-xs font-medium">
                    Next Eligible
                  </p>
                  <p className="text-[#1C2321] text-sm font-semibold mt-0.5">
                    {donationStats?.nextEligibleDate
                      ? formatFullDate(donationStats.nextEligibleDate)
                      : "Now"}
                  </p>
                </div>
              </div>

              {/* Reliability Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1C2321] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#7A2F2F]" />
                    Reliability Score
                  </span>
                  <span className="text-lg font-poppins font-bold text-[#7A2F2F]">
                    {donationStats?.reliabilityScore === null ||
                    donationStats?.reliabilityScore === undefined
                      ? "New"
                      : `${donationStats.reliabilityScore}%`}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#F6F3EC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7A2F2F] rounded-full transition-all duration-1000"
                    style={{
                      width: `${donationStats?.reliabilityScore ?? 0}%`,
                    }}
                  />
                </div>
                {(donationStats?.reliabilityScore === null ||
                  donationStats?.reliabilityScore === undefined) && (
                  <p className="text-xs text-[#8C8579] mt-1.5">
                    Complete a donation to build your score.
                  </p>
                )}
              </div>

              {/* Inspirational Quote */}
              <div className="border-t border-[#8C8579]/10 pt-4">
                <p className="text-sm text-[#8C8579] italic text-center leading-relaxed">
                  "Every donation is a second chance at life."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
