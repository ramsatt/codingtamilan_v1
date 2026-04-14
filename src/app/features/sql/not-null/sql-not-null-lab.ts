
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-not-null-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-not-null" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-red-500 pl-4">SQL NOT NULL Constraint</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-red-600">NOT NULL</span> constraint enforces a column to NOT accept NULL values. This ensures that a field always contains a value.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">NOT NULL Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE TABLE</span> Persons (</div>
          <div class="ml-4">ID INTEGER <span class="text-red-400">NOT NULL</span>,</div>
          <div class="ml-4">LastName VARCHAR(255) <span class="text-red-400">NOT NULL</span>,</div>
          <div class="ml-4">FirstName VARCHAR(255),</div>
          <div class="ml-4">Age INTEGER</div>
          <div>);</div>
        </div>
        <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 font-medium">⚠️ Important:</p>
          <p class="text-red-600 text-sm">You must provide a value for NOT NULL columns when inserting or updating records.</p>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try NOT NULL
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-300 transition-colors font-semibold">
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
            <p class="text-green-700 font-medium">✓ Table created with NOT NULL constraints!</p>
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
                  class="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
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
export class SqlNotNullLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE TABLE Persons (
    ID INTEGER NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INTEGER
);`);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Required Fields',
      description: 'ID and LastName cannot be NULL',
      query: `CREATE TABLE Persons (
    ID INTEGER NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INTEGER
);`
    },
    {
      title: 'NOT NULL with DEFAULT',
      description: 'Combine NOT NULL with default values',
      query: `CREATE TABLE Products (
    ProductID INTEGER NOT NULL,
    ProductName VARCHAR(200) NOT NULL,
    Price REAL NOT NULL DEFAULT 0.00,
    InStock INTEGER NOT NULL DEFAULT 1
);`
    },
    {
      title: 'All Fields Required',
      description: 'Every column must have a value',
      query: `CREATE TABLE Orders (
    OrderID INTEGER NOT NULL,
    OrderDate DATE NOT NULL,
    CustomerID INTEGER NOT NULL,
    TotalAmount REAL NOT NULL
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
    } catch (e: any) {
      this.error.set(e.message);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE TABLE Persons (
    ID INTEGER NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    Age INTEGER
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
