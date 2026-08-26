// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Hospital,
  Clock,
  Activity,
  CheckCircle,
  Loader,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Ban,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getDashboardStats, getAllHospitals } from "../../api/adminApi";

const StatCard = ({ icon: Icon, label, value, color, onClick }) => (
  <button
    onClick={onClick}
    disabled={!onClick}
    className="group relative bg-[#FCFBF8] rounded-2xl shadow-sm border border-gray-200/60 p-5 text-left overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:cursor-default disabled:hover:translate-y-0"
  >
    <div
      className="absolute top-0 left-0 w-1 h-full"
      style={{ backgroundColor: color }}
    />
    <div className="flex items-start justify-between mb-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      {onClick && (
        <ChevronRight
          size={18}
          className="text-[#8C8579] group-hover:translate-x-0.5 transition-transform duration-200"
        />
      )}
    </div>
    <div className="text-3xl font-bold text-[#1C2321] tracking-tight">
      {value}
    </div>
    <div className="text-sm text-[#8C8579] mt-1">{label}</div>
  </button>
);

const QuickAction = ({ icon: Icon, title, description, color, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-start gap-3 bg-[#FCFBF8] rounded-2xl border border-gray-200/60 p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
  >
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: `${color}15` }}
    >
      <Icon size={17} style={{ color }} />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-[#1C2321]">{title}</p>
      <p className="text-xs text-[#8C8579] mt-0.5">{description}</p>
    </div>
    <ArrowUpRight size={15} className="text-[#8C8579] ml-auto flex-shrink-0" />
  </button>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, hospitalsRes] = await Promise.all([
        getDashboardStats(),
        getAllHospitals("pending"),
      ]);
      setStats(statsRes.data.stats);
      setPendingHospitals((hospitalsRes.data.hospitals || []).slice(0, 4));
    } catch (err) {
      console.error("Failed to fetch admin dashboard:", err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statusSegments = stats
    ? [
        {
          key: "active",
          label: "Active",
          value: stats.activeRequests,
          color: "#C23B22",
        },
        {
          key: "fulfilled",
          label: "Fulfilled",
          value: stats.fulfilledRequests,
          color: "#3F6B5C",
        },
        {
          key: "cancelled",
          label: "Cancelled",
          value: stats.cancelledRequests,
          color: "#8C8579",
        },
        {
          key: "expired",
          label: "Expired",
          value: stats.expiredRequests,
          color: "#D8CFC0",
        },
      ]
    : [];

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Platform overview and quick access to management tools."
    >
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <Loader
              size={36}
              className="text-[#7A2F2F] animate-spin mx-auto mb-3"
            />
            <p className="text-[#8C8579]">Loading dashboard...</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="bg-[#FCFBF8] rounded-2xl p-8 text-center border border-gray-200/60">
          <AlertCircle size={40} className="text-[#C23B22] mx-auto mb-3" />
          <p className="text-[#1C2321] font-medium">{error}</p>
          <button
            onClick={fetchDashboard}
            className="mt-3 px-6 py-2 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200 text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <div className="space-y-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7A2F2F] to-[#3B1717] px-6 py-7 sm:px-8 sm:py-8">
            <ShieldCheck
              size={200}
              strokeWidth={0.6}
              className="absolute -right-8 -bottom-10 text-white/[0.06] pointer-events-none"
            />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white/60 text-sm">{today}</p>
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-1">
                  Welcome back, Admin
                </h2>
                <p className="text-white/70 text-sm mt-1.5 max-w-md">
                  Keeping BloodLink's donors, hospitals, and emergency requests
                  running smoothly.
                </p>
              </div>

              {stats.pendingHospitals > 0 ? (
                <button
                  onClick={() => navigate("/admin/hospitals")}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl px-5 py-3.5 transition-colors duration-200 flex-shrink-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                    <Clock size={17} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">
                      {stats.pendingHospitals} pending approval
                      {stats.pendingHospitals > 1 ? "s" : ""}
                    </p>
                    <p className="text-white/60 text-xs">Review now</p>
                  </div>
                  <ChevronRight size={16} className="text-white/70 ml-1" />
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-5 py-3.5 flex-shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                    <CheckCircle size={17} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">
                      All caught up
                    </p>
                    <p className="text-white/60 text-xs">
                      No pending approvals
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Total Donors/Recipients"
              value={stats.totalUsers}
              color="#7A2F2F"
              onClick={() => navigate("/admin/users")}
            />
            <StatCard
              icon={Hospital}
              label="Approved Hospitals"
              value={stats.approvedHospitals}
              color="#3F6B5C"
              onClick={() => navigate("/admin/hospitals")}
            />
            <StatCard
              icon={Activity}
              label="Active Emergency Requests"
              value={stats.activeRequests}
              color="#C23B22"
              onClick={() => navigate("/admin/requests")}
            />
            <StatCard
              icon={CheckCircle}
              label="Fulfilled Requests"
              value={stats.fulfilledRequests}
              color="#3F6B5C"
              onClick={() => navigate("/admin/requests")}
            />
          </div>

          {/* Request Status Breakdown + Pending Hospitals */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Status Breakdown */}
            <div className="lg:col-span-3 bg-[#FCFBF8] rounded-2xl border border-gray-200/60 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1C2321]">
                  Emergency Request Breakdown
                </h3>
                <span className="text-xs text-[#8C8579]">
                  {stats.totalRequests} total
                </span>
              </div>

              {stats.totalRequests === 0 ? (
                <p className="text-sm text-[#8C8579] py-6 text-center">
                  No emergency requests yet.
                </p>
              ) : (
                <>
                  <div className="flex w-full h-3 rounded-full overflow-hidden bg-gray-100">
                    {statusSegments.map(
                      (segment) =>
                        segment.value > 0 && (
                          <div
                            key={segment.key}
                            style={{
                              width: `${(segment.value / stats.totalRequests) * 100}%`,
                              backgroundColor: segment.color,
                            }}
                            title={`${segment.label}: ${segment.value}`}
                          />
                        ),
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    {statusSegments.map((segment) => (
                      <div
                        key={segment.key}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: segment.color }}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#1C2321] leading-tight">
                            {segment.value}
                          </p>
                          <p className="text-xs text-[#8C8579] leading-tight">
                            {segment.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Pending Hospitals Preview */}
            <div className="lg:col-span-2 bg-[#FCFBF8] rounded-2xl border border-gray-200/60 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1C2321]">
                  Awaiting Approval
                </h3>
                {pendingHospitals.length > 0 && (
                  <button
                    onClick={() => navigate("/admin/hospitals")}
                    className="text-xs font-medium text-[#7A2F2F] hover:text-[#631F1F] transition-colors duration-200"
                  >
                    View all
                  </button>
                )}
              </div>

              {pendingHospitals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <CheckCircle size={28} className="text-[#3F6B5C] mb-2" />
                  <p className="text-sm text-[#8C8579]">
                    No hospitals waiting on review.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingHospitals.map((hospital) => (
                    <button
                      key={hospital._id}
                      onClick={() => navigate("/admin/hospitals")}
                      className="flex items-center gap-3 w-full text-left p-2.5 rounded-xl hover:bg-[#F6F3EC] transition-colors duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#3F6B5C]/10 flex items-center justify-center flex-shrink-0">
                        <Hospital size={15} className="text-[#3F6B5C]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#1C2321] truncate">
                          {hospital.hospitalName}
                        </p>
                        <p className="text-xs text-[#8C8579] flex items-center gap-1 truncate">
                          <MapPin size={10} />
                          {hospital.district}
                        </p>
                      </div>
                      <ChevronRight
                        size={15}
                        className="text-[#8C8579] flex-shrink-0"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-semibold text-[#1C2321] mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <QuickAction
                icon={Hospital}
                title="Manage Hospitals"
                description="Approve, reject, or block hospital accounts"
                color="#3F6B5C"
                onClick={() => navigate("/admin/hospitals")}
              />
              <QuickAction
                icon={Users}
                title="Manage Users"
                description="View and moderate donor/recipient accounts"
                color="#7A2F2F"
                onClick={() => navigate("/admin/users")}
              />
              <QuickAction
                icon={Ban}
                title="Monitor Requests"
                description="Oversee and force-cancel emergency requests"
                color="#C23B22"
                onClick={() => navigate("/admin/requests")}
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
