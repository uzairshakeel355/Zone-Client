import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthActions } from '../../../store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-50">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow">
        <h1 class="text-xl font-semibold">Sign in to ShopZone</h1>

        <mat-form-field class="w-full">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email">
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Password</mat-label>
          <input matInput formControlName="password" type="password">
        </mat-form-field>

        <div *ngIf="error$ | async as error" class="text-sm text-red-600">{{ error }}</div>

        <button mat-flat-button color="primary" class="w-full" type="submit"
                [disabled]="form.invalid || (loading$ | async)">
          {{ (loading$ | async) ? 'Signing in…' : 'Sign in' }}
        </button>

        <p class="text-sm text-gray-500">No account? <a routerLink="/register" class="text-indigo-600">Create one</a></p>
      </form>
    </div>
  `
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.store.dispatch(AuthActions.login({ request: this.form.getRawValue() as any }));
  }
}