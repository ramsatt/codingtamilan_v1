import { Component } from '@angular/core';

type Mode = 'break' | 'continue' | 'both';

interface TraceStep {
  i: number;
  action: 'check' | 'break' | 'continue' | 'print';
  label: string;
}

@Component({
  selector: 'app-break-continue-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Break &amp; Continue Visualizer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">See how break and continue affect loop flow</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Mode selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Mode</p>
          <div class="grid grid-cols-3 gap-3">
            <button (click)="setMode('break')"
              class="px-4 py-3 rounded-xl border-2 text-center transition-all"
              [class.border-red-400]="mode === 'break'"
              [class.bg-red-50]="mode === 'break'"
              [class.border-slate-100]="mode !== 'break'"
              [class.bg-slate-50]="mode !== 'break'">
              <p class="text-xl mb-1">🛑</p>
              <p class="text-xs font-black" [class.text-red-600]="mode === 'break'" [class.text-slate-500]="mode !== 'break'">break</p>
              <p class="text-[10px] leading-tight mt-0.5" [class.text-red-400]="mode === 'break'" [class.text-slate-400]="mode !== 'break'">exits the loop</p>
            </button>
            <button (click)="setMode('continue')"
              class="px-4 py-3 rounded-xl border-2 text-center transition-all"
              [class.border-amber-400]="mode === 'continue'"
              [class.bg-amber-50]="mode === 'continue'"
              [class.border-slate-100]="mode !== 'continue'"
              [class.bg-slate-50]="mode !== 'continue'">
              <p class="text-xl mb-1">⏭️</p>
              <p class="text-xs font-black" [class.text-amber-600]="mode === 'continue'" [class.text-slate-500]="mode !== 'continue'">continue</p>
              <p class="text-[10px] leading-tight mt-0.5" [class.text-amber-400]="mode === 'continue'" [class.text-slate-400]="mode !== 'continue'">skips iteration</p>
            </button>
            <button (click)="setMode('both')"
              class="px-4 py-3 rounded-xl border-2 text-center transition-all"
              [class.border-brand-500]="mode === 'both'"
              [class.bg-brand-50]="mode === 'both'"
              [class.border-slate-100]="mode !== 'both'"
              [class.bg-slate-50]="mode !== 'both'">
              <p class="text-xl mb-1">🔀</p>
              <p class="text-xs font-black" [class.text-brand-600]="mode === 'both'" [class.text-slate-500]="mode !== 'both'">both</p>
              <p class="text-[10px] leading-tight mt-0.5" [class.text-brand-400]="mode === 'both'" [class.text-slate-400]="mode !== 'both'">skip 3, stop at 7</p>
            </button>
          </div>
        </div>

        <!-- Main layout -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: code -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5">
              <div><span class="text-purple-400">for</span><span class="text-slate-300"> (</span><span class="text-blue-400">int </span><span class="text-white">i = 1</span><span class="text-slate-500">; </span><span class="text-amber-300">i &lt;= 9</span><span class="text-slate-500">; </span><span class="text-emerald-400">i++</span><span class="text-slate-300">) &#123;</span></div>

              @if (mode === 'continue' || mode === 'both') {
                <div class="pl-4">
                  <span class="text-purple-400">if</span>
                  <span class="text-slate-300"> (i == </span>
                  <span class="text-emerald-400">{{ mode === 'both' ? '3' : '4' }}</span>
                  <span class="text-slate-300">) &#123;</span>
                </div>
                <div class="pl-8">
                  <span class="text-amber-400">continue</span><span class="text-slate-500">;</span>
                  <span class="text-slate-600 ml-2">// skip i == {{ mode === 'both' ? '3' : '4' }}</span>
                </div>
                <div class="pl-4"><span class="text-slate-300">&#125;</span></div>
              }

              @if (mode === 'break' || mode === 'both') {
                <div class="pl-4">
                  <span class="text-purple-400">if</span>
                  <span class="text-slate-300"> (i == </span>
                  <span class="text-emerald-400">{{ mode === 'both' ? '7' : '5' }}</span>
                  <span class="text-slate-300">) &#123;</span>
                </div>
                <div class="pl-8">
                  <span class="text-red-400">break</span><span class="text-slate-500">;</span>
                  <span class="text-slate-600 ml-2">// stop at i == {{ mode === 'both' ? '7' : '5' }}</span>
                </div>
                <div class="pl-4"><span class="text-slate-300">&#125;</span></div>
              }

              <div class="pl-4">
                <span class="text-emerald-400">System.out.println</span><span class="text-slate-300">(i);</span>
              </div>
              <div><span class="text-slate-300">&#125;</span></div>
            </div>
          </div>

          <!-- Right: trace + output -->
          <div class="space-y-4">
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Execution Trace</p>
              <div class="space-y-1 max-h-[280px] overflow-y-auto pr-1">
                @for (step of trace; track $index) {
                  @if (step.action === 'print') {
                    <div class="flex items-center gap-2 rounded-lg bg-brand-50 border border-brand-100 px-3 py-1.5">
                      <span class="w-6 h-6 rounded-full bg-brand-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">{{ step.i }}</span>
                      <i class="fa-solid fa-terminal text-brand-400 text-[10px]"></i>
                      <span class="font-mono text-xs text-brand-700">println({{ step.i }})</span>
                    </div>
                  }
                  @if (step.action === 'continue') {
                    <div class="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5">
                      <span class="w-6 h-6 rounded-full bg-amber-400 text-white text-[10px] font-black flex items-center justify-center shrink-0">{{ step.i }}</span>
                      <i class="fa-solid fa-forward text-amber-400 text-[10px]"></i>
                      <span class="text-xs text-amber-700 font-bold">continue — skipped i = {{ step.i }}</span>
                    </div>
                  }
                  @if (step.action === 'break') {
                    <div class="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5">
                      <span class="w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">{{ step.i }}</span>
                      <i class="fa-solid fa-stop text-red-400 text-[10px]"></i>
                      <span class="text-xs text-red-700 font-bold">break — loop exits at i = {{ step.i }}</span>
                    </div>
                  }
                }
              </div>
            </div>

            <!-- Console output -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm min-h-[3rem]">
                @for (line of output; track $index) {
                  <div class="text-emerald-400">{{ line }}</div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex flex-wrap gap-3 text-[10px]">
          <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100 font-bold">
            <span class="w-3 h-3 rounded-full bg-brand-500 inline-block"></span> Printed
          </span>
          <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 font-bold">
            <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Skipped (continue)
          </span>
          <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 font-bold">
            <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Stopped (break)
          </span>
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class BreakContinuePlaygroundComponent {
  mode: Mode = 'break';
  trace: TraceStep[] = [];
  output: string[] = [];

  constructor() { this.run(); }

  setMode(m: Mode) {
    this.mode = m;
    this.run();
  }

  run() {
    this.trace = [];
    this.output = [];

    const skipAt = this.mode === 'continue' ? 4 : this.mode === 'both' ? 3 : -1;
    const stopAt = this.mode === 'break' ? 5 : this.mode === 'both' ? 7 : -1;

    for (let i = 1; i <= 9; i++) {
      if (stopAt !== -1 && i === stopAt) {
        this.trace.push({ i, action: 'break', label: `break at i=${i}` });
        break;
      }
      if (skipAt !== -1 && i === skipAt) {
        this.trace.push({ i, action: 'continue', label: `continue at i=${i}` });
        continue;
      }
      this.trace.push({ i, action: 'print', label: `${i}` });
      this.output.push(`${i}`);
    }
  }
}
