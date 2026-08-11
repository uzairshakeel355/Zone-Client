import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold">Welcome <a routerLink="/products" class="text-indigo-600 underline">Browse Products</a>
      {{ (user$ | async)?.firstName ? ', ' + (user$ | async)?.firstName : '' }} 👋</h1>
      <button (click)="logout()" class="mt-4 rounded bg-red-500 px-4 py-2 text-white">Logout</button>
    </div>
  `
})
export class HomeComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.rehydrate());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}