
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-delete-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-delete" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-red-500 pl-4">SQL DELETE Statement</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-red-600">DELETE</span> statement is used to delete existing records in a table.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">DELETE Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">DELETE FROM</span> table_name</div>
          <div><span class="text-pink-400">WHERE</span> condition;</div>
        </div>
        <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 font-semibold">⚠️ DANGER: Be very careful when deleting records!</p>
          <p class="text-red-600 text-sm mt-1">If you omit the WHERE clause, ALL records in the table will be deleted!</p>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try DELETE Statement
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50"
            rows="4"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-300 transition-colors font-semibold">
              ▶ Execute DELETE
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
            <h5 class="font-bold text-slate-700 mb-3">Current Customers ({{ results().length }} rows)</h5>
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
            <p class="text-green-700 font-medium">✓ Record(s) deleted successfully!</p>
          </div>
        }

        @if (error()) {
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 font-mono text-sm">{{ error() }}</p>
          </div>
        }
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Example DELETE Statements</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                  Try this
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-yellow-50 border border-yellow-200">
        <h4 class="text-xl font-bold text-yellow-800 mb-4">Delete All Records</h4>
        <p class="text-yellow-700 mb-2">
          It is possible to delete all rows in a table without deleting the table. This means that the table structure, attributes, and indexes will be intact:
        </p>
        <code class="block bg-slate-900 text-slate-100 p-2 rounded text-sm font-mono">DELETE FROM table_name;</code>
      </div>
    </section>
  `
})
export class SqlDeleteLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal("DELETE FROM Customers WHERE CustomerID=5;");
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Delete Single Record',
      description: 'Delete customer with ID 5',
      query: "DELETE FROM Customers WHERE CustomerID=5;"
    },
    {
      title: 'Delete by Country',
      description: 'Delete all customers from Mexico',
      query: "DELETE FROM Customers WHERE Country='Mexico';"
    },
    {
      title: 'Delete by Name',
      description: 'Delete customer by name',
      query: "DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';"
    }
  ];

  ngOnInit() {
    if (!this.sqlService.initialized()) {
      this.sqlService.initialize();
    }
  }

  executeQuery() {
    try {
      this.sqlService.execute(this.sqlQuery());
      this.error.set('');
      this.showSuccess.set(true);
      this.results.set([]);
    } catch (e: any) {
      this.error.set(e.message);
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
    }
  }

  resetQuery() {
    this.sqlQuery.set("DELETE FROM Customers WHERE CustomerID=5;");
    this.results.set([]);
    this.error.set('');
    this.showSuccess.set(false);
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
    this.showSuccess.set(false);
  }
}
