import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { CartActions } from './cart.actions';

@Injectable()
export class CartEffects {
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() =>
        this.cartService.getCart().pipe(
          map(cart => CartActions.loadCartSuccess({ cart })),
          catchError(err => of(CartActions.loadCartFailure({ error: err.error?.message ?? 'Failed to load cart' })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),
      switchMap(({ request }) =>
        this.cartService.addItem(request).pipe(
          map(cart => CartActions.addItemSuccess({ cart })),
          catchError(err => of(CartActions.addItemFailure({ error: err.error?.message ?? 'Failed to add item' })))
        )
      )
    )
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateItem),
      switchMap(({ productId, request }) =>
        this.cartService.updateItem(productId, request).pipe(
          map(cart => CartActions.updateItemSuccess({ cart })),
          catchError(err => of(CartActions.updateItemFailure({ error: err.error?.message ?? 'Failed to update item' })))
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeItem),
      switchMap(({ productId }) =>
        this.cartService.removeItem(productId).pipe(
          map(cart => CartActions.removeItemSuccess({ cart })),
          catchError(err => of(CartActions.removeItemFailure({ error: err.error?.message ?? 'Failed to remove item' })))
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      switchMap(() =>
        this.cartService.clearCart().pipe(
          map(() => CartActions.clearCartSuccess()),
          catchError(err => of(CartActions.clearCartFailure({ error: err.error?.message ?? 'Failed to clear cart' })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private cartService: CartService) {}
}