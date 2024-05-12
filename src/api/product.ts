import axios from "axios";
import { ProductFormData, Variety } from "../pages/AddUpdateProduct";
import API from ".";
import { productToFd } from "../utils/productToFd";
import { TOKEN } from "../assets/mockData/auth";

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

export const handleAddProduct = async (product: Product): Promise<string> => {
  const fd = productToFd(product);
  return new Promise((resolve, reject) => {
    axios
      .post(API.addProduct, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${TOKEN}`, //
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

export const handleUpdateProduct = async (
  product: Product
): Promise<string> => {
  const fd = productToFd(product);
  return new Promise((resolve, reject) => {
    axios
      .put(API.updateProduct, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${TOKEN}`,
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

export const handleGetAllProducts = async (): Promise<
  ProductResponseType[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.allProducts, {
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

export const handleGetProductsByQueries = async (
  query?: string
): Promise<ProductResponseType[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.allProducts}${query ? `?${query}` : ""}`, {
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

export const handleDeleteProduct = async (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(API.deleteProduct, {
        data: [code],
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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
