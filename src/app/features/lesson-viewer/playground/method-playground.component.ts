import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MethodScenario {
  id: string;
  label: string;
  icon: string;
  returnType: string;
  methodName: string;
  params: { name: string; type: string; default: string | number; min?: number; max?: number; inputType: 'text' | 'number' | 'slider' }[];
  body: (args: (string | number)[]) => string;
  bodyCode: (args: (string | number)[]) => string;
  description: string;
}

const SCENARIOS: MethodScenario[] = [
  {
    id: 'greet',
    label: 'greet(name)',
    icon: '👋',
    returnType: 'void',
    methodName: 'greet',
    description: 'A simple method that prints a greeting. Takes one String parameter.',
    params: [{ name: 'name', type: 'String', default: 'Sathish', inputType: 'text' }],
    body: ([name]) => `Hello, ${name}! Welcome to Java.`,
    bodyCode: ([name]) => `System.out.println("Hello, " + name + "! Welcome to Java.");`,
  },
  {
    id: 'add',
    label: 'add(a, b)',
    icon: '➕',
    returnType: 'int',
    methodName: 'add',
    description: 'Adds two integers and returns the result. Demonstrates a return value.',
    params: [
      { name: 'a', type: 'int', default: 12, min: -100, max: 100, inputType: 'slider' },
      { name: 'b', type: 'int', default: 8,  min: -100, max: 100, inputType: 'slider' },
    ],
    body: ([a, b]) => `${Number(a) + Number(b)}`,
    bodyCode: ([a, b]) => `return a + b;  // ${a} + ${b} = ${Number(a)+Number(b)}`,
  },
  {
    id: 'isEven',
    label: 'isEven(n)',
    icon: '2️⃣',
    returnType: 'boolean',
    methodName: 'isEven',
    description: 'Checks whether a number is even. Returns a boolean.',
    params: [{ name: 'n', type: 'int', default: 7, min: 0, max: 50, inputType: 'slider' }],
    body: ([n]) => `${Number(n) % 2 === 0}`,
    bodyCode: ([n]) => `return n % 2 == 0;  // ${n} % 2 == ${Number(n) % 2}`,
  },
  {
    id: 'maxOf',
    label: 'maxOf(a,b,c)',
    icon: '🏆',
    returnType: 'int',
    methodName: 'maxOf',
    description: 'Returns the largest of three integers. Uses Math.max() internally.',
    params: [
      { name: 'a', type: 'int', default: 42, min: 0, max: 100, inputType: 'slider' },
      { name: 'b', type: 'int', default: 17, min: 0, max: 100, inputType: 'slider' },
      { name: 'c', type: 'int', default: 65, min: 0, max: 100, inputType: 'slider' },
    ],
    body: ([a, b, c]) => `${Math.max(Number(a), Number(b), Number(c))}`,
    bodyCode: ([a, b, c]) => `return Math.max(a, Math.max(b, c));  // max(${a}, ${b}, ${c})`,
  },
];

