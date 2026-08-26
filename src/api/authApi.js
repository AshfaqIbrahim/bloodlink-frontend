import api from "./axios";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const verifyOtp = (data) => {
  return api.post("/auth/verify-otp", data, {
    withCredentials: true,
  });
};

export const resendOtp = (email) => {
  return api.post("/auth/resend-otp", { email });
};

export const loginUser = (data) => {
  return api.post("/auth/login", data, {
    withCredentials: true,
  });
};

export const getMe = () => {
  return api.get("/auth/me", {
    withCredentials: true,
  });
};

export const logoutUser = () => {
  return api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    },
  );
};

export const googleLogin = (credential) => {
  return api.post("/auth/google", {
    credential,
  });
};

export const completeGoogleRegistration = (data) => {
  return api.post("/auth/google/complete-registration", data);
};
