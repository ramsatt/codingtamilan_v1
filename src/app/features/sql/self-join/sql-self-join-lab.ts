
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-self-join-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-self-join" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-lime-500 pl-4">SQL SELF JOIN</h3>
        <p class="article-body">
          A <span class="font-mono font-bold text-lime-600">SELF JOIN</span> is a regular join, but the table is joined with itself. Useful for hierarchical or comparative data.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">SELF JOIN Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">SELECT</span> A.column_name, B.column_name</div>
          <div><span class="text-pink-400">FROM</span> table_name A, table_name B</div>
          <div><span class="text-pink-400">WHERE</span> condition;</div>
        </div>
        <p class="text-slate-600 mt-3 text-sm">Note: Use table aliases (A, B) to distinguish the same table</p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Common Use Cases</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-lime-50 rounded border border-lime-200">
            <h5 class="font-semibold text-lime-800 mb-1">Hierarchies</h5>
            <p class="text-xs text-slate-600">Employee-Manager relationships</p>
          </div>
          <div class="p-3 bg-lime-50 rounded border border-lime-200">
            <h5 class="font-semibold text-lime-800 mb-1">Comparisons</h5>
            <p class="text-xs text-slate-600">Find matching records</p>
          </div>
          <div class="p-3 bg-lime-50 rounded border border-lime-200">
            <h5 class="font-semibold text-lime-800 mb-1">Sequences</h5>
            <p class="text-xs text-slate-600">Previous/next records</p>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try SELF JOIN
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 bg-slate-50"
            rows="6"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 disabled:bg-slate-300 transition-colors font-semibold">
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
        <h4 class="text-xl font-bold text-slate-800 mb-4">Examples</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-semibold text-slate-700">{{ example.title }}</h5>
                <button 
                  (click)="loadExample(example.query)"
                  class="text-xs px-3 py-1 bg-lime-100 text-lime-700 rounded hover:bg-lime-200">
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
export class SqlSelfJoinLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`SELECT A.CustomerName AS Customer1, B.CustomerName AS Customer2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City
ORDER BY A.City;`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

  examples = [
    {
      title: 'Customers in Same City',
      description: 'Find customers from the same city',
      query: `SELECT A.CustomerName AS Customer1, B.CustomerName AS Customer2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City
ORDER BY A.City;`
    },
    {
      title: 'Employee-Manager Hierarchy',
      description: 'Show employees with their managers',
      query: `SELECT E.EmployeeName AS Employee, M.EmployeeName AS Manager
FROM Employees E
LEFT JOIN Employees M ON E.ManagerID = M.EmployeeID;`
    },
    {
      title: 'Products with Same Price',
      description: 'Find products with identical prices',
      query: `SELECT A.ProductName AS Product1, B.ProductName AS Product2, A.Price
FROM Products A, Products B
WHERE A.ProductID < B.ProductID
AND A.Price = B.Price;`
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
    this.sqlQuery.set(`SELECT A.CustomerName AS Customer1, B.CustomerName AS Customer2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City
ORDER BY A.City;`);
    this.results.set([]);
    this.error.set('');
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.results.set([]);
    this.error.set('');
  }
}
