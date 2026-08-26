// src/pages/admin/Hospitals.jsx
import React, { useState, useEffect } from "react";
import {
  Hospital as HospitalIcon,
  MapPin,
  Phone,
  Mail,
  BadgeCheck,
  XCircle,
  Ban,
  CheckCircle2,
  Loader,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  getAllHospitals,
  approveHospital,
  rejectHospital,
  blockHospital,
  unblockHospital,
} from "../../api/adminApi";

const TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-[#C23B22]/10 text-[#C23B22]",
  },
  approved: {
    label: "Approved",
    className: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
  },
  rejected: {
    label: "Rejected",
    className: "bg-[#8C8579]/10 text-[#8C8579]",
  },
};

const AdminHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actioningId, setActioningId] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, [activeTab]);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllHospitals(activeTab);
      setHospitals(res.data.hospitals || []);
    } catch (err) {
      console.error("Failed to fetch hospitals:", err);
      setError("Unable to load hospitals.");
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (id, actionFn) => {
    setActioningId(id);
    try {
      await actionFn(id);
      await fetchHospitals();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setActioningId(null);
    }
  };

  return (
    <AdminLayout
      title="Hospital Management"
      subtitle="Review, approve, and manage hospital accounts."
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#F6F3EC] p-1 rounded-xl w-fit mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.value
                ? "text-[#7A2F2F] bg-[#FCFBF8] shadow-sm"
                : "text-[#8C8579] hover:text-[#1C2321]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader size={32} className="text-[#7A2F2F] animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="bg-[#FCFBF8] rounded-2xl p-8 text-center border border-gray-200/60">
          <AlertCircle size={36} className="text-[#C23B22] mx-auto mb-3" />
          <p className="text-[#1C2321] font-medium">{error}</p>
          <button
            onClick={fetchHospitals}
            className="mt-3 px-6 py-2 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && hospitals.length === 0 && (
        <div className="bg-[#FCFBF8] rounded-2xl p-12 text-center border border-gray-200/60">
          <HospitalIcon size={36} className="text-[#8C8579] mx-auto mb-3" />
          <p className="text-[#1C2321] font-medium">
            No hospitals in this category.
          </p>
        </div>
      )}

      {!loading && !error && hospitals.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {hospitals.map((hospital) => {
            const status =
              statusConfig[hospital.verificationStatus] || statusConfig.pending;
            const isBusy = actioningId === hospital._id;

            return (
              <div
                key={hospital._id}
                className="bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#3F6B5C]/10 flex items-center justify-center flex-shrink-0">
                      <HospitalIcon size={20} className="text-[#3F6B5C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C2321]">
                        {hospital.hospitalName}
                      </h3>
                      <span
                        className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                      {hospital.isBlocked && (
                        <span className="inline-block mt-0.5 ml-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#C23B22]/10 text-[#C23B22]">
                          Blocked
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mb-4 text-sm text-[#8C8579]">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {hospital.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {hospital.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {hospital.district}, {hospital.state}
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={14} />
                    License: {hospital.licenseNumber}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hospital.verificationStatus === "pending" && (
                    <>
                      <button
                        onClick={() => runAction(hospital._id, approveHospital)}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3F6B5C] text-white rounded-lg text-xs font-medium hover:bg-[#345a4d] transition-colors duration-200 disabled:opacity-60"
                      >
                        <CheckCircle2 size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => runAction(hospital._id, rejectHospital)}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#8C8579]/30 text-[#1C2321] rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-60"
                      >
                        <XCircle size={14} />
                        Reject
                      </button>
                    </>
                  )}

                  {hospital.verificationStatus === "approved" &&
                    (hospital.isBlocked ? (
                      <button
                        onClick={() => runAction(hospital._id, unblockHospital)}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3F6B5C] text-white rounded-lg text-xs font-medium hover:bg-[#345a4d] transition-colors duration-200 disabled:opacity-60"
                      >
                        <CheckCircle2 size={14} />
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => runAction(hospital._id, blockHospital)}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#C23B22]/30 text-[#C23B22] rounded-lg text-xs font-medium hover:bg-[#C23B22]/5 transition-colors duration-200 disabled:opacity-60"
                      >
                        <Ban size={14} />
                        Block
                      </button>
                    ))}

                  {hospital.verificationStatus === "rejected" && (
                    <button
                      onClick={() => runAction(hospital._id, approveHospital)}
                      disabled={isBusy}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3F6B5C] text-white rounded-lg text-xs font-medium hover:bg-[#345a4d] transition-colors duration-200 disabled:opacity-60"
                    >
                      <CheckCircle2 size={14} />
                      Approve
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminHospitals;
