
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-null-values-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-null-values" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-gray-500 pl-4">SQL NULL Values</h3>
        <p class="article-body">
          A field with a <span class="font-mono font-bold text-gray-600">NULL</span> value is a field with no value. It is different from zero or a field that contains spaces.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Testing for NULL</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">IS NULL:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">SELECT</span> column_names</div>
              <div><span class="text-pink-400">FROM</span> table_name</div>
              <div><span class="text-pink-400">WHERE</span> column_name <span class="text-gray-400">IS NULL</span>;</div>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">IS NOT NULL:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">SELECT</span> column_names</div>
              <div><span class="text-pink-400">FROM</span> table_name</div>
              <div><span class="text-pink-400">WHERE</span> column_name <span class="text-gray-400">IS NOT NULL</span>;</div>
            </div>
          </div>
        </div>
        <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-yellow-700 font-medium">⚠️ Important:</p>
          <p class="text-yellow-600 text-sm">You cannot use comparison operators (=, <, >) with NULL. Always use IS NULL or IS NOT NULL.</p>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try NULL Operations
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-slate-50"
            rows="5"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-slate-300 transition-colors font-semibold">
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
                  class="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-gray-50 border border-gray-200">
        <h4 class="text-xl font-bold text-gray-800 mb-4">NULL Functions</h4>
        <div class="space-y-2 text-gray-700">
          <p><code class="font-mono bg-white px-2 py-1 rounded">IFNULL(column, value)</code> - Returns value if column is NULL</p>
          <p><code class="font-mono bg-white px-2 py-1 rounded">COALESCE(val1, val2, ...)</code> - Returns first non-NULL value</p>
          <p><code class="font-mono bg-white px-2 py-1 rounded">NULLIF(val1, val2)</code> - Returns NULL if values are equal</p>
        </div>
      </div>
    </section>
  `
})
export class SqlNullValuesLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NULL;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Find NULL Values',
      description: 'Customers with no address',
      query: `SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NULL;`
    },
    {
      title: 'Find NOT NULL Values',
      description: 'Customers with an address',
      query: `SELECT CustomerName, Address
FROM Customers
WHERE Address IS NOT NULL;`
    },
    {
      title: 'IFNULL Function',
      description: 'Replace NULL with default value',
      query: `SELECT CustomerName, IFNULL(Address, 'No Address') AS Address
FROM Customers;`
    },
    {
      title: 'COALESCE Function',
      description: 'Return first non-NULL value',
      query: `SELECT CustomerName, COALESCE(Address, City, 'Unknown') AS Location
FROM Customers;`
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
    this.sqlQuery.set(`SELECT CustomerName, ContactName, Address
FROM Customers
WHERE Address IS NULL;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
