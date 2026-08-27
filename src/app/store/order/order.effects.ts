import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { OrderActions } from './order.actions';
import { CartActions } from '../cart/cart.actions';

@Injectable()
export class OrderEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.orderService.getMyOrders().pipe(
          map(orders => OrderActions.loadOrdersSuccess({ orders })),
          catchError(err => of(OrderActions.loadOrdersFailure({ error: err.error?.message ?? 'Failed to load orders' })))
        )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrder),
      switchMap(({ id }) =>
        this.orderService.getById(id).pipe(
          map(order => OrderActions.loadOrderSuccess({ order })),
          catchError(err => of(OrderActions.loadOrderFailure({ error: err.error?.message ?? 'Failed to load order' })))
        )
      )
    )
  );

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.checkout),
      switchMap(({ request }) =>
        this.orderService.checkout(request).pipe(
          map(order => OrderActions.checkoutSuccess({ order })),
          catchError(err => of(OrderActions.checkoutFailure({ error: err.error?.message ?? 'Checkout failed' })))
        )
      )
    )
  );

  redirectAfterCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.checkoutSuccess),
      tap(({ order }) => this.router.navigate(['/orders', order.id]))
    ), { dispatch: false }
  );

  refreshCartAfterCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.checkoutSuccess),
      map(() => CartActions.loadCart())
    )
  );

  constructor(private actions$: Actions, private orderService: OrderService, private router: Router) {}
}