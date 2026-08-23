import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart, AddCartItemRequest, UpdateCartItemRequest } from '../../core/models/cart.model';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart': emptyProps(),
    'Load Cart Success': props<{ cart: Cart }>(),
    'Load Cart Failure': props<{ error: string }>(),

    'Add Item': props<{ request: AddCartItemRequest }>(),
    'Add Item Success': props<{ cart: Cart }>(),
    'Add Item Failure': props<{ error: string }>(),

    'Update Item': props<{ productId: number; request: UpdateCartItemRequest }>(),
    'Update Item Success': props<{ cart: Cart }>(),
    'Update Item Failure': props<{ error: string }>(),

    'Remove Item': props<{ productId: number }>(),
    'Remove Item Success': props<{ cart: Cart }>(),
    'Remove Item Failure': props<{ error: string }>(),

    'Clear Cart': emptyProps(),
    'Clear Cart Success': emptyProps(),
    'Clear Cart Failure': props<{ error: string }>(),
  }
});