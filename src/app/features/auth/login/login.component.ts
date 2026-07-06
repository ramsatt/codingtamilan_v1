import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string = '';
  isLoading: boolean = false;

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.loginWithEmail(email, password);
      this.router.navigate(['/']); // Redirect to home on success
    } catch (error: any) {
      console.error('Login error:', error);
      // Map Firebase auth errors to user-friendly messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        this.errorMessage = 'Invalid email or password.';
      } else {
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithGoogle() {
    this.errorMessage = '';
    this.isLoading = true;
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = this.getFriendlyErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithGitHub() {
    this.errorMessage = '';
    this.isLoading = true;
    try {
      await this.authService.loginWithGitHub();
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = this.getFriendlyErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  private getFriendlyErrorMessage(code: string): string {
    if (code === 'auth/popup-closed-by-user') {
      return 'Login cancelled.';
    }
    return 'An error occurred during login. Please try again later.';
  }
}
