
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-drop-db-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-drop-db" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-red-600 pl-4">SQL DROP DATABASE</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-red-600">DROP DATABASE</span> statement is used to drop an existing SQL database.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-red-50 border border-red-200">
        <h4 class="text-xl font-bold text-red-800 mb-4">⚠️ WARNING</h4>
        <p class="text-red-700 mb-3">
          Be very careful when dropping a database. Deleting a database will result in loss of complete information stored in the database!
        </p>
        <div class="bg-white p-4 rounded border border-red-300">
          <div class="bg-slate-900 text-slate-100 p-3 rounded font-mono text-sm">
            <div><span class="text-pink-400">DROP DATABASE</span> database_name;</div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Examples</h4>
        <div class="space-y-3">
          @for (example of examples; track example.title) {
            <div class="border border-slate-200 rounded-lg p-4">
              <h5 class="font-semibold text-slate-700 mb-2">{{ example.title }}</h5>
              <p class="text-sm text-slate-600 mb-2">{{ example.description }}</p>
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-yellow-50 border border-yellow-200">
        <h4 class="text-xl font-bold text-yellow-800 mb-3">Best Practices</h4>
        <ul class="text-yellow-700 text-sm space-y-2">
          <li>• Always backup before dropping</li>
          <li>• Use IF EXISTS to avoid errors</li>
          <li>• Verify database name carefully</li>
          <li>• Ensure you have proper permissions</li>
        </ul>
      </div>
    </section>
  `
})
export class SqlDropDbLab implements OnInit {
  sqlService = inject(SqlExecutorService);

  examples = [
    {
      title: 'Drop Database',
      description: 'Delete a database named "myDatabase"',
      query: 'DROP DATABASE myDatabase;'
    },
    {
      title: 'Drop with IF EXISTS',
      description: 'Drop database only if it exists (MySQL)',
      query: 'DROP DATABASE IF EXISTS myDatabase;'
    }
  ];

  ngOnInit() {
    if (!this.sqlService.initialized()) {
      this.sqlService.initialize();
    }
  }
}
