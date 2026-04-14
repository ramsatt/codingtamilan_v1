
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-comments-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-comments" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-slate-500 pl-4">SQL Comments</h3>
        <p class="article-body">
          Comments are used to explain sections of SQL statements or to prevent execution of SQL statements.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Comment Types</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Single Line (--)</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-green-400">-- This is a comment</span></div>
              <div><span class="text-pink-400">SELECT</span> * <span class="text-pink-400">FROM</span> Customers;</div>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Multi-line (/* */)</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-green-400">/* This is a</span></div>
              <div><span class="text-green-400">multi-line comment */</span></div>
              <div><span class="text-pink-400">SELECT</span> * <span class="text-pink-400">FROM</span> Products;</div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try Comments
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-300 transition-colors font-semibold">
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
                  class="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200">
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
export class SqlCommentsLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`-- Select all customers
SELECT * FROM Customers;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Single Line Comment',
      description: 'Comment before query',
      query: `-- Select all customers
SELECT * FROM Customers;`
    },
    {
      title: 'Inline Comment',
      description: 'Comment at end of line',
      query: `SELECT CustomerName, City -- Get name and city
FROM Customers;`
    },
    {
      title: 'Multi-line Comment',
      description: 'Comment spanning multiple lines',
      query: `/* This query retrieves
   all product information
   from the Products table */
SELECT * FROM Products;`
    },
    {
      title: 'Comment Out Code',
      description: 'Temporarily disable part of query',
      query: `SELECT CustomerName, City
FROM Customers
-- WHERE Country='Germany'
LIMIT 5;`
    },
    {
      title: 'Documentation',
      description: 'Document complex query',
      query: `/* 
 * Query: Top 5 Customers by Order Count
 * Author: SQL Team
 * Date: 2024
 */
SELECT c.CustomerName, COUNT(o.OrderID) AS Orders
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerName
ORDER BY Orders DESC
LIMIT 5;`
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
    this.sqlQuery.set(`-- Select all customers
SELECT * FROM Customers;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
