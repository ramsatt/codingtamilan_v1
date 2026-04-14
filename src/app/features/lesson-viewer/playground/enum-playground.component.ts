import { Component } from '@angular/core';

interface EnumScenario {
  id: string;
  name: string;
  constants: string[];
}

const SCENARIOS: EnumScenario[] = [
  { id: 'day',    name: 'Day',    constants: ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'] },
  { id: 'season', name: 'Season', constants: ['SPRING','SUMMER','AUTUMN','WINTER'] },
  { id: 'planet', name: 'Planet', constants: ['MERCURY','VENUS','EARTH','MARS','JUPITER','SATURN','URANUS','NEPTUNE'] },
];

@Component({
  selector: 'app-enum-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Enum Explorer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div class="flex gap-2 flex-wrap">
          @for (s of scenarios; track s.id) {
            <button (click)="setScenario(s)"
              class="px-4 py-2 rounded-xl border-2 text-xs font-black transition-all"
              [class.border-brand-500]="scenario.id === s.id" [class.bg-brand-50]="scenario.id === s.id" [class.text-brand-700]="scenario.id === s.id"
              [class.border-slate-200]="scenario.id !== s.id" [class.text-slate-600]="scenario.id !== s.id">
              {{ s.name }}
            </button>
          }
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Enum constants grid -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Click a Constant</p>
            <div class="flex flex-wrap gap-2">
              @for (c of scenario.constants; track $index; let i = $index) {
                <button (click)="select(c, i)"
                  class="px-3 py-2 rounded-xl border-2 font-mono text-xs font-bold transition-all"
                  [class.border-brand-500]="selected === c" [class.bg-brand-500]="selected === c" [class.text-white]="selected === c"
                  [class.border-slate-200]="selected !== c" [class.text-slate-600]="selected !== c" [class.hover:bg-slate-50]="selected !== c">
                  {{ c }}
                </button>
              }
            </div>

            <!-- Definition code -->
            <div class="mt-4 bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed">
              <div><span class="text-purple-400">enum</span> <span class="text-yellow-300">{{ scenario.name }}</span> &#123;</div>
              <div class="pl-4 flex flex-wrap gap-x-1">
                @for (c of scenario.constants; track $index; let last = $last) {
                  <span [class.text-brand-400]="selected === c" [class.text-emerald-400]="selected !== c">{{ c }}{{ last ? '' : ',' }}</span>
                }
              </div>
              <div>&#125;</div>
            </div>
          </div>

          <!-- Properties panel -->
          <div class="space-y-4">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Properties</p>

            @if (selected) {
              <div class="space-y-2">
                @for (prop of props; track prop.method) {
                  <div class="bg-slate-50 rounded-xl border border-slate-200 px-4 py-3 flex justify-between items-center">
                    <div>
                      <div class="font-mono text-xs text-slate-500">{{ scenario.name }}.{{ selected }}.{{ prop.method }}</div>
                    </div>
                    <div class="font-mono text-sm font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-lg">{{ prop.value }}</div>
                  </div>
                }

                <!-- values() demo -->
                <div class="bg-slate-50 rounded-xl border border-slate-200 px-4 py-3">
                  <div class="font-mono text-xs text-slate-500 mb-2">{{ scenario.name }}.values().length</div>
                  <div class="font-mono text-sm font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-lg inline-block">{{ scenario.constants.length }}</div>
                  <span class="text-xs text-slate-400 ml-2">(total constants)</span>
                </div>
              </div>
            } @else {
              <div class="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs">
                Click a constant to inspect its properties
              </div>
            }

            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              <strong>Built-in enum methods:</strong>
              <code class="bg-amber-100 px-1 rounded mx-1">name()</code> returns the constant name as a String.
              <code class="bg-amber-100 px-1 rounded mx-1">ordinal()</code> returns its 0-based position.
              <code class="bg-amber-100 px-1 rounded mx-1">values()</code> returns all constants as an array.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class EnumPlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];
  selected  = '';
  ordinal   = 0;

  get props() {
    return [
      { method: 'name()',    value: `"${this.selected}"` },
      { method: 'ordinal()', value: `${this.ordinal}` },
      { method: 'toString()',value: `"${this.selected}"` },
    ];
  }

  setScenario(s: EnumScenario) { this.scenario = s; this.selected = ''; }
  select(c: string, i: number) { this.selected = c; this.ordinal = i; }
}
