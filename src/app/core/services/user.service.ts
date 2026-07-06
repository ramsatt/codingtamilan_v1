import { Injectable, inject, signal, effect } from '@angular/core';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { AuthService } from './auth.service';

export interface UserStats {
  uid: string;
  xp: number;
  streak: number;
  lastActive: string;
  completedModules: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authService = inject(AuthService);
  readonly stats = signal<UserStats | null>(null);

  constructor() {
    // Watch auth state and load stats when logged in
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.loadUserStats(user.uid);
      } else {
        this.stats.set(null);
      }
    });
  }

  private async loadUserStats(uid: string) {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data() as UserStats;
      await this.checkAndUpdateStreak(userRef, data);
      this.stats.set(data);
    } else {
      // Create new user profile
      const newStats: UserStats = {
        uid,
        xp: 0,
        streak: 1,
        lastActive: new Date().toISOString(),
        completedModules: []
      };
      await setDoc(userRef, newStats);
      this.stats.set(newStats);
    }
  }

  private async checkAndUpdateStreak(userRef: any, data: UserStats) {
    const today = new Date().toDateString();
    const lastActive = new Date(data.lastActive).toDateString();
    
    if (today !== lastActive) {
      // Check if it's consecutive
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = data.streak;
      if (lastActive === yesterday.toDateString()) {
        newStreak += 1;
      } else {
        newStreak = 1; // reset streak
      }

      await updateDoc(userRef, {
        streak: newStreak,
        lastActive: new Date().toISOString()
      });
      data.streak = newStreak;
      data.lastActive = new Date().toISOString();
    }
  }

  async awardXp(amount: number) {
    const user = this.authService.user();
    if (!user) return; // Only signed in users get XP

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      xp: increment(amount)
    });
    
    // Optimistic update
    const current = this.stats();
    if (current) {
      this.stats.set({ ...current, xp: current.xp + amount });
    }
  }

  async markModuleComplete(moduleId: string) {
    const user = this.authService.user();
    if (!user) return;

    const current = this.stats();
    if (current && !current.completedModules.includes(moduleId)) {
      const userRef = doc(db, 'users', user.uid);
      const newModules = [...current.completedModules, moduleId];
      
      await updateDoc(userRef, {
        completedModules: newModules
      });
      
      this.stats.set({ ...current, completedModules: newModules });
      this.awardXp(50); // Award 50 XP per module completion
    }
  }
}
