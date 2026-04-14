
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sql-injection-lab',
  imports: [CommonModule],
  template: `
    <section id="sql-injection" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-red-600 pl-4">SQL Injection</h3>
        <p class="article-body">
          <span class="font-mono font-bold text-red-600">SQL Injection</span> is a code injection technique that might destroy your database. It is one of the most common web hacking techniques.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-red-50 border border-red-200">
        <h4 class="text-xl font-bold text-red-800 mb-4">⚠️ What is SQL Injection?</h4>
        <p class="text-red-700 mb-3">
          SQL injection is the placement of malicious code in SQL statements, via web page input.
        </p>
        <div class="bg-white p-4 rounded-lg border border-red-300">
          <p class="text-sm font-semibold text-slate-800 mb-2">Example of Vulnerable Code:</p>
          <code class="block bg-slate-900 text-slate-100 p-3 rounded text-xs font-mono">
            txtUserId = getRequestString("UserId");<br/>
            txtSQL = "SELECT * FROM Users WHERE UserId = " + txtUserId;
          </code>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Attack Examples</h4>
        <div class="space-y-4">
          <div class="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <h5 class="font-semibold text-orange-800 mb-2">1. Always True Condition</h5>
            <p class="text-sm text-slate-600 mb-2">User input: <code class="bg-white px-2 py-1 rounded">105 OR 1=1</code></p>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              SELECT * FROM Users WHERE UserId = 105 OR 1=1
            </code>
            <p class="text-xs text-orange-700 mt-2">Returns ALL users because 1=1 is always true!</p>
          </div>

          <div class="border border-orange-200 rounded-lg p-4 bg-orange-50">
            <h5 class="font-semibold text-orange-800 mb-2">2. Database Deletion</h5>
            <p class="text-sm text-slate-600 mb-2">User input: <code class="bg-white px-2 py-1 rounded">105; DROP TABLE Users</code></p>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              SELECT * FROM Users WHERE UserId = 105; DROP TABLE Users
            </code>
            <p class="text-xs text-orange-700 mt-2">Deletes the entire Users table!</p>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-green-50 border border-green-200">
        <h4 class="text-xl font-bold text-green-800 mb-4">✅ Prevention Methods</h4>
        <div class="space-y-3">
          <div class="bg-white p-4 rounded border border-green-300">
            <h5 class="font-semibold text-green-800 mb-2">1. Use Parameterized Queries</h5>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              stmt = db.prepare("SELECT * FROM Users WHERE UserId = ?");<br/>
              stmt.bind(userId);<br/>
              stmt.execute();
            </code>
          </div>

          <div class="bg-white p-4 rounded border border-green-300">
            <h5 class="font-semibold text-green-800 mb-2">2. Input Validation</h5>
            <ul class="text-sm text-slate-600 mt-2 space-y-1">
              <li>• Validate user input (type, length, format)</li>
              <li>• Use whitelist validation</li>
              <li>• Reject suspicious input</li>
            </ul>
          </div>

          <div class="bg-white p-4 rounded border border-green-300">
            <h5 class="font-semibold text-green-800 mb-2">3. Escape Special Characters</h5>
            <p class="text-sm text-slate-600">Escape quotes, semicolons, and other SQL special characters</p>
          </div>

          <div class="bg-white p-4 rounded border border-green-300">
            <h5 class="font-semibold text-green-800 mb-2">4. Use ORM/Query Builders</h5>
            <p class="text-sm text-slate-600">Use frameworks that handle SQL injection prevention automatically</p>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Best Practices</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="p-3 bg-blue-50 rounded border border-blue-200">
            <h5 class="font-semibold text-blue-800 mb-1">✓ DO</h5>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>• Use prepared statements</li>
              <li>• Validate all input</li>
              <li>• Use least privilege principle</li>
              <li>• Keep software updated</li>
            </ul>
          </div>
          <div class="p-3 bg-red-50 rounded border border-red-200">
            <h5 class="font-semibold text-red-800 mb-1">✗ DON'T</h5>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>• Concatenate user input</li>
              <li>• Trust any user input</li>
              <li>• Display detailed errors</li>
              <li>• Use admin accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SqlInjectionLab {
}
