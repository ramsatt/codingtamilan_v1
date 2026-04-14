
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-alter-table-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-alter-table" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-violet-500 pl-4">SQL ALTER TABLE</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-violet-600">ALTER TABLE</span> statement is used to add, delete, or modify columns in an existing table.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">ALTER TABLE Operations</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Add Column:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">ALTER TABLE</span> table_name</div>
              <div><span class="text-violet-400">ADD</span> column_name datatype;</div>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Drop Column:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">ALTER TABLE</span> table_name</div>
              <div><span class="text-violet-400">DROP COLUMN</span> column_name;</div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try ALTER TABLE
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-50"
            rows="6"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-slate-300 transition-colors font-semibold">
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
            <p class="text-green-700 font-medium">✓ Table altered successfully!</p>
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
                  class="text-xs px-3 py-1 bg-violet-100 text-violet-700 rounded hover:bg-violet-200">
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
export class SqlAlterTableLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`ALTER TABLE Customers
ADD Email VARCHAR(255);`);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Add Column',
      description: 'Add email column to Customers',
      query: `ALTER TABLE Customers
ADD Email VARCHAR(255);`
    },
    {
      title: 'Add Multiple Columns',
      description: 'Add phone and address columns',
      query: `ALTER TABLE Customers
ADD Phone VARCHAR(20),
ADD Address VARCHAR(255);`
    },
    {
      title: 'Drop Column',
      description: 'Remove a column from table',
      query: `ALTER TABLE Customers
DROP COLUMN Email;`
    },
    {
      title: 'Rename Column',
      description: 'Rename an existing column',
      query: `ALTER TABLE Customers
RENAME COLUMN ContactName TO FullName;`
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
    this.sqlQuery.set(`ALTER TABLE Customers
ADD Email VARCHAR(255);`);
    this.error.set('');
    this.showSuccess.set(false);
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.error.set('');
    this.showSuccess.set(false);
  }
}
