import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  showShell = true;

  constructor() {
    const router = inject(Router);
    // Hide the global header/footer on the lesson viewer route which has its own layout
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      this.showShell = !e.urlAfterRedirects.startsWith('/learning/');
    });
    // Set initial state in case the page loads directly on /learning/*
    this.showShell = !router.url.startsWith('/learning/');
  }
}
