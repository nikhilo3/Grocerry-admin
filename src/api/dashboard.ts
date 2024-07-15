import axios from "axios";
import API from ".";

export const handleGetDashboardDataService = (
  token: string
): Promise<{
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderCost: number;
}> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.dashboardReport, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data?.responseBody);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
