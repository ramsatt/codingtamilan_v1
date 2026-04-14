
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-home-lab',
  imports: [CommonModule],
  template: `
    <section id="sql-home" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">SQL HOME</h3>
        <p class="article-body">
          SQL (Structured Query Language) is a standard language for storing, manipulating, and retrieving data in databases.
        </p>
      </div>

      <!-- What is SQL? -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-blue-100 text-blue-700 rounded text-xs">Intro</span> What is SQL?
        </h4>
        <div class="space-y-4 text-slate-600">
          <p>SQL stands for <strong>Structured Query Language</strong></p>
          <p>SQL lets you access and manipulate databases</p>
          <p>SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987</p>
        </div>
      </div>

      <!-- What Can SQL do? -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">What Can SQL do?</h4>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can execute queries against a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can retrieve data from a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can insert records in a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can update records in a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can delete records from a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can create new databases</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can create new tables in a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can create stored procedures in a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can create views in a database</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">✓</span>
            <span>SQL can set permissions on tables, procedures, and views</span>
          </li>
        </ul>
      </div>

      <!-- Database Status -->
      @if (sqlService.initialized()) {
        <div class="glass-panel rounded-xl p-6 shadow-sm bg-green-50 border border-green-200">
          <h4 class="text-xl font-bold text-green-800 mb-2">✓ Database Ready</h4>
          <p class="text-green-600">The SQL database is initialized and ready for queries. Navigate to any SQL topic to start practicing!</p>
        </div>
      } @else {
        <div class="glass-panel rounded-xl p-6 shadow-sm bg-yellow-50 border border-yellow-200">
          <h4 class="text-xl font-bold text-yellow-800 mb-2">⏳ Initializing Database...</h4>
          <p class="text-yellow-600">Please wait while we set up the SQL database.</p>
        </div>
      }

      <!-- Get Started -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Get Started</h4>
        <p class="text-slate-600 mb-4">Ready to learn SQL? Click the button below to start with the introduction!</p>
        <button 
          (click)="navigateToIntro()"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Start Learning SQL →
        </button>
      </div>
    </section>
  `,
  styles: ``
})
export class SqlHomeLab implements OnInit {
  private router = inject(Router);
  sqlService = inject(SqlExecutorService);

  ngOnInit() {
    // Initialize SQL database
    this.sqlService.initialize().catch(err => {
      console.error('Failed to initialize SQL database:', err);
    });
  }

  navigateToIntro() {
    this.router.navigate(['/sql/intro']);
  }
}
