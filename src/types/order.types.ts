export type IOrder = {
  id: string;
  paymentId: string;
  boughtProductDetailsList: {
    varietyId: string;
    name: string;
    price: number;
    discountPercent: number;
    discountedPrice: number;
    boughtQuantity: number;
    documents: string[];
  }[];
  totalItemCost: number;
  deliveryCharges: number;
  totalCost: number;
  orderStatus: string;
  deliveredAt: string | null;
  createdAt: string;
  paidDate: string;
  userDetailsDto: {
    name: string;
    email: string;
    primaryPhoneNo: string;
    secondaryPhoneNo: string | null;
    id: string;
  };
  shippingInfo: {
    id: string;
    landmark: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    addressName: string;
    primaryAddress: boolean;
  };
  driverDetailsDto: {
    name: string;
    contactNo: string;
    vehicleNo: string;
    id: string;
  } | null;
};
