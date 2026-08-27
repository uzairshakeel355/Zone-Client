import { Order } from '../../core/models/order.model';

export interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  checkoutLoading: boolean;
  error: string | null;
}

export const initialOrderState: OrderState = {
  orders: [], selectedOrder: null, loading: false, checkoutLoading: false, error: null
};