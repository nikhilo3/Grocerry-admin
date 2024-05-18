export interface IUser {
  id: string;
  name: string;
  email: string;
  primaryPhoneNo: string;
  secondaryPhoneNo: string | null;
}

export interface IUserAddress {
  id: string;
  landmark: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  addressName: string;
  primaryAddress: boolean;
}
