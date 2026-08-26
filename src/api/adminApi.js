import api from "./axios";

// ---------- Dashboard ----------
export const getDashboardStats = () => {
  return api.get("/admin/stats");
};

// ---------- Hospitals ----------
export const getAllHospitals = (status = "all") => {
  return api.get("/admin/hospitals", { params: { status } });
};

export const approveHospital = (id) => {
  return api.patch(`/admin/hospitals/${id}/approve`);
};

export const rejectHospital = (id) => {
  return api.patch(`/admin/hospitals/${id}/reject`);
};

export const blockHospital = (id) => {
  return api.patch(`/admin/hospitals/${id}/block`);
};

export const unblockHospital = (id) => {
  return api.patch(`/admin/hospitals/${id}/unblock`);
};

// ---------- Users ----------
export const getAllUsers = () => {
  return api.get("/admin/users");
};

export const blockUser = (id) => {
  return api.patch(`/admin/users/${id}/block`);
};

export const unblockUser = (id) => {
  return api.patch(`/admin/users/${id}/unblock`);
};

// ---------- Emergency Requests ----------
export const getAllEmergencyRequests = (status = "all") => {
  return api.get("/admin/emergency-requests", { params: { status } });
};

export const forceCancelEmergencyRequest = (id) => {
  return api.patch(`/admin/emergency-requests/${id}/cancel`);
};
