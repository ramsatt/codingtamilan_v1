import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-arraylist-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">ArrayList Explorer</span>
        <span class="ml-auto text-[10px] font-mono text-slate-400">size: {{ items.length }}</span>
      </div>

      <div class="p-6 grid lg:grid-cols-2 gap-6">

        <!-- Left: Visual list + operations -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">List Contents</p>

          <!-- Visual list -->
          <div class="min-h-[120px] space-y-1.5">
            @if (items.length === 0) {
              <div class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-xs italic">
                ArrayList is empty
              </div>
            }
            @for (item of items; track $index; let i = $index) {
              <div class="flex items-center gap-2 rounded-xl border-2 px-3 py-2 transition-all"
                [class.border-brand-300]="highlight === i"
                [class.bg-brand-50]="highlight === i"
                [class.border-slate-100]="highlight !== i"
                [class.bg-slate-50]="highlight !== i">
                <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black shrink-0">{{ i }}</span>
                <span class="font-mono text-sm font-bold flex-1"
                  [class.text-brand-700]="highlight === i"
                  [class.text-slate-800]="highlight !== i">{{ item }}</span>
                @if (highlight === i) {
                  <span class="text-[9px] bg-brand-500 text-white px-2 py-0.5 rounded-full font-bold">{{ lastOp }}</span>
                }
                <button (click)="remove(i)" class="text-red-400 hover:text-red-600 text-xs font-bold px-1.5 hover:bg-red-50 rounded transition-colors" title="remove({{ i }})">✕</button>
              </div>
            }
          </div>

          <!-- Operations -->
          <div class="space-y-2">
            <div class="flex gap-2">
              <input [(ngModel)]="newValue" placeholder="Value" (keyup.enter)="add()"
                class="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
              <button (click)="add()" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-lg transition-all active:scale-95">add()</button>
            </div>
            <div class="flex gap-2">
              <input [(ngModel)]="getIndex" type="number" min="0" placeholder="index" (keyup.enter)="get()"
                class="w-24 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
              <button (click)="get()" class="flex-1 py-2 border-2 border-blue-300 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-all">get(index)</button>
              <button (click)="contains()" class="flex-1 py-2 border-2 border-purple-300 text-purple-600 text-xs font-bold rounded-lg hover:bg-purple-50 transition-all">contains(value)</button>
            </div>
            <button (click)="clear()" class="w-full py-2 border-2 border-red-200 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50 transition-all">clear()</button>
          </div>

          <!-- Output log -->
          <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-xs min-h-[50px]">
            @for (line of log; track $index) {
              <div [class.text-emerald-400]="!line.isError" [class.text-red-400]="line.isError">
                <i class="fa-solid fa-terminal text-slate-600 mr-1.5 text-[10px]"></i>{{ line.msg }}
              </div>
            }
            @if (log.length === 0) {
              <span class="text-slate-600 italic">Console output...</span>
            }
          </div>
        </div>

        <!-- Right: Code -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Java Code</p>
          <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
            <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.util.ArrayList</span>;</div>
            <div class="h-2"></div>
            <div>
              <span class="text-blue-400">ArrayList</span>
              <span class="text-slate-300">&lt;</span>
              <span class="text-yellow-300">String</span>
              <span class="text-slate-300">&gt; list = </span>
              <span class="text-purple-400">new </span>
              <span class="text-blue-400">ArrayList</span>
              <span class="text-slate-300">&lt;&gt;();</span>
            </div>
            <div class="h-2"></div>
            <div><span class="text-slate-500">// Current state</span></div>
            @for (item of items; track $index; let i = $index) {
              <div><span class="text-slate-500">// [{{ i }}] = </span><span class="text-emerald-400">"{{ item }}"</span></div>
            }
            @if (items.length === 0) {
              <div><span class="text-slate-500">// (empty)</span></div>
            }
            <div class="h-2"></div>
            <div><span class="text-slate-500">// Common methods:</span></div>
            <div><span class="text-white">list.</span><span class="text-yellow-300">add</span><span class="text-slate-300">(value);</span></div>
            <div><span class="text-white">list.</span><span class="text-yellow-300">get</span><span class="text-slate-300">(index);</span></div>
            <div><span class="text-white">list.</span><span class="text-yellow-300">remove</span><span class="text-slate-300">(index);</span></div>
            <div><span class="text-white">list.</span><span class="text-yellow-300">contains</span><span class="text-slate-300">(value);</span></div>
            <div><span class="text-white">list.</span><span class="text-yellow-300">size</span><span class="text-slate-300">();  </span><span class="text-slate-500">// → {{ items.length }}</span></div>
            <div><span class="text-white">list.</span><span class="text-yellow-300">clear</span><span class="text-slate-300">();</span></div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 leading-relaxed">
            <strong>ArrayList vs Array:</strong> ArrayLists can grow and shrink dynamically. They store objects (not primitives directly) and are backed by a regular array internally. Use <code class="bg-blue-100 px-1 rounded">ArrayList&lt;Integer&gt;</code> for numbers (autoboxing is automatic).
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ArrayListPlaygroundComponent {
  items     = ['Apple', 'Banana', 'Cherry'];
  newValue  = '';
  getIndex  = 0;
  highlight = -1;
  lastOp    = '';
  log: { msg: string; isError: boolean }[] = [];

  add() {
    if (!this.newValue.trim()) return;
    this.items = [...this.items, this.newValue.trim()];
    this.highlight = this.items.length - 1;
    this.lastOp = 'added';
    this.push(`add("${this.newValue.trim()}") → size: ${this.items.length}`, false);
    this.newValue = '';
    setTimeout(() => this.highlight = -1, 1200);
  }

  remove(i: number) {
    const removed = this.items[i];
    this.items = this.items.filter((_, idx) => idx !== i);
    this.highlight = -1;
    this.push(`remove(${i}) → "${removed}" removed, size: ${this.items.length}`, false);
  }

  get() {
    const i = +this.getIndex;
    if (i < 0 || i >= this.items.length) { this.push(`IndexOutOfBoundsException: index ${i}, size ${this.items.length}`, true); return; }
    this.highlight = i;
    this.lastOp = 'get';
    this.push(`get(${i}) → "${this.items[i]}"`, false);
    setTimeout(() => this.highlight = -1, 1500);
  }

  contains() {
    if (!this.newValue.trim()) { this.push('contains(): enter a value in the input first', true); return; }
    const found = this.items.includes(this.newValue.trim());
    this.push(`contains("${this.newValue.trim()}") → ${found}`, false);
  }

  clear() {
    this.items = [];
    this.highlight = -1;
    this.push('clear() → ArrayList is now empty', false);
  }

  private push(msg: string, isError: boolean) {
    this.log = [{ msg, isError }, ...this.log].slice(0, 6);
  }
}
