import api from "./axios";

export const offerDonation = (requestId) => {
  return api.post(`/donations/${requestId}`);
};

export const cancelDonationOffer = (id) => {
  return api.patch(`/donations/${id}/cancel`);
};

export const getMyResponseForRequest = (requestId) => {
  return api.get(`/donations/mine/${requestId}`);
};

export const getMyDonationStats = () => {
  return api.get("/donations/stats/mine");
};

export const getOffersForRequest = (requestId) => {
  return api.get(`/donations/request/${requestId}`);
};

export const completeDonationOffer = (id) => {
  return api.patch(`/donations/${id}/complete`);
};

export const declineDonationOffer = (id) => {
  return api.patch(`/donations/${id}/decline`);
};
