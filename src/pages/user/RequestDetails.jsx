// src/pages/RequestDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Droplet,
  Hospital,
  User,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Loader,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react";
import { getPublicEmergencyRequestById } from "../../api/emergencyRequestApi";
import { getMe } from "../../api/authApi";
import {
  offerDonation,
  cancelDonationOffer,
  getMyResponseForRequest,
  getOffersForRequest,
  completeDonationOffer,
  declineDonationOffer,
} from "../../api/donationApi";
import toast from "react-hot-toast";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [myResponse, setMyResponse] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const isOwner =
    currentUser &&
    request &&
    request.requesterType === "user" &&
    request.requestedByUser?._id === currentUser.id;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const [requestRes, meRes] = await Promise.all([
          getPublicEmergencyRequestById(id),
          getMe(),
        ]);

        const fetchedRequest = requestRes.data.request;
        const me = meRes.data.user;
        setRequest(fetchedRequest);
        setCurrentUser(me);

        const iOwnThisRequest =
          fetchedRequest.requesterType === "user" &&
          fetchedRequest.requestedByUser?._id === me.id;

        if (iOwnThisRequest) {
          const offersRes = await getOffersForRequest(id);
          setOffers(offersRes.data.offers || []);
        } else {
          const myResponseRes = await getMyResponseForRequest(id);
          setMyResponse(myResponseRes.data.response);
        }
      } catch (err) {
        console.error("Error fetching request details:", err);
        setError("Unable to load this emergency request.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAll();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/user/dashboard");
  };

  const handleDonate = async () => {
    setActionLoading(true);
    try {
      const res = await offerDonation(id);
      setMyResponse(res.data.response);
      toast.success(res.data.message || "Your donation offer has been sent");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send donation offer",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelOffer = async () => {
    if (!myResponse) return;
    setActionLoading(true);
    try {
      await cancelDonationOffer(myResponse._id);
      setMyResponse(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel offer");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteOffer = async (responseId) => {
    if (!window.confirm("Mark this donor's donation as completed?")) return;
    setActionLoading(true);
    try {
      const res = await completeDonationOffer(responseId);
      setOffers((prev) =>
        prev.map((o) => (o._id === responseId ? res.data.response : o)),
      );
      setRequest((prev) => (prev ? { ...prev, status: "fulfilled" } : prev));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to complete donation");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeclineOffer = async (responseId) => {
    if (!window.confirm("Decline this donor's offer?")) return;
    setActionLoading(true);
    try {
      await declineDonationOffer(responseId);
      setOffers((prev) => prev.filter((o) => o._id !== responseId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to decline offer");
    } finally {
      setActionLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F3EC] flex items-center justify-center">
        <div className="text-center">
          <Loader
            size={40}
            className="text-[#7A2F2F] animate-spin mx-auto mb-4"
          />
          <p className="text-[#8C8579] font-medium">
            Loading request details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !request) {
    return (
      <div className="min-h-screen bg-[#F6F3EC] flex items-center justify-center p-4">
        <div className="bg-[#FCFBF8] rounded-3xl shadow-sm border border-gray-200/60 p-8 max-w-md w-full text-center">
          <AlertCircle size={48} className="text-[#C23B22] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#1C2321] mb-2">
            Unable to Load Request
          </h3>
          <p className="text-[#8C8579] mb-6">
            {error || "This emergency request could not be found."}
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7A2F2F] text-white rounded-xl hover:bg-[#631F1F] transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get urgency styles (backend urgencies are lowercase)
  const getUrgencyStyles = (urgency) => {
    const styles = {
      critical: "bg-[#C23B22]/10 text-[#C23B22]",
      urgent: "bg-[#7A2F2F]/10 text-[#7A2F2F]",
      normal: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
    };
    return styles[urgency] || styles.normal;
  };

  // Get status styles (backend statuses are lowercase)
  const getStatusStyles = (status) => {
    const styles = {
      active: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
      fulfilled: "bg-[#3F6B5C]/10 text-[#3F6B5C]",
      cancelled: "bg-[#C23B22]/10 text-[#C23B22]",
      expired: "bg-[#C23B22]/10 text-[#C23B22]",
    };
    return styles[status] || styles.active;
  };

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  return (
    <div className="min-h-screen bg-[#F6F3EC] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#8C8579] hover:text-[#1C2321] transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-medium">Back to Requests</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1C2321] tracking-tight">
            Emergency Request
          </h1>
          <p className="text-[#8C8579] mt-1">
            Review the details of this blood request before responding.
          </p>
        </div>

        {/* Main Request Card */}
        <div className="bg-[#FCFBF8] rounded-3xl shadow-sm border border-gray-200/60 p-6 sm:p-8">
          {/* Header Section - Blood Group & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-gray-200/60">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#7A2F2F]/5 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-[#7A2F2F]">
                  {request.bloodGroup}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#8C8579] text-sm">
                  <Droplet size={16} />
                  <span>{request.unitsRequired} Units Required</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyStyles(request.urgency)}`}
                  >
                    {capitalize(request.urgency)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(request.status)}`}
                  >
                    {capitalize(request.status)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      request.requesterType === "hospital"
                        ? "bg-[#3F6B5C]/10 text-[#3F6B5C]"
                        : "bg-[#7A2F2F]/10 text-[#7A2F2F]"
                    }`}
                  >
                    {request.requesterType === "hospital" ? (
                      <Hospital size={12} />
                    ) : (
                      <User size={12} />
                    )}
                    {request.requesterType === "hospital"
                      ? "Hospital Request"
                      : "Individual Request"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blood Requirement */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-[#8C8579]">Blood Group</p>
              <p className="text-lg font-semibold text-[#1C2321]">
                {request.bloodGroup}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#8C8579]">Units Required</p>
              <p className="text-lg font-semibold text-[#1C2321]">
                {request.unitsRequired} Unit
                {request.unitsRequired > 1 ? "s" : ""}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#8C8579]">Required By</p>
              <p className="text-lg font-semibold text-[#1C2321] flex items-center gap-2">
                <Clock size={16} className="text-[#8C8579]" />
                {formatDate(request.requiredBy)}
              </p>
            </div>
          </div>

          {/* Requester Information */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-medium text-[#8C8579] uppercase tracking-wider mb-4">
              {request.requesterType === "hospital"
                ? "Hospital Information"
                : "Requested By"}
            </h3>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#7A2F2F]/5 rounded-xl flex-shrink-0">
                {request.requesterType === "hospital" ? (
                  <Hospital size={20} className="text-[#7A2F2F]" />
                ) : (
                  <User size={20} className="text-[#7A2F2F]" />
                )}
              </div>
              <div>
                {request.requesterType === "hospital" ? (
                  <>
                    <p className="font-semibold text-[#1C2321]">
                      {request.hospital?.hospitalName ||
                        "Hospital Name Not Available"}
                    </p>
                    <p className="text-[#8C8579] text-sm mt-0.5">
                      {request.hospital?.district ||
                        request.district ||
                        "Location not specified"}
                      {request.hospital?.state && `, ${request.hospital.state}`}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-[#1C2321]">
                      {request.requestedByUser
                        ? `${request.requestedByUser.firstName || ""} ${request.requestedByUser.lastName || ""}`.trim()
                        : "Requester Not Available"}
                    </p>
                    <p className="text-[#8C8579] text-sm mt-0.5">
                      {request.requestedByUser?.phone || "Phone not shared"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Patient & Request Information */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-medium text-[#8C8579] uppercase tracking-wider mb-4">
              Patient & Request Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#8C8579]">Patient Name</p>
                <p className="text-[#1C2321] font-medium">
                  {request.patientName || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8C8579]">Blood Group</p>
                <p className="text-[#1C2321] font-medium">
                  {request.bloodGroup}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8C8579]">Units Required</p>
                <p className="text-[#1C2321] font-medium">
                  {request.unitsRequired}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8C8579]">Urgency</p>
                <p
                  className={`font-medium ${request.urgency === "critical" ? "text-[#C23B22]" : request.urgency === "urgent" ? "text-[#7A2F2F]" : "text-[#3F6B5C]"}`}
                >
                  {capitalize(request.urgency)}
                </p>
              </div>
            </div>
          </div>

          {/* Request Location */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#7A2F2F] flex-shrink-0" />
              <div>
                <p className="font-medium text-[#1C2321]">Location</p>
                <p className="text-[#8C8579] text-sm">
                  {request.location || "Location not specified"}
                  {request.district && `, ${request.district}`}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {request.description && (
            <div className="mt-8 pt-6 border-t border-gray-200/60">
              <h3 className="text-sm font-medium text-[#8C8579] uppercase tracking-wider mb-3">
                Request Details
              </h3>
              <div className="bg-[#F6F3EC] rounded-2xl p-4">
                <p className="text-[#1C2321] leading-relaxed">
                  {request.description}
                </p>
              </div>
            </div>
          )}

          {/* Required By / Time */}
          <div className="mt-8 pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-[#7A2F2F] flex-shrink-0" />
              <div>
                <p className="font-medium text-[#1C2321]">Required By</p>
                <p className="text-[#8C8579] text-sm">
                  {formatDate(request.requiredBy)}
                </p>
              </div>
            </div>
          </div>

          {/* Donor Action / Offers Management */}
          <div className="mt-10 pt-6 border-t border-gray-200/60">
            {isOwner ? (
              <div>
                <h3 className="font-semibold text-[#1C2321] mb-1">
                  Donation Offers
                </h3>
                <p className="text-xs text-[#8C8579] mb-4">
                  Review donors who have offered to help with this request.
                </p>

                {offers.length === 0 && (
                  <div className="bg-[#F6F3EC] rounded-2xl p-6 text-center">
                    <p className="text-sm text-[#8C8579]">
                      No donors have offered yet. Check back soon.
                    </p>
                  </div>
                )}

                {offers.length > 0 && (
                  <div className="space-y-2">
                    {offers.map((offer) => (
                      <div
                        key={offer._id}
                        className="flex items-center justify-between gap-3 bg-[#F6F3EC] rounded-xl p-3.5"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-[#7A2F2F]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#7A2F2F] font-medium text-sm">
                              {offer.donor?.firstName?.charAt(0) || "D"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[#1C2321] truncate">
                              {offer.donor?.firstName} {offer.donor?.lastName}
                            </p>
                            <p className="text-xs text-[#8C8579] truncate">
                              {offer.donor?.bloodGroup} &middot;{" "}
                              {offer.donor?.phone}
                            </p>
                          </div>
                        </div>

                        {offer.status === "completed" ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-[#3F6B5C] flex-shrink-0">
                            <CheckCircle2 size={14} />
                            Completed
                          </span>
                        ) : (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleCompleteOffer(offer._id)}
                              disabled={actionLoading}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[#3F6B5C] text-white rounded-lg text-xs font-medium hover:bg-[#345a4d] transition-colors duration-200 disabled:opacity-60"
                            >
                              <CheckCircle2 size={13} />
                              Complete
                            </button>
                            <button
                              onClick={() => handleDeclineOffer(offer._id)}
                              disabled={actionLoading}
                              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#C23B22]/30 text-[#C23B22] rounded-lg text-xs font-medium hover:bg-[#C23B22]/5 transition-colors duration-200 disabled:opacity-60"
                            >
                              <XCircle size={13} />
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : request.status !== "active" ? (
              <div className="bg-[#F6F3EC] rounded-2xl p-5 text-center">
                <p className="text-sm text-[#8C8579]">
                  This request is no longer active.
                </p>
              </div>
            ) : myResponse?.status === "completed" ? (
              <div className="flex items-center gap-2 text-[#3F6B5C] font-medium text-sm">
                <CheckCircle2 size={18} />
                You completed this donation. Thank you!
              </div>
            ) : myResponse?.status === "pending" ? (
              <div>
                <div className="flex items-center gap-2 text-[#7A2F2F] font-medium text-sm mb-3">
                  <Clock size={18} />
                  Your donation offer is pending confirmation
                </div>
                <button
                  onClick={handleCancelOffer}
                  disabled={actionLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-[#C23B22]/30 text-[#C23B22] rounded-2xl font-medium hover:bg-[#C23B22]/5 transition-colors duration-200 disabled:opacity-60"
                >
                  <Ban size={16} />
                  {actionLoading ? "Cancelling..." : "Cancel Offer"}
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleDonate}
                  disabled={actionLoading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#7A2F2F] text-white rounded-2xl font-medium hover:bg-[#631F1F] transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-60"
                >
                  {actionLoading ? "Sending..." : "I Can Donate"}
                </button>
                <p className="text-xs text-[#8C8579] mt-3">
                  By clicking "I Can Donate", you confirm your willingness to
                  donate blood for this emergency request.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
