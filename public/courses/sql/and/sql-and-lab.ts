
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-and-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-and" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-4">SQL AND Operator</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-emerald-600">AND</span> operator is used to filter records based on more than one condition.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">AND Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> column1, column2, ...</div>
          <div><span class="text-pink-400">FROM</span> table_name</div>
          <div><span class="text-pink-400">WHERE</span> condition1 <span class="text-emerald-400">AND</span> condition2 <span class="text-emerald-400">AND</span> condition3 ...;</div>
        </div>
        <p class="text-slate-600 mt-4">
          The AND operator displays a record if <strong>all</strong> the conditions separated by AND are TRUE.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Truth Table</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border border-slate-200 rounded-lg">
            <thead class="bg-emerald-100">
              <tr>
                <th class="border border-slate-200 p-3">Condition 1</th>
                <th class="border border-slate-200 p-3">Condition 2</th>
                <th class="border border-slate-200 p-3">Result</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr>
                <td class="border border-slate-200 p-3 text-center">TRUE</td>
                <td class="border border-slate-200 p-3 text-center">TRUE</td>
                <td class="border border-slate-200 p-3 text-center font-bold text-green-600">TRUE</td>
              </tr>
              <tr>
                <td class="border border-slate-200 p-3 text-center">TRUE</td>
                <td class="border border-slate-200 p-3 text-center">FALSE</td>
                <td class="border border-slate-200 p-3 text-center font-bold text-red-600">FALSE</td>
              </tr>
              <tr>
                <td class="border border-slate-200 p-3 text-center">FALSE</td>
                <td class="border border-slate-200 p-3 text-center">TRUE</td>
                <td class="border border-slate-200 p-3 text-center font-bold text-red-600">FALSE</td>
              </tr>
              <tr>
                <td class="border border-slate-200 p-3 text-center">FALSE</td>
                <td class="border border-slate-200 p-3 text-center">FALSE</td>
                <td class="border border-slate-200 p-3 text-center font-bold text-red-600">FALSE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try AND Operator
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            rows="5"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 transition-colors font-semibold">
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
              <h5 class="font-bold text-slate-700">Filtered Results</h5>
              <span class="text-sm text-slate-500">{{ results().length }} row(s) match all conditions</span>
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
                  class="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">
                  Try this
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
export class SqlAndLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT * FROM Customers
WHERE Country='Germany' AND City='Berlin';`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Filter by Country AND City',
      description: 'Find customers from Germany in Berlin',
      query: `SELECT * FROM Customers
WHERE Country='Germany' AND City='Berlin';`
    },
    {
      title: 'Multiple AND Conditions',
      description: 'Filter with three conditions',
      query: `SELECT * FROM Customers
WHERE Country='Mexico' AND City='México D.F.' AND CustomerID > 2;`
    },
    {
      title: 'Filter Products by Price Range',
      description: 'Find products between two prices',
      query: `SELECT * FROM Products
WHERE Price > 10 AND Price < 20;`
    },
    {
      title: 'Complex Filtering',
      description: 'Combine multiple criteria',
      query: `SELECT CustomerName, Country, City FROM Customers
WHERE Country='UK' AND City='London';`
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
WHERE Country='Germany' AND City='Berlin';`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
