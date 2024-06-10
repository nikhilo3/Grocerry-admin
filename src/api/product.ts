import { ProductFormData, Variety } from "../pages/AddUpdateProduct";
import API from ".";
import { productToFd } from "../utils/productToFd";
import { IProduct } from "../types/product.types";
import { axiosInstance } from "./axios";

type Product = ProductFormData & {
  varietyList: Variety[];
  subCategory: string;
};

export const handleGetAllProducts = async (
  query: string = ""
): Promise<IProduct[]> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API.allProducts}?${query}`)
      .then((res) => {
        if (res.data?.statusCode === 404) {
          resolve([]);
        }
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch products!");
        }
        resolve(res.data?.responseBody?.content ?? []);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch products!");
      });
  });
};

export const handleDeleteProduct = async (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(API.deleteProduct, {
        data: [code],
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to delete product!");
        }
        resolve(res.data?.message ?? "Product deleted successfully!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to delete product!");
      });
  });
};

export const handleAddProduct = async (product: Product): Promise<string> => {
  const fd = productToFd(product);
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(API.addProduct, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // if the res statusCode is not in range of 200-299
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to add product!");
        }
        resolve(res.data?.message ?? "Product added successfully!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to add product!");
      });
  });
};

export const handleUpdateProduct = async (
  product: Product
): Promise<string> => {
  const fd = productToFd(product);
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(API.updateProduct, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to update product!");
        }
        resolve(res.data?.message ?? "Product updated successfully!");
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to update product!");
      });
  });
};

export const handleGetProductsByQueries = async (
  query?: string
): Promise<IProduct[]> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API.allProducts}${query ? `?${query}` : ""}`)
      .then((res) => {
        if (res.data?.statusCode === 404) resolve([]);
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch products!");
        }
        resolve(res.data?.responseBody?.content ?? []);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch products!");
      });
  });
};

export const handleGetProductReport = async (): Promise<{
  totalProducts: number;
  totalInStockProducts: number;
  totalOutOfStockProducts: number;
} | null> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(API.getAllProductReport)
      .then((res) => {
        if (res.data?.statusCode === 404) resolve(null);
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage ?? "Failed to fetch product report!");
        }
        resolve(res.data?.responseBody ?? null);
      })
      .catch((err) => {
        reject(err.response.data?.message ?? "Failed to fetch product report!");
      });
  });
};
