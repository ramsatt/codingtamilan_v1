
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-dates-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-dates" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">SQL Dates</h3>
        <p class="article-body">
          Working with dates can be complicated. SQL provides various date functions to work with date and time values.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Common Date Functions</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-blue-50 rounded border border-blue-200">
            <code class="font-mono text-sm text-blue-700">CURRENT_DATE</code>
            <p class="text-xs text-slate-600 mt-1">Returns current date</p>
          </div>
          <div class="p-3 bg-blue-50 rounded border border-blue-200">
            <code class="font-mono text-sm text-blue-700">CURRENT_TIME</code>
            <p class="text-xs text-slate-600 mt-1">Returns current time</p>
          </div>
          <div class="p-3 bg-blue-50 rounded border border-blue-200">
            <code class="font-mono text-sm text-blue-700">CURRENT_TIMESTAMP</code>
            <p class="text-xs text-slate-600 mt-1">Returns current date and time</p>
          </div>
          <div class="p-3 bg-blue-50 rounded border border-blue-200">
            <code class="font-mono text-sm text-blue-700">DATE('now')</code>
            <p class="text-xs text-slate-600 mt-1">SQLite current date</p>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try Date Functions
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            rows="5"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 transition-colors font-semibold">
              ▶ Execute
            </button>
            <button 
              (click)="resetQuery()"
              class="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold">
              ↻ Reset
            </button>
          </div>
        </div>

        @if (results().length > 0) {
          <div class="mt-6">
            <h5 class="font-bold text-slate-700 mb-3">Results</h5>
            <div class="overflow-x-auto border border-slate-200 rounded-lg">
              <table class="w-full text-sm">
                <thead class="bg-slate-100">
                  <tr>
                    @for (col of columns(); track col) {
                      <th class="border-b border-slate-200 p-3 text-left font-semibold">{{ col }}</th>
                    }
                  </tr>
                </thead>
                <tbody class="bg-white">
                  @for (row of results(); track $index) {
                    <tr class="hover:bg-slate-50">
                      @for (col of columns(); track col) {
                        <td class="border-b border-slate-100 p-3">{{ row[col] }}</td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
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
                  class="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
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
export class SqlDatesLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal("SELECT DATE('now') AS CurrentDate;");
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Current Date',
      description: 'Get today\'s date',
      query: "SELECT DATE('now') AS CurrentDate;"
    },
    {
      title: 'Current Timestamp',
      description: 'Get current date and time',
      query: "SELECT DATETIME('now') AS CurrentDateTime;"
    },
    {
      title: 'Date Arithmetic',
      description: 'Add days to current date',
      query: "SELECT DATE('now', '+7 days') AS NextWeek;"
    },
    {
      title: 'Filter by Date',
      description: 'Orders from a specific date',
      query: `SELECT * FROM Orders
WHERE OrderDate >= '2024-01-01';`
    },
    {
      title: 'Date Parts',
      description: 'Extract year, month, day',
      query: `SELECT 
    STRFTIME('%Y', 'now') AS Year,
    STRFTIME('%m', 'now') AS Month,
    STRFTIME('%d', 'now') AS Day;`
    }
  ];

  ngOnInit() {
    if (!this.sqlService.initialized()) {
      this.sqlService.initialize();
    }
  }

  executeQuery() {
    try {
      const result = this.sqlService.execute(this.sqlQuery());
      this.results.set(result.rows);
      this.columns.set(result.columns);
      this.error.set('');
    } catch (e: any) {
      this.error.set(e.message);
      this.results.set([]);
      this.columns.set([]);
    }
  }

  resetQuery() {
    this.sqlQuery.set("SELECT DATE('now') AS CurrentDate;");
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
