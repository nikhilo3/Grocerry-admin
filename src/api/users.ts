import API from ".";
import { IUser, IUserAddress } from "../types/user.types";
import { axiosInstance } from "./axios";

export interface IGetAllUsersResponse {
  userDetails: IUser;
  addressDetailsList?: IUserAddress[];
}

export const handleGetAllUsers = async (
  query: string = ""
): Promise<Array<IGetAllUsersResponse>> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API.getAllUsers}?${query}`)
      .then((res) => {
        if (res.data?.statusCode === 404) return resolve([]);
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch users!");
        }
        resolve(res.data?.responseBody?.content || []);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch users!");
      });
  });
};

export const handleGetAllUserReport = async (): Promise<{
  totalUserCount: number;
  totalActiveCount: number;
  totalInActiveCount: number;
}> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(API.getAllUserReport)
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch user report!");
        }
        resolve(res.data?.responseBody ?? {});
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch user report!");
      });
  });
};
