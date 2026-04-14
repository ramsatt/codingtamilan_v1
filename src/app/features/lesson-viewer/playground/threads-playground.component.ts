import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

type ThreadState = 'idle' | 'running' | 'sleeping' | 'waiting' | 'terminated';

interface ThreadStep {
  t1: string;
  t2: string;
  t1State: ThreadState;
  t2State: ThreadState;
}

const STEPS: ThreadStep[] = [
  { t1: 'Thread 1 started',         t2: '(waiting to start)',          t1State: 'running',    t2State: 'idle' },
  { t1: 'Thread 1 running (0–100)', t2: 'Thread 2 started',            t1State: 'running',    t2State: 'running' },
  { t1: 'Thread 1 sleeping 500ms',  t2: 'Thread 2 running (0–100)',    t1State: 'sleeping',   t2State: 'running' },
  { t1: 'Thread 1 sleeping...',     t2: 'Thread 2 running (100–200)',  t1State: 'sleeping',   t2State: 'running' },
  { t1: 'Thread 1 woke up',         t2: 'Thread 2 running (200–300)',  t1State: 'running',    t2State: 'running' },
  { t1: 'Thread 1 running (100–200)', t2: 'Thread 2 sleeping 300ms',   t1State: 'running',    t2State: 'sleeping' },
  { t1: 'Thread 1 running (200–300)', t2: 'Thread 2 woke up',          t1State: 'running',    t2State: 'running' },
  { t1: 'Thread 1 finished',        t2: 'Thread 2 running (300–400)',  t1State: 'terminated', t2State: 'running' },
  { t1: 'Thread 1 terminated',      t2: 'Thread 2 finished',           t1State: 'terminated', t2State: 'terminated' },
];

const STATE_COLORS: Record<ThreadState, string> = {
  idle:       'bg-slate-100 text-slate-500 border-slate-200',
  running:    'bg-emerald-100 text-emerald-700 border-emerald-300',
  sleeping:   'bg-amber-100 text-amber-700 border-amber-300',
  waiting:    'bg-blue-100 text-blue-700 border-blue-200',
  terminated: 'bg-red-100 text-red-700 border-red-200',
};
const STATE_DOT: Record<ThreadState, string> = {
  idle:       'bg-slate-400',
  running:    'bg-emerald-500 animate-pulse',
  sleeping:   'bg-amber-400',
  waiting:    'bg-blue-500 animate-pulse',
  terminated: 'bg-red-400',
};

