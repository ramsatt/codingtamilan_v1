import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StackFrame {
  call: string;
  depth: number;
  state: 'pending' | 'active' | 'returning';
  returnVal: number;
}

@Component({
  selector: 'app-recursion-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Recursion Visualizer</span>
        </div>
        <span class="text-[10px] text-slate-400">Watch the call stack build and unwind</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Controls -->
        <div class="flex flex-wrap gap-4 items-end">
          <!-- Mode -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Function</p>
            <div class="flex gap-2">
              @for (m of ['factorial', 'fibonacci']; track m) {
                <button (click)="setMode(m); reset()"
                  class="px-4 py-2 rounded-xl border-2 text-xs font-bold transition-all"
                  [class.border-brand-500]="mode === m" [class.bg-brand-50]="mode === m" [class.text-brand-700]="mode === m"
                  [class.border-slate-200]="mode !== m" [class.text-slate-600]="mode !== m">
                  {{ m === 'factorial' ? 'n! Factorial' : 'fib(n) Fibonacci' }}
                </button>
              }
            </div>
          </div>

          <!-- n -->
          <div class="flex-1 min-w-[180px]">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">n = {{ n }}</label>
            <input type="range" [(ngModel)]="n" [min]="1" [max]="mode === 'factorial' ? 8 : 7"
              (ngModelChange)="reset()" class="w-full accent-brand-500 cursor-pointer">
            <div class="flex justify-between text-[9px] text-slate-400 mt-0.5">
              <span>1</span><span>{{ mode === 'factorial' ? 8 : 7 }}</span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-2">
            <button (click)="run()" [disabled]="running"
              class="px-4 py-2 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center gap-1">
              <i class="fa-solid fa-play text-xs"></i> Run
            </button>
            <button (click)="reset()"
              class="px-4 py-2 border border-slate-300 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all">
              Reset
            </button>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Call stack visual -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Call Stack</p>
            <div class="space-y-1.5 min-h-[200px]">
              @if (stack.length === 0) {
                <div class="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs">
                  Stack is empty. Hit Run to start.
                </div>
              }
              @for (frame of stack; track $index; let i = $index) {
                <div class="rounded-xl border-2 px-4 py-2.5 flex justify-between items-center transition-all duration-300"
                  [class.border-brand-400]="frame.state === 'active'"
                  [class.bg-brand-50]="frame.state === 'active'"
                  [class.border-emerald-400]="frame.state === 'returning'"
                  [class.bg-emerald-50]="frame.state === 'returning'"
                  [class.border-slate-200]="frame.state === 'pending'"
                  [class.bg-slate-50]="frame.state === 'pending'"
                  [style.margin-left.px]="frame.depth * 12">
                  <span class="font-mono text-xs font-bold"
                    [class.text-brand-700]="frame.state === 'active'"
                    [class.text-emerald-700]="frame.state === 'returning'"
                    [class.text-slate-600]="frame.state === 'pending'">
                    {{ frame.call }}
                  </span>
                  @if (frame.state === 'returning') {
                    <span class="text-xs font-mono text-emerald-600 font-black">→ {{ frame.returnVal }}</span>
                  }
                  @if (frame.state === 'active') {
                    <span class="text-[10px] bg-brand-500 text-white px-2 py-0.5 rounded-full font-bold">active</span>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Code + result -->
          <div class="space-y-4">
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed">
                @if (mode === 'factorial') {
                  <div><span class="text-blue-400">static int</span> <span class="text-yellow-300">factorial</span>(<span class="text-blue-300">int</span> <span class="text-white">n</span>) &#123;</div>
                  <div class="pl-4"><span class="text-purple-400">if</span> (n == <span class="text-emerald-400">0</span>) <span class="text-purple-400">return</span> <span class="text-emerald-400">1</span>;</div>
                  <div class="pl-4"><span class="text-purple-400">return</span> <span class="text-white">n</span> * <span class="text-yellow-300">factorial</span>(n - <span class="text-emerald-400">1</span>);</div>
                  <div>&#125;</div>
                } @else {
                  <div><span class="text-blue-400">static int</span> <span class="text-yellow-300">fibonacci</span>(<span class="text-blue-300">int</span> <span class="text-white">n</span>) &#123;</div>
                  <div class="pl-4"><span class="text-purple-400">if</span> (n &lt;= <span class="text-emerald-400">1</span>) <span class="text-purple-400">return</span> <span class="text-white">n</span>;</div>
                  <div class="pl-4"><span class="text-purple-400">return</span> <span class="text-yellow-300">fibonacci</span>(n-<span class="text-emerald-400">1</span>) + <span class="text-yellow-300">fibonacci</span>(n-<span class="text-emerald-400">2</span>);</div>
                  <div>&#125;</div>
                }
              </div>
            </div>

            <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm min-h-[56px] flex items-center gap-2">
              <i class="fa-solid fa-terminal text-emerald-700 text-xs"></i>
              @if (result !== null) {
                <span class="text-emerald-400">
                  {{ mode }}({{ n }}) = <strong class="text-emerald-300">{{ result }}</strong>
                </span>
              } @else if (running) {
                <span class="text-brand-400 animate-pulse">Computing...</span>
              } @else {
                <span class="text-slate-600 italic">Press Run to compute</span>
              }
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              <strong>Base case:</strong> The recursion stops at
              {{ mode === 'factorial' ? 'n == 0 (returns 1)' : 'n <= 1 (returns n)' }}.
              Without a base case, the function would call itself forever — causing a <code class="bg-amber-100 px-1 rounded">StackOverflowError</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class RecursionPlaygroundComponent {
  mode: 'factorial' | 'fibonacci' = 'factorial';
  n = 4;
  stack: StackFrame[] = [];
  result: number | null = null;
  running = false;

  setMode(m: string) { this.mode = m as any; }

  reset() { this.stack = []; this.result = null; this.running = false; }

  async run() {
    this.reset();
    this.running = true;
    if (this.mode === 'factorial') {
      await this.animateFactorial(this.n, 0);
    } else {
      await this.animateFib(this.n, 0);
    }
    this.running = false;
  }

  private delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

  private async animateFactorial(n: number, depth: number): Promise<number> {
    const call = `factorial(${n})`;
    const frame: StackFrame = { call, depth, state: 'active', returnVal: 0 };
    this.stack = [frame, ...this.stack];
    await this.delay(350);

    let val: number;
    if (n === 0) {
      val = 1;
    } else {
      val = n * await this.animateFactorial(n - 1, depth + 1);
    }

    frame.state = 'returning';
    frame.returnVal = val;
    await this.delay(300);
    if (depth === 0) this.result = val;
    return val;
  }

  private async animateFib(n: number, depth: number): Promise<number> {
    if (depth > 12) return n <= 1 ? n : 1; // guard runaway
    const call = `fibonacci(${n})`;
    const frame: StackFrame = { call, depth, state: 'active', returnVal: 0 };
    this.stack = [frame, ...this.stack];
    await this.delay(280);

    let val: number;
    if (n <= 1) {
      val = n;
    } else {
      val = await this.animateFib(n - 1, depth + 1) + await this.animateFib(n - 2, depth + 1);
    }

    frame.state = 'returning';
    frame.returnVal = val;
    await this.delay(250);
    if (depth === 0) this.result = val;
    return val;
  }
}
