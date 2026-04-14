
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-like-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-like" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-pink-500 pl-4">SQL LIKE Operator</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-pink-600">LIKE</span> operator is used in a WHERE clause to search for a specified pattern in a column.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">LIKE Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm mb-4">
          <div><span class="text-pink-400">SELECT</span> column1, column2, ...</div>
          <div><span class="text-pink-400">FROM</span> table_name</div>
          <div><span class="text-pink-400">WHERE</span> columnN <span class="text-pink-400">LIKE</span> pattern;</div>
        </div>
        
        <h5 class="font-semibold text-slate-800 mb-3">Wildcard Characters:</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-pink-50 rounded border border-pink-200">
            <code class="font-mono font-bold text-pink-600">%</code>
            <p class="text-sm text-slate-600 mt-1">Represents zero or more characters</p>
            <p class="text-xs text-slate-500 mt-1">Example: 'a%' finds any values that start with "a"</p>
          </div>
          <div class="p-3 bg-pink-50 rounded border border-pink-200">
            <code class="font-mono font-bold text-pink-600">_</code>
            <p class="text-sm text-slate-600 mt-1">Represents a single character</p>
            <p class="text-xs text-slate-500 mt-1">Example: 'h_t' finds hot, hat, hit</p>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try LIKE Operator
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50"
            rows="5"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-slate-300 transition-colors font-semibold">
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
            <h5 class="font-bold text-slate-700 mb-3">Pattern Match Results ({{ results().length }} rows)</h5>
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
        <h4 class="text-xl font-bold text-slate-800 mb-4">Common LIKE Patterns</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200">
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
export class SqlLikeLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT * FROM Customers
WHERE CustomerName LIKE 'A%';`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Starts With "A"',
      description: 'Find customers whose name starts with "A"',
      query: `SELECT * FROM Customers
WHERE CustomerName LIKE 'A%';`
    },
    {
      title: 'Ends With "a"',
      description: 'Find customers whose name ends with "a"',
      query: `SELECT * FROM Customers
WHERE CustomerName LIKE '%a';`
    },
    {
      title: 'Contains "or"',
      description: 'Find customers with "or" anywhere in the name',
      query: `SELECT * FROM Customers
WHERE CustomerName LIKE '%or%';`
    },
    {
      title: 'Second Letter is "r"',
      description: 'Find customers where second letter is "r"',
      query: `SELECT * FROM Customers
WHERE CustomerName LIKE '_r%';`
    },
    {
      title: 'Starts with "a" and at least 3 chars',
      description: 'Pattern with multiple underscores',
      query: `SELECT * FROM Customers
WHERE CustomerName LIKE 'a__%';`
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
WHERE CustomerName LIKE 'A%';`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
