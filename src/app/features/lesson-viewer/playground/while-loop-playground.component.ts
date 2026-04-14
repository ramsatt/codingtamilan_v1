import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface LoopStep {
  iteration: number;
  varValue: number;
  conditionResult: boolean;
  output: string | null;
}

interface LoopScenario {
  id: string;
  label: string;
  icon: string;
  initCode: string;       // e.g. "int i = 0"
  conditionTemplate: (v: number) => string;  // e.g. "i < 5"
  conditionCheck: (v: number) => boolean;
  bodyTemplate: (v: number) => string;       // output text or empty
  updateTemplate: (v: number) => number;     // returns next value
  updateCode: string;     // e.g. "i++"
  varName: string;
  initVal: number;
  maxSteps: number;
}

const SCENARIOS: LoopScenario[] = [
  {
    id: 'count-up',
    label: 'Count Up',
    icon: '🔼',
    varName: 'i',
    initVal: 0,
    initCode: 'int i = 0',
    conditionTemplate: v => `i < 5  →  ${v} < 5`,
    conditionCheck: v => v < 5,
    bodyTemplate: v => `${v}`,
    updateCode: 'i++',
    updateTemplate: v => v + 1,
    maxSteps: 6
  },
  {
    id: 'count-down',
    label: 'Countdown',
    icon: '🔽',
    varName: 'count',
    initVal: 5,
    initCode: 'int count = 5',
    conditionTemplate: v => `count > 0  →  ${v} > 0`,
    conditionCheck: v => v > 0,
    bodyTemplate: v => `${v}...`,
    updateCode: 'count--',
    updateTemplate: v => v - 1,
    maxSteps: 7
  },
  {
    id: 'sum',
    label: 'Running Sum',
    icon: '➕',
    varName: 'n',
    initVal: 1,
    initCode: 'int n = 1',
    conditionTemplate: v => `n <= 5  →  ${v} <= 5`,
    conditionCheck: v => v <= 5,
    bodyTemplate: v => `Adding ${v}`,
    updateCode: 'n++',
    updateTemplate: v => v + 1,
    maxSteps: 7
  },
  {
    id: 'even',
    label: 'Even Numbers',
    icon: '2️⃣',
    varName: 'i',
    initVal: 2,
    initCode: 'int i = 2',
    conditionTemplate: v => `i <= 10  →  ${v} <= 10`,
    conditionCheck: v => v <= 10,
    bodyTemplate: v => `${v}`,
    updateCode: 'i += 2',
    updateTemplate: v => v + 2,
    maxSteps: 6
  }
];

