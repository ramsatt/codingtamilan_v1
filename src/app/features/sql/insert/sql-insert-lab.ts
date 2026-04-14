
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-insert-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-insert" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-green-500 pl-4">SQL INSERT INTO Statement</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-green-600">INSERT INTO</span> statement is used to insert new records in a table.
        </p>
      </div>

      <!-- Syntax -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-purple-100 text-purple-700 rounded text-xs">Syntax</span> INSERT INTO Syntax
        </h4>
        
        <div class="space-y-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">1. Specify both column names and values:</p>
            <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
              <div><span class="text-pink-400">INSERT INTO</span> table_name (column1, column2, column3, ...)</div>
              <div><span class="text-pink-400">VALUES</span> (value1, value2, value3, ...);</div>
            </div>
          </div>
          
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">2. If adding values for all columns, you can omit column names:</p>
            <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
              <div><span class="text-pink-400">INSERT INTO</span> table_name</div>
              <div><span class="text-pink-400">VALUES</span> (value1, value2, value3, ...);</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive SQL Editor -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try INSERT Statement
        </h4>
        
        <div class="space-y-4">
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase mb-2 block">SQL Query</label>
            <textarea 
              [(ngModel)]="sqlQuery" 
              class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
              rows="6"
              placeholder="Enter INSERT statement..."></textarea>
          </div>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-semibold">
              ▶ Execute INSERT
            </button>
            <button 
              (click)="viewTable()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              👁 View Customers
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
              <h5 class="font-bold text-slate-700">Current Customers Table</h5>
              <span class="text-sm text-slate-500">{{ results().length }} row(s)</span>
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
            <p class="text-green-700 font-medium">✓ Record inserted successfully! Click "View Customers" to see the updated table.</p>
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
        <h4 class="text-xl font-bold text-slate-800 mb-4">Example INSERT Statements</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                  Try this
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <!-- Important Notes -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-blue-50 border border-blue-200">
        <h4 class="text-xl font-bold text-blue-800 mb-4">💡 Important Notes</h4>
        <ul class="space-y-2 text-blue-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Make sure the order of the values is in the same order as the columns in the table</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Text values must be enclosed in single quotes</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Numeric values should not be enclosed in quotes</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>If a column allows NULL values, you can insert a record without specifying a value for that column</span>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: ``
})
export class SqlInsertLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`INSERT INTO Customers (CustomerID, CustomerName, ContactName, Country)
VALUES (6, 'Cardinal', 'Tom B. Erichsen', 'Norway');`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Insert with All Columns',
      description: 'Insert a new customer with all column values specified',
      query: `INSERT INTO Customers (CustomerID, CustomerName, ContactName, Country)
VALUES (6, 'Cardinal', 'Tom B. Erichsen', 'Norway');`
    },
    {
      title: 'Insert Multiple Rows',
      description: 'Insert multiple customers in one statement',
      query: `INSERT INTO Customers (CustomerID, CustomerName, ContactName, Country)
VALUES 
  (7, 'Greens Food', 'David Green', 'UK'),
  (8, 'Tasty Treats', 'Helen Bennett', 'UK');`
    },
    {
      title: 'Insert Specific Columns',
      description: 'Insert only CustomerName and Country',
      query: `INSERT INTO Customers (CustomerID, CustomerName, Country)
VALUES (9, 'Ocean Paradise', 'Australia');`
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
      this.error.set('');
      this.showSuccess.set(true);
      this.results.set([]);
      this.columns.set([]);
    } catch (e: any) {
      this.error.set(e.message);
      this.results.set([]);
      this.columns.set([]);
      this.showSuccess.set(false);
    }
  }

  viewTable() {
    try {
      const result = this.sqlService.execute('SELECT * FROM Customers;');
      this.results.set(result.rows);
      this.columns.set(result.columns);
      this.error.set('');
      this.showSuccess.set(false);
    } catch (e: any) {
      this.error.set(e.message);
      this.results.set([]);
      this.columns.set([]);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`INSERT INTO Customers (CustomerID, CustomerName, ContactName, Country)
VALUES (6, 'Cardinal', 'Tom B. Erichsen', 'Norway');`);
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
