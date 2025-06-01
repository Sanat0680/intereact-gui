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
export interface OrderItem {
  id?: String;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}
export interface BillingFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pin: string;
}

export interface CreatedOrder {
  id?: string;
  customerId: number;
  shippingAddress: string;
  billingAddress: string;
  status: String;
  paymentMethod: String;
  notes: string;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  items: OrderItem[];
}
