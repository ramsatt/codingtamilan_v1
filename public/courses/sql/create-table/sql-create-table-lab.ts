
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-create-table-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-create-table" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-green-500 pl-4">SQL CREATE TABLE</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-green-600">CREATE TABLE</span> statement is used to create a new table in a database.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">CREATE TABLE Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE TABLE</span> table_name (</div>
          <div class="ml-4">column1 datatype,</div>
          <div class="ml-4">column2 datatype,</div>
          <div class="ml-4">column3 datatype,</div>
          <div class="ml-4">...</div>
          <div>);</div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Common Data Types</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-green-50 rounded border border-green-200">
            <h5 class="font-semibold text-green-800 mb-1">Text</h5>
            <code class="text-xs text-slate-600">VARCHAR(n), TEXT, CHAR(n)</code>
          </div>
          <div class="p-3 bg-blue-50 rounded border border-blue-200">
            <h5 class="font-semibold text-blue-800 mb-1">Numbers</h5>
            <code class="text-xs text-slate-600">INTEGER, REAL, NUMERIC</code>
          </div>
          <div class="p-3 bg-purple-50 rounded border border-purple-200">
            <h5 class="font-semibold text-purple-800 mb-1">Other</h5>
            <code class="text-xs text-slate-600">DATE, BLOB, BOOLEAN</code>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try CREATE TABLE
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 transition-colors font-semibold">
              ▶ Create Table
            </button>
            <button 
              (click)="viewTable()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              👁 View Table
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
            <p class="text-green-700 font-medium">✓ Table created successfully!</p>
          </div>
        }

        @if (results().length > 0) {
          <div class="mt-6">
            <h5 class="font-bold text-slate-700 mb-3">Table Contents ({{ results().length }} rows)</h5>
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
                  class="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
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
export class SqlCreateTableLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE TABLE Persons (
    PersonID INTEGER PRIMARY KEY,
    LastName VARCHAR(255),
    FirstName VARCHAR(255),
    Age INTEGER
);`);
  results = signal<any[]>([]);
  columns = signal<string[]>([]);
  error = signal<string>('');
  showSuccess = signal(false);
  currentTable = signal('Persons');

  examples = [
    {
      title: 'Simple Table',
      description: 'Create a basic persons table',
      query: `CREATE TABLE Persons (
    PersonID INTEGER PRIMARY KEY,
    LastName VARCHAR(255),
    FirstName VARCHAR(255),
    Age INTEGER
);`
    },
    {
      title: 'Table with Constraints',
      description: 'Add NOT NULL and DEFAULT constraints',
      query: `CREATE TABLE Students (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    EnrollmentDate DATE DEFAULT CURRENT_DATE
);`
    },
    {
      title: 'Products Table',
      description: 'Create a products inventory table',
      query: `CREATE TABLE Inventory (
    ProductID INTEGER PRIMARY KEY,
    ProductName VARCHAR(200) NOT NULL,
    Quantity INTEGER DEFAULT 0,
    Price REAL
);`
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
      const result = this.sqlService.execute(`SELECT * FROM ${this.currentTable()};`);
      this.results.set(result.rows);
      this.columns.set(result.columns);
      this.error.set('');
      this.showSuccess.set(false);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE TABLE Persons (
    PersonID INTEGER PRIMARY KEY,
    LastName VARCHAR(255),
    FirstName VARCHAR(255),
    Age INTEGER
);`);
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
