import { Component } from '@angular/core';

interface ForScenario {
  id: string;
  label: string;
  icon: string;
  init: string;
  initVal: number;
  condition: (i: number) => boolean;
  conditionCode: (i: number) => string;
  update: (i: number) => number;
  updateCode: string;
  body: (i: number) => string;
  varName: string;
  maxSteps: number;
}

const SCENARIOS: ForScenario[] = [
  {
    id: 'count',
    label: 'Count 0–4',
    icon: '🔢',
    varName: 'i',
    init: 'int i = 0',
    initVal: 0,
    condition: i => i < 5,
    conditionCode: i => `i < 5  (${i} < 5)`,
    update: i => i + 1,
    updateCode: 'i++',
    body: i => `${i}`,
    maxSteps: 6
  },
  {
    id: 'even',
    label: 'Even 2–10',
    icon: '✌️',
    varName: 'i',
    init: 'int i = 2',
    initVal: 2,
    condition: i => i <= 10,
    conditionCode: i => `i <= 10  (${i} <= 10)`,
    update: i => i + 2,
    updateCode: 'i += 2',
    body: i => `${i}`,
    maxSteps: 6
  },
  {
    id: 'countdown',
    label: 'Countdown',
    icon: '🚀',
    varName: 'i',
    init: 'int i = 5',
    initVal: 5,
    condition: i => i >= 1,
    conditionCode: i => `i >= 1  (${i} >= 1)`,
    update: i => i - 1,
    updateCode: 'i--',
    body: i => `${i}...`,
    maxSteps: 6
  },
  {
    id: 'squares',
    label: 'Squares',
    icon: '⬛',
    varName: 'i',
    init: 'int i = 1',
    initVal: 1,
    condition: i => i <= 5,
    conditionCode: i => `i <= 5  (${i} <= 5)`,
    update: i => i + 1,
    updateCode: 'i++',
    body: i => `${i}² = ${i * i}`,
    maxSteps: 6
  }
];

