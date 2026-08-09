import { Product } from '../../core/models/product.model';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null
};