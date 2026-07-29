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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-50">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow">
        <h1 class="text-xl font-semibold">Create your ShopZone account</h1>

        <div class="flex gap-3">
          <mat-form-field class="w-1/2"><mat-label>First name</mat-label><input matInput formControlName="firstName"></mat-form-field>
          <mat-form-field class="w-1/2"><mat-label>Last name</mat-label><input matInput formControlName="lastName"></mat-form-field>
        </div>

        <mat-form-field class="w-full"><mat-label>Email</mat-label><input matInput formControlName="email" type="email"></mat-form-field>
        <mat-form-field class="w-full"><mat-label>Password</mat-label><input matInput formControlName="password" type="password"></mat-form-field>

        <div *ngIf="error$ | async as error" class="text-sm text-red-600">{{ error }}</div>

        <button mat-flat-button color="primary" class="w-full" type="submit"
                [disabled]="form.invalid || (loading$ | async)">
          {{ (loading$ | async) ? 'Creating account…' : 'Create account' }}
        </button>

        <p class="text-sm text-gray-500">Already have an account? <a routerLink="/login" class="text-indigo-600">Sign in</a></p>
      </form>
    </div>
  `
})
export class RegisterComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    if (this.form.invalid) return;
    this.store.dispatch(AuthActions.register({ request: this.form.getRawValue() as any }));
  }
}