@Component({
  selector: 'app-while-loop-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">While Loop Visualizer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Step through the loop iteration by iteration</span>
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

          <!-- current var value badge -->
          <div class="ml-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <span class="text-[10px] text-slate-400 font-bold">{{ scenario.varName }} =</span>
            <span class="font-mono text-lg font-black text-slate-800">{{ currentVal }}</span>
          </div>
        </div>

        <!-- Main layout -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: step-by-step trace -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Execution Trace</p>
            <div class="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">

              <!-- Init -->
              <div class="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 font-mono text-xs text-blue-800">
                <i class="fa-solid fa-play-circle mr-1.5 text-blue-400"></i>
                {{ scenario.initCode }};
                <span class="ml-2 text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-sans font-bold">INIT</span>
              </div>

              @for (s of steps; track $index; let i = $index) {
                <!-- Condition check -->
                <div class="rounded-xl border px-3 py-2 font-mono text-xs"
                  [class.bg-emerald-50]="s.conditionResult"
                  [class.border-emerald-200]="s.conditionResult"
                  [class.text-emerald-800]="s.conditionResult"
                  [class.bg-red-50]="!s.conditionResult"
                  [class.border-red-200]="!s.conditionResult"
                  [class.text-red-800]="!s.conditionResult">
                  <span class="font-sans text-[9px] font-black mr-1.5 px-1 py-0.5 rounded"
                    [class.bg-emerald-100]="s.conditionResult"
                    [class.text-emerald-600]="s.conditionResult"
                    [class.bg-red-100]="!s.conditionResult"
                    [class.text-red-500]="!s.conditionResult">
                    CHECK
                  </span>
                  while ({{ scenario.conditionTemplate(s.varValue) }})
                  <span class="ml-2 font-sans font-black text-[10px]">→ {{ s.conditionResult }}</span>
                </div>

                @if (s.conditionResult && s.output !== null) {
                  <!-- Body executed -->
                  <div class="ml-4 rounded-xl bg-brand-50 border border-brand-100 px-3 py-2 font-mono text-xs text-brand-700">
                    <i class="fa-solid fa-terminal mr-1.5 text-brand-400"></i>
                    println("{{ s.output }}");
                    <span class="ml-2 font-sans text-[9px] bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded font-bold">ITER {{ s.iteration }}</span>
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
            <!-- Code -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-0.5 leading-relaxed">
                <div>
                  <span class="text-blue-400">int </span>
                  <span class="text-white">{{ scenario.varName }} = </span>
                  <span class="text-emerald-400">{{ scenario.initVal }}</span>
                  <span class="text-slate-500">;</span>
                </div>
                <div class="h-1"></div>
                <div [class.text-brand-400]="!done && steps.length > 0"
                     [class.text-slate-300]="done || steps.length === 0">
                  <span class="text-purple-400">while</span>
                  <span> (</span>
                  <span class="text-amber-300">{{ scenario.conditionTemplate(currentVal) }}</span>
                  <span>) &#123;</span>
                </div>
                <div class="pl-4">
                  <span class="text-emerald-400">System.out.println</span>
                  <span class="text-slate-300">(</span>
                  <span class="text-emerald-300">{{ scenario.varName }}</span>
                  <span class="text-slate-300">);</span>
                </div>
                <div class="pl-4">
                  <span class="text-white">{{ scenario.varName }} = </span>
                  <span class="text-amber-300">{{ scenario.varName }}</span>
                  <span class="text-slate-300"> ... </span>
                  <span class="text-slate-500">// {{ scenario.updateCode }}</span>
                </div>
                <div><span class="text-slate-300">&#125;</span></div>
              </div>
            </div>

            <!-- Console output -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm min-h-[5rem]">
                @if (outputs.length === 0) {
                  <span class="text-slate-600 italic text-xs">Hit "Next Step" or "Run All" to see output...</span>
                } @else {
                  @for (line of outputs; track $index) {
                    <div class="text-emerald-400">{{ line }}</div>
                  }
                }
              </div>
            </div>

            <!-- Iteration counter -->
            @if (steps.length > 0) {
              <div class="flex gap-2 flex-wrap">
                @for (s of passedSteps; track $index) {
                  <div class="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-black">
                    {{ s.iteration }}
                  </div>
                }
                @if (done) {
                  <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">
                    ✕
                  </div>
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
export class WhileLoopPlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];

  steps: LoopStep[] = [];
  currentVal = SCENARIOS[0].initVal;
  done = false;
  iteration = 0;

  get outputs(): string[] {
    return this.steps
      .filter(s => s.conditionResult && s.output !== null)
      .map(s => s.output!);
  }

  get passedSteps(): LoopStep[] {
    return this.steps.filter(s => s.conditionResult);
  }

  selectScenario(s: LoopScenario) {
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

    const passes = this.scenario.conditionCheck(this.currentVal);
    const loopStep: LoopStep = {
      iteration: this.iteration + 1,
      varValue: this.currentVal,
      conditionResult: passes,
      output: passes ? this.scenario.bodyTemplate(this.currentVal) : null
    };
    this.steps.push(loopStep);

    if (passes) {
      this.currentVal = this.scenario.updateTemplate(this.currentVal);
      this.iteration++;
    } else {
      this.done = true;
    }
  }

  runAll() {
    while (!this.done && this.steps.length < this.scenario.maxSteps) {
      this.step();
    }
  }
}
