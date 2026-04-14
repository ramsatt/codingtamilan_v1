
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-left-join-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-left-join" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">SQL LEFT JOIN</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-blue-600">LEFT JOIN</span> returns all records from the left table, and the matching records from the right table. If no match, NULL values are returned for right table columns.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">LEFT JOIN Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> column_name(s)</div>
          <div><span class="text-pink-400">FROM</span> table1</div>
          <div><span class="text-pink-400">LEFT JOIN</span> table2</div>
          <div><span class="text-pink-400">ON</span> table1.column_name = table2.column_name;</div>
        </div>
      </div>

      <!-- Visual Diagram -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Visual Representation</h4>
        <div class="flex items-center justify-center gap-8 p-8 bg-slate-50 rounded-lg">
          <div class="text-center">
            <div class="w-32 h-32 rounded-full bg-blue-400 flex items-center justify-center">
              <span class="font-bold text-white">ALL LEFT</span>
            </div>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 rounded-full bg-purple-300 flex items-center justify-center -ml-16">
              <span class="font-bold text-white">MATCH</span>
            </div>
          </div>
          <div class="text-center -ml-16">
            <div class="w-32 h-32 rounded-full bg-green-200 opacity-40 flex items-center justify-center">
              <span class="font-bold text-green-800">Right</span>
            </div>
          </div>
        </div>
        <p class="text-center text-sm text-slate-600 mt-4">LEFT JOIN returns ALL from left table + matching from right (blue + purple)</p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try LEFT JOIN
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            rows="6"></textarea>
          
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
                        <td class="border-b border-slate-100 p-3">{{ row[col] || 'NULL' }}</td>
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

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-blue-50 border border-blue-200">
        <h4 class="text-xl font-bold text-blue-800 mb-4">💡 Key Points</h4>
        <ul class="space-y-2 text-blue-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Returns ALL records from the LEFT table</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Returns matching records from the RIGHT table</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Returns NULL for right table columns when no match</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Also called LEFT OUTER JOIN</span>
          </li>
        </ul>
      </div>
    </section>
  `
})
export class SqlLeftJoinLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Customers with Orders',
      description: 'All customers and their orders (if any)',
      query: `SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;`
    },
    {
      title: 'Find Customers Without Orders',
      description: 'Customers who have not placed any orders',
      query: `SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE Orders.OrderID IS NULL;`
    },
    {
      title: 'Count Orders per Customer',
      description: 'Including customers with zero orders',
      query: `SELECT Customers.CustomerName, COUNT(Orders.OrderID) AS OrderCount
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
GROUP BY Customers.CustomerName;`
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
    this.sqlQuery.set(`SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
