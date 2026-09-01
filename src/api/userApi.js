import api from "./axios";

export const updateAvailability = (isAvailable) => {
  return api.patch("/user/availability", {
    isAvailable,
  });
};

export const getAvailableDonors = async () => {
  const response = await api.get("/user/available-donors");

  return response.data;
};

export const updateProfile = (data) => {
  return api.patch("/user/profile", data);
};
