import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Scenario {
  id: string;
  label: string;
  icon: string;
  varName: string;
  varType: string;
  unit: string;
  min: number;
  max: number;
  defaultVal: number;
  branches: Branch[];
}

interface Branch {
  label: string;            // e.g. "if (age >= 18)"
  condition: (v: number) => boolean;
  output: (v: number) => string;
  type: 'if' | 'else-if' | 'else';
  conditionCode: (v: number) => string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'age', label: 'Voting Age Checker', icon: '🗳️',
    varName: 'age', varType: 'int', unit: 'years', min: 1, max: 100, defaultVal: 20,
    branches: [
      { type: 'if',      label: 'if',      conditionCode: () => 'age >= 18',  condition: v => v >= 18, output: () => '"You can vote!"' },
      { type: 'else',    label: 'else',     conditionCode: () => '',           condition: () => true,   output: v => `"You must wait ${18 - v} more year(s)."` },
    ]
  },
  {
    id: 'grade', label: 'Grade Evaluator', icon: '📝',
    varName: 'score', varType: 'int', unit: 'points', min: 0, max: 100, defaultVal: 72,
    branches: [
      { type: 'if',      label: 'if',      conditionCode: () => 'score >= 90', condition: v => v >= 90, output: () => '"Grade: A — Excellent!"' },
      { type: 'else-if', label: 'else if', conditionCode: () => 'score >= 75', condition: v => v >= 75, output: () => '"Grade: B — Good job!"' },
      { type: 'else-if', label: 'else if', conditionCode: () => 'score >= 50', condition: v => v >= 50, output: () => '"Grade: C — Passed."' },
      { type: 'else',    label: 'else',     conditionCode: () => '',            condition: () => true,   output: () => '"Grade: F — Please retry."' },
    ]
  },
  {
    id: 'temp', label: 'Weather Advisor', icon: '🌡️',
    varName: 'temp', varType: 'int', unit: '°C', min: -20, max: 50, defaultVal: 28,
    branches: [
      { type: 'if',      label: 'if',      conditionCode: () => 'temp >= 35',  condition: v => v >= 35, output: () => '"Very hot! Stay hydrated."' },
      { type: 'else-if', label: 'else if', conditionCode: () => 'temp >= 20',  condition: v => v >= 20, output: () => '"Warm and pleasant day!"' },
      { type: 'else-if', label: 'else if', conditionCode: () => 'temp >= 10',  condition: v => v >= 10, output: () => '"Cool. Carry a jacket."' },
      { type: 'else',    label: 'else',     conditionCode: () => '',            condition: () => true,   output: () => '"Cold! Bundle up."' },
    ]
  },
  {
    id: 'speed', label: 'Speed Checker', icon: '🚗',
    varName: 'speed', varType: 'int', unit: 'km/h', min: 0, max: 200, defaultVal: 95,
    branches: [
      { type: 'if',      label: 'if',      conditionCode: () => 'speed > 120', condition: v => v > 120, output: () => '"Dangerous! Slow down."' },
      { type: 'else-if', label: 'else if', conditionCode: () => 'speed > 80',  condition: v => v > 80,  output: () => '"Within limit. Drive safe."' },
      { type: 'else',    label: 'else',     conditionCode: () => '',            condition: () => true,   output: () => '"Speed is fine."' },
    ]
  },
];

