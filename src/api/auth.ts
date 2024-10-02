import axios from "axios";
import API from ".";
import Cookies from "js-cookie";

export const handleLoginService = async (data: {
  userName: string;
  password: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        API.login,
        { email: data.userName, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // if the res statusCode is not in range of 200-299
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to login!");
        }
        const token = res.data?.responseBody?.token;
        Cookies.set("auth_token", token);
        resolve(res.data?.message ?? "Login successful!");
      })
      .catch(() => {
        reject("Failed to login!");
      });
  });
};
