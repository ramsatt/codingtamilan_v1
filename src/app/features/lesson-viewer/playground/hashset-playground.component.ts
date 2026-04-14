import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hashset-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">HashSet Explorer</span>
        <span class="ml-auto text-[10px] font-mono text-slate-400">size: {{ items.size }}</span>
      </div>

      <div class="p-6 grid lg:grid-cols-2 gap-6">

        <!-- Left: Set display + controls -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unique Elements</p>

          <!-- Set visual -->
          <div class="min-h-[100px] flex flex-wrap gap-2 content-start">
            @if (items.size === 0) {
              <div class="w-full border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-xs italic">HashSet is empty</div>
            }
            @for (item of itemsArray; track item) {
              <div class="flex items-center gap-1.5 bg-brand-50 border-2 border-brand-200 rounded-xl px-3 py-2">
                <span class="font-mono text-sm font-black text-brand-700">{{ item }}</span>
                <button (click)="removeItem(item)" class="text-brand-400 hover:text-red-500 text-xs leading-none">✕</button>
              </div>
            }
          </div>

          <!-- Input -->
          <div class="space-y-2">
            <div class="flex gap-2">
              <input [(ngModel)]="newValue" placeholder="Value to add" (keyup.enter)="addItem()"
                class="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
              <button (click)="addItem()"
                class="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-black rounded-lg transition-all active:scale-95">add()</button>
            </div>
            <div class="flex gap-2">
              <button (click)="checkContains()"
                class="flex-1 py-2 border-2 border-purple-300 text-purple-600 text-xs font-bold rounded-lg hover:bg-purple-50 transition-all">contains(value)</button>
              <button (click)="clearSet()"
                class="flex-1 py-2 border-2 border-red-200 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50 transition-all">clear()</button>
            </div>
          </div>

          <!-- Output -->
          <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-xs min-h-[50px] space-y-1">
            @if (log.length === 0) { <span class="text-slate-600 italic">Console output...</span> }
            @for (l of log; track $index) {
              <div [class.text-emerald-400]="l.type === 'ok'"
                [class.text-red-400]="l.type === 'dup'"
                [class.text-blue-400]="l.type === 'info'">
                <i class="fa-solid fa-terminal text-slate-600 mr-1 text-[10px]"></i>{{ l.msg }}
              </div>
            }
          </div>
        </div>

        <!-- Right: Code -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Java Code</p>
          <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
            <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.util.HashSet</span>;</div>
            <div class="h-2"></div>
            <div><span class="text-blue-400">HashSet</span><span class="text-slate-300">&lt;</span><span class="text-yellow-300">String</span><span class="text-slate-300">&gt; set = </span><span class="text-purple-400">new </span><span class="text-blue-400">HashSet</span><span class="text-slate-300">&lt;&gt;();</span></div>
            <div class="h-2"></div>
            <div><span class="text-white">set.</span><span class="text-yellow-300">add</span><span class="text-slate-300">(value);      </span><span class="text-slate-500">// true if added</span></div>
            <div><span class="text-white">set.</span><span class="text-yellow-300">remove</span><span class="text-slate-300">(value);   </span><span class="text-slate-500">// true if removed</span></div>
            <div><span class="text-white">set.</span><span class="text-yellow-300">contains</span><span class="text-slate-300">(value); </span><span class="text-slate-500">// true/false</span></div>
            <div><span class="text-white">set.</span><span class="text-yellow-300">size</span><span class="text-slate-300">();         </span><span class="text-slate-500">// → {{ items.size }}</span></div>
            <div class="h-2"></div>
            <div><span class="text-slate-500">// Current contents:</span></div>
            <div><span class="text-slate-500">// &#123; </span>
              @for (item of itemsArray; track item) { <span class="text-emerald-400">"{{ item }}" </span> }
              <span class="text-slate-500">&#125;</span>
            </div>
          </div>

          <div class="mt-3 space-y-3">
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              <strong>Key rule:</strong> A HashSet <em>never</em> stores duplicate values. When you call <code class="bg-amber-100 px-1 rounded">add()</code> with an existing value, it returns <code class="bg-amber-100 px-1 rounded">false</code> and the set is unchanged.
            </div>
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
              <strong>Order:</strong> HashSet does NOT guarantee insertion order. Use <code class="bg-slate-100 px-1 rounded">LinkedHashSet</code> if order matters, or <code class="bg-slate-100 px-1 rounded">TreeSet</code> for sorted order.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class HashSetPlaygroundComponent {
  items    = new Set<string>(['Java', 'Python', 'JavaScript']);
  newValue = '';
  log: { msg: string; type: 'ok' | 'dup' | 'info' }[] = [];

  get itemsArray() { return Array.from(this.items); }

  addItem() {
    if (!this.newValue.trim()) return;
    const val = this.newValue.trim();
    if (this.items.has(val)) {
      this.push(`add("${val}") → false (duplicate! "${val}" already exists)`, 'dup');
    } else {
      this.items = new Set([...this.items, val]);
      this.push(`add("${val}") → true (added successfully)`, 'ok');
    }
    this.newValue = '';
  }

  removeItem(val: string) {
    this.items.delete(val);
    this.items = new Set(this.items);
    this.push(`remove("${val}") → true`, 'info');
  }

  checkContains() {
    const val = this.newValue.trim();
    if (!val) return;
    this.push(`contains("${val}") → ${this.items.has(val)}`, 'info');
  }

  clearSet() { this.items = new Set(); this.push('clear() → HashSet is now empty', 'info'); }

  private push(msg: string, type: 'ok' | 'dup' | 'info') {
    this.log = [{ msg, type }, ...this.log].slice(0, 6);
  }
}
