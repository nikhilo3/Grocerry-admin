import axios from "axios";
import { ProductFormData, Variety } from "../pages/AddUpdateProduct";
import { jsonToFd } from "../utils/jsonToFd";
import API from ".";

type Product = ProductFormData & {
  varietyList: Variety[];
  subCategory: string;
};

const token = "c9d04268-54d5-46c4-8c93-72f36a9c565f";

export const handleAddProduct = async (product: Product): Promise<string> => {
  console.log(product);
  const fd = jsonToFd(product);
  console.log(fd);
  return new Promise((resolve, reject) => {
    axios
      .post(API.addProduct, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, //
        },
      })
      .then((res) => {
        // if the res statusCode is not in range of 200-299
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage);
        }
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleGetAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.allProducts, {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const handleDeleteProduct = async (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(API.deleteProduct, {
        data: [code],
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data?.statusCode < 200 || res.data?.statusCode >= 300) {
          reject(res.data?.errorMessage);
        }
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};
