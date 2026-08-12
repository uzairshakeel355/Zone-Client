import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductActions } from '../../store/product/product.actions';
import { selectSelectedProduct, selectProductsLoading, selectProductsError } from '../../store/product/product.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, MatProgressSpinnerModule],
  template: `
    <div class="p-8 max-w-3xl mx-auto">
      <a routerLink="/products" class="text-indigo-600 underline">&larr; Back to products</a>

      <div *ngIf="loading$ | async" class="flex justify-center py-16">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <div *ngIf="error$ | async as error" class="text-red-600 mt-4">{{ error }}</div>

      <div *ngIf="product$ | async as product" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img [src]="product.imageUrl || 'https://placehold.co/500x400?text=No+Image'" class="w-full rounded object-cover" [alt]="product.name">

        <div>
          <p class="text-xs text-gray-500 uppercase">{{ product.categoryName }}</p>
          <h1 class="text-2xl font-bold mt-1">{{ product.name }}</h1>
          <p class="text-2xl font-semibold mt-2">{{ product.price | currency }}</p>
          <p class="text-sm mt-1" [class.text-red-600]="product.stockQuantity === 0">
            {{ product.stockQuantity > 0 ? product.stockQuantity + ' in stock' : 'Out of stock' }}
          </p>
          <p class="mt-4 text-gray-700">{{ product.description }}</p>
          <p class="text-xs text-gray-400 mt-6">SKU: {{ product.sku }}</p>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product$ = this.store.select(selectSelectedProduct);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(ProductActions.loadProduct({ id }));
  }
}