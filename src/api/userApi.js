import api from "./axios";

export const updateAvailability = (isAvailable) => {
  return api.patch("/user/availability", {
    isAvailable,
  });
};
