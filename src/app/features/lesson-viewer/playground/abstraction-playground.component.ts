import { Component } from '@angular/core';

interface ConcreteClass {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  fields: { name: string; value: string }[];
  abstractImpl: string;
  output: string;
}

const ABSTRACTS = [
  {
    id: 'animal',
    abstractName: 'Animal',
    abstractMethod: 'sound()',
    abstractField: 'String name',
    classes: [
      {
        id: 'dog', name: 'Dog', icon: '🐶', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-400',
        fields: [{ name: 'breed', value: '"Labrador"' }],
        abstractImpl: '@Override void sound() { System.out.println("Woof!"); }',
        output: 'Woof! 🐶'
      },
      {
        id: 'cat', name: 'Cat', icon: '🐱', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-400',
        fields: [{ name: 'indoor', value: 'true' }],
        abstractImpl: '@Override void sound() { System.out.println("Meow!"); }',
        output: 'Meow! 🐱'
      },
    ]
  },
  {
    id: 'shape',
    abstractName: 'Shape',
    abstractMethod: 'area()',
    abstractField: 'String color',
    classes: [
      {
        id: 'circle', name: 'Circle', icon: '⭕', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-400',
        fields: [{ name: 'radius', value: '7.0' }],
        abstractImpl: '@Override double area() { return Math.PI * radius * radius; }',
        output: 'Area = 153.94'
      },
      {
        id: 'rect', name: 'Rectangle', icon: '▭', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-400',
        fields: [{ name: 'width', value: '5.0' }, { name: 'height', value: '3.0' }],
        abstractImpl: '@Override double area() { return width * height; }',
        output: 'Area = 15.0'
      },
    ]
  },
];

@Component({
  selector: 'app-abstraction-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Abstraction Visualizer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div class="flex gap-2">
          @for (s of scenarios; track s.id) {
            <button (click)="selectScenario(s.id)"
              class="flex-1 py-2.5 rounded-xl border-2 text-xs font-black transition-all"
              [class.border-brand-500]="scenario.id === s.id" [class.bg-brand-50]="scenario.id === s.id" [class.text-brand-700]="scenario.id === s.id"
              [class.border-slate-200]="scenario.id !== s.id" [class.text-slate-600]="scenario.id !== s.id">
              Abstract {{ s.abstractName }}
            </button>
          }
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Abstract class + subclasses diagram -->
          <div class="space-y-3">
            <!-- Abstract class -->
            <div class="rounded-xl border-2 border-dashed border-slate-400 bg-slate-100 p-4 space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-[9px] bg-slate-600 text-slate-200 px-2 py-0.5 rounded-full font-bold uppercase">abstract class</span>
                <span class="font-mono text-sm text-slate-800 font-black">{{ scenario.abstractName }}</span>
              </div>
              <div class="font-mono text-xs text-slate-600 space-y-0.5 pl-2">
                <div><span class="text-blue-600">String</span> {{ scenario.abstractField }};</div>
                <div class="mt-1 text-slate-400 italic">abstract void {{ scenario.abstractMethod }};</div>
                <div class="text-[10px] text-orange-500">// must be implemented by subclasses!</div>
              </div>
            </div>

            <!-- Arrows + subclasses -->
            <div class="flex gap-3 justify-center text-slate-400 text-xs font-bold py-1">
              <span>↙ extends </span><span>extends ↘</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              @for (cls of scenario.classes; track cls.id) {
                <div class="rounded-xl border-2 p-4 space-y-2 cursor-pointer transition-all hover:shadow-md"
                  [class]="active?.id === cls.id ? cls.borderColor + ' shadow-md' : 'border-slate-200'"
                  [class.ring-2]="active?.id === cls.id"
                  (click)="select(cls)">
                  <div class="flex items-center gap-2">
                    <span class="text-lg">{{ cls.icon }}</span>
                    <span class="font-mono text-xs font-black" [class]="cls.color">{{ cls.name }}</span>
                  </div>
                  @for (f of cls.fields; track f.name) {
                    <div class="font-mono text-[10px] text-slate-500">{{ f.name }} = {{ f.value }}</div>
                  }
                  <div class="font-mono text-[10px] text-emerald-600 italic">@Override {{ scenario.abstractMethod }}</div>
                </div>
              }
            </div>
          </div>

          <!-- Code + output -->
          <div class="space-y-4">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Java Code</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
              <div><span class="text-slate-400">abstract class</span> <span class="text-yellow-300">{{ scenario.abstractName }}</span> &#123;</div>
              <div class="pl-4"><span class="text-blue-400">String</span> <span class="text-white">{{ scenario.abstractField }}</span>;</div>
              <div class="pl-4"><span class="text-slate-500">abstract void</span> <span class="text-amber-300">{{ scenario.abstractMethod }}</span>;</div>
              <div>&#125;</div>
              <div class="h-2"></div>
              @for (cls of scenario.classes; track cls.id) {
                <div [class.opacity-30]="active && active.id !== cls.id">
                  <div><span class="text-purple-400">class</span> <span class="text-yellow-300">{{ cls.name }}</span> <span class="text-slate-400">extends</span> <span class="text-yellow-300">{{ scenario.abstractName }}</span> &#123;</div>
                  @for (f of cls.fields; track f.name) {
                    <div class="pl-4"><span class="text-blue-400">double</span> <span class="text-white">{{ f.name }}</span> = <span class="text-emerald-400">{{ f.value }}</span>;</div>
                  }
                  <div class="pl-4"><span class="text-emerald-300 text-[10px]">{{ cls.abstractImpl }}</span></div>
                  <div>&#125;</div>
                  <div class="h-1"></div>
                </div>
              }
            </div>

            <!-- Output -->
            @if (active) {
              <button (click)="callMethod()"
                class="w-full py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                <i class="fa-solid fa-play text-xs"></i> call {{ active.name }}.{{ scenario.abstractMethod }}
              </button>
              @if (output) {
                <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm text-emerald-400 flex items-center gap-2">
                  <i class="fa-solid fa-terminal text-emerald-700 text-xs"></i> {{ output }}
                </div>
              }
            } @else {
              <div class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-xs">
                Select a subclass above to inspect it
              </div>
            }

            <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 leading-relaxed">
              <strong>Key point:</strong> You <em>cannot</em> do <code class="bg-blue-100 px-1 rounded">new {{ scenario.abstractName }}()</code> — abstract classes cannot be instantiated directly. They define a <em>contract</em> that subclasses must fulfil.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class AbstractionPlaygroundComponent {
  scenarios = ABSTRACTS;
  scenario  = ABSTRACTS[0];
  active: ConcreteClass | null = null;
  output   = '';

  selectScenario(id: string) {
    this.scenario = ABSTRACTS.find(s => s.id === id)!;
    this.active   = null;
    this.output   = '';
  }

  select(cls: ConcreteClass) {
    this.active = cls;
    this.output = '';
  }

  callMethod() {
    if (this.active) this.output = this.active.output;
  }
}
