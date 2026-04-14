
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-union-all-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-union-all" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-violet-500 pl-4">SQL UNION ALL</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-violet-600">UNION ALL</span> operator combines the result-set of two or more SELECT statements (allows duplicate values).
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">UNION vs UNION ALL</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-purple-50 rounded border border-purple-200">
            <h5 class="font-bold text-purple-700 mb-2">UNION</h5>
            <p class="text-sm text-slate-600 mb-2">Removes duplicate rows</p>
            <div class="bg-slate-900 text-slate-100 p-2 rounded font-mono text-xs">
              <div><span class="text-pink-400">SELECT</span> City <span class="text-pink-400">FROM</span> Customers</div>
              <div><span class="text-purple-400">UNION</span></div>
              <div><span class="text-pink-400">SELECT</span> City <span class="text-pink-400">FROM</span> Suppliers;</div>
            </div>
          </div>
          <div class="p-4 bg-violet-50 rounded border border-violet-200">
            <h5 class="font-bold text-violet-700 mb-2">UNION ALL</h5>
            <p class="text-sm text-slate-600 mb-2">Keeps all rows (including duplicates)</p>
            <div class="bg-slate-900 text-slate-100 p-2 rounded font-mono text-xs">
              <div><span class="text-pink-400">SELECT</span> City <span class="text-pink-400">FROM</span> Customers</div>
              <div><span class="text-violet-400">UNION ALL</span></div>
              <div><span class="text-pink-400">SELECT</span> City <span class="text-pink-400">FROM</span> Suppliers;</div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try UNION ALL
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-50"
            rows="6"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-slate-300 transition-colors font-semibold">
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
            <h5 class="font-bold text-slate-700 mb-3">Combined Results ({{ results().length }} rows)</h5>
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
                  class="text-xs px-3 py-1 bg-violet-100 text-violet-700 rounded hover:bg-violet-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-violet-50 border border-violet-200">
        <h4 class="text-xl font-bold text-violet-800 mb-3">Performance Note</h4>
        <p class="text-violet-700 text-sm">
          UNION ALL is faster than UNION because it doesn't need to remove duplicates. Use UNION ALL when you know there are no duplicates or when duplicates are acceptable.
        </p>
      </div>
    </section>
  `
})
export class SqlUnionAllLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers
ORDER BY City;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'All Cities (with duplicates)',
      description: 'Get all cities from both tables',
      query: `SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers
ORDER BY City;`
    },
    {
      title: 'Compare UNION vs UNION ALL',
      description: 'See the difference in row count',
      query: `SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers;`
    },
    {
      title: 'Multiple Columns',
      description: 'Combine with multiple columns',
      query: `SELECT City, Country FROM Customers
UNION ALL
SELECT City, Country FROM Suppliers;`
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
    this.sqlQuery.set(`SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers
ORDER BY City;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
