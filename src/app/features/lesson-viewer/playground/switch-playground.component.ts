import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SwitchCase {
  value: string | number;
  label: string;
  output: string;
}

interface SwitchScenario {
  id: string;
  label: string;
  icon: string;
  varName: string;
  varType: string;
  cases: SwitchCase[];
  defaultOutput: string;
}

const SCENARIOS: SwitchScenario[] = [
  {
    id: 'day',
    label: 'Day of Week',
    icon: '📅',
    varName: 'day',
    varType: 'int',
    cases: [
      { value: 1, label: '1', output: 'Monday' },
      { value: 2, label: '2', output: 'Tuesday' },
      { value: 3, label: '3', output: 'Wednesday' },
      { value: 4, label: '4', output: 'Thursday' },
      { value: 5, label: '5', output: 'Friday' },
      { value: 6, label: '6', output: 'Saturday' },
      { value: 7, label: '7', output: 'Sunday' },
    ],
    defaultOutput: 'Invalid day number'
  },
  {
    id: 'season',
    label: 'Season',
    icon: '🌤️',
    varName: 'month',
    varType: 'int',
    cases: [
      { value: 12, label: '12 (Dec)', output: 'Winter' },
      { value: 1,  label: '1 (Jan)',  output: 'Winter' },
      { value: 2,  label: '2 (Feb)',  output: 'Winter' },
      { value: 3,  label: '3 (Mar)',  output: 'Spring' },
      { value: 4,  label: '4 (Apr)',  output: 'Spring' },
      { value: 5,  label: '5 (May)',  output: 'Spring' },
      { value: 6,  label: '6 (Jun)',  output: 'Summer' },
      { value: 7,  label: '7 (Jul)',  output: 'Summer' },
      { value: 8,  label: '8 (Aug)',  output: 'Summer' },
      { value: 9,  label: '9 (Sep)',  output: 'Autumn' },
      { value: 10, label: '10 (Oct)', output: 'Autumn' },
      { value: 11, label: '11 (Nov)', output: 'Autumn' },
    ],
    defaultOutput: 'Invalid month'
  },
  {
    id: 'grade',
    label: 'Grade Letter',
    icon: '📝',
    varName: 'grade',
    varType: 'char',
    cases: [
      { value: 'A', label: 'A', output: 'Excellent! Keep it up.' },
      { value: 'B', label: 'B', output: 'Good job! Almost there.' },
      { value: 'C', label: 'C', output: 'Passed. Can do better.' },
      { value: 'D', label: 'D', output: 'Below average. Study more.' },
      { value: 'F', label: 'F', output: 'Failed. Please retry.' },
    ],
    defaultOutput: 'Invalid grade entered'
  },
  {
    id: 'direction',
    label: 'Compass',
    icon: '🧭',
    varName: 'direction',
    varType: 'String',
    cases: [
      { value: 'N', label: 'N', output: 'Heading North' },
      { value: 'S', label: 'S', output: 'Heading South' },
      { value: 'E', label: 'E', output: 'Heading East' },
      { value: 'W', label: 'W', output: 'Heading West' },
    ],
    defaultOutput: 'Unknown direction'
  }
];

