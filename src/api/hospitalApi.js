import api from "./axios";

export const registerHospital = (data) => {
  return api.post("/hospital/register", data);
};

export const loginHospital = (data) => {
  return api.post("/hospital/login", data, {
    withCredentials: true,
  });
};

export const getHospitalMe = () => {
  return api.get("/hospital/me", {
    withCredentials: true,
  });
};
