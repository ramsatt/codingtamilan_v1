
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-operators-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-operators" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-4">SQL Operators</h3>
        <p class="article-body">
          SQL operators are used to perform operations on data. They are used in WHERE clauses to filter records.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Operator Types</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-cyan-50 rounded border border-cyan-200">
            <h5 class="font-semibold text-cyan-800 mb-2">Arithmetic Operators</h5>
            <div class="text-sm space-y-1">
              <div><code class="bg-white px-2 py-1 rounded">+</code> Addition</div>
              <div><code class="bg-white px-2 py-1 rounded">-</code> Subtraction</div>
              <div><code class="bg-white px-2 py-1 rounded">*</code> Multiplication</div>
              <div><code class="bg-white px-2 py-1 rounded">/</code> Division</div>
              <div><code class="bg-white px-2 py-1 rounded">%</code> Modulo</div>
            </div>
          </div>
          <div class="p-4 bg-cyan-50 rounded border border-cyan-200">
            <h5 class="font-semibold text-cyan-800 mb-2">Comparison Operators</h5>
            <div class="text-sm space-y-1">
              <div><code class="bg-white px-2 py-1 rounded">=</code> Equal</div>
              <div><code class="bg-white px-2 py-1 rounded">!=</code> or <code class="bg-white px-2 py-1 rounded">&lt;&gt;</code> Not equal</div>
              <div><code class="bg-white px-2 py-1 rounded">&gt;</code> Greater than</div>
              <div><code class="bg-white px-2 py-1 rounded">&lt;</code> Less than</div>
              <div><code class="bg-white px-2 py-1 rounded">&gt;=</code> Greater than or equal</div>
              <div><code class="bg-white px-2 py-1 rounded">&lt;=</code> Less than or equal</div>
            </div>
          </div>
          <div class="p-4 bg-cyan-50 rounded border border-cyan-200">
            <h5 class="font-semibold text-cyan-800 mb-2">Logical Operators</h5>
            <div class="text-sm space-y-1">
              <div><code class="bg-white px-2 py-1 rounded">AND</code> All conditions true</div>
              <div><code class="bg-white px-2 py-1 rounded">OR</code> Any condition true</div>
              <div><code class="bg-white px-2 py-1 rounded">NOT</code> Negates condition</div>
            </div>
          </div>
          <div class="p-4 bg-cyan-50 rounded border border-cyan-200">
            <h5 class="font-semibold text-cyan-800 mb-2">Special Operators</h5>
            <div class="text-sm space-y-1">
              <div><code class="bg-white px-2 py-1 rounded">BETWEEN</code> Range check</div>
              <div><code class="bg-white px-2 py-1 rounded">IN</code> List membership</div>
              <div><code class="bg-white px-2 py-1 rounded">LIKE</code> Pattern matching</div>
              <div><code class="bg-white px-2 py-1 rounded">IS NULL</code> NULL check</div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try Operators
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50"
            rows="5"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-slate-300 transition-colors font-semibold">
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
                  class="text-xs px-3 py-1 bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200">
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
export class SqlOperatorsLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal("SELECT 10 + 5 AS Addition, 10 - 5 AS Subtraction, 10 * 5 AS Multiplication;");
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Arithmetic Operators',
      description: 'Basic math operations',
      query: "SELECT 10 + 5 AS Addition, 10 - 5 AS Subtraction, 10 * 5 AS Multiplication, 10 / 5 AS Division;"
    },
    {
      title: 'Comparison Operators',
      description: 'Compare values',
      query: `SELECT * FROM Products
WHERE Price > 20 AND Price < 50;`
    },
    {
      title: 'Logical Operators',
      description: 'Combine conditions',
      query: `SELECT * FROM Customers
WHERE Country = 'Germany' OR Country = 'France';`
    },
    {
      title: 'Combined Operators',
      description: 'Multiple operator types',
      query: `SELECT ProductName, Price, Price * 1.1 AS PriceWithTax
FROM Products
WHERE Price BETWEEN 10 AND 50;`
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
    this.sqlQuery.set("SELECT 10 + 5 AS Addition, 10 - 5 AS Subtraction, 10 * 5 AS Multiplication;");
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