@Component({
  selector: 'app-method-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Method Playground</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Change the arguments and call the method</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Method</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            @for (s of scenarios; track s.id) {
              <button (click)="selectScenario(s)"
                class="px-3 py-2.5 rounded-xl border-2 text-left transition-all"
                [class.border-brand-500]="scenario.id === s.id"
                [class.bg-brand-50]="scenario.id === s.id"
                [class.border-slate-100]="scenario.id !== s.id"
                [class.bg-slate-50]="scenario.id !== s.id">
                <p class="text-base mb-0.5">{{ s.icon }}</p>
                <p class="font-mono text-[10px] font-bold leading-tight"
                  [class.text-brand-700]="scenario.id === s.id"
                  [class.text-slate-600]="scenario.id !== s.id">{{ s.label }}</p>
              </button>
            }
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-600 leading-relaxed">{{ scenario.description }}</p>

        <!-- Main layout -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: Definition + call -->
          <div class="space-y-4">
            <!-- Method definition -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Method Definition</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5">
                <div>
                  <span class="text-purple-400">static </span>
                  <span class="text-blue-400">{{ scenario.returnType }} </span>
                  <span class="text-amber-300">{{ scenario.methodName }}</span>
                  <span class="text-slate-300">(</span>
                  @for (p of scenario.params; track $index; let last = $last) {
                    <span class="text-blue-400">{{ p.type }} </span><span class="text-white">{{ p.name }}</span>@if (!last){<span class="text-slate-500">, </span>}
                  }
                  <span class="text-slate-300">) &#123;</span>
                </div>
                <div class="pl-4 text-emerald-400">{{ bodyCode }}</div>
                <div><span class="text-slate-300">&#125;</span></div>
              </div>
            </div>

            <!-- Argument inputs -->
            <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arguments</p>
              @for (p of scenario.params; track $index; let i = $index) {
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="font-mono text-xs font-bold text-slate-600">
                      <span class="text-blue-600">{{ p.type }}</span> {{ p.name }}
                    </label>
                    @if (p.inputType === 'slider') {
                      <span class="font-mono text-base font-black text-slate-800">{{ args[i] }}</span>
                    }
                  </div>
                  @if (p.inputType === 'slider') {
                    <input type="range" [min]="p.min" [max]="p.max" [value]="args[i]"
                      (input)="onSlider(i, $event)"
                      class="w-full accent-brand-500 cursor-pointer">
                    <div class="flex justify-between text-[9px] text-slate-400">
                      <span>{{ p.min }}</span><span>{{ p.max }}</span>
                    </div>
                  } @else {
                    <input type="text" [(ngModel)]="args[i]" (ngModelChange)="compute()"
                      class="w-full font-mono text-sm border-2 border-slate-200 focus:border-brand-500 rounded-xl px-3 py-2 outline-none bg-white transition-all">
                  }
                </div>
              }
            </div>
          </div>

          <!-- Right: Call + output -->
          <div class="space-y-4">
            <!-- Method call code -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Calling the Method</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-1">
                @if (scenario.returnType !== 'void') {
                  <div>
                    <span class="text-blue-400">{{ scenario.returnType }} </span>
                    <span class="text-white">result = </span>
                    <span class="text-amber-300">{{ scenario.methodName }}</span>
                    <span class="text-slate-300">(</span>
                    <span class="text-emerald-400">{{ callArgDisplay }}</span>
                    <span class="text-slate-300">);</span>
                  </div>
                  <div>
                    <span class="text-emerald-400">System.out.println</span>
                    <span class="text-slate-300">(result);</span>
                  </div>
                } @else {
                  <div>
                    <span class="text-amber-300">{{ scenario.methodName }}</span>
                    <span class="text-slate-300">(</span>
                    <span class="text-emerald-400">{{ callArgDisplay }}</span>
                    <span class="text-slate-300">);</span>
                  </div>
                }
              </div>
            </div>

            <!-- Result -->
            <div class="rounded-2xl border-2 border-brand-200 overflow-hidden">
              <div class="bg-brand-50 border-b border-brand-100 px-4 py-2 flex items-center justify-between">
                <span class="font-mono text-[10px] text-brand-500">return value</span>
                <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-100 text-brand-600">{{ scenario.returnType }}</span>
              </div>
              <div class="px-4 py-5 text-center">
                <p class="font-mono text-3xl font-black text-brand-700">{{ result }}</p>
              </div>
            </div>

            <!-- Console -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm">
                <i class="fa-solid fa-terminal text-emerald-700 mr-2"></i>
                <span class="text-emerald-400">{{ result }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class MethodPlaygroundComponent {
  scenarios = SCENARIOS;
  scenario  = SCENARIOS[0];
  args: (string | number)[] = [];
  result = '';

  get bodyCode(): string { return this.scenario.bodyCode(this.args); }
  get callArgDisplay(): string {
    return this.args.map((a, i) => this.scenario.params[i].type === 'String' ? `"${a}"` : a).join(', ');
  }

  constructor() { this.initScenario(); }

  selectScenario(s: MethodScenario) {
    this.scenario = s;
    this.initScenario();
  }

  initScenario() {
    this.args = this.scenario.params.map(p => p.default);
    this.compute();
  }

  onSlider(i: number, event: Event) {
    this.args[i] = parseFloat((event.target as HTMLInputElement).value);
    this.compute();
  }

  compute() {
    this.result = this.scenario.body(this.args);
  }
}
