
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-syntax-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-syntax" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">SQL Syntax</h3>
        <p class="article-body">
          Learn the basic syntax rules for writing SQL statements.
        </p>
      </div>

      <!-- Database Tables -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Database Tables</h4>
        <p class="text-slate-600 mb-4">
          A database most often contains one or more tables. Each table is identified by a name (e.g. "Customers" or "Orders"). Tables contain records (rows) with data.
        </p>
        <p class="text-slate-600">
          Below is a selection from the <strong>Customers</strong> table used in the examples:
        </p>
      </div>

      <!-- Sample Table -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Sample: Customers Table</h4>
        <div class="overflow-x-auto border border-slate-200 rounded-lg">
          <table class="w-full text-sm">
            <thead class="bg-slate-100">
              <tr>
                <th class="border-b border-slate-200 p-3 text-left font-semibold">CustomerID</th>
                <th class="border-b border-slate-200 p-3 text-left font-semibold">CustomerName</th>
                <th class="border-b border-slate-200 p-3 text-left font-semibold">ContactName</th>
                <th class="border-b border-slate-200 p-3 text-left font-semibold">Country</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="hover:bg-slate-50">
                <td class="border-b border-slate-100 p-3">1</td>
                <td class="border-b border-slate-100 p-3">Alfreds Futterkiste</td>
                <td class="border-b border-slate-100 p-3">Maria Anders</td>
                <td class="border-b border-slate-100 p-3">Germany</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border-b border-slate-100 p-3">2</td>
                <td class="border-b border-slate-100 p-3">Ana Trujillo Emparedados</td>
                <td class="border-b border-slate-100 p-3">Ana Trujillo</td>
                <td class="border-b border-slate-100 p-3">Mexico</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border-b border-slate-100 p-3">3</td>
                <td class="border-b border-slate-100 p-3">Antonio Moreno Taquería</td>
                <td class="border-b border-slate-100 p-3">Antonio Moreno</td>
                <td class="border-b border-slate-100 p-3">Mexico</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SQL Statements -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">SQL Statements</h4>
        <p class="text-slate-600 mb-4">
          Most of the actions you need to perform on a database are done with SQL statements.
        </p>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm mb-4">
          <span class="text-pink-400">SELECT</span> * <span class="text-pink-400">FROM</span> Customers;
        </div>
        <p class="text-slate-600">
          The above SQL statement selects all the records in the "Customers" table.
        </p>
      </div>

      <!-- Important Rules -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Keep in Mind That...</h4>
        <ul class="space-y-3 text-slate-600">
          <li class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <span class="text-blue-600 font-bold text-xl">1</span>
            <div>
              <strong class="text-slate-800">SQL keywords are NOT case sensitive</strong>
              <p class="text-sm mt-1"><code class="bg-slate-200 px-2 py-1 rounded">select</code> is the same as <code class="bg-slate-200 px-2 py-1 rounded">SELECT</code></p>
            </div>
          </li>
          <li class="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span class="text-green-600 font-bold text-xl">2</span>
            <div>
              <strong class="text-slate-800">Semicolon after SQL Statements</strong>
              <p class="text-sm mt-1">Some database systems require a semicolon at the end of each SQL statement. Semicolon is the standard way to separate each SQL statement.</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Common SQL Commands -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Some of The Most Important SQL Commands</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">SELECT</code>
            <p class="text-sm text-slate-600 mt-1">Extracts data from a database</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">UPDATE</code>
            <p class="text-sm text-slate-600 mt-1">Updates data in a database</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">DELETE</code>
            <p class="text-sm text-slate-600 mt-1">Deletes data from a database</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">INSERT INTO</code>
            <p class="text-sm text-slate-600 mt-1">Inserts new data into a database</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">CREATE DATABASE</code>
            <p class="text-sm text-slate-600 mt-1">Creates a new database</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">ALTER DATABASE</code>
            <p class="text-sm text-slate-600 mt-1">Modifies a database</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">CREATE TABLE</code>
            <p class="text-sm text-slate-600 mt-1">Creates a new table</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">ALTER TABLE</code>
            <p class="text-sm text-slate-600 mt-1">Modifies a table</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">DROP TABLE</code>
            <p class="text-sm text-slate-600 mt-1">Deletes a table</p>
          </div>
          <div class="p-3 bg-slate-50 rounded border border-slate-200">
            <code class="font-mono font-bold text-blue-600">CREATE INDEX</code>
            <p class="text-sm text-slate-600 mt-1">Creates an index (search key)</p>
          </div>
        </div>
      </div>

      <!-- Try It Yourself -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try SQL Syntax
        </h4>
        
        <div class="space-y-4">
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase mb-2 block">SQL Query</label>
            <textarea 
              [(ngModel)]="sqlQuery" 
              class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              rows="4"
              placeholder="Try different SQL commands..."></textarea>
          </div>
          
          <button 
            (click)="executeQuery()"
            [disabled]="!sqlService.initialized()"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-semibold">
            ▶ Execute SQL
          </button>
        </div>

        @if (results().length > 0) {
          <div class="mt-6 overflow-x-auto border border-slate-200 rounded-lg">
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
        }

        @if (error()) {
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 font-mono text-sm">{{ error() }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: ``
})
export class SqlSyntaxLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal('SELECT * FROM Customers;');
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');

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
}