@Component({
  selector: 'app-if-else-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">If / Else Playground</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Move the slider to change the output</span>
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

        <!-- Value slider -->
        <div class="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-bold text-slate-700">
              <span class="font-mono text-brand-600">{{ scenario.varType }} {{ scenario.varName }}</span>
              <span class="text-slate-400 ml-1">({{ scenario.unit }})</span>
            </label>
            <span class="font-mono text-2xl font-black text-slate-800">{{ value }}</span>
          </div>
          <input [(ngModel)]="value" type="range"
            [min]="scenario.min" [max]="scenario.max"
            class="w-full accent-brand-500 cursor-pointer">
          <div class="flex justify-between text-[9px] text-slate-400">
            <span>{{ scenario.min }}</span>
            <span>{{ scenario.max }}</span>
          </div>
        </div>

        <!-- Flow diagram + code side by side -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: Branch flow -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Execution Flow</p>
            <div class="space-y-2">
              @for (branch of scenario.branches; track $index; let i = $index) {
                <div class="relative">
                  <!-- Connector line -->
                  @if (i > 0) {
                    <div class="absolute -top-2 left-6 w-px h-2 bg-slate-200"></div>
                  }
                  <div class="rounded-xl border-2 overflow-hidden transition-all"
                    [class.border-brand-500]="activeBranchIndex === i"
                    [class.shadow-md]="activeBranchIndex === i"
                    [class.border-slate-100]="activeBranchIndex !== i">

                    <!-- Branch label row -->
                    <div class="flex items-center gap-2 px-3 py-2"
                      [class.bg-brand-500]="activeBranchIndex === i"
                      [class.bg-slate-50]="activeBranchIndex !== i">
                      <!-- Status icon -->
                      <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black"
                        [class.bg-white]="activeBranchIndex === i"
                        [class.text-brand-600]="activeBranchIndex === i"
                        [class.bg-slate-200]="activeBranchIndex !== i"
                        [class.text-slate-400]="activeBranchIndex !== i">
                        {{ activeBranchIndex === i ? '▶' : '' }}
                      </div>
                      <span class="font-mono text-xs font-bold"
                        [class.text-white]="activeBranchIndex === i"
                        [class.text-slate-600]="activeBranchIndex !== i">
                        {{ branch.label }}
                        @if (branch.type !== 'else') {
                          ({{ branch.conditionCode(value) }})
                        }
                      </span>
                      <!-- true/false badge -->
                      @if (branch.type !== 'else') {
                        <span class="ml-auto text-[9px] font-black px-2 py-0.5 rounded-full"
                          [class.bg-white]="activeBranchIndex === i"
                          [class.text-brand-600]="activeBranchIndex === i"
                          [class.bg-emerald-100]="activeBranchIndex !== i && branch.condition(value)"
                          [class.text-emerald-700]="activeBranchIndex !== i && branch.condition(value)"
                          [class.bg-slate-200]="activeBranchIndex !== i && !branch.condition(value)"
                          [class.text-slate-500]="activeBranchIndex !== i && !branch.condition(value)">
                          {{ branch.condition(value) }}
                        </span>
                      } @else {
                        <span class="ml-auto text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-200 text-slate-500">fallback</span>
                      }
                    </div>

                    <!-- Output -->
                    @if (activeBranchIndex === i) {
                      <div class="px-4 py-2 bg-brand-50 border-t border-brand-100 font-mono text-xs text-brand-700">
                        <i class="fa-solid fa-terminal mr-1.5 text-brand-400"></i>
                        System.out.println({{ branch.output(value) }});
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Right: Code + Output -->
          <div class="space-y-4">
            <!-- Code panel -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-0.5 leading-relaxed">
                <!-- variable declaration -->
                <div><span class="text-blue-400">{{ scenario.varType }}</span><span class="text-white"> {{ scenario.varName }} = </span><span class="text-emerald-400">{{ value }}</span><span class="text-slate-500">;</span></div>
                <div class="h-2"></div>
                @for (branch of scenario.branches; track $index; let i = $index) {
                  <div [class.opacity-30]="activeBranchIndex !== i">
                    @if (branch.type === 'if') {
                      <div>
                        <span class="text-purple-400">if</span>
                        <span class="text-slate-300"> (</span>
                        <span class="text-amber-300">{{ branch.conditionCode(value) }}</span>
                        <span class="text-slate-300">) &#123;</span>
                      </div>
                    }
                    @if (branch.type === 'else-if') {
                      <div>
                        <span class="text-purple-400">&#125; else if</span>
                        <span class="text-slate-300"> (</span>
                        <span class="text-amber-300">{{ branch.conditionCode(value) }}</span>
                        <span class="text-slate-300">) &#123;</span>
                      </div>
                    }
                    @if (branch.type === 'else') {
                      <div><span class="text-purple-400">&#125; else</span><span class="text-slate-300"> &#123;</span></div>
                    }
                    <div class="pl-4">
                      <span class="text-emerald-400">System.out.println</span>
                      <span class="text-slate-300">(</span>
                      <span class="text-emerald-300">{{ branch.output(value) }}</span>
                      <span class="text-slate-300">);</span>
                    </div>
                  </div>
                }
                <div><span class="text-slate-300">&#125;</span></div>
              </div>
            </div>

            <!-- Console output -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm text-emerald-400">
                <i class="fa-solid fa-terminal text-emerald-700 mr-2"></i>
                {{ activeOutput }}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class IfElsePlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[1]; // default: Grade Evaluator
  value     = SCENARIOS[1].defaultVal;

  get activeBranchIndex(): number {
    return this.scenario.branches.findIndex(b => b.condition(this.value));
  }

  get activeOutput(): string {
    const b = this.scenario.branches[this.activeBranchIndex];
    return b ? b.output(this.value).replace(/^"|"$/g, '') : '';
  }

  selectScenario(s: Scenario) {
    this.scenario = s;
    this.value    = s.defaultVal;
  }
}
