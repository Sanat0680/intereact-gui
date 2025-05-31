export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  userType: string;
  createdDate: string;
  lastLoginDate: string;
}

export interface FormValues {
  username: string;
  password: string;
  remember: boolean;
}

export interface InventoryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
export interface BillingFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pin: string;
}
