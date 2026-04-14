
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-default-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-default" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-4">SQL DEFAULT Constraint</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-emerald-600">DEFAULT</span> constraint is used to set a default value for a column when no value is specified.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">DEFAULT Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE TABLE</span> Orders (</div>
          <div class="ml-4">OrderID INTEGER PRIMARY KEY,</div>
          <div class="ml-4">Status VARCHAR(50) <span class="text-emerald-400">DEFAULT</span> 'Pending',</div>
          <div class="ml-4">OrderDate DATE <span class="text-emerald-400">DEFAULT</span> CURRENT_DATE</div>
          <div>);</div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try DEFAULT
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 transition-colors font-semibold">
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
                  class="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">
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
export class SqlDefaultLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    Status VARCHAR(50) DEFAULT 'Pending',
    OrderDate DATE DEFAULT CURRENT_DATE
);`);
  error = signal<string>('');
  showSuccess = signal(false);
  successMessage = signal('');

  examples = [
    {
      title: 'String Default',
      description: 'Default status value',
      query: `CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    Status VARCHAR(50) DEFAULT 'Pending',
    OrderDate DATE DEFAULT CURRENT_DATE
);`
    },
    {
      title: 'Numeric Default',
      description: 'Default quantity and price',
      query: `CREATE TABLE CartItems (
    ItemID INTEGER PRIMARY KEY,
    Quantity INTEGER DEFAULT 1,
    Discount REAL DEFAULT 0.0
);`
    },
    {
      title: 'Boolean Default',
      description: 'Default active status',
      query: `CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50),
    IsActive INTEGER DEFAULT 1,
    IsVerified INTEGER DEFAULT 0
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
      this.successMessage.set('Table created with DEFAULT values!');
    } catch (e: any) {
      this.error.set(e.message);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY,
    Status VARCHAR(50) DEFAULT 'Pending',
    OrderDate DATE DEFAULT CURRENT_DATE
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
