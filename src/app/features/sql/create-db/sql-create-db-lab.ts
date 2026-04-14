
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-create-db-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-create-db" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-4">SQL CREATE DATABASE</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-emerald-600">CREATE DATABASE</span> statement is used to create a new SQL database.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">CREATE DATABASE Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE DATABASE</span> database_name;</div>
        </div>
        <div class="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p class="text-emerald-700 font-medium">💡 Note:</p>
          <p class="text-emerald-600 text-sm">Make sure you have admin privilege before creating any database. Once created, you can verify it in the database list.</p>
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

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-emerald-50 border border-emerald-200">
        <h4 class="text-xl font-bold text-emerald-800 mb-3">Database Variations</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-white p-3 rounded">
            <h5 class="font-semibold text-slate-800 mb-1">MySQL</h5>
            <code class="text-xs text-slate-600">CREATE DATABASE mydb;</code>
          </div>
          <div class="bg-white p-3 rounded">
            <h5 class="font-semibold text-slate-800 mb-1">SQL Server</h5>
            <code class="text-xs text-slate-600">CREATE DATABASE mydb;</code>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SqlCreateDbLab implements OnInit {
  sqlService = inject(SqlExecutorService);

  examples = [
    {
      title: 'Create Database',
      description: 'Create a new database named "myDatabase"',
      query: 'CREATE DATABASE myDatabase;'
    },
    {
      title: 'Create with IF NOT EXISTS',
      description: 'Create database only if it doesn\'t exist (MySQL)',
      query: 'CREATE DATABASE IF NOT EXISTS myDatabase;'
    },
    {
      title: 'Create with Character Set',
      description: 'Specify character encoding (MySQL)',
      query: 'CREATE DATABASE myDatabase CHARACTER SET utf8mb4;'
    }
  ];

  ngOnInit() {
    if (!this.sqlService.initialized()) {
      this.sqlService.initialize();
    }
  }
}
