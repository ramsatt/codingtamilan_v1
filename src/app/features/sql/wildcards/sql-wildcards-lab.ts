
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-wildcards-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-wildcards" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-pink-500 pl-4">SQL Wildcard Characters</h3>
        <p class="article-body">
          Wildcard characters are used with the LIKE operator to search for patterns in a column.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Wildcard Characters</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-pink-50 rounded border border-pink-200">
            <h5 class="font-bold text-pink-700 mb-2">% (Percent)</h5>
            <p class="text-sm text-slate-600">Represents zero or more characters</p>
            <code class="block mt-2 bg-slate-900 text-slate-100 p-2 rounded text-xs">'a%' finds any values starting with "a"</code>
          </div>
          <div class="p-4 bg-pink-50 rounded border border-pink-200">
            <h5 class="font-bold text-pink-700 mb-2">_ (Underscore)</h5>
            <p class="text-sm text-slate-600">Represents a single character</p>
            <code class="block mt-2 bg-slate-900 text-slate-100 p-2 rounded text-xs">'h_t' finds hot, hat, hit</code>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try Wildcards
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-slate-50"
            rows="4"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-slate-300 transition-colors font-semibold">
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
        <h4 class="text-xl font-bold text-slate-800 mb-4">Common Patterns</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SqlWildcardsLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal("SELECT * FROM Customers WHERE CustomerName LIKE 'a%';");
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Starts With',
      description: 'Names starting with "a"',
      query: "SELECT * FROM Customers WHERE CustomerName LIKE 'a%';"
    },
    {
      title: 'Ends With',
      description: 'Names ending with "a"',
      query: "SELECT * FROM Customers WHERE CustomerName LIKE '%a';"
    },
    {
      title: 'Contains',
      description: 'Names containing "or"',
      query: "SELECT * FROM Customers WHERE CustomerName LIKE '%or%';"
    },
    {
      title: 'Second Character',
      description: 'Second letter is "r"',
      query: "SELECT * FROM Customers WHERE CustomerName LIKE '_r%';"
    },
    {
      title: 'Starts and Ends',
      description: 'Starts with "a" and ends with "o"',
      query: "SELECT * FROM Customers WHERE CustomerName LIKE 'a%o';"
    },
    {
      title: 'Exact Length',
      description: 'Exactly 3 characters',
      query: "SELECT * FROM Customers WHERE City LIKE '___';"
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
    this.sqlQuery.set("SELECT * FROM Customers WHERE CustomerName LIKE 'a%';");
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
