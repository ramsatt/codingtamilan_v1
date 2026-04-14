
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-order-by-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-order-by" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-teal-500 pl-4">SQL ORDER BY Keyword</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-teal-600">ORDER BY</span> keyword is used to sort the result-set in ascending or descending order.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">ORDER BY Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> column1, column2, ...</div>
          <div><span class="text-pink-400">FROM</span> table_name</div>
          <div><span class="text-pink-400">ORDER BY</span> column1, column2, ... <span class="text-blue-300">ASC|DESC</span>;</div>
        </div>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-teal-50 rounded border border-teal-200">
            <code class="font-mono font-bold text-teal-600">ASC</code>
            <p class="text-sm text-slate-600 mt-1">Ascending order (default)</p>
          </div>
          <div class="p-3 bg-teal-50 rounded border border-teal-200">
            <code class="font-mono font-bold text-teal-600">DESC</code>
            <p class="text-sm text-slate-600 mt-1">Descending order</p>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try ORDER BY
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
            rows="5"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-slate-300 transition-colors font-semibold">
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
              <h5 class="font-bold text-slate-700">Sorted Results</h5>
              <span class="text-sm text-slate-500">{{ results().length }} row(s)</span>
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
        <h4 class="text-xl font-bold text-slate-800 mb-4">Example ORDER BY Queries</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200">
                  Try this
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-teal-50 border border-teal-200">
        <h4 class="text-xl font-bold text-teal-800 mb-4">💡 Key Points</h4>
        <ul class="space-y-2 text-teal-700">
          <li class="flex items-start gap-2">
            <span class="text-teal-600 font-bold">→</span>
            <span>ORDER BY sorts records in ascending order by default</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-teal-600 font-bold">→</span>
            <span>Use DESC keyword to sort in descending order</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-teal-600 font-bold">→</span>
            <span>You can sort by multiple columns</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-teal-600 font-bold">→</span>
            <span>Each column can have its own ASC or DESC specification</span>
          </li>
        </ul>
      </div>
    </section>
  `
})
export class SqlOrderByLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT * FROM Customers
ORDER BY Country;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Sort by Country (Ascending)',
      description: 'Sort customers by country in alphabetical order',
      query: `SELECT * FROM Customers
ORDER BY Country;`
    },
    {
      title: 'Sort by Country (Descending)',
      description: 'Sort customers by country in reverse alphabetical order',
      query: `SELECT * FROM Customers
ORDER BY Country DESC;`
    },
    {
      title: 'Sort by Multiple Columns',
      description: 'Sort by Country, then by CustomerName',
      query: `SELECT * FROM Customers
ORDER BY Country, CustomerName;`
    },
    {
      title: 'Sort with Mixed Order',
      description: 'Sort by Country ascending, CustomerName descending',
      query: `SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;`
    },
    {
      title: 'Sort Products by Price',
      description: 'Show products from most to least expensive',
      query: `SELECT ProductName, Price FROM Products
ORDER BY Price DESC;`
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
    this.sqlQuery.set(`SELECT * FROM Customers
ORDER BY Country;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
