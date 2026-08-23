import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCart = createSelector(selectCartState, s => s.cart);
export const selectCartItems = createSelector(selectCart, cart => cart?.items ?? []);
export const selectCartItemCount = createSelector(selectCartItems, items => items.reduce((sum, i) => sum + i.quantity, 0));
export const selectCartTotal = createSelector(selectCart, cart => cart?.total ?? 0);
export const selectCartLoading = createSelector(selectCartState, s => s.loading);
export const selectCartError = createSelector(selectCartState, s => s.error);