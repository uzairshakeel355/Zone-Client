import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.loadCart, CartActions.addItem, CartActions.updateItem, CartActions.removeItem, CartActions.clearCart,
    (state) => ({ ...state, loading: true, error: null })),

  on(CartActions.loadCartSuccess, CartActions.addItemSuccess, CartActions.updateItemSuccess, CartActions.removeItemSuccess,
    (state, { cart }) => ({ ...state, loading: false, cart })),

  on(CartActions.clearCartSuccess, (state) => ({
    ...state, loading: false,
    cart: state.cart ? { ...state.cart, items: [], total: 0 } : null
  })),

  on(CartActions.loadCartFailure, CartActions.addItemFailure, CartActions.updateItemFailure, CartActions.removeItemFailure, CartActions.clearCartFailure,
    (state, { error }) => ({ ...state, loading: false, error })),
);