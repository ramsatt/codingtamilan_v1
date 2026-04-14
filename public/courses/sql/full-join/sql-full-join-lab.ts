
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-full-join-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-full-join" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-fuchsia-500 pl-4">SQL FULL OUTER JOIN</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-fuchsia-600">FULL OUTER JOIN</span> returns all records when there is a match in either left or right table. NULL for non-matching records.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">FULL OUTER JOIN Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> column_name(s)</div>
          <div><span class="text-pink-400">FROM</span> table1</div>
          <div><span class="text-fuchsia-400">FULL OUTER JOIN</span> table2</div>
          <div><span class="text-pink-400">ON</span> table1.column_name = table2.column_name;</div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Visual Representation</h4>
        <div class="flex items-center justify-center p-6 bg-slate-50 rounded-lg">
          <svg viewBox="0 0 200 120" class="w-64 h-40">
            <circle cx="60" cy="60" r="45" fill="#e879f9" opacity="0.7" />
            <circle cx="140" cy="60" r="45" fill="#e879f9" opacity="0.7" />
            <text x="60" y="65" text-anchor="middle" class="text-xs font-bold fill-white">Left</text>
            <text x="140" y="65" text-anchor="middle" class="text-xs font-bold fill-white">Right</text>
            <text x="100" y="110" text-anchor="middle" class="text-xs fill-slate-600">ALL Records from BOTH</text>
          </svg>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try FULL OUTER JOIN
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-slate-50"
            rows="6"></textarea>
          
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
                        <td class="border-b border-slate-100 p-3">
                          @if (row[col] === null || row[col] === undefined) {
                            <span class="text-gray-400 italic">NULL</span>
                          } @else {
                            {{ row[col] }}
                          }
                        </td>
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

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-fuchsia-50 border border-fuchsia-200">
        <h4 class="text-xl font-bold text-fuchsia-800 mb-3">Note</h4>
        <p class="text-fuchsia-700 text-sm">
          FULL OUTER JOIN can return a large result set. In SQLite, you can simulate it using UNION of LEFT and RIGHT joins.
        </p>
      </div>
    </section>
  `
})
export class SqlFullJoinLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
FULL OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'All Customers and Orders',
      description: 'Show all customers and all orders',
      query: `SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
FULL OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;`
    },
    {
      title: 'Simulated FULL JOIN (SQLite)',
      description: 'Using UNION to simulate FULL OUTER JOIN',
      query: `SELECT c.CustomerName, o.OrderID
FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
UNION
SELECT c.CustomerName, o.OrderID
FROM Customers c RIGHT JOIN Orders o ON c.CustomerID = o.CustomerID;`
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
FULL OUTER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
