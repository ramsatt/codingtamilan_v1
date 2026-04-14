
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-exists-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-exists" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-teal-500 pl-4">SQL EXISTS Operator</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-teal-600">EXISTS</span> operator is used to test for the existence of any record in a subquery. Returns TRUE if the subquery returns one or more records.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">EXISTS Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> column_name(s)</div>
          <div><span class="text-pink-400">FROM</span> table_name</div>
          <div><span class="text-pink-400">WHERE EXISTS</span></div>
          <div class="ml-4">(<span class="text-pink-400">SELECT</span> column_name <span class="text-pink-400">FROM</span> table_name <span class="text-pink-400">WHERE</span> condition);</div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try EXISTS
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-slate-300 transition-colors font-semibold">
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
            <h5 class="font-bold text-slate-700 mb-3">Results ({{ results().length }} rows)</h5>
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
                  class="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-teal-50 border border-teal-200">
        <h4 class="text-xl font-bold text-teal-800 mb-3">EXISTS vs IN</h4>
        <p class="text-teal-700 text-sm">
          EXISTS is generally faster for large datasets because it stops searching once it finds the first match. 
          IN retrieves all matching values before comparison.
        </p>
      </div>
    </section>
  `
})
export class SqlExistsLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT CustomerName
FROM Customers
WHERE EXISTS (
    SELECT 1 FROM Orders
    WHERE Orders.CustomerID = Customers.CustomerID
);`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Customers with Orders',
      description: 'Find customers who have placed orders',
      query: `SELECT CustomerName
FROM Customers
WHERE EXISTS (
    SELECT 1 FROM Orders
    WHERE Orders.CustomerID = Customers.CustomerID
);`
    },
    {
      title: 'NOT EXISTS',
      description: 'Find customers without orders',
      query: `SELECT CustomerName
FROM Customers
WHERE NOT EXISTS (
    SELECT 1 FROM Orders
    WHERE Orders.CustomerID = Customers.CustomerID
);`
    },
    {
      title: 'EXISTS with Condition',
      description: 'Customers with large orders',
      query: `SELECT CustomerName
FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o
    WHERE o.CustomerID = c.CustomerID
    AND o.OrderID > 10250
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
    this.sqlQuery.set(`SELECT CustomerName
FROM Customers
WHERE EXISTS (
    SELECT 1 FROM Orders
    WHERE Orders.CustomerID = Customers.CustomerID
);`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
