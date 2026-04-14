
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-where-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-where" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">SQL WHERE Clause</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-blue-600">WHERE</span> clause is used to filter records based on specified conditions.
        </p>
      </div>

      <!-- Syntax -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-purple-100 text-purple-700 rounded text-xs">Syntax</span> WHERE Syntax
        </h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> column1, column2, ...</div>
          <div><span class="text-pink-400">FROM</span> table_name</div>
          <div><span class="text-pink-400">WHERE</span> <span class="text-blue-300">condition</span>;</div>
        </div>
        <p class="text-slate-600 mt-4">
          The WHERE clause is not only used in SELECT statements, it is also used in UPDATE, DELETE, etc.!
        </p>
      </div>

      <!-- Operators -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Operators in WHERE Clause</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">=</code>
            <p class="text-sm text-slate-600 mt-1">Equal</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">></code>
            <p class="text-sm text-slate-600 mt-1">Greater than</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600"><</code>
            <p class="text-sm text-slate-600 mt-1">Less than</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">>=</code>
            <p class="text-sm text-slate-600 mt-1">Greater than or equal</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600"><=</code>
            <p class="text-sm text-slate-600 mt-1">Less than or equal</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600"><></code>
            <p class="text-sm text-slate-600 mt-1">Not equal</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">BETWEEN</code>
            <p class="text-sm text-slate-600 mt-1">Between a range</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">LIKE</code>
            <p class="text-sm text-slate-600 mt-1">Search for a pattern</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">IN</code>
            <p class="text-sm text-slate-600 mt-1">Multiple possible values</p>
          </div>
        </div>
      </div>

      <!-- Interactive SQL Editor -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try WHERE Clause
        </h4>
        
        <div class="space-y-4">
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase mb-2 block">SQL Query</label>
            <textarea 
              [(ngModel)]="sqlQuery" 
              class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              rows="6"
              placeholder="Enter SQL query..."></textarea>
          </div>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-semibold">
              ▶ Execute SQL
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
              <h5 class="font-bold text-slate-700">Query Results</h5>
              <span class="text-sm text-slate-500">{{ results().length }} row(s) returned</span>
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

        @if (showSuccess()) {
          <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-green-700 font-medium">✓ Query executed successfully!</p>
          </div>
        }

        @if (error()) {
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 font-mono text-sm">{{ error() }}</p>
          </div>
        }
      </div>

      <!-- Example Queries -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Example Queries</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                  Try this
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <!-- Text Values Note -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-yellow-50 border border-yellow-200">
        <h4 class="text-xl font-bold text-yellow-800 mb-2">💡 Important Note</h4>
        <p class="text-yellow-700">
          SQL requires <strong>single quotes</strong> around text values. Most database systems will also allow double quotes.
          However, numeric fields should not be enclosed in quotes.
        </p>
      </div>
    </section>
  `,
  styles: ``
})
export class SqlWhereLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal("SELECT * FROM Customers WHERE Country='Mexico';");
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Filter by Country',
      description: 'Select customers from Mexico',
      query: "SELECT * FROM Customers WHERE Country='Mexico';"
    },
    {
      title: 'Filter by ID',
      description: 'Select customer with ID = 1',
      query: 'SELECT * FROM Customers WHERE CustomerID=1;'
    },
    {
      title: 'Filter Products by Price',
      description: 'Select products with price greater than 20',
      query: 'SELECT * FROM Products WHERE Price > 20;'
    },
    {
      title: 'Filter by City',
      description: 'Select customers from London',
      query: "SELECT CustomerName, City FROM Customers WHERE City='London';"
    },
    {
      title: 'Not Equal Operator',
      description: 'Select customers NOT from Germany',
      query: "SELECT * FROM Customers WHERE Country<>'Germany';"
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
      this.showSuccess.set(result.rows.length === 0);
    } catch (e: any) {
      this.error.set(e.message);
      this.results.set([]);
      this.columns.set([]);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set("SELECT * FROM Customers WHERE Country='Mexico';");
    this.results.set([]);
    this.columns.set([]);
    this.error.set('');
    this.showSuccess.set(false);
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.columns.set([]);
    this.error.set('');
    this.showSuccess.set(false);
  }
}
