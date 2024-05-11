import axios from "axios";
import { ProductFormData, Variety } from "../pages/AddUpdateProduct";
import { jsonToFd } from "../utils/jsonToFd";
import API from ".";
import { productToFd } from "../utils/productToFd";

type Product = ProductFormData & {
  varietyList: Variety[];
  subCategory: string;
};

export type ProductResponseType = {
  name: string;
  code: string;
  category: string;
  subCategory: string;
  description: string;
  brand?: string;
  type: string;
  value: string;
  unit: string;
  varietyDescription: string;
  price: number;
  discountPercent: number;
  discountedPrice: number;
  deliveryCharges: number;
  quantity: number;
  documents?: string[];
};

const token = "c9d04268-54d5-46c4-8c93-72f36a9c565f";

export const handleAddProduct = async (product: Product): Promise<string> => {
  const fd = productToFd(product);
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

export const handleGetAllProducts = async (): Promise<
  ProductResponseType[]
> => {
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
