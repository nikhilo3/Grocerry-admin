import axios from "axios";
import API from ".";
import { TOKEN } from "../assets/mockData/auth";
import { IOrder } from "../types/order.types";

export const handleGetAllOrders = async (): Promise<IOrder[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.allOrders, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage);
        }
        resolve(res.data?.responseBody?.content ?? []);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleChangeOrderStatus = async (data: {
  id: string;
  orderStatus: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        API.updateOrder,
        {
          ...data,
          orderStatus: data.orderStatus.replace(/_/g, " "),
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage);
        }
        resolve(res.data?.message ?? "Order status updated successfully");
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleChangeOrderStatusToOutForDelivery = async (data: {
  orderId: string;
  driverId: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        API.updateOrder,
        {
          id: data.orderId,
          orderStatus: "OUT FOR DELIVERY",
          driverId: data.driverId,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage);
        }
        resolve(res.data?.message ?? "Assigned driver and updated status!");
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};
