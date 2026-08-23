import { Cart } from '../../core/models/cart.model';

export interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

export const initialCartState: CartState = { cart: null, loading: false, error: null };