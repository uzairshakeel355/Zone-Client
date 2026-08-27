import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderActions } from '../../store/order/order.actions';
import { selectAllOrders, selectOrdersLoading, selectOrdersError } from '../../store/order/order.selectors';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink, MatProgressSpinnerModule],
  template: `
    <div class="p-8 max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">My Orders</h1>

      <div *ngIf="loading$ | async" class="flex justify-center py-16">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <div *ngIf="error$ | async as error" class="text-red-600 mb-4">{{ error }}</div>

      <div *ngIf="!(loading$ | async) && (orders$ | async)?.length === 0" class="text-gray-500">
        No orders yet. <a routerLink="/products" class="text-indigo-600 underline">Start shopping</a>
      </div>

      <a *ngFor="let order of orders$ | async" [routerLink]="['/orders', order.id]"
         class="block border rounded p-4 mb-3 hover:bg-gray-50">
        <div class="flex justify-between">
          <span class="font-semibold">Order #{{ order.id }}</span>
          <span class="text-sm text-gray-500">{{ order.status }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-600 mt-1">
          <span>{{ order.orderDate | date:'mediumDate' }}</span>
          <span class="font-semibold">{{ order.totalAmount | currency }}</span>
        </div>
      </a>
    </div>
  `
})
export class OrderHistoryComponent implements OnInit {
  orders$ = this.store.select(selectAllOrders);
  loading$ = this.store.select(selectOrdersLoading);
  error$ = this.store.select(selectOrdersError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
  }
}