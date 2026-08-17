// components/user/NearbyActiveDonors.jsx

import React, { useEffect, useState } from "react";
import {
  Droplet,
  Phone,
  MapPin,
  ShieldCheck,
  Clock3,
  UserRound,
  HeartPulse,
  ChevronRight,
  RefreshCw,
  Users,
} from "lucide-react";

import { getAvailableDonors } from "../../api/userApi";

const NearbyActiveDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAvailableDonors();

      setDonors(response?.donors || []);
    } catch (err) {
      console.error("Failed to fetch available donors:", err);
      setError("Unable to load available donors.");
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (phone) => {
    if (!phone) return;

    window.location.href = `tel:${phone}`;
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";

    return `${first}${last}`.toUpperCase() || "D";
  };

  const getBloodGroupStyle = (bloodGroup) => {
    const styles = {
      "O+": "bg-red-50 text-red-700 border-red-100",
      "O-": "bg-red-50 text-red-700 border-red-100",
      "A+": "bg-orange-50 text-orange-700 border-orange-100",
      "A-": "bg-orange-50 text-orange-700 border-orange-100",
      "B+": "bg-purple-50 text-purple-700 border-purple-100",
      "B-": "bg-purple-50 text-purple-700 border-purple-100",
      "AB+": "bg-blue-50 text-blue-700 border-blue-100",
      "AB-": "bg-blue-50 text-blue-700 border-blue-100",
    };

    return (
      styles[bloodGroup] || "bg-[#7A2F2F]/5 text-[#7A2F2F] border-[#7A2F2F]/10"
    );
  };

  const formatMemberSince = (date) => {
    if (!date) return null;

    const created = new Date(date);

    if (Number.isNaN(created.getTime())) return null;

    return created.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  // Loading
  if (loading) {
    return (
      <section className="w-full bg-[#F6F3EC] px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#FCFBF8] rounded-3xl border border-[#8C8579]/10 p-10 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-[#7A2F2F] animate-spin mr-3" />

            <span className="text-sm text-[#8C8579]">
              Finding available donors...
            </span>
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="w-full bg-[#F6F3EC] px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#FCFBF8] rounded-3xl border border-red-100 p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-[#C23B22]" />
            </div>

            <h3 className="font-semibold text-[#1C2321] mb-1">
              Couldn't load donors
            </h3>

            <p className="text-sm text-[#8C8579] mb-5">{error}</p>

            <button
              onClick={fetchDonors}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A2F2F] text-white text-sm font-medium hover:bg-[#631F1F] transition"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F6F3EC] px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-[#1C2321]">
              Available Donors
            </h2>

            <p className="text-sm text-[#8C8579] mt-1">
              Donors currently available to respond to blood requests.
            </p>
          </div>

          {donors.length > 0 && (
            <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-[#3F6B5C]/10 border border-[#3F6B5C]/10 px-3.5 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#3F6B5C] animate-pulse" />

              <span className="text-sm font-medium text-[#3F6B5C]">
                {donors.length} {donors.length === 1 ? "donor" : "donors"}{" "}
                available
              </span>
            </div>
          )}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {donors.length === 0 ? (
          <div className="bg-[#FCFBF8] rounded-3xl border border-[#8C8579]/10 p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#7A2F2F]/5 flex items-center justify-center mx-auto mb-4">
              <Droplet className="w-7 h-7 text-[#7A2F2F]" />
            </div>

            <h3 className="font-semibold text-lg text-[#1C2321]">
              No donors available right now
            </h3>

            <p className="text-sm text-[#8C8579] max-w-md mx-auto mt-2">
              There are currently no active donors available. Check again later
              or create an emergency request.
            </p>
          </div>
        ) : (
          /* ================= DONOR GRID ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {donors.map((donor) => {
              const fullName = `${donor.firstName || ""} ${
                donor.lastName || ""
              }`.trim();

              const memberSince = formatMemberSince(donor.createdAt);

              return (
                <div
                  key={donor._id}
                  className="group bg-[#FCFBF8] rounded-3xl border border-[#8C8579]/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* ================= CARD TOP ================= */}
                  <div className="p-5 pb-4">
                    <div className="flex items-start justify-between">
                      {/* Avatar + Name */}
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-[#7A2F2F]/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-[#7A2F2F]">
                              {getInitials(donor.firstName, donor.lastName)}
                            </span>
                          </div>

                          {/* Online indicator */}
                          <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-[#FCFBF8] rounded-full flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#3F6B5C]" />
                          </span>
                        </div>

                        <div>
                          <h3 className="font-semibold text-[#1C2321] text-base">
                            {fullName || "Anonymous Donor"}
                          </h3>

                          <div className="flex items-center gap-1.5 mt-1">
                            <ShieldCheck size={13} className="text-[#3F6B5C]" />

                            <span className="text-xs text-[#3F6B5C] font-medium">
                              Available to donate
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Blood Group */}
                      <div
                        className={`flex flex-col items-center justify-center min-w-[58px] h-[58px] rounded-2xl border ${getBloodGroupStyle(
                          donor.bloodGroup,
                        )}`}
                      >
                        <Droplet size={15} />

                        <span className="font-bold text-sm mt-0.5">
                          {donor.bloodGroup || "--"}
                        </span>
                      </div>
                    </div>

                    {/* ================= INFO ================= */}
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {/* Location */}
                      <div className="bg-[#F6F3EC] rounded-2xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <MapPin size={13} className="text-[#7A2F2F]" />

                          <span className="text-[10px] uppercase tracking-wide font-semibold text-[#8C8579]">
                            Location
                          </span>
                        </div>

                        <p className="text-sm font-medium text-[#1C2321] truncate">
                          {donor.address?.district || "Not provided"}
                        </p>

                        {donor.address?.state && (
                          <p className="text-[11px] text-[#8C8579] mt-0.5">
                            {donor.address.state}
                          </p>
                        )}
                      </div>

                      {/* Member Since */}
                      <div className="bg-[#F6F3EC] rounded-2xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Clock3 size={13} className="text-[#7A2F2F]" />

                          <span className="text-[10px] uppercase tracking-wide font-semibold text-[#8C8579]">
                            Member Since
                          </span>
                        </div>

                        <p className="text-sm font-medium text-[#1C2321]">
                          {memberSince || "Recently"}
                        </p>

                        <p className="text-[11px] text-[#8C8579] mt-0.5">
                          BloodLink member
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ================= FOOTER ================= */}
                  <div className="px-5 py-4 border-t border-[#8C8579]/10 bg-white/40">
                    {donor.phone ? (
                      <button
                        onClick={() => handleContact(donor.phone)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[#7A2F2F] text-white hover:bg-[#631F1F] transition-all duration-200 group/button"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                            <Phone size={15} />
                          </div>

                          <div className="text-left">
                            <p className="text-sm font-semibold">
                              Contact Donor
                            </p>

                            <p className="text-[10px] text-white/60">
                              Call this available donor
                            </p>
                          </div>
                        </div>

                        <ChevronRight
                          size={18}
                          className="group-hover/button:translate-x-1 transition-transform"
                        />
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#F6F3EC] text-[#8C8579] text-sm">
                        <UserRound size={16} />
                        Contact information unavailable
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default NearbyActiveDonors;
