import { createReducer, on } from '@ngrx/store';
import { OrderActions } from './order.actions';
import { initialOrderState } from './order.state';

export const orderReducer = createReducer(
  initialOrderState,

  on(OrderActions.loadOrders, OrderActions.loadOrder, (state) => ({ ...state, loading: true, error: null })),
  on(OrderActions.checkout, (state) => ({ ...state, checkoutLoading: true, error: null })),

  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({ ...state, loading: false, orders })),
  on(OrderActions.loadOrderSuccess, (state, { order }) => ({ ...state, loading: false, selectedOrder: order })),
  on(OrderActions.checkoutSuccess, (state, { order }) => ({
    ...state, checkoutLoading: false, selectedOrder: order, orders: [order, ...state.orders]
  })),

  on(OrderActions.loadOrdersFailure, OrderActions.loadOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(OrderActions.checkoutFailure, (state, { error }) => ({ ...state, checkoutLoading: false, error })),
);