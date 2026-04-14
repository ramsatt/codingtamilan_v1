
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-any-all-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-any-all" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-4">SQL ANY and ALL Operators</h3>
        <p class="article-body">
          The <span class="font-mono font-bold text-amber-600">ANY</span> and <span class="font-mono font-bold text-amber-600">ALL</span> operators allow you to perform a comparison between a single value and a range of values.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">ANY vs ALL</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-amber-50 rounded border border-amber-200">
            <h5 class="font-semibold text-amber-800 mb-2">ANY</h5>
            <p class="text-sm text-slate-600 mb-2">Returns TRUE if ANY of the subquery values meet the condition</p>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              WHERE column &gt; ANY (subquery)
            </code>
          </div>
          <div class="p-4 bg-amber-50 rounded border border-amber-200">
            <h5 class="font-semibold text-amber-800 mb-2">ALL</h5>
            <p class="text-sm text-slate-600 mb-2">Returns TRUE if ALL of the subquery values meet the condition</p>
            <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono">
              WHERE column &gt; ALL (subquery)
            </code>
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
              <code class="block bg-slate-900 text-slate-100 p-2 rounded text-xs font-mono whitespace-pre-wrap">{{ example.query }}</code>
            </div>
          }
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-amber-50 border border-amber-200">
        <h4 class="text-xl font-bold text-amber-800 mb-3">Quick Reference</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-white p-3 rounded">
            <code class="text-amber-700">= ANY</code> <span class="text-slate-600">is equivalent to</span> <code class="text-amber-700">IN</code>
          </div>
          <div class="bg-white p-3 rounded">
            <code class="text-amber-700">&gt; ALL</code> <span class="text-slate-600">means greater than the maximum</span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SqlAnyAllLab implements OnInit {
  sqlService = inject(SqlExecutorService);

  examples = [
    {
      title: 'ANY Example',
      description: 'Products with price greater than ANY product in category 1',
      query: `SELECT ProductName, Price
FROM Products
WHERE Price > ANY (SELECT Price FROM Products WHERE CategoryID = 1);`
    },
    {
      title: 'ALL Example',
      description: 'Products with price greater than ALL products in category 1',
      query: `SELECT ProductName, Price
FROM Products
WHERE Price > ALL (SELECT Price FROM Products WHERE CategoryID = 1);`
    },
    {
      title: 'ANY with =',
      description: 'Same as IN operator',
      query: `SELECT ProductName
FROM Products
WHERE CategoryID = ANY (SELECT CategoryID FROM Categories WHERE CategoryName LIKE 'B%');`
    }
  ];

  ngOnInit() {
    if (!this.sqlService.initialized()) {
      this.sqlService.initialize();
    }
  }
}
