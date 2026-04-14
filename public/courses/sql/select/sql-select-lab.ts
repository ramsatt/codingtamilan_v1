
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-select-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-select" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">SQL SELECT Statement</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-blue-600">SELECT</span> statement is used to select data from a database. The data returned is stored in a result table, called the result-set.
        </p>
      </div>

      <!-- Syntax -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-purple-100 text-purple-700 rounded text-xs">Syntax</span> SELECT Syntax
        </h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div class="text-pink-400">SELECT</div>
          <div class="ml-4 text-blue-300">column1, column2, ...</div>
          <div class="text-pink-400">FROM</div>
          <div class="ml-4 text-blue-300">table_name;</div>
        </div>
        <p class="text-slate-600 mt-4">
          Here, column1, column2, ... are the field names of the table you want to select data from.
          To select all columns, use <span class="font-mono font-bold">SELECT *</span>
        </p>
      </div>

      <!-- Interactive SQL Editor -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try it Yourself
        </h4>
        
        <!-- SQL Editor -->
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

        <!-- Results Table -->
        @if (results().length > 0) {
          <div class="mt-6">
            <div class="flex items-center justify-between mb-3">
              <h5 class="font-bold text-slate-700">Query Results</h5>
              <span class="text-sm text-slate-500">{{ results().length }} row(s) returned</span>
            </div>
            <div class="overflow-x-auto border border-slate-200 rounded-lg">
              <table class="w-full">
                <thead class="bg-slate-100">
                  <tr>
                    @for (col of columns(); track col) {
                      <th class="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">{{ col }}</th>
                    }
                  </tr>
                </thead>
                <tbody class="bg-white">
                  @for (row of results(); track $index) {
                    <tr class="hover:bg-slate-50">
                      @for (col of columns(); track col) {
                        <td class="border-b border-slate-100 p-3 text-sm text-slate-600">{{ row[col] }}</td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- Success Message (for queries with no results) -->
        @if (showSuccess()) {
          <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-green-700 font-medium">✓ Query executed successfully!</p>
          </div>
        }

        <!-- Error Display -->
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

      <!-- Available Tables -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-blue-50 border border-blue-200">
        <h4 class="text-xl font-bold text-slate-800 mb-4">📊 Available Tables</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-white p-3 rounded border border-blue-200">
            <span class="font-mono font-bold text-blue-600">Customers</span>
            <p class="text-slate-600 text-xs mt-1">Customer information</p>
          </div>
          <div class="bg-white p-3 rounded border border-blue-200">
            <span class="font-mono font-bold text-blue-600">Products</span>
            <p class="text-slate-600 text-xs mt-1">Product catalog</p>
          </div>
          <div class="bg-white p-3 rounded border border-blue-200">
            <span class="font-mono font-bold text-blue-600">Orders</span>
            <p class="text-slate-600 text-xs mt-1">Order records</p>
          </div>
          <div class="bg-white p-3 rounded border border-blue-200">
            <span class="font-mono font-bold text-blue-600">OrderDetails</span>
            <p class="text-slate-600 text-xs mt-1">Order line items</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class SqlSelectLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal('SELECT * FROM Customers;');
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Select All Customers',
      description: 'Retrieve all columns from the Customers table',
      query: 'SELECT * FROM Customers;'
    },
    {
      title: 'Select Specific Columns',
      description: 'Retrieve only CustomerName and Country',
      query: 'SELECT CustomerName, Country FROM Customers;'
    },
    {
      title: 'Select All Products',
      description: 'Retrieve all products from the Products table',
      query: 'SELECT * FROM Products;'
    },
    {
      title: 'Select Product Names and Prices',
      description: 'Retrieve product names with their prices',
      query: 'SELECT ProductName, Price FROM Products;'
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
    this.sqlQuery.set('SELECT * FROM Customers;');
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