@Component({
  selector: 'app-for-loop-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">For Loop Visualizer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Step through init → condition → body → update</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Scenario</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            @for (s of scenarios; track s.id) {
              <button (click)="selectScenario(s)"
                class="px-3 py-2.5 rounded-xl border-2 text-left transition-all"
                [class.border-brand-500]="scenario.id === s.id"
                [class.bg-brand-50]="scenario.id === s.id"
                [class.border-slate-100]="scenario.id !== s.id"
                [class.bg-slate-50]="scenario.id !== s.id">
                <p class="text-base mb-0.5">{{ s.icon }}</p>
                <p class="text-[10px] font-bold leading-tight"
                  [class.text-brand-700]="scenario.id === s.id"
                  [class.text-slate-600]="scenario.id !== s.id">{{ s.label }}</p>
              </button>
            }
          </div>
        </div>

        <!-- for(...) anatomy strip -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Loop Anatomy</p>
          <div class="bg-slate-950 rounded-xl border border-slate-800 px-4 py-4 font-mono text-sm overflow-x-auto">
            <span class="text-purple-400">for</span>
            <span class="text-slate-300">(</span>
            <!-- init -->
            <span class="inline-flex flex-col items-center mx-1">
              <span class="text-blue-400 border-b-2 border-blue-400 pb-0.5">{{ scenario.init }}</span>
              <span class="text-[9px] text-blue-400 font-sans font-black mt-1">INIT</span>
            </span>
            <span class="text-slate-500">;</span>
            <!-- condition -->
            <span class="inline-flex flex-col items-center mx-1">
              <span class="text-amber-300 border-b-2 border-amber-300 pb-0.5">{{ scenario.conditionCode(currentVal) }}</span>
              <span class="text-[9px] text-amber-400 font-sans font-black mt-1">CONDITION</span>
            </span>
            <span class="text-slate-500">;</span>
            <!-- update -->
            <span class="inline-flex flex-col items-center mx-1">
              <span class="text-emerald-400 border-b-2 border-emerald-400 pb-0.5">{{ scenario.updateCode }}</span>
              <span class="text-[9px] text-emerald-400 font-sans font-black mt-1">UPDATE</span>
            </span>
            <span class="text-slate-300">) &#123; ... &#125;</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-3">
          <button (click)="reset()"
            class="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5">
            <i class="fa-solid fa-rotate-left text-[10px]"></i> Reset
          </button>
          @if (!done) {
            <button (click)="step()"
              class="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-forward-step text-[10px]"></i> Next Step
            </button>
            <button (click)="runAll()"
              class="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-play text-[10px]"></i> Run All
            </button>
          } @else {
            <span class="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <i class="fa-solid fa-circle-check mr-1"></i> Loop finished
            </span>
          }
          <div class="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <span class="text-[10px] text-slate-400 font-bold">{{ scenario.varName }} =</span>
            <span class="font-mono text-lg font-black text-slate-800">{{ currentVal }}</span>
          </div>
        </div>

        <!-- Main layout -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: step trace -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Execution Trace</p>
            <div class="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">

              <!-- INIT badge -->
              <div class="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 font-mono text-xs text-blue-800">
                <span class="font-sans text-[9px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded mr-1.5">INIT</span>
                {{ scenario.init }};
              </div>

              @for (s of steps; track $index) {
                <!-- Condition -->
                <div class="rounded-xl border px-3 py-2 font-mono text-xs"
                  [class.bg-emerald-50]="s.passes"
                  [class.border-emerald-200]="s.passes"
                  [class.text-emerald-800]="s.passes"
                  [class.bg-red-50]="!s.passes"
                  [class.border-red-200]="!s.passes"
                  [class.text-red-800]="!s.passes">
                  <span class="font-sans text-[9px] font-black mr-1.5 px-1 py-0.5 rounded"
                    [class.bg-emerald-100]="s.passes"
                    [class.text-emerald-600]="s.passes"
                    [class.bg-red-100]="!s.passes"
                    [class.text-red-500]="!s.passes">CHECK</span>
                  {{ scenario.conditionCode(s.before) }} → {{ s.passes }}
                </div>

                @if (s.passes) {
                  <!-- Body -->
                  <div class="ml-4 rounded-xl bg-brand-50 border border-brand-100 px-3 py-2 font-mono text-xs text-brand-700">
                    <i class="fa-solid fa-terminal mr-1.5 text-brand-400"></i>
                    println("{{ s.output }}");
                    <span class="ml-1 font-sans text-[9px] bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded font-bold">ITER {{ s.iteration }}</span>
                  </div>
                  <!-- Update -->
                  <div class="ml-4 rounded-xl bg-slate-100 border border-slate-200 px-3 py-2 font-mono text-xs text-slate-600">
                    <span class="font-sans text-[9px] font-black bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded mr-1.5">UPDATE</span>
                    {{ scenario.varName }} → {{ s.after }}  ({{ scenario.updateCode }})
                  </div>
                }
              }

              @if (done) {
                <div class="rounded-xl bg-slate-100 border border-slate-200 px-3 py-2 text-xs text-slate-500 font-bold text-center">
                  <i class="fa-solid fa-stop-circle mr-1"></i> Condition false — loop exits
                </div>
              }
            </div>
          </div>

          <!-- Right: code + output -->
          <div class="space-y-4">
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-0.5 leading-relaxed">
                <div>
                  <span class="text-purple-400">for</span>
                  <span class="text-slate-300"> (</span>
                  <span class="text-blue-400">{{ scenario.init }}</span>
                  <span class="text-slate-500">; </span>
                  <span class="text-amber-300">{{ scenario.conditionCode(currentVal) }}</span>
                  <span class="text-slate-500">; </span>
                  <span class="text-emerald-400">{{ scenario.updateCode }}</span>
                  <span class="text-slate-300">) &#123;</span>
                </div>
                <div class="pl-4">
                  <span class="text-emerald-400">System.out.println</span>
                  <span class="text-slate-300">(</span>
                  <span class="text-emerald-300">{{ scenario.varName }}</span>
                  <span class="text-slate-300">);</span>
                </div>
                <div><span class="text-slate-300">&#125;</span></div>
              </div>
            </div>

            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm min-h-[5rem]">
                @if (outputs.length === 0) {
                  <span class="text-slate-600 italic text-xs">Hit "Next Step" or "Run All"...</span>
                } @else {
                  @for (line of outputs; track $index) {
                    <div class="text-emerald-400">{{ line }}</div>
                  }
                }
              </div>
            </div>

            <!-- Iteration bubbles -->
            @if (passedSteps.length > 0) {
              <div class="flex gap-2 flex-wrap">
                @for (s of passedSteps; track $index) {
                  <div class="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-black">
                    {{ s.iteration }}
                  </div>
                }
                @if (done) {
                  <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">✕</div>
                }
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ForLoopPlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];

  steps: Array<{ before: number; after: number; passes: boolean; output: string; iteration: number }> = [];
  currentVal = SCENARIOS[0].initVal;
  done = false;
  iteration = 0;

  get outputs(): string[] {
    return this.steps.filter(s => s.passes).map(s => s.output);
  }

  get passedSteps() {
    return this.steps.filter(s => s.passes);
  }

  selectScenario(s: ForScenario) {
    this.scenario = s;
    this.reset();
  }

  reset() {
    this.steps = [];
    this.currentVal = this.scenario.initVal;
    this.done = false;
    this.iteration = 0;
  }

  step() {
    if (this.done) return;
    if (this.steps.length >= this.scenario.maxSteps) { this.done = true; return; }

    const before = this.currentVal;
    const passes = this.scenario.condition(before);

    if (passes) {
      this.iteration++;
      const after = this.scenario.update(before);
      this.steps.push({ before, after, passes: true, output: this.scenario.body(before), iteration: this.iteration });
      this.currentVal = after;
    } else {
      this.steps.push({ before, after: before, passes: false, output: '', iteration: this.iteration });
      this.done = true;
    }
  }

  runAll() {
    while (!this.done && this.steps.length < this.scenario.maxSteps) {
      this.step();
    }
  }
}
