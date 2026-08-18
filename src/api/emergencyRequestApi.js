import api from "./axios";

export const createEmergencyRequest = (data) => {
  return api.post("/emergency-requests", data);
};

export const getMyEmergencyRequests = () => {
  return api.get("/emergency-requests");
};

export const getNearbyEmergencyRequests = () => {
  return api.get("/emergency-requests/nearby");
};

export const getPublicEmergencyRequestById = (id) => {
  return api.get(`/emergency-requests/public/${id}`);
};

export const cancelEmergencyRequest = (id) => {
  return api.patch(`/emergency-requests/${id}/cancel`);
};
