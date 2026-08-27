import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order, CheckoutRequest } from '../../core/models/order.model';

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Orders': emptyProps(),
    'Load Orders Success': props<{ orders: Order[] }>(),
    'Load Orders Failure': props<{ error: string }>(),

    'Load Order': props<{ id: number }>(),
    'Load Order Success': props<{ order: Order }>(),
    'Load Order Failure': props<{ error: string }>(),

    'Checkout': props<{ request: CheckoutRequest }>(),
    'Checkout Success': props<{ order: Order }>(),
    'Checkout Failure': props<{ error: string }>(),
  }
});