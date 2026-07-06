import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  errorMessage: string = '';
  isLoading: boolean = false;

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.signupForm.value;

    try {
      await this.authService.signUpWithEmail(email, password);
      this.router.navigate(['/']); // Redirect to home on success
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'The password is too weak.';
      } else {
        this.errorMessage = 'An error occurred during sign up. Please try again later.';
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
    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account already exists with this email address.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'The password is not strong enough.';
      case 'auth/popup-closed-by-user':
        return 'Login cancelled.';
      default:
        return 'An error occurred during registration. Please try again.';
    }
  }
}
