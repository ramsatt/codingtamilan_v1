import { Component } from '@angular/core';

interface InheritanceScenario {
  id: string;
  label: string;
  icon: string;
  parentClass: string;
  childClass: string;
  parentFields: { name: string; type: string; value: string }[];
  childFields: { name: string; type: string; value: string }[];
  parentMethods: { name: string; result: string }[];
  childMethods: { name: string; result: string; overrides?: boolean }[];
  description: string;
}

const SCENARIOS: InheritanceScenario[] = [
  {
    id: 'animal',
    label: 'Animal → Dog',
    icon: '🐶',
    parentClass: 'Animal',
    childClass: 'Dog',
    description: 'Dog extends Animal, inheriting name and eat(). Dog adds breed and adds its own sound() method.',
    parentFields:  [{ name: 'name', type: 'String', value: 'Buddy' }],
    childFields:   [{ name: 'breed', type: 'String', value: 'Labrador' }],
    parentMethods: [{ name: 'eat()', result: '"Buddy is eating."' }],
    childMethods:  [
      { name: 'eat()',   result: '"Buddy is eating."',  overrides: false },
      { name: 'sound()', result: '"Buddy says: Woof!"', overrides: false },
    ]
  },
  {
    id: 'vehicle',
    label: 'Vehicle → Car',
    icon: '🚗',
    parentClass: 'Vehicle',
    childClass: 'Car',
    description: 'Car extends Vehicle. It inherits brand and honk(). Car overrides honk() with its own sound.',
    parentFields:  [{ name: 'brand', type: 'String', value: 'Generic' }],
    childFields:   [{ name: 'model', type: 'String', value: 'Corolla' }],
    parentMethods: [{ name: 'honk()', result: '"Beep beep!"' }],
    childMethods:  [
      { name: 'honk()',    result: '"Corolla: Toot toot!"', overrides: true },
      { name: 'describe()', result: '"Toyota Corolla"',     overrides: false },
    ]
  },
  {
    id: 'shape',
    label: 'Shape → Circle',
    icon: '⭕',
    parentClass: 'Shape',
    childClass: 'Circle',
    description: 'Circle extends Shape. Inherits color. Overrides area() with the circle formula.',
    parentFields:  [{ name: 'color', type: 'String', value: 'Red' }],
    childFields:   [{ name: 'radius', type: 'double', value: '7.0' }],
    parentMethods: [{ name: 'area()', result: '"Area not defined"' }],
    childMethods:  [
      { name: 'area()',    result: '"153.94 (π × 7²)"', overrides: true },
      { name: 'describe()', result: '"Red circle, r=7.0"', overrides: false },
    ]
  },
];

