
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderActions } from '../../store/order/order.actions';
import { selectCheckoutLoading, selectOrdersError } from '../../store/order/order.selectors';
import { selectCart } from '../../store/cart/cart.selectors';
import { CartActions } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="p-8 max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Checkout</h1>

      <ng-container *ngIf="cart$ | async as cart">
        <div *ngIf="cart.items.length === 0" class="text-gray-500">
          Your cart is empty. Add something before checking out.
        </div>

        <ng-container *ngIf="cart.items.length > 0">
          <div class="mb-6 border-b pb-4">
            <div *ngFor="let item of cart.items" class="flex justify-between text-sm py-1">
              <span>{{ item.productName }} &times; {{ item.quantity }}</span>
              <span>{{ item.lineTotal | currency }}</span>
            </div>
            <div class="flex justify-between font-semibold mt-2">
              <span>Total</span>
              <span>{{ cart.total | currency }}</span>
            </div>
          </div>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field class="w-full">
              <mat-label>Shipping Address</mat-label>
              <textarea matInput formControlName="shippingAddress" rows="3"></textarea>
            </mat-form-field>

            <div *ngIf="error$ | async as error" class="text-red-600 text-sm mb-4">{{ error }}</div>

            <button mat-flat-button color="primary" class="w-full" type="submit"
                    [disabled]="form.invalid || (checkoutLoading$ | async)">
              {{ (checkoutLoading$ | async) ? 'Placing order…' : 'Place Order' }}
            </button>
          </form>
        </ng-container>
      </ng-container>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cart$ = this.store.select(selectCart);
  checkoutLoading$ = this.store.select(selectCheckoutLoading);
  error$ = this.store.select(selectOrdersError);

  form = this.fb.group({
    shippingAddress: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.store.dispatch(OrderActions.checkout({ request: this.form.getRawValue() as any }));
  }
}