import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart, AddCartItemRequest, UpdateCartItemRequest } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addItem(payload: AddCartItemRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/items`, payload);
  }

  updateItem(productId: number, payload: UpdateCartItemRequest): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/items/${productId}`, payload);
  }

  removeItem(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/items/${productId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}