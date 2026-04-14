import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MapEntry { key: string; value: string; id: number; highlighted: boolean; }

@Component({
  selector: 'app-hashmap-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">HashMap Explorer</span>
        <span class="ml-auto text-[10px] font-mono text-slate-400">size: {{ entries.length }}</span>
      </div>

      <div class="p-6 grid lg:grid-cols-2 gap-6">

        <!-- Left: Map grid + controls -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key → Value Pairs</p>

          <!-- Entry grid -->
          <div class="space-y-1.5 min-h-[120px]">
            @if (entries.length === 0) {
              <div class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-xs italic">HashMap is empty</div>
            }
            @for (e of entries; track e.id) {
              <div class="flex items-center gap-2 rounded-xl border-2 px-3 py-2 transition-all"
                [class.border-brand-400]="e.highlighted"
                [class.bg-brand-50]="e.highlighted"
                [class.border-slate-100]="!e.highlighted"
                [class.bg-slate-50]="!e.highlighted">
                <span class="font-mono text-xs font-black text-slate-700 bg-slate-200 px-2 py-1 rounded-lg min-w-[60px] text-center">{{ e.key }}</span>
                <span class="text-slate-400 font-mono">→</span>
                <span class="font-mono text-sm font-bold flex-1" [class.text-brand-700]="e.highlighted" [class.text-slate-600]="!e.highlighted">{{ e.value }}</span>
                <button (click)="removeKey(e.key)" class="text-red-400 hover:text-red-600 text-xs px-1.5 hover:bg-red-50 rounded transition-colors">✕</button>
              </div>
            }
          </div>

          <!-- Input + operations -->
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <input [(ngModel)]="newKey"   placeholder="Key"   class="border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
              <input [(ngModel)]="newValue" placeholder="Value" class="border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
            </div>
            <div class="grid grid-cols-3 gap-2">
              <button (click)="put()"          class="py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-lg transition-all active:scale-95">put()</button>
              <button (click)="getByKey()"     class="py-2 border-2 border-blue-300 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-all">get()</button>
              <button (click)="containsKey()"  class="py-2 border-2 border-purple-300 text-purple-600 text-xs font-bold rounded-lg hover:bg-purple-50 transition-all">containsKey()</button>
            </div>
            <button (click)="clearMap()" class="w-full py-2 border-2 border-red-200 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50 transition-all">clear()</button>
          </div>

          <!-- Output -->
          <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-xs min-h-[50px] space-y-1">
            @if (log.length === 0) { <span class="text-slate-600 italic">Console output...</span> }
            @for (l of log; track $index) {
              <div [class.text-emerald-400]="!l.isError" [class.text-red-400]="l.isError">
                <i class="fa-solid fa-terminal text-slate-600 mr-1 text-[10px]"></i>{{ l.msg }}
              </div>
            }
          </div>
        </div>

        <!-- Right: Code -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Java Code</p>
          <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
            <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.util.HashMap</span>;</div>
            <div class="h-2"></div>
            <div><span class="text-blue-400">HashMap</span><span class="text-slate-300">&lt;</span><span class="text-yellow-300">String, String</span><span class="text-slate-300">&gt; map = </span><span class="text-purple-400">new </span><span class="text-blue-400">HashMap</span><span class="text-slate-300">&lt;&gt;();</span></div>
            <div class="h-2"></div>
            <div><span class="text-white">map.</span><span class="text-yellow-300">put</span><span class="text-slate-300">(key, value); </span><span class="text-slate-500">// add/update</span></div>
            <div><span class="text-white">map.</span><span class="text-yellow-300">get</span><span class="text-slate-300">(key);        </span><span class="text-slate-500">// retrieve</span></div>
            <div><span class="text-white">map.</span><span class="text-yellow-300">remove</span><span class="text-slate-300">(key);     </span><span class="text-slate-500">// delete</span></div>
            <div><span class="text-white">map.</span><span class="text-yellow-300">containsKey</span><span class="text-slate-300">(key);</span><span class="text-slate-500">// check</span></div>
            <div><span class="text-white">map.</span><span class="text-yellow-300">size</span><span class="text-slate-300">();         </span><span class="text-slate-500">// → {{ entries.length }}</span></div>
            <div class="h-2"></div>
            <div><span class="text-slate-500">// Iterate over entries:</span></div>
            <div><span class="text-purple-400">for</span><span class="text-slate-300"> (</span><span class="text-blue-400">var</span><span class="text-white"> entry : map.</span><span class="text-yellow-300">entrySet</span><span class="text-slate-300">()) &#123;</span></div>
            <div class="pl-4"><span class="text-white">entry.</span><span class="text-yellow-300">getKey</span><span class="text-slate-300">() + </span><span class="text-emerald-400">" → "</span><span class="text-slate-300"> + </span><span class="text-white">entry.</span><span class="text-yellow-300">getValue</span><span class="text-slate-300">();</span></div>
            <div><span class="text-slate-300">&#125;</span></div>
          </div>

          <div class="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 leading-relaxed">
            <strong>HashMap:</strong> Stores key-value pairs. Keys are unique — calling <code class="bg-blue-100 px-1 rounded">put()</code> with an existing key <em>replaces</em> the value. Allows one <code class="bg-blue-100 px-1 rounded">null</code> key. Order is not guaranteed (use <code class="bg-blue-100 px-1 rounded">LinkedHashMap</code> to preserve insertion order).
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class HashMapPlaygroundComponent {
  entries: MapEntry[] = [
    { key: 'name',  value: 'Arun',   id: 1, highlighted: false },
    { key: 'city',  value: 'Chennai',id: 2, highlighted: false },
    { key: 'lang',  value: 'Java',   id: 3, highlighted: false },
  ];
  newKey   = '';
  newValue = '';
  log: { msg: string; isError: boolean }[] = [];
  private nextId = 10;

  put() {
    if (!this.newKey.trim()) { this.push('put(): key cannot be empty', true); return; }
    const existing = this.entries.find(e => e.key === this.newKey.trim());
    if (existing) {
      const old = existing.value;
      existing.value = this.newValue.trim();
      this.highlight(existing);
      this.push(`put("${existing.key}", "${existing.value}") → replaced "${old}"`, false);
    } else {
      const entry: MapEntry = { key: this.newKey.trim(), value: this.newValue.trim(), id: this.nextId++, highlighted: true };
      this.entries = [...this.entries, entry];
      setTimeout(() => entry.highlighted = false, 1200);
      this.push(`put("${entry.key}", "${entry.value}") → added`, false);
    }
    this.newKey = '';
  }

  getByKey() {
    const e = this.entries.find(e => e.key === this.newKey.trim());
    if (!e) { this.push(`get("${this.newKey}") → null (key not found)`, true); return; }
    this.highlight(e);
    this.push(`get("${this.newKey}") → "${e.value}"`, false);
  }

  containsKey() {
    const found = this.entries.some(e => e.key === this.newKey.trim());
    this.push(`containsKey("${this.newKey}") → ${found}`, false);
  }

  removeKey(key: string) {
    this.entries = this.entries.filter(e => e.key !== key);
    this.push(`remove("${key}") → entry removed`, false);
  }

  clearMap() { this.entries = []; this.push('clear() → HashMap is now empty', false); }

  private highlight(e: MapEntry) {
    e.highlighted = true;
    setTimeout(() => e.highlighted = false, 1200);
  }

  private push(msg: string, isError: boolean) {
    this.log = [{ msg, isError }, ...this.log].slice(0, 6);
  }
}
