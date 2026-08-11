import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductActions } from '../../store/product/product.actions';
import { selectAllProducts, selectProductsLoading, selectProductsError } from '../../store/product/product.selectors';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatCardModule, MatProgressSpinnerModule],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6">Products</h1>

      <div *ngIf="loading$ | async" class="flex justify-center py-16">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <div *ngIf="error$ | async as error" class="text-red-600 mb-4">{{ error }}</div>

      <div *ngIf="!(loading$ | async) && (products$ | async)?.length === 0" class="text-gray-500">
        No products yet.
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <mat-card *ngFor="let product of products$ | async">
          <img [src]="product.imageUrl || 'https://placehold.co/300x200?text=No+Image'" class="w-full h-40 object-cover" [alt]="product.name">
          <mat-card-content class="pt-4">
            <p class="text-xs text-gray-500 uppercase">{{ product.categoryName }}</p>
            <h2 class="font-semibold">{{ product.name }}</h2>
            <p class="text-lg font-bold mt-1">{{ product.price | currency }}</p>
            <p class="text-xs mt-1" [class.text-red-600]="product.stockQuantity === 0">
              {{ product.stockQuantity > 0 ? product.stockQuantity + ' in stock' : 'Out of stock' }}
            </p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }
}