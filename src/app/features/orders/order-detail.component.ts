import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderActions } from '../../store/order/order.actions';
import { selectSelectedOrder, selectOrdersLoading } from '../../store/order/order.selectors';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink, MatProgressSpinnerModule],
  template: `
    <div class="p-8 max-w-2xl mx-auto">
      <a routerLink="/products" class="text-indigo-600 underline">&larr; Continue shopping</a>

      <div *ngIf="loading$ | async" class="flex justify-center py-16">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <ng-container *ngIf="order$ | async as order">
        <h1 class="text-2xl font-bold mt-6">Order #{{ order.id }}</h1>
        <p class="text-gray-500 text-sm">{{ order.orderDate | date:'medium' }} &middot; {{ order.status }}</p>
        <p class="text-gray-700 text-sm mt-2">Shipping to: {{ order.shippingAddress }}</p>

        <div class="mt-6 border-t pt-4">
          <div *ngFor="let item of order.items" class="flex justify-between py-2">
            <span>{{ item.productName }} &times; {{ item.quantity }}</span>
            <span>{{ item.lineTotal | currency }}</span>
          </div>
          <div class="flex justify-between font-bold mt-2 pt-2 border-t">
            <span>Total</span>
            <span>{{ order.totalAmount | currency }}</span>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class OrderDetailComponent implements OnInit {
  order$ = this.store.select(selectSelectedOrder);
  loading$ = this.store.select(selectOrdersLoading);

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(OrderActions.loadOrder({ id }));
  }
}