@Component({
  selector: 'app-threads-playground',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Multithreading Visualizer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Thread status cards -->
        <div class="grid sm:grid-cols-2 gap-4">
          @for (t of [0,1]; track t) {
            <div class="rounded-xl border-2 overflow-hidden transition-all"
              [ngClass]="t === 0 ? threadBorder(current.t1State) : threadBorder(current.t2State)">
              <div class="px-4 py-3 flex items-center gap-2 bg-slate-50 border-b border-slate-100">
                <div class="w-2.5 h-2.5 rounded-full transition-all"
                  [ngClass]="t === 0 ? stateDot(current.t1State) : stateDot(current.t2State)"></div>
                <span class="text-xs font-black uppercase tracking-widest">Thread {{ t+1 }}</span>
                <span class="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border"
                  [ngClass]="t === 0 ? stateColor(current.t1State) : stateColor(current.t2State)">
                  {{ t === 0 ? current.t1State : current.t2State }}
                </span>
              </div>
              <div class="px-4 py-3 font-mono text-xs text-slate-700">
                {{ t === 0 ? current.t1 : current.t2 }}
              </div>
            </div>
          }
        </div>

        <!-- Timeline bar -->
        <div class="space-y-2">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</p>
          <div class="relative">
            <!-- Thread 1 bar -->
            <div class="flex gap-1 mb-1.5">
              <span class="text-[10px] w-16 text-right text-slate-500 font-semibold pt-0.5">T1</span>
              <div class="flex gap-0.5 flex-1">
                @for (s of steps; track $index) {
                  <div class="flex-1 h-5 rounded transition-all"
                    [class.opacity-30]="$index > stepIdx"
                    [class.ring-2]="$index === stepIdx"
                    [class.ring-offset-1]="$index === stepIdx"
                    [class.ring-brand-400]="$index === stepIdx"
                    [ngClass]="stateBarColor(s.t1State)">
                  </div>
                }
              </div>
            </div>
            <!-- Thread 2 bar -->
            <div class="flex gap-1">
              <span class="text-[10px] w-16 text-right text-slate-500 font-semibold pt-0.5">T2</span>
              <div class="flex gap-0.5 flex-1">
                @for (s of steps; track $index) {
                  <div class="flex-1 h-5 rounded transition-all"
                    [class.opacity-30]="$index > stepIdx"
                    [class.ring-2]="$index === stepIdx"
                    [class.ring-offset-1]="$index === stepIdx"
                    [class.ring-brand-400]="$index === stepIdx"
                    [ngClass]="stateBarColor(s.t2State)">
                  </div>
                }
              </div>
            </div>
          </div>
          <div class="flex gap-2 text-[10px] font-semibold">
            @for (entry of legend; track entry.label) {
              <span class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-sm inline-block" [ngClass]="entry.color"></span>{{ entry.label }}
              </span>
            }
          </div>
        </div>

        <!-- Controls -->
        <div class="flex gap-3">
          <button (click)="prev()" [disabled]="stepIdx === 0"
            class="px-4 py-2 border-2 border-slate-200 text-xs font-black rounded-xl disabled:opacity-40 enabled:hover:border-brand-400 transition-all">
            ← Prev
          </button>
          <button (click)="autoRun()" [disabled]="running"
            class="flex-1 py-2 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white text-xs font-black rounded-xl transition-all active:scale-95">
            {{ running ? 'Running...' : '▶ Auto Simulate' }}
          </button>
          <button (click)="next()" [disabled]="stepIdx >= steps.length - 1"
            class="px-4 py-2 border-2 border-slate-200 text-xs font-black rounded-xl disabled:opacity-40 enabled:hover:border-brand-400 transition-all">
            Next →
          </button>
          <button (click)="reset()"
            class="px-4 py-2 border-2 border-slate-200 text-xs font-black rounded-xl hover:border-slate-400 transition-all">
            Reset
          </button>
        </div>

        <!-- Code snippet -->
        <div class="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed space-y-0.5">
          <div class="text-slate-500">// Create & start threads</div>
          <div><span class="text-blue-400">Thread</span><span class="text-slate-300"> t1 = </span><span class="text-blue-400">new</span><span class="text-slate-300"> Thread(() -&gt; &#123;</span></div>
          <div><span class="text-slate-300">  </span><span class="text-purple-400">for</span><span class="text-slate-300"> (</span><span class="text-purple-400">int</span><span class="text-slate-300"> i = 0; i &lt; 300; i++) &#123;</span></div>
          <div><span class="text-slate-300">    System.out.println(</span><span class="text-emerald-400">"T1: "</span><span class="text-slate-300"> + i);</span></div>
          <div><span class="text-slate-300">    </span><span class="text-purple-400">if</span><span class="text-slate-300"> (i == 100) Thread.sleep(500);</span></div>
          <div><span class="text-slate-300">  &#125;</span></div>
          <div><span class="text-slate-300">&#125;);</span></div>
          <div><span class="text-slate-300">t1.start(); t2.start();</span></div>
          <div><span class="text-slate-300">t1.join();  t2.join();</span></div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ThreadsPlaygroundComponent {
  steps = STEPS;
  stepIdx = 0;
  running = false;

  legend = [
    { label: 'Running',    color: 'bg-emerald-400' },
    { label: 'Sleeping',   color: 'bg-amber-300' },
    { label: 'Idle',       color: 'bg-slate-200' },
    { label: 'Terminated', color: 'bg-red-300' },
  ];

  get current() { return this.steps[this.stepIdx]; }

  prev() { if (this.stepIdx > 0) this.stepIdx--; }
  next() { if (this.stepIdx < this.steps.length - 1) this.stepIdx++; }
  reset() { this.stepIdx = 0; this.running = false; }

  async autoRun() {
    this.running = true;
    this.stepIdx = 0;
    for (let i = 0; i < this.steps.length; i++) {
      this.stepIdx = i;
      await new Promise(r => setTimeout(r, 700));
    }
    this.running = false;
  }

  threadBorder(s: ThreadState) {
    const map: Record<ThreadState, string> = {
      idle: 'border-slate-200', running: 'border-emerald-400', sleeping: 'border-amber-400',
      waiting: 'border-blue-400', terminated: 'border-red-300'
    };
    return map[s];
  }
  stateColor(s: ThreadState) { return STATE_COLORS[s]; }
  stateDot(s: ThreadState)   { return STATE_DOT[s]; }
  stateBarColor(s: ThreadState) {
    const map: Record<ThreadState, string> = {
      idle: 'bg-slate-200', running: 'bg-emerald-400', sleeping: 'bg-amber-300',
      waiting: 'bg-blue-300', terminated: 'bg-red-300'
    };
    return map[s];
  }
}
