import { Injectable, signal, computed } from '@angular/core';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signals for state management
  readonly user = signal<User | null>(null);
  readonly loading = signal<boolean>(true);
  
  // Computed values
  readonly isAuthenticated = computed(() => !!this.user());

  constructor() {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (currentUser) => {
      this.user.set(currentUser);
      this.loading.set(false);
    });
  }

  async signUpWithEmail(email: string, password: string): Promise<void> {
    this.loading.set(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      this.loading.set(false);
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    this.loading.set(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      this.loading.set(false);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.loading.set(true);
    try {
      await signOut(auth);
    } catch (error) {
      this.loading.set(false);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<void> {
    this.loading.set(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      this.loading.set(false);
      throw error;
    }
  }

  async loginWithGitHub(): Promise<void> {
    this.loading.set(true);
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      this.loading.set(false);
      throw error;
    }
  }
}
