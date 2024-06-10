import API from ".";
import { IOrder } from "../types/order.types";
import { ORDER_STATUS_OPTIONS } from "../pages/Orders";
import { axiosInstance } from "./axios";

export const handleGetAllOrders = async (
  query: string = ""
): Promise<IOrder[]> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API.allOrders}?${query}`)
      .then((res) => {
        if (res.data?.statusCode === 404) resolve([]);
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch orders!");
        }
        resolve(res.data?.responseBody?.content ?? []);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch orders!");
      });
  });
};

export const handleChangeOrderStatus = async (data: {
  id: string;
  orderStatus: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(API.updateOrder, {
        ...data,
        orderStatus: data.orderStatus.replace(/_/g, " "),
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to update order status!");
        }
        resolve(res.data?.message ?? "Order status updated successfully");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to update order status!");
      });
  });
};

export const handleChangeOrderStatusToOutForDelivery = async (data: {
  orderId: string;
  driverId: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(API.updateOrder, {
        id: data.orderId,
        orderStatus: "OUT FOR DELIVERY",
        driverId: data.driverId,
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to update order status!");
        }
        resolve(res.data?.message ?? "Assigned driver and updated status!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to update order status!");
      });
  });
};

export const handleGetAllOrderReport = async (): Promise<{
  totalOrders: number;
  countPerStatus: {
    [status: (typeof ORDER_STATUS_OPTIONS)[number]]: number;
  };
}> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(API.getAllOrderReport)
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch order report!");
        }
        resolve(res.data?.responseBody ?? {});
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch order report!");
      });
  });
};
