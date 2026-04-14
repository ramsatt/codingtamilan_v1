
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqlExecutorService } from '../../../services/sql-executor.service';

@Component({
  selector: 'app-sql-foreign-key-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="sql-foreign-key" class="scroll-mt-8 space-y-8">
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-rose-500 pl-4">SQL FOREIGN KEY</h3>
        <p class="article-body">
          A <span class="font-mono font-bold text-rose-600">FOREIGN KEY</span> is a field (or collection of fields) in one table that refers to the PRIMARY KEY in another table. It prevents actions that would destroy links between tables.
        </p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">FOREIGN KEY Syntax</h4>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
          <div><span class="text-pink-400">CREATE TABLE</span> Orders (</div>
          <div class="ml-4">OrderID INTEGER PRIMARY KEY,</div>
          <div class="ml-4">OrderNumber INTEGER NOT NULL,</div>
          <div class="ml-4">CustomerID INTEGER,</div>
          <div class="ml-4"><span class="text-rose-400">FOREIGN KEY</span> (CustomerID)</div>
          <div class="ml-4"><span class="text-rose-400">REFERENCES</span> Customers(CustomerID)</div>
          <div>);</div>
        </div>
        <div class="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <p class="text-rose-700 font-medium">💡 Purpose:</p>
          <ul class="text-rose-600 text-sm mt-2 space-y-1">
            <li>• Prevents invalid data from being inserted</li>
            <li>• Maintains referential integrity</li>
            <li>• Links tables together</li>
          </ul>
        </div>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Visual Relationship</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-lg">
          <div class="bg-white p-4 rounded border-2 border-blue-300">
            <h5 class="font-bold text-blue-700 mb-2">Customers (Parent)</h5>
            <div class="space-y-1 text-sm font-mono">
              <div class="bg-yellow-100 px-2 py-1 rounded">🔑 CustomerID (PK)</div>
              <div class="px-2 py-1">CustomerName</div>
              <div class="px-2 py-1">Country</div>
            </div>
          </div>
          <div class="bg-white p-4 rounded border-2 border-green-300">
            <h5 class="font-bold text-green-700 mb-2">Orders (Child)</h5>
            <div class="space-y-1 text-sm font-mono">
              <div class="bg-yellow-100 px-2 py-1 rounded">🔑 OrderID (PK)</div>
              <div class="px-2 py-1">OrderNumber</div>
              <div class="bg-rose-100 px-2 py-1 rounded">🔗 CustomerID (FK)</div>
            </div>
          </div>
        </div>
        <p class="text-center text-sm text-slate-600 mt-4">The FK in Orders references the PK in Customers</p>
      </div>

      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Interactive</span> Try FOREIGN KEY
        </h4>
        
        <div class="space-y-4">
          <textarea 
            [(ngModel)]="sqlQuery" 
            class="w-full p-4 font-mono text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50"
            rows="10"></textarea>
          
          <div class="flex gap-3">
            <button 
              (click)="executeQuery()"
              [disabled]="!sqlService.initialized()"
              class="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-slate-300 transition-colors font-semibold">
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
            <p class="text-green-700 font-medium">✓ Table created with FOREIGN KEY constraint!</p>
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
                  class="text-xs px-3 py-1 bg-rose-100 text-rose-700 rounded hover:bg-rose-200">
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
export class SqlForeignKeyLab implements OnInit {
  sqlService = inject(SqlExecutorService);
  
  sqlQuery = signal(`CREATE TABLE OrdersNew (
    OrderID INTEGER PRIMARY KEY,
    OrderNumber INTEGER NOT NULL,
    CustomerID INTEGER,
    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)
);`);
  error = signal<string>('');
  showSuccess = signal(false);

  examples = [
    {
      title: 'Basic Foreign Key',
      description: 'Link orders to customers',
      query: `CREATE TABLE OrdersNew (
    OrderID INTEGER PRIMARY KEY,
    OrderNumber INTEGER NOT NULL,
    CustomerID INTEGER,
    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)
);`
    },
    {
      title: 'Named Foreign Key',
      description: 'Foreign key with constraint name',
      query: `CREATE TABLE OrderItems (
    ItemID INTEGER PRIMARY KEY,
    OrderID INTEGER,
    ProductID INTEGER,
    CONSTRAINT FK_Order FOREIGN KEY (OrderID)
    REFERENCES Orders(OrderID)
);`
    },
    {
      title: 'Multiple Foreign Keys',
      description: 'Table with two foreign keys',
      query: `CREATE TABLE Reviews (
    ReviewID INTEGER PRIMARY KEY,
    ProductID INTEGER,
    CustomerID INTEGER,
    Rating INTEGER,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
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
    } catch (e: any) {
      this.error.set(e.message);
      this.showSuccess.set(false);
    }
  }

  resetQuery() {
    this.sqlQuery.set(`CREATE TABLE OrdersNew (
    OrderID INTEGER PRIMARY KEY,
    OrderNumber INTEGER NOT NULL,
    CustomerID INTEGER,
    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)
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
