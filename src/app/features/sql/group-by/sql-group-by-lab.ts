
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-group-by-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-group-by" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-4">SQL GROUP BY Statement</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-indigo-600">GROUP BY</span> statement groups rows that have the same values into summary rows.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">GROUP BY Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> column_name(s)</div>
          <div><span class="text-pink-400">FROM</span> table_name</div>
          <div><span class="text-pink-400">WHERE</span> condition</div>
          <div><span class="text-pink-400">GROUP BY</span> column_name(s)</div>
          <div><span class="text-pink-400">ORDER BY</span> column_name(s);</div>
        </div>
        <p class="text-slate-600 mt-4">
          GROUP BY is often used with aggregate functions (COUNT(), MAX(), MIN(), SUM(), AVG()) to group the result-set by one or more columns.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try GROUP BY
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            rows="6"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-colors font-semibold">
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
              <h5 class="font-bold text-slate-700">Grouped Results</h5>
              <span class="text-sm text-slate-500">{{ results().length }} group(s)</span>
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
        <h4 class="text-xl font-bold text-slate-800 mb-4">Example GROUP BY Queries</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
                  Try this
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-indigo-50 border border-indigo-200">
        <h4 class="text-xl font-bold text-indigo-800 mb-4">Common Aggregate Functions</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-white rounded border border-indigo-200">
            <code class="font-mono font-bold text-indigo-600">COUNT()</code>
            <p class="text-sm text-slate-600 mt-1">Counts the number of rows</p>
          </div>
          <div class="p-3 bg-white rounded border border-indigo-200">
            <code class="font-mono font-bold text-indigo-600">SUM()</code>
            <p class="text-sm text-slate-600 mt-1">Calculates the sum</p>
          </div>
          <div class="p-3 bg-white rounded border border-indigo-200">
            <code class="font-mono font-bold text-indigo-600">AVG()</code>
            <p class="text-sm text-slate-600 mt-1">Calculates the average</p>
          </div>
          <div class="p-3 bg-white rounded border border-indigo-200">
            <code class="font-mono font-bold text-indigo-600">MAX()</code>
            <p class="text-sm text-slate-600 mt-1">Finds the maximum value</p>
          </div>
          <div class="p-3 bg-white rounded border border-indigo-200">
            <code class="font-mono font-bold text-indigo-600">MIN()</code>
            <p class="text-sm text-slate-600 mt-1">Finds the minimum value</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SqlGroupByLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT Country, COUNT(CustomerID) AS CustomerCount
FROM Customers
GROUP BY Country
ORDER BY CustomerCount DESC;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Count Customers by Country',
      description: 'Group customers by country and count them',
      query: `SELECT Country, COUNT(CustomerID) AS CustomerCount
FROM Customers
GROUP BY Country
ORDER BY CustomerCount DESC;`
    },
    {
      title: 'Count Orders by Customer',
      description: 'Find how many orders each customer has placed',
      query: `SELECT CustomerID, COUNT(OrderID) AS OrderCount
FROM Orders
GROUP BY CustomerID
ORDER BY OrderCount DESC;`
    },
    {
      title: 'Sum Quantities by Order',
      description: 'Calculate total quantity for each order',
      query: `SELECT OrderID, SUM(Quantity) AS TotalQuantity
FROM OrderDetails
GROUP BY OrderID;`
    },
    {
      title: 'Average Price by Category',
      description: 'Find average product price per category',
      query: `SELECT CategoryID, AVG(Price) AS AvgPrice
FROM Products
GROUP BY CategoryID;`
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
    this.sqlQuery.set(`SELECT Country, COUNT(CustomerID) AS CustomerCount
FROM Customers
GROUP BY Country
ORDER BY CustomerCount DESC;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
