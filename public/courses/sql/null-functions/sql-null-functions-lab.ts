
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-null-functions-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-null-functions" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-4">SQL NULL Functions</h3>
        <p class="article-body">
          SQL provides functions to handle NULL values: <span class="font-mono font-bold text-indigo-600">IFNULL()</span>, <span class="font-mono font-bold text-indigo-600">COALESCE()</span>, and <span class="font-mono font-bold text-indigo-600">NULLIF()</span>.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">NULL Functions</h4>
        <div class="grid grid-cols-1 gap-4">
          <div class="p-4 bg-indigo-50 rounded border border-indigo-200">
            <h5 class="font-semibold text-indigo-800 mb-2">IFNULL(expression, alt_value)</h5>
            <p class="text-sm text-slate-600 mb-2">Returns alt_value if expression is NULL</p>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              SELECT IFNULL(NULL, 'Default') AS Result;
            </code>
          </div>
          <div class="p-4 bg-indigo-50 rounded border border-indigo-200">
            <h5 class="font-semibold text-indigo-800 mb-2">COALESCE(val1, val2, ...)</h5>
            <p class="text-sm text-slate-600 mb-2">Returns first non-NULL value</p>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              SELECT COALESCE(NULL, NULL, 'First', 'Second');
            </code>
          </div>
          <div class="p-4 bg-indigo-50 rounded border border-indigo-200">
            <h5 class="font-semibold text-indigo-800 mb-2">NULLIF(expr1, expr2)</h5>
            <p class="text-sm text-slate-600 mb-2">Returns NULL if expr1 = expr2</p>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              SELECT NULLIF(10, 10) AS Result;
            </code>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try NULL Functions
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            rows="5"></textarea>
          
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
            <h5 class="font-bold text-slate-700 mb-3">Results</h5>
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
export class SqlNullFunctionsLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal("SELECT IFNULL(NULL, 'Default Value') AS Result;");
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'IFNULL Example',
      description: 'Replace NULL with default value',
      query: "SELECT IFNULL(NULL, 'Default Value') AS Result;"
    },
    {
      title: 'COALESCE Example',
      description: 'Get first non-NULL value',
      query: "SELECT COALESCE(NULL, NULL, 'First Non-NULL', 'Second') AS Result;"
    },
    {
      title: 'NULLIF Example',
      description: 'Return NULL if values are equal',
      query: "SELECT NULLIF(10, 10) AS SameValues, NULLIF(10, 20) AS DifferentValues;"
    },
    {
      title: 'Practical Use',
      description: 'Handle NULL in product prices',
      query: `SELECT ProductName, 
    IFNULL(Price, 0) AS Price
FROM Products;`
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
    this.sqlQuery.set("SELECT IFNULL(NULL, 'Default Value') AS Result;");
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
