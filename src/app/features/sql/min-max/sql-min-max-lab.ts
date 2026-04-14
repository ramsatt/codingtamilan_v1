
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-min-max-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-min-max" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-fuchsia-500 pl-4">SQL MIN() and MAX() Functions</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-fuchsia-600">MIN()</span> function returns the smallest value. 
          The <span class="font-mono font-bold text-fuchsia-600">MAX()</span> function returns the largest value.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">MIN() and MAX() Syntax</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">MIN() Syntax:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">SELECT MIN</span>(column_name)</div>
              <div><span class="text-pink-400">FROM</span> table_name;</div>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">MAX() Syntax:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">SELECT MAX</span>(column_name)</div>
              <div><span class="text-pink-400">FROM</span> table_name;</div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try MIN() and MAX()
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-slate-50"
            rows="4"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:bg-slate-300 transition-colors font-semibold">
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
                    <tr>
                      @for (col of columns(); track col) {
                        <td class="border-b border-slate-100 p-3 text-2xl font-bold text-fuchsia-600">{{ row[col] }}</td>
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
                  class="text-xs px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded hover:bg-fuchsia-200">
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
export class SqlMinMaxLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal('SELECT MIN(Price) AS LowestPrice, MAX(Price) AS HighestPrice FROM Products;');
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Min and Max Price',
      description: 'Find lowest and highest product prices',
      query: 'SELECT MIN(Price) AS LowestPrice, MAX(Price) AS HighestPrice FROM Products;'
    },
    {
      title: 'Minimum Price',
      description: 'Find the cheapest product price',
      query: 'SELECT MIN(Price) AS MinPrice FROM Products;'
    },
    {
      title: 'Maximum Price',
      description: 'Find the most expensive product price',
      query: 'SELECT MAX(Price) AS MaxPrice FROM Products;'
    },
    {
      title: 'Product with Min Price',
      description: 'Find the product with minimum price',
      query: 'SELECT ProductName, Price FROM Products WHERE Price = (SELECT MIN(Price) FROM Products);'
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
    this.sqlQuery.set('SELECT MIN(Price) AS LowestPrice, MAX(Price) AS HighestPrice FROM Products;');
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
