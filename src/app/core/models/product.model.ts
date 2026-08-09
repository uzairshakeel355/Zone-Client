export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
}