import { Component } from '@angular/core';

@Component({
  selector: 'app-iterator-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Iterator Step-Through</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- List selector -->
        <div class="flex gap-2 flex-wrap">
          @for (l of lists; track l.id) {
            <button (click)="setList(l)"
              class="px-4 py-2 rounded-xl border-2 text-xs font-bold transition-all"
              [class.border-brand-500]="current.id === l.id" [class.bg-brand-50]="current.id === l.id" [class.text-brand-700]="current.id === l.id"
              [class.border-slate-200]="current.id !== l.id" [class.text-slate-600]="current.id !== l.id">
              {{ l.label }}
            </button>
          }
        </div>

        <!-- Elements visual -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">List Elements</p>
          <div class="flex gap-2 flex-wrap">
            @for (item of current.items; track $index; let i = $index) {
              <div class="rounded-xl border-2 px-4 py-3 text-center min-w-[60px] transition-all"
                [class.border-brand-500]="cursor === i && !done"
                [class.bg-brand-500]="cursor === i && !done"
                [class.text-white]="cursor === i && !done"
                [class.border-emerald-300]="cursor > i"
                [class.bg-emerald-50]="cursor > i"
                [class.text-emerald-700]="cursor > i"
                [class.border-slate-200]="cursor <= i && cursor !== i || cursor < i"
                [class.bg-slate-50]="cursor < i">
                <div class="font-mono text-sm font-black">{{ item }}</div>
                <div class="text-[9px] mt-0.5 font-bold">
                  @if (cursor === i && !done) { <span class="text-white">← current</span> }
                  @else if (cursor > i) { <span>visited ✓</span> }
                  @else { <span class="text-slate-400">index {{ i }}</span> }
                </div>
              </div>
            }
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Controls -->
          <div class="space-y-3">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Iterator Controls</p>

            <div class="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
              <!-- hasNext() -->
              <div class="flex items-center justify-between">
                <button (click)="callHasNext()"
                  class="px-5 py-2.5 rounded-xl border-2 border-amber-300 text-amber-700 text-xs font-black hover:bg-amber-50 transition-all">
                  it.hasNext()
                </button>
                @if (hasNextResult !== null) {
                  <span class="font-mono text-sm font-black px-4 py-2 rounded-xl"
                    [class.bg-emerald-100]="hasNextResult"
                    [class.text-emerald-700]="hasNextResult"
                    [class.bg-red-100]="!hasNextResult"
                    [class.text-red-700]="!hasNextResult">
                    {{ hasNextResult }}
                  </span>
                }
              </div>

              <!-- next() -->
              <div class="flex items-center justify-between">
                <button (click)="callNext()" [disabled]="done"
                  class="px-5 py-2.5 rounded-xl border-2 border-brand-300 text-brand-700 text-xs font-black hover:bg-brand-50 transition-all disabled:opacity-40">
                  it.next()
                </button>
                @if (nextResult !== null) {
                  <span class="font-mono text-sm font-black px-4 py-2 rounded-xl bg-brand-100 text-brand-700">
                    "{{ nextResult }}"
                  </span>
                }
              </div>

              <!-- Reset -->
              <button (click)="reset()"
                class="w-full py-2 border-2 border-slate-300 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-all">
                Reset Iterator
              </button>
            </div>

            @if (done) {
              <div class="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-700 font-bold text-center">
                ✓ Iterator exhausted — hasNext() = false
              </div>
            }
          </div>

          <!-- Code panel -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
              <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.util.Iterator</span>;</div>
              <div class="h-2"></div>
              <div>
                <span class="text-blue-400">Iterator</span>
                <span class="text-slate-300">&lt;</span>
                <span class="text-yellow-300">String</span>
                <span class="text-slate-300">&gt; it = list.</span>
                <span class="text-yellow-300">iterator</span>
                <span class="text-slate-300">();</span>
              </div>
              <div class="h-2"></div>
              <div [class.opacity-40]="done">
                <span class="text-purple-400">while</span>
                <span class="text-slate-300"> (it.</span>
                <span class="text-yellow-300">hasNext</span>
                <span class="text-slate-300">()) &#123;</span>
              </div>
              <div class="pl-4" [class.opacity-40]="done">
                <span class="text-blue-400">String</span>
                <span class="text-white"> item = it.</span>
                <span class="text-yellow-300">next</span>
                <span class="text-slate-300">();</span>
              </div>
              @if (nextResult !== null && !done) {
                <div class="pl-4 bg-brand-900/30 rounded px-2">
                  <span class="text-slate-500">// item = </span>
                  <span class="text-emerald-300">"{{ nextResult }}"</span>
                  <span class="text-slate-500"> (index {{ cursor - 1 }})</span>
                </div>
              }
              <div [class.opacity-40]="done"><span class="text-slate-300">&#125;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class IteratorPlaygroundComponent {
  lists = [
    { id: 'fruits', label: 'Fruits', items: ['Apple', 'Banana', 'Cherry', 'Date'] },
    { id: 'nums',   label: 'Numbers', items: ['10', '20', '30', '40', '50'] },
    { id: 'names',  label: 'Names',  items: ['Arun', 'Priya', 'Kumar', 'Devi'] },
  ];
  current = this.lists[0];
  cursor  = 0;
  done    = false;
  hasNextResult: boolean | null = null;
  nextResult: string | null = null;

  setList(l: typeof this.lists[0]) { this.current = l; this.reset(); }

  callHasNext() {
    this.hasNextResult = this.cursor < this.current.items.length;
  }

  callNext() {
    if (this.cursor >= this.current.items.length) { this.done = true; this.nextResult = null; return; }
    this.nextResult    = this.current.items[this.cursor];
    this.hasNextResult = null;
    this.cursor++;
    if (this.cursor >= this.current.items.length) this.done = true;
  }

  reset() {
    this.cursor        = 0;
    this.done          = false;
    this.hasNextResult = null;
    this.nextResult    = null;
  }
}
