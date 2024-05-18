export interface IProduct {
  id: string;
  name: string;
  code: string;
  category: string;
  subCategory: string;
  description: string;
  brand: string;
  varietyList: {
    id: string;
    type: string;
    value: string;
    unit: string;
    description: string;
    price: number;
    discountPercent: number;
    discountPrice: number;
    quantity: number;
    productId: string;
    documentUrls: string[];
  }[];
  documentUrls?: string[];
}
