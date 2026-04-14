import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ListNode { value: string; id: number; }

@Component({
  selector: 'app-linkedlist-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">LinkedList Visualizer</span>
        <span class="ml-auto text-[10px] font-mono text-slate-400">size: {{ nodes.length }}</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Node chain visual -->
        <div class="overflow-x-auto pb-2">
          <div class="flex items-center gap-0 min-w-max">
            <div class="text-xs text-slate-400 font-bold mr-2">HEAD</div>
            @for (node of nodes; track node.id; let last = $last) {
              <div class="flex items-center gap-0">
                <!-- Node box -->
                <div class="rounded-xl border-2 px-3 py-2 min-w-[64px] text-center transition-all"
                  [class.border-brand-500]="node.id === highlighted"
                  [class.bg-brand-50]="node.id === highlighted"
                  [class.border-slate-300]="node.id !== highlighted">
                  <div class="font-mono text-xs font-black text-slate-700">{{ node.value }}</div>
                  <div class="text-[9px] text-slate-400 mt-0.5">node</div>
                </div>
                <!-- Arrow -->
                @if (!last) {
                  <div class="flex items-center text-slate-400 text-xs font-mono px-1">→</div>
                }
              </div>
            }
            @if (nodes.length > 0) {
              <div class="flex items-center text-slate-400 text-xs font-mono px-1">→</div>
              <div class="text-xs text-slate-400 font-bold">null</div>
            }
            @if (nodes.length === 0) {
              <div class="border-2 border-dashed border-slate-200 rounded-xl px-6 py-3 text-xs text-slate-400 italic">
                LinkedList is empty
              </div>
            }
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-6">

          <!-- Controls -->
          <div class="space-y-3">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operations</p>
            <div class="flex gap-2">
              <input [(ngModel)]="newValue" placeholder="Value" (keyup.enter)="addLast()"
                class="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button (click)="addFirst()" class="py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-lg transition-all active:scale-95">addFirst()</button>
              <button (click)="addLast()"  class="py-2.5 bg-blue-500   hover:bg-blue-400   text-white text-xs font-black rounded-lg transition-all active:scale-95">addLast()</button>
              <button (click)="removeFirst()" [disabled]="nodes.length === 0" class="py-2.5 border-2 border-red-300 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition-all disabled:opacity-40">removeFirst()</button>
              <button (click)="removeLast()"  [disabled]="nodes.length === 0" class="py-2.5 border-2 border-red-300 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition-all disabled:opacity-40">removeLast()</button>
              <button (click)="peekFirst()" [disabled]="nodes.length === 0" class="py-2.5 border-2 border-amber-300 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-50 transition-all disabled:opacity-40">peekFirst()</button>
              <button (click)="peekLast()"  [disabled]="nodes.length === 0" class="py-2.5 border-2 border-amber-300 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-50 transition-all disabled:opacity-40">peekLast()</button>
            </div>

            <!-- Output -->
            <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-xs space-y-1 min-h-[50px]">
              @if (log.length === 0) { <span class="text-slate-600 italic">Console output...</span> }
              @for (l of log; track $index) {
                <div [class.text-emerald-400]="!l.isError" [class.text-red-400]="l.isError">
                  <i class="fa-solid fa-terminal text-slate-600 mr-1 text-[10px]"></i>{{ l.msg }}
                </div>
              }
            </div>
          </div>

          <!-- Code -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Java Code</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
              <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.util.LinkedList</span>;</div>
              <div class="h-2"></div>
              <div><span class="text-blue-400">LinkedList</span><span class="text-slate-300">&lt;</span><span class="text-yellow-300">String</span><span class="text-slate-300">&gt; list = </span><span class="text-purple-400">new </span><span class="text-blue-400">LinkedList</span><span class="text-slate-300">&lt;&gt;();</span></div>
              <div class="h-2"></div>
              <div><span class="text-white">list.</span><span class="text-yellow-300">addFirst</span><span class="text-slate-300">(value); </span><span class="text-slate-500">// add at head</span></div>
              <div><span class="text-white">list.</span><span class="text-yellow-300">addLast</span><span class="text-slate-300">(value);  </span><span class="text-slate-500">// add at tail</span></div>
              <div><span class="text-white">list.</span><span class="text-yellow-300">removeFirst</span><span class="text-slate-300">(); </span><span class="text-slate-500">// remove head</span></div>
              <div><span class="text-white">list.</span><span class="text-yellow-300">removeLast</span><span class="text-slate-300">();  </span><span class="text-slate-500">// remove tail</span></div>
              <div><span class="text-white">list.</span><span class="text-yellow-300">peekFirst</span><span class="text-slate-300">(); </span><span class="text-slate-500">// see head (no remove)</span></div>
              <div><span class="text-white">list.</span><span class="text-yellow-300">size</span><span class="text-slate-300">();       </span><span class="text-slate-500">// → {{ nodes.length }}</span></div>
            </div>
            <div class="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              <strong>LinkedList vs ArrayList:</strong> LinkedList is faster for frequent insertions/deletions at the start or middle, but slower for random access. Each node stores a value + a pointer to the next node.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class LinkedListPlaygroundComponent {
  nodes: ListNode[]   = [{ value: 'Alpha', id: 1 }, { value: 'Beta', id: 2 }, { value: 'Gamma', id: 3 }];
  newValue          = '';
  highlighted       = -1;
  log: { msg: string; isError: boolean }[] = [];
  private nextId    = 10;

  addFirst() {
    if (!this.newValue.trim()) return;
    const node: ListNode = { value: this.newValue.trim(), id: this.nextId++ };
    this.nodes = [node, ...this.nodes];
    this.flash(node.id);
    this.push(`addFirst("${node.value}") → HEAD is now "${node.value}"`, false);
    this.newValue = '';
  }

  addLast() {
    if (!this.newValue.trim()) return;
    const node: ListNode = { value: this.newValue.trim(), id: this.nextId++ };
    this.nodes = [...this.nodes, node];
    this.flash(node.id);
    this.push(`addLast("${node.value}") → TAIL is now "${node.value}"`, false);
    this.newValue = '';
  }

  removeFirst() {
    if (!this.nodes.length) return;
    const removed = this.nodes[0].value;
    this.nodes = this.nodes.slice(1);
    this.push(`removeFirst() → "${removed}" removed`, false);
  }

  removeLast() {
    if (!this.nodes.length) return;
    const removed = this.nodes[this.nodes.length - 1].value;
    this.nodes = this.nodes.slice(0, -1);
    this.push(`removeLast() → "${removed}" removed`, false);
  }

  peekFirst() {
    if (!this.nodes.length) return;
    this.flash(this.nodes[0].id);
    this.push(`peekFirst() → "${this.nodes[0].value}"`, false);
  }

  peekLast() {
    if (!this.nodes.length) return;
    this.flash(this.nodes[this.nodes.length - 1].id);
    this.push(`peekLast() → "${this.nodes[this.nodes.length - 1].value}"`, false);
  }

  private flash(id: number) {
    this.highlighted = id;
    setTimeout(() => this.highlighted = -1, 1200);
  }

  private push(msg: string, isError: boolean) {
    this.log = [{ msg, isError }, ...this.log].slice(0, 5);
  }
}
