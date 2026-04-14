
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-case-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-case" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-4">SQL CASE Expression</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-indigo-600">CASE</span> expression goes through conditions and returns a value when the first condition is met (like if-then-else).
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">CASE Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CASE</span></div>
          <div class="ml-4"><span class="text-pink-400">WHEN</span> condition1 <span class="text-pink-400">THEN</span> result1</div>
          <div class="ml-4"><span class="text-pink-400">WHEN</span> condition2 <span class="text-pink-400">THEN</span> result2</div>
          <div class="ml-4"><span class="text-pink-400">WHEN</span> conditionN <span class="text-pink-400">THEN</span> resultN</div>
          <div class="ml-4"><span class="text-pink-400">ELSE</span> result</div>
          <div><span class="text-pink-400">END</span></div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try CASE
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-colors font-semibold">
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
                  class="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
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
export class SqlCaseLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT ProductName, Price,
CASE
    WHEN Price > 30 THEN 'Expensive'
    WHEN Price > 15 THEN 'Moderate'
    ELSE 'Cheap'
END AS PriceCategory
FROM Products;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Price Categories',
      description: 'Categorize products by price',
      query: `SELECT ProductName, Price,
CASE
    WHEN Price > 30 THEN 'Expensive'
    WHEN Price > 15 THEN 'Moderate'
    ELSE 'Cheap'
END AS PriceCategory
FROM Products;`
    },
    {
      title: 'Country Regions',
      description: 'Group countries into regions',
      query: `SELECT CustomerName, Country,
CASE
    WHEN Country IN ('Germany', 'France', 'UK') THEN 'Europe'
    WHEN Country IN ('USA', 'Canada', 'Mexico') THEN 'North America'
    ELSE 'Other'
END AS Region
FROM Customers;`
    },
    {
      title: 'ORDER BY with CASE',
      description: 'Custom sorting logic',
      query: `SELECT CustomerName, Country
FROM Customers
ORDER BY
CASE
    WHEN Country = 'USA' THEN 1
    WHEN Country = 'UK' THEN 2
    ELSE 3
END;`
    },
    {
      title: 'Quantity Status',
      description: 'Label order quantities',
      query: `SELECT OrderID, Quantity,
CASE
    WHEN Quantity > 50 THEN 'Large Order'
    WHEN Quantity > 20 THEN 'Medium Order'
    ELSE 'Small Order'
END AS OrderSize
FROM OrderDetails;`
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
    this.sqlQuery.set(`SELECT ProductName, Price,
CASE
    WHEN Price > 30 THEN 'Expensive'
    WHEN Price > 15 THEN 'Moderate'
    ELSE 'Cheap'
END AS PriceCategory
FROM Products;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
