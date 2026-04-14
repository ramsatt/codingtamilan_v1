
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-index-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-index" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-sky-500 pl-4">SQL INDEX</h3>
        <p class="article-body">
          An <span class="font-mono font-bold text-sky-600">INDEX</span> is used to speed up searches/queries. Users cannot see indexes, they are just used to speed up searches.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">INDEX Syntax</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Create Index:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">CREATE INDEX</span> index_name</div>
              <div><span class="text-pink-400">ON</span> table_name (column1, column2);</div>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Drop Index:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">DROP INDEX</span> index_name;</div>
            </div>
          </div>
        </div>
        <div class="mt-4 p-4 bg-sky-50 border border-sky-200 rounded-lg">
          <p class="text-sky-700 font-medium">⚡ Performance Tips:</p>
          <ul class="text-sky-600 text-sm mt-2 space-y-1">
            <li>• Indexes speed up SELECT queries</li>
            <li>• Indexes slow down INSERT/UPDATE/DELETE</li>
            <li>• Only create indexes on frequently searched columns</li>
          </ul>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try INDEX
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
            rows="5"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-slate-300 transition-colors font-semibold">
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
            <p class="text-green-700 font-medium">✓ Index created successfully!</p>
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
                  class="text-xs px-3 py-1 bg-sky-100 text-sky-700 rounded hover:bg-sky-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-sky-50 border border-sky-200">
        <h4 class="text-xl font-bold text-sky-800 mb-3">Index Types</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-white p-3 rounded">
            <h5 class="font-semibold text-slate-800 mb-1">Regular Index</h5>
            <p class="text-sm text-slate-600">Allows duplicate values</p>
          </div>
          <div class="bg-white p-3 rounded">
            <h5 class="font-semibold text-slate-800 mb-1">Unique Index</h5>
            <p class="text-sm text-slate-600">No duplicate values allowed</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SqlIndexLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE INDEX idx_customer_name
ON Customers (CustomerName);`);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Single Column Index',
      description: 'Create index on customer name',
      query: `CREATE INDEX idx_customer_name
ON Customers (CustomerName);`
    },
    {
      title: 'Composite Index',
      description: 'Index on multiple columns',
      query: `CREATE INDEX idx_customer_location
ON Customers (City, Country);`
    },
    {
      title: 'Unique Index',
      description: 'Ensure unique values',
      query: `CREATE UNIQUE INDEX idx_email
ON Users (Email);`
    },
    {
      title: 'Drop Index',
      description: 'Remove an index',
      query: `DROP INDEX idx_customer_name;`
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
    this.sqlQuery.set(`CREATE INDEX idx_customer_name
ON Customers (CustomerName);`);
    this.error.set('');
    this.showSuccess.set(false);
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.error.set('');
    this.showSuccess.set(false);
  }
}
