
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-select-distinct-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-select-distinct" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-4">SQL SELECT DISTINCT</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-cyan-600">SELECT DISTINCT</span> statement is used to return only distinct (different) values.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">SELECT DISTINCT Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT DISTINCT</span> column1, column2, ...</div>
          <div><span class="text-pink-400">FROM</span> table_name;</div>
        </div>
        <p class="text-slate-600 mt-4">
          Inside a table, a column often contains many duplicate values. DISTINCT eliminates duplicate values and returns only unique values.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try SELECT DISTINCT
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50"
            rows="4"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-slate-300 transition-colors font-semibold">
              ▶ Execute Query
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
            <div class="flex items-center justify-between mb-3">
              <h5 class="font-bold text-slate-700">Distinct Results</h5>
              <span class="text-sm text-slate-500">{{ results().length }} unique value(s)</span>
            </div>
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
        <h4 class="text-xl font-bold text-slate-800 mb-4">Example Queries</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200">
                  Try this
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-cyan-50 border border-cyan-200">
        <h4 class="text-xl font-bold text-cyan-800 mb-4">💡 Comparison</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded border border-cyan-200">
            <h5 class="font-semibold text-slate-800 mb-2">Without DISTINCT</h5>
            <p class="text-sm text-slate-600">Returns all values including duplicates</p>
          </div>
          <div class="bg-white p-4 rounded border border-cyan-200">
            <h5 class="font-semibold text-slate-800 mb-2">With DISTINCT</h5>
            <p class="text-sm text-slate-600">Returns only unique values</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SqlSelectDistinctLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal('SELECT DISTINCT Country FROM Customers;');
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Distinct Countries',
      description: 'Get list of unique countries from customers',
      query: 'SELECT DISTINCT Country FROM Customers;'
    },
    {
      title: 'Distinct Cities',
      description: 'Get list of unique cities',
      query: 'SELECT DISTINCT City FROM Customers;'
    },
    {
      title: 'Count Distinct Countries',
      description: 'Count how many different countries we have',
      query: 'SELECT COUNT(DISTINCT Country) AS UniqueCountries FROM Customers;'
    },
    {
      title: 'Distinct Categories',
      description: 'Get unique product categories',
      query: 'SELECT DISTINCT CategoryID FROM Products;'
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
    this.sqlQuery.set('SELECT DISTINCT Country FROM Customers;');
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
