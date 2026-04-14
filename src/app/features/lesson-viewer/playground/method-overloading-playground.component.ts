import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Overload {
  id: string;
  label: string;
  signature: string;
  paramTypes: string[];
  paramNames: string[];
  defaults: (string | number)[];
  compute: (...args: any[]) => string;
  returnType: string;
}

const OVERLOADS: Overload[] = [
  {
    id: 'int2', label: 'add(int, int)', signature: 'add(int a, int b)',
    paramTypes: ['int', 'int'], paramNames: ['a', 'b'],
    defaults: [5, 3], returnType: 'int',
    compute: (a, b) => `${+a + +b}`
  },
  {
    id: 'int3', label: 'add(int, int, int)', signature: 'add(int a, int b, int c)',
    paramTypes: ['int', 'int', 'int'], paramNames: ['a', 'b', 'c'],
    defaults: [5, 3, 2], returnType: 'int',
    compute: (a, b, c) => `${+a + +b + +c}`
  },
  {
    id: 'dbl', label: 'add(double, double)', signature: 'add(double a, double b)',
    paramTypes: ['double', 'double'], paramNames: ['a', 'b'],
    defaults: [2.5, 1.5], returnType: 'double',
    compute: (a, b) => `${(+a + +b).toFixed(1)}`
  },
];

@Component({
  selector: 'app-method-overloading-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Method Overloading Explorer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Overload selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Overloaded Version</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            @for (ol of overloads; track ol.id) {
              <button (click)="select(ol)"
                class="px-3 py-3 rounded-xl border-2 text-left transition-all"
                [class.border-brand-500]="active.id === ol.id"
                [class.bg-brand-50]="active.id === ol.id"
                [class.border-slate-100]="active.id !== ol.id"
                [class.bg-slate-50]="active.id !== ol.id">
                <p class="font-mono text-xs font-bold"
                  [class.text-brand-700]="active.id === ol.id"
                  [class.text-slate-600]="active.id !== ol.id">{{ ol.label }}</p>
                <p class="text-[10px] mt-0.5"
                  [class.text-brand-500]="active.id === ol.id"
                  [class.text-slate-400]="active.id !== ol.id">returns {{ ol.returnType }}</p>
              </button>
            }
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Param inputs -->
          <div class="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Set Arguments</p>
            @for (p of active.paramNames; track $index) {
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs text-blue-600 w-16 shrink-0">{{ active.paramTypes[$index] }} {{ p }}</span>
                <input type="number" [(ngModel)]="args[$index]"
                  class="flex-1 border border-slate-300 rounded-lg px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none">
              </div>
            }
            <button (click)="call()"
              class="mt-2 w-full py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-sm">
              <i class="fa-solid fa-play text-xs"></i> Call Method
            </button>
          </div>

          <!-- Code + output -->
          <div class="space-y-3">
            <!-- Code -->
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-1">
              <div><span class="text-slate-500">// All three methods exist in the same class</span></div>
              <div class="h-1"></div>
              @for (ol of overloads; track ol.id) {
                <div [class.opacity-25]="active.id !== ol.id">
                  <span class="text-blue-400">static </span>
                  <span class="text-blue-400">{{ ol.returnType }}</span>
                  <span class="text-yellow-300"> add</span>
                  <span class="text-slate-300">(</span>
                  @for (p of ol.paramNames; track $index) {
                    <span class="text-blue-300">{{ ol.paramTypes[$index] }}</span>
                    <span class="text-white"> {{ p }}</span>
                    @if ($index < ol.paramNames.length - 1) { <span class="text-slate-400">, </span> }
                  }
                  <span class="text-slate-300">) &#123; </span>
                  <span class="text-purple-400">return </span>
                  <span class="text-amber-300">{{ returnExpr(ol) }}</span>
                  <span class="text-slate-300">; &#125;</span>
                </div>
              }
              <div class="h-1"></div>
              <div><span class="text-slate-500">// Calling: add({{ argsDisplay }}) → Java picks the right version</span></div>
            </div>

            <!-- Console -->
            <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm text-emerald-400 min-h-[56px] flex items-center gap-2">
              <i class="fa-solid fa-terminal text-emerald-700 text-xs"></i>
              @if (result !== null) {
                <span>add({{ argsDisplay }}) = <strong class="text-emerald-300">{{ result }}</strong></span>
              } @else {
                <span class="text-slate-600 italic">Click "Call Method" to run...</span>
              }
            </div>

            <!-- Return type badge -->
            @if (result !== null) {
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Java selected:</span>
                <span class="font-mono text-xs bg-brand-50 text-brand-700 border border-brand-200 px-2 py-1 rounded-lg font-bold">{{ active.signature }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Explanation note -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800 leading-relaxed">
          <strong>How does Java choose?</strong> Java looks at the <em>number</em> and <em>type</em> of arguments you pass.
          All three <code class="bg-blue-100 px-1 rounded text-blue-700">add</code> methods have the same name but different parameter lists — that's method overloading.
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class MethodOverloadingPlaygroundComponent {
  overloads = OVERLOADS;
  active    = OVERLOADS[0];
  args: (string | number)[] = [...OVERLOADS[0].defaults];
  result: string | null = null;

  select(ol: Overload) {
    this.active = ol;
    this.args   = [...ol.defaults];
    this.result = null;
  }

  call() {
    this.result = this.active.compute(...this.args);
  }

  get argsDisplay(): string {
    return this.args.slice(0, this.active.paramNames.length).join(', ');
  }

  returnExpr(ol: Overload): string {
    return ol.paramNames.join(' + ');
  }
}
