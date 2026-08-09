import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { initialProductState } from './product.state';

export const productReducer = createReducer(
  initialProductState,

  on(ProductActions.loadProducts, ProductActions.loadProduct, (state) => ({ ...state, loading: true, error: null })),

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, loading: false, products })),
  on(ProductActions.loadProductSuccess, (state, { product }) => ({ ...state, loading: false, selectedProduct: product })),

  on(ProductActions.loadProductsFailure, ProductActions.loadProductFailure, (state, { error }) => ({ ...state, loading: false, error })),
);