import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CtorField {
  name: string;
  type: string;
  value: string | number;
  inputType: 'text' | 'slider';
  min?: number;
  max?: number;
}

interface CtorScenario {
  id: string;
  label: string;
  icon: string;
  className: string;
  fields: CtorField[];
  toStringFn: (fields: CtorField[]) => string;
}

const SCENARIOS: CtorScenario[] = [
  {
    id: 'car',
    label: 'Car',
    icon: '🚗',
    className: 'Car',
    fields: [
      { name: 'brand', type: 'String', value: 'Toyota', inputType: 'text' },
      { name: 'year',  type: 'int',    value: 2022,     inputType: 'slider', min: 1990, max: 2025 },
      { name: 'speed', type: 'int',    value: 120,      inputType: 'slider', min: 0, max: 250 },
    ],
    toStringFn: f => `${f[0].value} (${f[1].value}) — ${f[2].value} km/h`
  },
  {
    id: 'person',
    label: 'Person',
    icon: '👤',
    className: 'Person',
    fields: [
      { name: 'name', type: 'String', value: 'Priya',  inputType: 'text' },
      { name: 'age',  type: 'int',    value: 24,       inputType: 'slider', min: 1, max: 100 },
      { name: 'city', type: 'String', value: 'Chennai', inputType: 'text' },
    ],
    toStringFn: f => `${f[0].value}, age ${f[1].value}, from ${f[2].value}`
  },
  {
    id: 'product',
    label: 'Product',
    icon: '📦',
    className: 'Product',
    fields: [
      { name: 'name',     type: 'String', value: 'Laptop',  inputType: 'text' },
      { name: 'price',    type: 'double', value: 49999,     inputType: 'slider', min: 100, max: 100000 },
      { name: 'quantity', type: 'int',    value: 10,        inputType: 'slider', min: 1, max: 100 },
    ],
    toStringFn: f => `${f[0].value} — ₹${f[1].value} × ${f[2].value} units`
  },
];

