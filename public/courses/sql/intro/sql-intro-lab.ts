
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sql-intro-lab',
  imports: [CommonModule],
  template: `
    <section id="sql-intro" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">Introduction to SQL</h3>
        <p class="article-body">
          SQL is a standard language for accessing and manipulating databases.
        </p>
      </div>

      <!-- What is SQL? -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">What is SQL?</h4>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">•</span>
            <span>SQL stands for Structured Query Language</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">•</span>
            <span>SQL lets you access and manipulate databases</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">•</span>
            <span>SQL became a standard of the American National Standards Institute (ANSI) in 1986</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-500 mt-1">•</span>
            <span>SQL became a standard of the International Organization for Standardization (ISO) in 1987</span>
          </li>
        </ul>
      </div>

      <!-- What Can SQL Do? -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">What Can SQL Do?</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <span class="text-2xl">🔍</span>
            <div>
              <h5 class="font-semibold text-slate-800">Query Data</h5>
              <p class="text-sm text-slate-600">Execute queries against a database</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span class="text-2xl">📥</span>
            <div>
              <h5 class="font-semibold text-slate-800">Retrieve Data</h5>
              <p class="text-sm text-slate-600">Retrieve data from a database</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <span class="text-2xl">➕</span>
            <div>
              <h5 class="font-semibold text-slate-800">Insert Records</h5>
              <p class="text-sm text-slate-600">Insert records in a database</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
            <span class="text-2xl">✏️</span>
            <div>
              <h5 class="font-semibold text-slate-800">Update Records</h5>
              <p class="text-sm text-slate-600">Update records in a database</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <span class="text-2xl">🗑️</span>
            <div>
              <h5 class="font-semibold text-slate-800">Delete Records</h5>
              <p class="text-sm text-slate-600">Delete records from a database</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
            <span class="text-2xl">🏗️</span>
            <div>
              <h5 class="font-semibold text-slate-800">Create Databases</h5>
              <p class="text-sm text-slate-600">Create new databases and tables</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RDBMS -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">RDBMS</h4>
        <p class="text-slate-600 mb-4">
          RDBMS stands for <strong>Relational Database Management System</strong>.
        </p>
        <p class="text-slate-600 mb-4">
          RDBMS is the basis for SQL, and for all modern database systems such as MS SQL Server, IBM DB2, Oracle, MySQL, and Microsoft Access.
        </p>
        <p class="text-slate-600">
          The data in RDBMS is stored in database objects called <strong>tables</strong>. A table is a collection of related data entries and it consists of columns and rows.
        </p>
      </div>

      <!-- Key Points -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <h4 class="text-xl font-bold text-slate-800 mb-4">💡 Key Points</h4>
        <ul class="space-y-2 text-slate-700">
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>SQL is <strong>not case sensitive</strong>: SELECT is the same as select</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>Some database systems require a <strong>semicolon</strong> at the end of each SQL statement</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-blue-600 font-bold">→</span>
            <span>SQL is a <strong>standard</strong>, but there are different versions of the SQL language</span>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: ``
})
export class SqlIntroLab {}
