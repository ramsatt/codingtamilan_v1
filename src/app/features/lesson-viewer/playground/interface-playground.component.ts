import { Component } from '@angular/core';

interface InterfaceScenario {
  id: string;
  interfaceName: string;
  method: string;
  returnType: string;
  implementors: {
    id: string; name: string; icon: string;
    color: string; bgColor: string; borderColor: string;
    output: string; code: string;
  }[];
}

const SCENARIOS: InterfaceScenario[] = [
  {
    id: 'printable',
    interfaceName: 'Printable',
    method: 'print()',
    returnType: 'void',
    implementors: [
      {
        id: 'book', name: 'Book', icon: '📚', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-400',
        output: 'Printing: "Clean Code" by Robert Martin',
        code: 'print() { System.out.println("Printing: \\"Clean Code\\""); }'
      },
      {
        id: 'magazine', name: 'Magazine', icon: '📰', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-400',
        output: 'Printing: "Java Monthly" — Issue #42',
        code: 'print() { System.out.println("Printing: \\"Java Monthly\\""); }'
      },
    ]
  },
  {
    id: 'drivable',
    interfaceName: 'Drivable',
    method: 'drive()',
    returnType: 'void',
    implementors: [
      {
        id: 'car', name: 'Car', icon: '🚗', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-400',
        output: 'Car is driving at 80 km/h',
        code: 'drive() { System.out.println("Car driving at 80 km/h"); }'
      },
      {
        id: 'bicycle', name: 'Bicycle', icon: '🚲', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-400',
        output: 'Bicycle is moving at 15 km/h',
        code: 'drive() { System.out.println("Bicycle at 15 km/h"); }'
      },
    ]
  },
];

@Component({
  selector: 'app-interface-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Interface Visualizer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div class="flex gap-2">
          @for (s of scenarios; track s.id) {
            <button (click)="setScenario(s)"
              class="flex-1 py-2.5 rounded-xl border-2 text-xs font-black transition-all"
              [class.border-brand-500]="scenario.id === s.id" [class.bg-brand-50]="scenario.id === s.id" [class.text-brand-700]="scenario.id === s.id"
              [class.border-slate-200]="scenario.id !== s.id" [class.text-slate-600]="scenario.id !== s.id">
              &lt;&lt;{{ s.interfaceName }}&gt;&gt;
            </button>
          }
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Interface diagram -->
          <div class="space-y-3">
            <!-- Interface box -->
            <div class="rounded-xl border-2 border-dashed border-slate-400 bg-slate-100 p-4 space-y-2 text-center">
              <div class="text-[10px] text-slate-500 font-bold uppercase">&lt;&lt;interface&gt;&gt;</div>
              <div class="font-mono text-lg font-black text-slate-800">{{ scenario.interfaceName }}</div>
              <div class="font-mono text-xs text-amber-600 italic border-t border-slate-300 pt-2">
                {{ scenario.returnType }} {{ scenario.method }};
                <span class="text-[10px] text-orange-500 ml-1">// no body!</span>
              </div>
            </div>

            <!-- implements arrows -->
            <div class="flex gap-3 justify-around text-slate-400 text-xs font-bold">
              @for (impl of scenario.implementors; track impl.id) {
                <span>↓ implements</span>
              }
            </div>

            <!-- Implementing classes -->
            <div class="grid grid-cols-2 gap-3">
              @for (impl of scenario.implementors; track impl.id) {
                <div class="rounded-xl border-2 p-4 space-y-2 cursor-pointer transition-all hover:shadow-md"
                  [class]="active?.id === impl.id ? impl.borderColor + ' shadow-md ring-2' : 'border-slate-200'"
                  (click)="active = impl; output = ''">
                  <div class="text-xl text-center">{{ impl.icon }}</div>
                  <div class="font-mono text-xs font-black text-center" [class]="impl.color">{{ impl.name }}</div>
                  <div class="font-mono text-[10px] text-emerald-600 italic text-center">
                    implements {{ scenario.interfaceName }}
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Code + output -->
          <div class="space-y-4">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Java Code</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
              <div><span class="text-blue-400">interface</span> <span class="text-yellow-300">{{ scenario.interfaceName }}</span> &#123;</div>
              <div class="pl-4"><span class="text-slate-400">{{ scenario.returnType }} </span><span class="text-amber-300">{{ scenario.method }}</span><span class="text-slate-300">;</span></div>
              <div>&#125;</div>
              <div class="h-2"></div>
              @for (impl of scenario.implementors; track impl.id) {
                <div [class.opacity-30]="active && active.id !== impl.id">
                  <div>
                    <span class="text-purple-400">class</span> <span class="text-yellow-300">{{ impl.name }}</span>
                    <span class="text-slate-400"> implements </span><span class="text-yellow-300">{{ scenario.interfaceName }}</span> &#123;
                  </div>
                  <div class="pl-4"><span class="text-emerald-400">@Override</span></div>
                  <div class="pl-4"><span class="text-slate-300">{{ scenario.returnType }} </span><span class="text-yellow-300">{{ scenario.method }}</span><span class="text-slate-300"> &#123; ... &#125;</span></div>
                  <div>&#125;</div>
                  <div class="h-1"></div>
                </div>
              }
            </div>

            @if (active) {
              <button (click)="callMethod()"
                class="w-full py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                <i class="fa-solid fa-play text-xs"></i>
                {{ active.name }}.{{ scenario.method }}
              </button>
              @if (output) {
                <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm text-emerald-400 flex items-center gap-2">
                  <i class="fa-solid fa-terminal text-emerald-700 text-xs"></i> {{ output }}
                </div>
              }
            } @else {
              <div class="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-xs">
                Click a class above to call its method
              </div>
            }

            <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 leading-relaxed">
              <strong>Key point:</strong> An interface defines <em>what</em> a class must do, not <em>how</em>. Every class that <code class="bg-blue-100 px-1 rounded">implements</code> the interface must provide its own version of the method.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class InterfacePlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];
  active: (typeof SCENARIOS[0]['implementors'][0]) | null = null;
  output = '';

  setScenario(s: InterfaceScenario) { this.scenario = s; this.active = null; this.output = ''; }
  callMethod() { if (this.active) this.output = this.active.output; }
}
