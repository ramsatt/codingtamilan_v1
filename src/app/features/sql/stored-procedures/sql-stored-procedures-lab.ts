
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sql-stored-procedures-lab',
  imports: [CommonModule],
  template: `
    <section id="sql-stored-procedures" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-rose-500 pl-4">SQL Stored Procedures</h3>
        <p class="article-body">
          A <span class="font-mono font-bold text-rose-600">stored procedure</span> is a prepared SQL code that you can save and reuse over and over again.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Stored Procedure Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE PROCEDURE</span> procedure_name</div>
          <div><span class="text-pink-400">AS</span></div>
          <div>sql_statement</div>
          <div><span class="text-pink-400">GO</span>;</div>
          <div class="mt-3"><span class="text-green-400">-- Execute procedure</span></div>
          <div><span class="text-pink-400">EXEC</span> procedure_name;</div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Examples</h4>
        <div class="space-y-4">
          <div class="border border-slate-200 rounded-lg p-4">
            <h5 class="font-semibold text-slate-700 mb-2">Simple Stored Procedure</h5>
            <code class="block bg-slate-900 text-slate-100 p-3 rounded text-xs font-mono whitespace-pre-wrap">CREATE PROCEDURE SelectAllCustomers
AS
SELECT * FROM Customers
GO;

EXEC SelectAllCustomers;</code>
          </div>

          <div class="border border-slate-200 rounded-lg p-4">
            <h5 class="font-semibold text-slate-700 mb-2">Procedure with Parameters</h5>
            <code class="block bg-slate-900 text-slate-100 p-3 rounded text-xs font-mono whitespace-pre-wrap">CREATE PROCEDURE SelectCustomersByCity
@City VARCHAR(30)
AS
SELECT * FROM Customers WHERE City = @City
GO;

EXEC SelectCustomersByCity @City = 'London';</code>
          </div>

          <div class="border border-slate-200 rounded-lg p-4">
            <h5 class="font-semibold text-slate-700 mb-2">Multiple Parameters</h5>
            <code class="block bg-slate-900 text-slate-100 p-3 rounded text-xs font-mono whitespace-pre-wrap">CREATE PROCEDURE SelectCustomers
@City VARCHAR(30),
@Country VARCHAR(30)
AS
SELECT * FROM Customers 
WHERE City = @City AND Country = @Country
GO;</code>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-rose-50 border border-rose-200">
        <h4 class="text-xl font-bold text-rose-800 mb-3">Benefits</h4>
        <ul class="text-rose-700 text-sm space-y-2">
          <li>• Reusable SQL code</li>
          <li>• Improved performance (pre-compiled)</li>
          <li>• Enhanced security (controlled access)</li>
          <li>• Reduced network traffic</li>
        </ul>
      </div>
    </section>
  `
})
export class SqlStoredProceduresLab {
}
