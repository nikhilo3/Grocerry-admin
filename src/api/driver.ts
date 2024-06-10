import API from ".";
import { DriverFormData } from "../pages/Drivers/AddUpdateDriverModal";
import { axiosInstance } from "./axios";

export const handleAddDriver = (driver: DriverFormData): Promise<string> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(API.addDriver, driver)
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Something went wrong!");
        }
        resolve(res.data?.message ?? "Driver added successfully!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Something went wrong!");
      });
  });
};

export type DriverResponseType = {
  id: string;
  name: string;
  contactNo: string;
  vehicleNo: string;
  available: boolean;
};

export const getAllDrivers = async (
  query: string
): Promise<DriverResponseType[]> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API.allDrivers}?${query}`)
      .then((res) => {
        if (res.data?.statusCode === 404) resolve([]);
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch drivers!");
        }
        resolve(res.data?.responseBody?.content ?? []);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch drivers!");
      });
  });
};

export const handleDeleteDriver = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(API.deleteDriver, {
        data: [id],
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to delete driver!");
        }
        resolve(res.data?.message ?? "Driver deleted successfully!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to delete driver!");
      });
  });
};

export const handleUpdateDriver = async (
  driver: DriverResponseType
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(API.updateDriver, driver)
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to update driver!");
        }
        resolve(res.data?.message ?? "Driver updated successfully!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to update driver!");
      });
  });
};

export const handleGetDriversByName = async (
  name: string
): Promise<DriverResponseType[]> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API.allDrivers}?name=${name}`)
      .then((res) => {
        if (res.data?.statusCode === 404) {
          resolve([]);
        }
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch drivers!");
        }
        resolve(res.data?.responseBody?.content ?? []);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch drivers!");
      });
  });
};
