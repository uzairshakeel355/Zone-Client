import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getAll().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(err => of(ProductActions.loadProductsFailure({ error: err.error?.message ?? 'Failed to load products' })))
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap(({ id }) =>
        this.productService.getById(id).pipe(
          map(product => ProductActions.loadProductSuccess({ product })),
          catchError(err => of(ProductActions.loadProductFailure({ error: err.error?.message ?? 'Failed to load product' })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}