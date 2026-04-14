
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-unique-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-unique" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-4">SQL UNIQUE Constraint</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-cyan-600">UNIQUE</span> constraint ensures that all values in a column are different.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">UNIQUE Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE TABLE</span> Persons (</div>
          <div class="ml-4">ID INTEGER PRIMARY KEY,</div>
          <div class="ml-4">Email VARCHAR(255) <span class="text-cyan-400">UNIQUE</span>,</div>
          <div class="ml-4">Name VARCHAR(255)</div>
          <div>);</div>
        </div>
        <div class="mt-4 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
          <p class="text-cyan-700 font-medium">💡 Key Differences:</p>
          <ul class="text-cyan-600 text-sm mt-2 space-y-1">
            <li>• PRIMARY KEY = UNIQUE + NOT NULL</li>
            <li>• UNIQUE allows NULL values</li>
            <li>• Table can have multiple UNIQUE constraints</li>
            <li>• Table can have only ONE PRIMARY KEY</li>
          </ul>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try UNIQUE
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-slate-300 transition-colors font-semibold">
              ▶ Execute
            </button>
            <button 
              (click)="resetQuery()"
              class="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold">
              ↻ Reset
            </button>
          </div>
        </div>

        @if (showSuccess()) {
          <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-green-700 font-medium">✓ {{ successMessage() }}</p>
          </div>
        }

        @if (error()) {
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 font-mono text-sm">{{ error() }}</p>
          </div>
        }
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Examples</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SqlUniqueLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE
);`);
  error = signal<string>('');
  showSuccess = signal(false);
  successMessage = signal('');

  examples = [
    {
      title: 'Single UNIQUE Column',
      description: 'Ensure email addresses are unique',
      query: `CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE
);`
    },
    {
      title: 'Named UNIQUE Constraint',
      description: 'UNIQUE constraint with a name',
      query: `CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    SKU VARCHAR(50),
    ProductName VARCHAR(200),
    CONSTRAINT UQ_SKU UNIQUE (SKU)
);`
    },
    {
      title: 'Composite UNIQUE',
      description: 'Multiple columns must be unique together',
      query: `CREATE TABLE Courses (
    CourseID INTEGER PRIMARY KEY,
    CourseName VARCHAR(100),
    Semester VARCHAR(20),
    Year INTEGER,
    UNIQUE (CourseName, Semester, Year)
);`
    }
  ];

  ngOnInit() {
    if (!this.sqlService.initialized()) {
      this.sqlService.initialize();
    }
  }

  executeQuery() {
    try {
      this.sqlService.execute(this.sqlQuery());
      this.error.set('');
      this.showSuccess.set(true);
      this.successMessage.set('Table created with UNIQUE constraint!');
    } catch (e: any) {
      this.error.set(e.message);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50) UNIQUE,
    Email VARCHAR(100) UNIQUE
);`);
    this.error.set('');
    this.showSuccess.set(false);
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.error.set('');
    this.showSuccess.set(false);
  }
}