@Component({
  selector: 'app-constructor-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Constructor Visualizer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Edit values → see how new() initialises the object</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Class</p>
          <div class="grid grid-cols-3 gap-2">
            @for (s of scenarios; track s.id) {
              <button (click)="selectScenario(s)"
                class="px-3 py-2.5 rounded-xl border-2 text-left transition-all"
                [class.border-brand-500]="scenario.id === s.id"
                [class.bg-brand-50]="scenario.id === s.id"
                [class.border-slate-100]="scenario.id !== s.id"
                [class.bg-slate-50]="scenario.id !== s.id">
                <span class="text-lg">{{ s.icon }}</span>
                <p class="text-[10px] font-bold mt-0.5"
                  [class.text-brand-700]="scenario.id === s.id"
                  [class.text-slate-600]="scenario.id !== s.id">{{ s.label }}</p>
              </button>
            }
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: class + constructor definition -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Class Definition</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5">
              <div><span class="text-purple-400">class </span><span class="text-amber-300">{{ scenario.className }}</span><span class="text-slate-300"> &#123;</span></div>
              <!-- fields -->
              @for (f of fields; track f.name) {
                <div class="pl-4">
                  <span class="text-purple-400">private </span>
                  <span class="text-blue-400">{{ f.type }} </span>
                  <span class="text-white">{{ f.name }}</span>
                  <span class="text-slate-500">;</span>
                </div>
              }
              <div class="h-1"></div>
              <!-- constructor -->
              <div class="pl-4 text-slate-400 text-[10px]">// Constructor</div>
              <div class="pl-4">
                <span class="text-amber-300">{{ scenario.className }}</span>
                <span class="text-slate-300">(</span>
                @for (f of fields; track f.name; let last = $last) {
                  <span class="text-blue-400">{{ f.type }} </span><span class="text-white">{{ f.name }}</span>@if (!last){<span class="text-slate-500">, </span>}
                }
                <span class="text-slate-300">) &#123;</span>
              </div>
              @for (f of fields; track f.name) {
                <div class="pl-8">
                  <span class="text-purple-400">this</span>
                  <span class="text-slate-300">.{{ f.name }} = </span>
                  <span class="text-white">{{ f.name }}</span>
                  <span class="text-slate-500">;</span>
                </div>
              }
              <div class="pl-4"><span class="text-slate-300">&#125;</span></div>
              <div class="h-1"></div>
              <div class="pl-4 text-slate-400 text-[10px]">// toString helper</div>
              <div class="pl-4">
                <span class="text-blue-400">String </span>
                <span class="text-emerald-400">describe</span>
                <span class="text-slate-300">() &#123; </span>
                <span class="text-purple-400">return</span>
                <span class="text-slate-500"> ...; </span>
                <span class="text-slate-300">&#125;</span>
              </div>
              <div><span class="text-slate-300">&#125;</span></div>
            </div>
          </div>

          <!-- Right: argument editor + new() call + object state -->
          <div class="space-y-4">

            <!-- Argument inputs -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Set Constructor Arguments</p>
              <div class="space-y-3">
                @for (f of fields; track f.name; let i = $index) {
                  <div class="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div class="flex items-center justify-between mb-1.5">
                      <label class="font-mono text-[10px] font-bold">
                        <span class="text-blue-600">{{ f.type }}</span>
                        <span class="text-slate-700"> {{ f.name }}</span>
                      </label>
                      @if (f.inputType === 'slider') {
                        <span class="font-mono text-sm font-black text-slate-800">{{ f.value }}</span>
                      }
                    </div>
                    @if (f.inputType === 'slider') {
                      <input type="range" [min]="f.min" [max]="f.max" [value]="f.value"
                        (input)="onSlider(i, $event)"
                        class="w-full accent-brand-500 cursor-pointer">
                    } @else {
                      <input type="text" [(ngModel)]="fields[i].value"
                        class="w-full font-mono text-sm border-2 border-slate-200 focus:border-brand-500 rounded-lg px-2 py-1.5 outline-none bg-white transition-all">
                    }
                  </div>
                }
              </div>
            </div>

            <!-- new() call -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Object Creation</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 px-4 py-3 font-mono text-xs">
                <div>
                  <span class="text-amber-300">{{ scenario.className }} </span>
                  <span class="text-white">obj = </span>
                  <span class="text-purple-400">new </span>
                  <span class="text-amber-300">{{ scenario.className }}</span>
                  <span class="text-slate-300">(</span>
                  <span class="text-emerald-400">{{ callArgs }}</span>
                  <span class="text-slate-300">);</span>
                </div>
                <div class="mt-1">
                  <span class="text-emerald-400">System.out.println</span>
                  <span class="text-slate-300">(obj.describe());</span>
                </div>
              </div>
            </div>

            <!-- Console output / object state -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm">
                <i class="fa-solid fa-terminal text-emerald-700 mr-2"></i>
                <span class="text-emerald-400">{{ objectString }}</span>
              </div>
            </div>

            <!-- Object state card -->
            <div class="bg-brand-50 border border-brand-100 rounded-xl p-4">
              <p class="text-[10px] font-black text-brand-400 uppercase tracking-widest mb-2">Object State after new()</p>
              @for (f of fields; track f.name) {
                <div class="flex items-center justify-between text-xs py-0.5 border-b border-brand-100 last:border-0">
                  <span class="font-mono text-brand-500">obj.{{ f.name }}</span>
                  <span class="font-mono font-black text-brand-700">
                    {{ f.type === 'String' ? '"' + f.value + '"' : f.value }}
                  </span>
                </div>
              }
            </div>

          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ConstructorPlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];
  fields: CtorField[] = [];

  get callArgs(): string {
    return this.fields.map(f =>
      f.type === 'String' ? `"${f.value}"` : f.value
    ).join(', ');
  }

  get objectString(): string {
    return this.scenario.toStringFn(this.fields);
  }

  constructor() { this.initScenario(); }

  selectScenario(s: CtorScenario) {
    this.scenario = s;
    this.initScenario();
  }

  initScenario() {
    this.fields = this.scenario.fields.map(f => ({ ...f }));
  }

  onSlider(i: number, event: Event) {
    this.fields[i].value = parseFloat((event.target as HTMLInputElement).value);
  }
}
