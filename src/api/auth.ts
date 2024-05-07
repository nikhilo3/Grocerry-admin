import axios from "axios";
import API from ".";

export const handleSendOtp = async (phone: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.sendOtp, { phone })
      .then((response) =>
        resolve(response.data.responseBody?.message ?? "OTP sent successfully!")
      )
      .catch(() => reject("Failed to send OTP!"));
  });
};

export const handleVerifyOtp = async (data: { phone: string; otp: string }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.verifyOtp, data)
      .then((response) =>
        resolve(
          response.data.responseBody?.message ?? "OTP verified successfully!"
        )
      )
      .catch(() => reject("Failed to verify OTP!"));
  });
};
