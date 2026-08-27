export interface OrderItem {
  productId: number | null;
  productName: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  orderDate: string;
  status: string;
  shippingAddress: string;
  totalAmount: number;
  items: OrderItem[];
}

export interface CheckoutRequest {
  shippingAddress: string;
}