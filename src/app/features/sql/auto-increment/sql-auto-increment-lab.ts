
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-auto-increment-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-auto-increment" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-green-500 pl-4">SQL AUTO INCREMENT</h3>
        <p class="article-body">
          <span class="font-mono font-bold text-green-600">AUTO INCREMENT</span> allows a unique number to be generated automatically when a new record is inserted into a table.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">AUTO INCREMENT Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE TABLE</span> Persons (</div>
          <div class="ml-4">PersonID INTEGER PRIMARY KEY <span class="text-green-400">AUTOINCREMENT</span>,</div>
          <div class="ml-4">FirstName VARCHAR(255),</div>
          <div class="ml-4">LastName VARCHAR(255)</div>
          <div>);</div>
        </div>
        <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-700 font-medium">💡 Benefits:</p>
          <ul class="text-green-600 text-sm mt-2 space-y-1">
            <li>• Automatically generates unique IDs</li>
            <li>• No need to manually specify ID values</li>
            <li>• Prevents duplicate primary keys</li>
          </ul>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Database Variations</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-semibold text-slate-800 mb-1 text-sm">SQLite</h5>
            <code class="text-xs text-slate-600">AUTOINCREMENT</code>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-semibold text-slate-800 mb-1 text-sm">MySQL</h5>
            <code class="text-xs text-slate-600">AUTO_INCREMENT</code>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-semibold text-slate-800 mb-1 text-sm">SQL Server</h5>
            <code class="text-xs text-slate-600">IDENTITY(1,1)</code>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try AUTO INCREMENT
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 transition-colors font-semibold">
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
                  class="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
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
export class SqlAutoIncrementLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE TABLE Persons (
    PersonID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Age INTEGER
);`);
  error = signal<string>('');
  showSuccess = signal(false);
  successMessage = signal('');

  examples = [
    {
      title: 'Auto-Incrementing ID',
      description: 'PersonID will auto-increment',
      query: `CREATE TABLE Persons (
    PersonID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Age INTEGER
);`
    },
    {
      title: 'Insert Without ID',
      description: 'ID is generated automatically',
      query: `INSERT INTO Persons (FirstName, LastName, Age)
VALUES ('John', 'Doe', 30);`
    },
    {
      title: 'Products with Auto ID',
      description: 'ProductID auto-increments',
      query: `CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductName VARCHAR(200) NOT NULL,
    Price REAL
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
      this.successMessage.set('Executed successfully!');
    } catch (e: any) {
      this.error.set(e.message);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE TABLE Persons (
    PersonID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
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