@Component({
  selector: 'app-switch-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Switch Statement Playground</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Click a case value to see which block runs</span>
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

        <!-- Main layout -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: case picker + switch flow -->
          <div class="space-y-4">
            <!-- Value picker -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pick a Value</p>
              <div class="flex flex-wrap gap-2">
                @for (c of scenario.cases; track c.value) {
                  <button (click)="selectCase(c)"
                    class="px-3 py-1.5 rounded-lg border-2 font-mono text-sm font-bold transition-all"
                    [class.border-brand-500]="selectedCase?.value === c.value"
                    [class.bg-brand-500]="selectedCase?.value === c.value"
                    [class.text-white]="selectedCase?.value === c.value"
                    [class.border-slate-200]="selectedCase?.value !== c.value"
                    [class.bg-slate-50]="selectedCase?.value !== c.value"
                    [class.text-slate-700]="selectedCase?.value !== c.value">
                    {{ scenario.varType === 'char' ? "'" + c.label + "'" : scenario.varType === 'String' ? '"' + c.label + '"' : c.label }}
                  </button>
                }
                <!-- default trigger -->
                <button (click)="selectDefault()"
                  class="px-3 py-1.5 rounded-lg border-2 font-mono text-sm font-bold transition-all"
                  [class.border-amber-400]="isDefault"
                  [class.bg-amber-400]="isDefault"
                  [class.text-white]="isDefault"
                  [class.border-slate-200]="!isDefault"
                  [class.bg-slate-50]="!isDefault"
                  [class.text-slate-400]="!isDefault">
                  ?
                </button>
              </div>
            </div>

            <!-- Switch flow -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Execution Flow</p>
              <div class="space-y-1.5">
                <!-- switch(...) header -->
                <div class="rounded-xl bg-slate-800 px-4 py-2.5 font-mono text-xs text-slate-300">
                  <span class="text-purple-400">switch</span>
                  <span class="text-slate-300"> (</span>
                  <span class="text-amber-300">{{ scenario.varName }}</span>
                  <span class="text-slate-300">) &#123;</span>
                </div>

                <!-- Cases in flow -->
                @for (c of scenario.cases; track c.value; let i = $index) {
                  <!-- Deduplicate by output for season scenario display -->
                  @if (i === 0 || c.output !== scenario.cases[i-1].output || scenario.id !== 'season') {
                    <div class="rounded-xl border-2 overflow-hidden transition-all"
                      [class.border-brand-500]="isMatchedCase(c)"
                      [class.border-slate-100]="!isMatchedCase(c)">
                      <div class="flex items-center gap-2 px-3 py-2"
                        [class.bg-brand-500]="isMatchedCase(c)"
                        [class.bg-slate-50]="!isMatchedCase(c)">
                        <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black"
                          [class.bg-white]="isMatchedCase(c)"
                          [class.text-brand-600]="isMatchedCase(c)"
                          [class.bg-slate-200]="!isMatchedCase(c)"
                          [class.text-slate-400]="!isMatchedCase(c)">
                          {{ isMatchedCase(c) ? '▶' : '' }}
                        </div>
                        <span class="font-mono text-xs font-bold"
                          [class.text-white]="isMatchedCase(c)"
                          [class.text-slate-600]="!isMatchedCase(c)">
                          case {{ scenario.varType === 'char' ? "'" + c.value + "'" : scenario.varType === 'String' ? '"' + c.value + '"' : c.value }}:
                        </span>
                      </div>
                      @if (isMatchedCase(c)) {
                        <div class="px-4 py-2 bg-brand-50 border-t border-brand-100 font-mono text-xs text-brand-700">
                          <i class="fa-solid fa-terminal mr-1.5 text-brand-400"></i>
                          System.out.println("{{ c.output }}");  <span class="text-slate-400">break;</span>
                        </div>
                      }
                    </div>
                  }
                }

                <!-- default -->
                <div class="rounded-xl border-2 overflow-hidden transition-all"
                  [class.border-amber-400]="isDefault"
                  [class.border-slate-100]="!isDefault">
                  <div class="flex items-center gap-2 px-3 py-2"
                    [class.bg-amber-400]="isDefault"
                    [class.bg-slate-50]="!isDefault">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black"
                      [class.bg-white]="isDefault"
                      [class.text-amber-600]="isDefault"
                      [class.bg-slate-200]="!isDefault"
                      [class.text-slate-400]="!isDefault">
                      {{ isDefault ? '▶' : '' }}
                    </div>
                    <span class="font-mono text-xs font-bold"
                      [class.text-white]="isDefault"
                      [class.text-slate-500]="!isDefault">
                      default:
                    </span>
                  </div>
                  @if (isDefault) {
                    <div class="px-4 py-2 bg-amber-50 border-t border-amber-100 font-mono text-xs text-amber-800">
                      <i class="fa-solid fa-terminal mr-1.5 text-amber-400"></i>
                      System.out.println("{{ scenario.defaultOutput }}");
                    </div>
                  }
                </div>

                <!-- closing brace -->
                <div class="rounded-xl bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">&#125;</div>
              </div>
            </div>
          </div>

          <!-- Right: Java code + console output -->
          <div class="space-y-4">
            <!-- Code panel -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-0.5 leading-relaxed overflow-x-auto">
                <!-- variable -->
                <div>
                  <span class="text-blue-400">{{ scenario.varType }}</span>
                  <span class="text-white"> {{ scenario.varName }} = </span>
                  @if (selectedCase) {
                    <span class="text-emerald-400">
                      {{ scenario.varType === 'char' ? "'" + selectedCase.value + "'" : scenario.varType === 'String' ? '"' + selectedCase.value + '"' : selectedCase.value }}
                    </span>
                  } @else {
                    <span class="text-amber-300">?</span>
                  }
                  <span class="text-slate-500">;</span>
                </div>
                <div class="h-2"></div>
                <div><span class="text-purple-400">switch</span><span class="text-slate-300"> ({{ scenario.varName }}) &#123;</span></div>

                @for (c of scenario.cases; track c.value; let i = $index) {
                  @if (i === 0 || c.output !== scenario.cases[i-1].output || scenario.id !== 'season') {
                    <div [class.opacity-30]="selectedCase !== null && !isMatchedCase(c)">
                      <div class="pl-2">
                        <span class="text-amber-300">case </span>
                        <span class="text-emerald-400">{{ scenario.varType === 'char' ? "'" + c.value + "'" : scenario.varType === 'String' ? '"' + c.value + '"' : c.value }}</span>
                        <span class="text-slate-300">:</span>
                      </div>
                      <div class="pl-6">
                        <span class="text-emerald-400">System.out.println</span><span class="text-slate-300">(</span><span class="text-emerald-300">"{{ c.output }}"</span><span class="text-slate-300">);</span>
                      </div>
                      <div class="pl-6"><span class="text-purple-400">break</span><span class="text-slate-500">;</span></div>
                    </div>
                  }
                }

                <div [class.opacity-30]="!isDefault">
                  <div class="pl-2"><span class="text-amber-300">default</span><span class="text-slate-300">:</span></div>
                  <div class="pl-6">
                    <span class="text-emerald-400">System.out.println</span><span class="text-slate-300">(</span><span class="text-emerald-300">"{{ scenario.defaultOutput }}"</span><span class="text-slate-300">);</span>
                  </div>
                </div>
                <div><span class="text-slate-300">&#125;</span></div>
              </div>
            </div>

            <!-- Console output -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm min-h-[3rem] flex items-center">
                @if (activeOutput) {
                  <span class="text-emerald-400">
                    <i class="fa-solid fa-terminal text-emerald-700 mr-2"></i>{{ activeOutput }}
                  </span>
                } @else {
                  <span class="text-slate-600 italic text-xs">Pick a value above to see the output...</span>
                }
              </div>
            </div>

            <!-- break keyword explainer -->
            <div class="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1.5">Why break?</p>
              <p class="text-xs text-blue-700 leading-relaxed">
                Without <code class="bg-blue-100 px-1 rounded font-mono text-blue-800">break</code>, Java keeps running the next <code class="bg-blue-100 px-1 rounded font-mono text-blue-800">case</code> blocks too — called <strong>fall-through</strong>. Always add <code class="bg-blue-100 px-1 rounded font-mono text-blue-800">break;</code> after each case unless you intentionally want fall-through.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class SwitchPlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];
  selectedCase: SwitchCase | null = null;
  isDefault = false;

  get activeOutput(): string {
    if (this.isDefault) return this.scenario.defaultOutput;
    return this.selectedCase ? this.selectedCase.output : '';
  }

  selectScenario(s: SwitchScenario) {
    this.scenario = s;
    this.selectedCase = null;
    this.isDefault = false;
  }

  selectCase(c: SwitchCase) {
    this.selectedCase = c;
    this.isDefault = false;
  }

  selectDefault() {
    this.selectedCase = null;
    this.isDefault = true;
  }

  isMatchedCase(c: SwitchCase): boolean {
    return this.selectedCase?.value === c.value;
  }
}
