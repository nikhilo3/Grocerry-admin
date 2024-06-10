import API from ".";
import { axiosInstance } from "./axios";

type ISuggestion = {
  id: string;
  comment: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
};

export const getAllSuggestions = async (): Promise<ISuggestion[]> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(API.getAllSuggestions)
      .then((res) => {
        if (res.data?.statusCode === 404) {
          resolve([]);
        }
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch suggestions!");
        }
        resolve(res.data?.responseBody ?? []);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch suggestions!");
      });
  });
};

export const handleRemoveSuggestion = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(API.removeSuggestion, {
        data: [id],
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to remove suggestion!");
        }
        resolve(res.data?.message ?? "Suggestion removed successfully!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to remove suggestion!");
      });
  });
};
