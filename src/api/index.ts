const AUTH_URL = import.meta.env.VITE_LOGIN_SERVICE_BASE_URL + "/v1";
// const AUTH_URL = "http://localhost:8080" + "/v1";

const API = {
  sendOtp: AUTH_URL + "/send-otp",
  verifyOtp: AUTH_URL + "/verify-otp",
};

export default API;