@Component({
  selector: 'app-inheritance-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Inheritance Visualizer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">See what the child class inherits from the parent</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Scenario</p>
          <div class="grid grid-cols-3 gap-2">
            @for (s of scenarios; track s.id) {
              <button (click)="select(s)"
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
          <p class="text-xs text-slate-500 mt-2 leading-relaxed">{{ scenario.description }}</p>
        </div>

        <!-- Visual hierarchy -->
        <div class="grid lg:grid-cols-3 gap-5 items-start">

          <!-- Parent class box -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              🏗️ Parent Class
            </p>
            <div class="rounded-xl border-2 border-slate-200 overflow-hidden">
              <div class="bg-slate-700 px-4 py-2">
                <span class="font-mono text-xs font-black text-white">{{ scenario.parentClass }}</span>
              </div>
              <div class="bg-slate-50 p-3 space-y-1.5">
                @for (f of scenario.parentFields; track f.name) {
                  <div class="flex gap-2 text-xs font-mono">
                    <span class="text-blue-600">{{ f.type }}</span>
                    <span class="text-slate-700">{{ f.name }} = "{{ f.value }}"</span>
                  </div>
                }
                <div class="border-t border-slate-200 pt-1.5 mt-1.5 space-y-1">
                  @for (m of scenario.parentMethods; track m.name) {
                    <div class="text-[10px] font-mono font-bold text-emerald-700">{{ m.name }}</div>
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow + extends keyword -->
          <div class="flex flex-col items-center justify-center pt-8 gap-2">
            <div class="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              extends
            </div>
            <div class="flex flex-col items-center gap-1 text-brand-300">
              <div class="w-px h-6 bg-brand-300"></div>
              <i class="fa-solid fa-arrow-down text-brand-400 text-sm"></i>
            </div>
            <!-- Inherited badge -->
            <div class="text-center">
              <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Inherits</p>
              @for (f of scenario.parentFields; track f.name) {
                <div class="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded mb-0.5">{{ f.name }}</div>
              }
              @for (m of scenario.parentMethods; track m.name) {
                <div class="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mb-0.5">{{ m.name }}</div>
              }
            </div>
          </div>

          <!-- Child class box -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              👶 Child Class
            </p>
            <div class="rounded-xl border-2 border-brand-300 overflow-hidden">
              <div class="bg-brand-500 px-4 py-2 flex items-center justify-between">
                <span class="font-mono text-xs font-black text-white">{{ scenario.childClass }}</span>
                <span class="text-[9px] text-brand-100 font-bold">extends {{ scenario.parentClass }}</span>
              </div>
              <div class="bg-brand-50 p-3 space-y-1.5">
                <!-- Inherited fields (dimmed) -->
                @for (f of scenario.parentFields; track f.name) {
                  <div class="flex gap-2 text-xs font-mono opacity-50">
                    <span class="text-blue-600">{{ f.type }}</span>
                    <span class="text-slate-500">{{ f.name }}</span>
                    <span class="text-[9px] bg-slate-200 text-slate-400 px-1 rounded">inherited</span>
                  </div>
                }
                <!-- Own fields -->
                @for (f of scenario.childFields; track f.name) {
                  <div class="flex gap-2 text-xs font-mono">
                    <span class="text-blue-600">{{ f.type }}</span>
                    <span class="text-slate-700">{{ f.name }} = "{{ f.value }}"</span>
                    <span class="text-[9px] bg-brand-100 text-brand-600 px-1 rounded font-bold">own</span>
                  </div>
                }
                <div class="border-t border-brand-200 pt-1.5 mt-1.5 space-y-1">
                  @for (m of scenario.childMethods; track m.name) {
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono font-bold text-emerald-700">{{ m.name }}</span>
                      @if (m.overrides) {
                        <span class="text-[8px] font-black bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full">@Override</span>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Method results -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Call Methods on Child Object</p>
          <div class="grid sm:grid-cols-2 gap-3">
            @for (m of scenario.childMethods; track m.name; let i = $index) {
              <button (click)="callMethod(i)"
                class="rounded-xl border-2 overflow-hidden text-left transition-all"
                [class.border-brand-400]="activeMethod === i"
                [class.border-slate-100]="activeMethod !== i">
                <div class="flex items-center justify-between px-3 py-2"
                  [class.bg-brand-500]="activeMethod === i"
                  [class.bg-slate-50]="activeMethod !== i">
                  <span class="font-mono text-xs font-bold"
                    [class.text-white]="activeMethod === i"
                    [class.text-slate-700]="activeMethod !== i">
                    obj.{{ m.name }}
                  </span>
                  <div class="flex items-center gap-1">
                    @if (m.overrides) {
                      <span class="text-[8px] font-black px-1.5 py-0.5 rounded-full"
                        [class.bg-white]="activeMethod === i"
                        [class.text-amber-600]="activeMethod === i"
                        [class.bg-amber-100]="activeMethod !== i"
                        [class.text-amber-600]="activeMethod !== i">@Override</span>
                    }
                    <i class="fa-solid fa-play text-[8px]"
                      [class.text-white]="activeMethod === i"
                      [class.text-brand-400]="activeMethod !== i"></i>
                  </div>
                </div>
                @if (activeMethod === i) {
                  <div class="px-3 py-2 bg-black font-mono text-xs text-emerald-400">
                    <i class="fa-solid fa-terminal text-emerald-700 mr-1.5 text-[10px]"></i>{{ m.result }}
                  </div>
                }
              </button>
            }
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class InheritancePlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];
  activeMethod: number | null = null;

  select(s: InheritanceScenario) {
    this.scenario = s;
    this.activeMethod = null;
  }

  callMethod(i: number) {
    this.activeMethod = i;
  }
}
