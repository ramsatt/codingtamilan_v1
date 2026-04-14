
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-views-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-views" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">SQL VIEWS</h3>
        <p class="article-body">
          A <span class="font-mono font-bold text-purple-600">VIEW</span> is a virtual table based on the result-set of an SQL statement. It contains rows and columns just like a real table.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">VIEW Syntax</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Create View:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">CREATE VIEW</span> view_name <span class="text-pink-400">AS</span></div>
              <div><span class="text-pink-400">SELECT</span> column1, column2</div>
              <div><span class="text-pink-400">FROM</span> table_name;</div>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Drop View:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">DROP VIEW</span> view_name;</div>
            </div>
          </div>
        </div>
        <div class="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p class="text-purple-700 font-medium">💡 Benefits:</p>
          <ul class="text-purple-600 text-sm mt-2 space-y-1">
            <li>• Simplify complex queries</li>
            <li>• Provide data security (hide sensitive columns)</li>
            <li>• Present data in different perspectives</li>
          </ul>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try VIEWS
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-slate-300 transition-colors font-semibold">
              ▶ Execute
            </button>
            <button 
              (click)="queryView()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              👁 Query View
            </button>
            <button 
              (click)="resetQuery()"
              class="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold">
              ↻ Reset
            </button>
          </div>
        </div>

        @if (showSuccess()) {
          <div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-green-700 font-medium">✓ View created successfully!</p>
          </div>
        }

        @if (results().length > 0) {
          <div class="mt-6">
            <h5 class="font-bold text-slate-700 mb-3">View Results ({{ results().length }} rows)</h5>
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
                  class="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
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
export class SqlViewsLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE VIEW CustomerView AS
SELECT CustomerName, City, Country
FROM Customers;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Simple View',
      description: 'Create a view with selected columns',
      query: `CREATE VIEW CustomerView AS
SELECT CustomerName, City, Country
FROM Customers;`
    },
    {
      title: 'View with WHERE',
      description: 'View with filtered data',
      query: `CREATE VIEW GermanCustomers AS
SELECT CustomerName, City
FROM Customers
WHERE Country = 'Germany';`
    },
    {
      title: 'View with JOIN',
      description: 'Complex view with multiple tables',
      query: `CREATE VIEW OrderSummary AS
SELECT c.CustomerName, COUNT(o.OrderID) AS TotalOrders
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerName;`
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

  queryView() {
    try {
      const result = this.sqlService.execute('SELECT * FROM CustomerView;');
      this.results.set(result.rows);
      this.columns.set(result.columns);
      this.error.set('');
      this.showSuccess.set(false);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE VIEW CustomerView AS
SELECT CustomerName, City, Country
FROM Customers;`);
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
