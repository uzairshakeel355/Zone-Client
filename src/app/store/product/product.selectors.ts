import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');
export const selectAllProducts = createSelector(selectProductState, s => s.products);
export const selectSelectedProduct = createSelector(selectProductState, s => s.selectedProduct);
export const selectProductsLoading = createSelector(selectProductState, s => s.loading);
export const selectProductsError = createSelector(selectProductState, s => s.error);