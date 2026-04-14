
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-primary-key-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-primary-key" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-yellow-500 pl-4">SQL PRIMARY KEY</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-yellow-600">PRIMARY KEY</span> constraint uniquely identifies each record in a table. Primary keys must contain UNIQUE values and cannot contain NULL values.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">PRIMARY KEY Syntax</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Single Column:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">CREATE TABLE</span> Persons (</div>
              <div class="ml-2">ID <span class="text-yellow-400">INTEGER PRIMARY KEY</span>,</div>
              <div class="ml-2">Name VARCHAR(255)</div>
              <div>);</div>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2">Composite Key:</p>
            <div class="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              <div><span class="text-pink-400">CREATE TABLE</span> Orders (</div>
              <div class="ml-2">OrderID INTEGER,</div>
              <div class="ml-2">ProductID INTEGER,</div>
              <div class="ml-2"><span class="text-yellow-400">PRIMARY KEY</span> (OrderID, ProductID)</div>
              <div>);</div>
            </div>
          </div>
        </div>
        <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-yellow-700 font-medium">💡 Key Points:</p>
          <ul class="text-yellow-600 text-sm mt-2 space-y-1">
            <li>• A table can have only ONE primary key</li>
            <li>• Primary key can consist of single or multiple columns</li>
            <li>• Values must be UNIQUE and NOT NULL</li>
          </ul>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try PRIMARY KEY
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-slate-50"
            rows="8"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-slate-300 transition-colors font-semibold">
              ▶ Execute
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
            <p class="text-green-700 font-medium">✓ {{ successMessage() }}</p>
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
                  class="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-yellow-50 border border-yellow-200">
        <h4 class="text-xl font-bold text-yellow-800 mb-3">AUTO INCREMENT</h4>
        <p class="text-yellow-700 mb-2">
          Auto-increment allows a unique number to be generated automatically when a new record is inserted:
        </p>
        <code class="block bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono">
          ID INTEGER PRIMARY KEY AUTOINCREMENT
        </code>
      </div>
    </section>
  `
})
export class SqlPrimaryKeyLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL
);`);
  error = signal<string>('');
  showSuccess = signal(false);
  successMessage = signal('');

  examples = [
    {
      title: 'Single Column Primary Key',
      description: 'Create table with simple primary key',
      query: `CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL
);`
    },
    {
      title: 'Auto-Increment Primary Key',
      description: 'Primary key with auto-increment',
      query: `CREATE TABLE Posts (
    PostID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(200),
    Content TEXT,
    CreatedAt DATE
);`
    },
    {
      title: 'Composite Primary Key',
      description: 'Primary key with multiple columns',
      query: `CREATE TABLE Enrollments (
    StudentID INTEGER,
    CourseID INTEGER,
    EnrollmentDate DATE,
    PRIMARY KEY (StudentID, CourseID)
);`
    },
    {
      title: 'Named Primary Key',
      description: 'Primary key with constraint name',
      query: `CREATE TABLE Books (
    BookID INTEGER,
    ISBN VARCHAR(20),
    Title VARCHAR(200),
    CONSTRAINT PK_Books PRIMARY KEY (BookID)
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
      this.successMessage.set('Table created with PRIMARY KEY constraint!');
    } catch (e: any) {
      this.error.set(e.message);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL
);`);
    this.error.set('');
    this.showSuccess.set(false);
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.error.set('');
    this.showSuccess.set(false);
  }
}
