
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-drop-table-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-drop-table" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-red-500 pl-4">SQL DROP TABLE</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-red-600">DROP TABLE</span> statement is used to drop an existing table in a database.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">DROP TABLE Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">DROP TABLE</span> table_name;</div>
        </div>
        <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 font-medium">⚠️ WARNING:</p>
          <p class="text-red-600 text-sm">DROP TABLE permanently deletes the table and ALL its data. This action cannot be undone!</p>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try DROP TABLE
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
              ⚠️ Drop Table
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
            <p class="text-green-700 font-medium">✓ Table dropped successfully!</p>
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
                  class="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                  Try
                </button>
              </div>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-yellow-50 border border-yellow-200">
        <h4 class="text-xl font-bold text-yellow-800 mb-3">TRUNCATE vs DROP</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded border border-yellow-200">
            <h5 class="font-semibold text-slate-800 mb-2">TRUNCATE TABLE</h5>
            <p class="text-sm text-slate-600">Removes all rows but keeps the table structure</p>
          </div>
          <div class="bg-white p-4 rounded border border-red-200">
            <h5 class="font-semibold text-slate-800 mb-2">DROP TABLE</h5>
            <p class="text-sm text-slate-600">Removes the entire table including structure</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SqlDropTableLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`DROP TABLE TestTable;`);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Drop Single Table',
      description: 'Remove a table completely',
      query: `DROP TABLE TestTable;`
    },
    {
      title: 'Drop If Exists',
      description: 'Safely drop table only if it exists',
      query: `DROP TABLE IF EXISTS TempData;`
    },
    {
      title: 'Create and Drop',
      description: 'Create a temporary table then drop it',
      query: `CREATE TABLE TempTable (ID INTEGER);
DROP TABLE TempTable;`
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
    } catch (e: any) {
      this.error.set(e.message);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`DROP TABLE TestTable;`);
    this.error.set('');
    this.showSuccess.set(false);
  }

  loadExample(query: string) {
    this.sqlQuery.set(query);
    this.error.set('');
    this.showSuccess.set(false);
  }
}
