import axios from "axios";
import API from ".";
import { TOKEN } from "../assets/mockData/auth";

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
    axios
      .get(API.getAllSuggestions, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
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
    axios
      .delete(API.removeSuggestion, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
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
