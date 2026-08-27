import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartActions } from '../../store/cart/cart.actions';
import { selectCart, selectCartLoading, selectCartError } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="p-8 max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Your Cart</h1>

      <div *ngIf="loading$ | async" class="flex justify-center py-16">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <div *ngIf="error$ | async as error" class="text-red-600 mb-4">{{ error }}</div>

      <ng-container *ngIf="cart$ | async as cart">
        <div *ngIf="cart.items.length === 0 && !(loading$ | async)" class="text-gray-500">
          Your cart is empty. <a routerLink="/products" class="text-indigo-600 underline">Browse products</a>
        </div>

        <div *ngFor="let item of cart.items" class="flex items-center justify-between border-b py-4">
          <div class="flex items-center gap-4">
            <img [src]="item.imageUrl || 'https://placehold.co/80x80?text=No+Image'" class="w-16 h-16 object-cover rounded" [alt]="item.productName">
            <div>
              <p class="font-semibold">{{ item.productName }}</p>
              <p class="text-sm text-gray-500">{{ item.unitPrice | currency }} each</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button mat-icon-button [disabled]="item.quantity <= 1" (click)="updateQuantity(item.productId, item.quantity - 1)">
              <mat-icon>remove</mat-icon>
            </button>
            <span>{{ item.quantity }}</span>
            <button mat-icon-button (click)="updateQuantity(item.productId, item.quantity + 1)">
              <mat-icon>add</mat-icon>
            </button>

            <p class="font-semibold w-20 text-right">{{ item.lineTotal | currency }}</p>

            <button mat-icon-button color="warn" (click)="removeItem(item.productId)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>

              <div *ngIf="cart.items.length > 0" class="flex justify-between items-center mt-6">
        <button mat-button color="warn" (click)="clearCart()">Clear Cart</button>
        <div class="flex items-center gap-4">
          <p class="text-xl font-bold">Total: {{ cart.total | currency }}</p>
          <a mat-flat-button color="primary" routerLink="/checkout">Checkout</a>
        </div>
      </div>

        <div *ngIf="cart.items.length > 0" class="flex justify-between items-center mt-6">
          <button mat-button color="warn" (click)="clearCart()">Clear Cart</button>
          <p class="text-xl font-bold">Total: {{ cart.total | currency }}</p>
        </div>
      </ng-container>
    </div>
  `
})
export class CartComponent implements OnInit {
  cart$ = this.store.select(selectCart);
  loading$ = this.store.select(selectCartLoading);
  error$ = this.store.select(selectCartError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  updateQuantity(productId: number, quantity: number): void {
    this.store.dispatch(CartActions.updateItem({ productId, request: { quantity } }));
  }

  removeItem(productId: number): void {
    this.store.dispatch(CartActions.removeItem({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}