import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ArrayScenario {
  id: string;
  label: string;
  icon: string;
  type: string;
  elements: string[];
}

const SCENARIOS: ArrayScenario[] = [
  { id: 'cars',    label: 'Car Brands',  icon: '🚗', type: 'String', elements: ['Volvo', 'BMW', 'Ford', 'Tesla', 'Audi'] },
  { id: 'scores',  label: 'Test Scores', icon: '📝', type: 'int',    elements: ['92', '78', '85', '61', '99'] },
  { id: 'temps',   label: 'Temperatures',icon: '🌡️', type: 'double', elements: ['36.6', '37.1', '36.9', '38.2', '36.5'] },
  { id: 'colors',  label: 'Colors',      icon: '🎨', type: 'String', elements: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'] },
];

@Component({
  selector: 'app-arrays-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Array Explorer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Click an index box to access that element</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose an Array</p>
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

        <!-- Array visualizer -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Array Memory Boxes</p>
          <div class="flex gap-2 flex-wrap">
            @for (el of scenario.elements; track $index; let i = $index) {
              <button (click)="selectIndex(i)"
                class="flex flex-col items-center rounded-xl border-2 overflow-hidden transition-all min-w-[64px]"
                [class.border-brand-500]="selectedIndex === i"
                [class.border-slate-200]="selectedIndex !== i">
                <!-- index label -->
                <div class="w-full text-center py-1 text-[9px] font-black"
                  [class.bg-brand-500]="selectedIndex === i"
                  [class.text-white]="selectedIndex === i"
                  [class.bg-slate-100]="selectedIndex !== i"
                  [class.text-slate-400]="selectedIndex !== i">
                  [{{ i }}]
                </div>
                <!-- value -->
                <div class="px-3 py-2.5 font-mono text-sm font-bold"
                  [class.text-brand-700]="selectedIndex === i"
                  [class.text-slate-700]="selectedIndex !== i">
                  {{ scenario.type === 'String' ? '"' + el + '"' : el }}
                </div>
              </button>
            }
          </div>
          <!-- index labels below -->
          <div class="flex gap-1 mt-1 flex-wrap">
            @for (el of scenario.elements; track $index; let i = $index) {
              <div class="min-w-[64px] text-center text-[9px] text-slate-300 px-1">index {{ i }}</div>
            }
          </div>
        </div>

        <!-- Main layout -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: code panel -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-1">
              <!-- declaration -->
              <div>
                <span class="text-blue-400">{{ scenario.type }}[]</span>
                <span class="text-white"> {{ arrayVarName }} = &#123;</span>
              </div>
              @for (el of scenario.elements; track $index; let i = $index; let last = $last) {
                <div class="pl-4 transition-all"
                  [class.text-brand-300]="selectedIndex === i"
                  [class.text-emerald-400]="selectedIndex !== i">
                  {{ scenario.type === 'String' ? '"' + el + '"' : el }}{{ last ? '' : ',' }}
                  @if (selectedIndex === i) {
                    <span class="text-slate-500 ml-2">// index {{ i }}</span>
                  }
                </div>
              }
              <div><span class="text-white">&#125;;</span></div>
              <div class="h-1"></div>
              <!-- access -->
              <div>
                <span class="text-blue-400">{{ scenario.type }}</span>
                <span class="text-white"> result = {{ arrayVarName }}[</span>
                <span class="text-amber-300">{{ selectedIndex }}</span>
                <span class="text-white">];</span>
              </div>
              <div>
                <span class="text-emerald-400">System.out.println</span>
                <span class="text-slate-300">(result);</span>
              </div>
              <!-- length -->
              <div class="h-1"></div>
              <div>
                <span class="text-blue-400">int</span>
                <span class="text-white"> len = {{ arrayVarName }}.length;</span>
                <span class="text-slate-600 ml-2">// {{ scenario.elements.length }}</span>
              </div>
            </div>
          </div>

          <!-- Right: output + info -->
          <div class="space-y-4">
            <!-- Selected element result -->
            <div class="rounded-2xl border-2 overflow-hidden"
              [class.border-brand-200]="selectedIndex >= 0"
              [class.border-slate-100]="selectedIndex < 0">
              <div class="px-4 py-2 border-b"
                [class.bg-brand-50]="selectedIndex >= 0"
                [class.border-brand-100]="selectedIndex >= 0"
                [class.bg-slate-50]="selectedIndex < 0"
                [class.border-slate-100]="selectedIndex < 0">
                <p class="text-[10px] font-black uppercase tracking-widest"
                  [class.text-brand-600]="selectedIndex >= 0"
                  [class.text-slate-400]="selectedIndex < 0">
                  {{ arrayVarName }}[{{ selectedIndex }}]
                </p>
              </div>
              <div class="px-4 py-4 text-center">
                <p class="font-mono text-3xl font-black"
                  [class.text-brand-700]="selectedIndex >= 0"
                  [class.text-slate-300]="selectedIndex < 0">
                  {{ selectedIndex >= 0 ? (scenario.type === 'String' ? '"' + scenario.elements[selectedIndex] + '"' : scenario.elements[selectedIndex]) : '—' }}
                </p>
                @if (selectedIndex >= 0) {
                  <p class="text-[10px] text-slate-400 mt-1">index {{ selectedIndex }} of {{ scenario.elements.length - 1 }}</p>
                }
              </div>
            </div>

            <!-- Console output -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm min-h-[3rem] flex items-center">
                @if (selectedIndex >= 0) {
                  <span class="text-emerald-400">
                    <i class="fa-solid fa-terminal text-emerald-700 mr-2"></i>{{ scenario.elements[selectedIndex] }}
                  </span>
                } @else {
                  <span class="text-slate-600 italic text-xs">Click an index box above...</span>
                }
              </div>
            </div>

            <!-- Array facts -->
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Length</p>
                <p class="font-mono text-xl font-black text-slate-800 mt-1">{{ scenario.elements.length }}</p>
              </div>
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Index</p>
                <p class="font-mono text-xl font-black text-slate-800 mt-1">{{ scenario.elements.length - 1 }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ArraysPlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];
  selectedIndex = 0;

  get arrayVarName(): string {
    const map: Record<string, string> = { cars: 'cars', scores: 'scores', temps: 'temps', colors: 'colors' };
    return map[this.scenario.id] ?? 'arr';
  }

  selectScenario(s: ArrayScenario) {
    this.scenario = s;
    this.selectedIndex = 0;
  }

  selectIndex(i: number) {
    this.selectedIndex = i;
  }
}
