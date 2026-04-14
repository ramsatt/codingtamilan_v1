import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MathFn {
  id: string;
  label: string;
  signature: string;
  description: string;
  inputs: { label: string; default: number; min: number; max: number; step: number }[];
  apply: (vals: number[]) => number;
  outputNote?: (vals: number[], result: number) => string;
}

const FUNCTIONS: MathFn[] = [
  {
    id: 'max',
    label: 'Math.max()',
    signature: 'Math.max(x, y)',
    description: 'Returns the larger of two numbers.',
    inputs: [
      { label: 'x', default: 15, min: -100, max: 100, step: 1 },
      { label: 'y', default: 42, min: -100, max: 100, step: 1 },
    ],
    apply: ([x, y]) => Math.max(x, y),
  },
  {
    id: 'min',
    label: 'Math.min()',
    signature: 'Math.min(x, y)',
    description: 'Returns the smaller of two numbers.',
    inputs: [
      { label: 'x', default: 15, min: -100, max: 100, step: 1 },
      { label: 'y', default: 42, min: -100, max: 100, step: 1 },
    ],
    apply: ([x, y]) => Math.min(x, y),
  },
  {
    id: 'abs',
    label: 'Math.abs()',
    signature: 'Math.abs(x)',
    description: 'Returns the absolute (positive) value of x.',
    inputs: [{ label: 'x', default: -64, min: -200, max: 200, step: 1 }],
    apply: ([x]) => Math.abs(x),
  },
  {
    id: 'sqrt',
    label: 'Math.sqrt()',
    signature: 'Math.sqrt(x)',
    description: 'Returns the square root of x.',
    inputs: [{ label: 'x', default: 64, min: 0, max: 400, step: 1 }],
    apply: ([x]) => Math.sqrt(x),
    outputNote: (_, r) => `${r} × ${r} = ${r * r}`,
  },
  {
    id: 'pow',
    label: 'Math.pow()',
    signature: 'Math.pow(base, exp)',
    description: 'Returns base raised to the power of exp.',
    inputs: [
      { label: 'base', default: 3, min: 0, max: 20, step: 1 },
      { label: 'exp',  default: 4, min: 0, max: 10, step: 1 },
    ],
    apply: ([b, e]) => Math.pow(b, e),
    outputNote: ([b, e], r) => `${b}^${e} = ${r}`,
  },
  {
    id: 'round',
    label: 'Math.round()',
    signature: 'Math.round(x)',
    description: 'Rounds x to the nearest integer.',
    inputs: [{ label: 'x', default: 4.6, min: -10, max: 10, step: 0.1 }],
    apply: ([x]) => Math.round(x),
  },
  {
    id: 'ceil',
    label: 'Math.ceil()',
    signature: 'Math.ceil(x)',
    description: 'Rounds x up to the nearest integer (ceiling).',
    inputs: [{ label: 'x', default: 4.2, min: -10, max: 10, step: 0.1 }],
    apply: ([x]) => Math.ceil(x),
  },
  {
    id: 'floor',
    label: 'Math.floor()',
    signature: 'Math.floor(x)',
    description: 'Rounds x down to the nearest integer (floor).',
    inputs: [{ label: 'x', default: 4.9, min: -10, max: 10, step: 0.1 }],
    apply: ([x]) => Math.floor(x),
  },
  {
    id: 'random',
    label: 'Math.random()',
    signature: 'Math.random()',
    description: 'Returns a random double between 0.0 (inclusive) and 1.0 (exclusive).',
    inputs: [],
    apply: () => Math.random(),
    outputNote: () => 'Each call gives a different value!',
  },
];

@Component({
  selector: 'app-math-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Math Class Explorer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Adjust inputs and see results instantly</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Function tabs -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Method</p>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
            @for (fn of functions; track fn.id) {
              <button (click)="selectFn(fn)"
                class="px-2 py-2 rounded-xl border-2 text-center transition-all"
                [class.border-brand-500]="selected.id === fn.id"
                [class.bg-brand-50]="selected.id === fn.id"
                [class.border-slate-100]="selected.id !== fn.id"
                [class.bg-slate-50]="selected.id !== fn.id">
                <p class="font-mono text-[11px] font-bold leading-tight"
                  [class.text-brand-700]="selected.id === fn.id"
                  [class.text-slate-600]="selected.id !== fn.id">{{ fn.label }}</p>
              </button>
            }
          </div>
        </div>

        <!-- Main layout -->
        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Left: inputs + result -->
          <div class="space-y-4">

            <!-- Sliders -->
            @if (selected.inputs.length > 0) {
              <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                @for (inp of selected.inputs; track $index; let i = $index) {
                  <div>
                    <div class="flex items-center justify-between mb-1.5">
                      <label class="text-xs font-bold text-slate-600 font-mono">{{ inp.label }}</label>
                      <span class="font-mono text-lg font-black text-slate-800">{{ vals[i] }}</span>
                    </div>
                    <input type="range"
                      [min]="inp.min" [max]="inp.max" [step]="inp.step"
                      [value]="vals[i]"
                      (input)="onSlider(i, $event)"
                      class="w-full accent-brand-500 cursor-pointer">
                    <div class="flex justify-between text-[9px] text-slate-400 mt-0.5">
                      <span>{{ inp.min }}</span><span>{{ inp.max }}</span>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <!-- random: regenerate button -->
              <button (click)="reroll()"
                class="w-full py-3 rounded-xl bg-brand-50 border-2 border-brand-200 text-brand-700 font-bold text-sm hover:bg-brand-100 transition-all">
                <i class="fa-solid fa-dice mr-2"></i> Generate Random Number
              </button>
            }

            <!-- Result card -->
            <div class="rounded-2xl border-2 border-brand-200 overflow-hidden">
              <div class="bg-brand-50 px-4 py-2 border-b border-brand-100">
                <span class="font-mono text-[10px] text-brand-500">{{ selected.signature }}</span>
              </div>
              <div class="px-4 py-5 text-center">
                <p class="font-mono text-3xl font-black text-brand-700">{{ displayResult }}</p>
                @if (note) {
                  <p class="text-[10px] text-brand-400 mt-1.5 font-medium">{{ note }}</p>
                }
              </div>
            </div>

            <!-- Description -->
            <div class="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p class="text-xs text-blue-800 leading-relaxed">{{ selected.description }}</p>
            </div>
          </div>

          <!-- Right: code view -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-1">
              <!-- variable declarations -->
              @for (inp of selected.inputs; track $index; let i = $index) {
                <div>
                  <span class="text-blue-400">double </span>
                  <span class="text-white">{{ inp.label }} = </span>
                  <span class="text-emerald-400">{{ vals[i] }}</span>
                  <span class="text-slate-500">;</span>
                </div>
              }
              @if (selected.inputs.length > 0) { <div class="h-1"></div> }
              <div>
                <span class="text-blue-400">double </span>
                <span class="text-white">result = </span>
                <span class="text-amber-300">Math.{{ selected.id }}</span>
                <span class="text-slate-300">(</span>
                <span class="text-emerald-400">{{ callArgs }}</span>
                <span class="text-slate-300">);</span>
              </div>
              <div class="h-1"></div>
              <div>
                <span class="text-emerald-400">System.out.println</span>
                <span class="text-slate-300">(result);</span>
              </div>
            </div>

            <!-- Console output -->
            <div class="mt-4">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Console Output</p>
              <div class="bg-black rounded-xl border border-slate-800 px-4 py-3 font-mono text-sm">
                <i class="fa-solid fa-terminal text-emerald-700 mr-2"></i>
                <span class="text-emerald-400">{{ displayResult }}</span>
              </div>
            </div>

            <!-- Comparison strip for round/ceil/floor -->
            @if (selected.id === 'round' || selected.id === 'ceil' || selected.id === 'floor') {
              <div class="mt-4 grid grid-cols-3 gap-2 text-center">
                @for (fn of roundFns; track fn.id) {
                  <div class="rounded-xl border-2 p-2.5"
                    [class.border-brand-400]="fn.id === selected.id"
                    [class.bg-brand-50]="fn.id === selected.id"
                    [class.border-slate-100]="fn.id !== selected.id">
                    <p class="font-mono text-[10px] font-bold"
                      [class.text-brand-600]="fn.id === selected.id"
                      [class.text-slate-500]="fn.id !== selected.id">{{ fn.label }}</p>
                    <p class="font-mono font-black text-lg"
                      [class.text-brand-700]="fn.id === selected.id"
                      [class.text-slate-400]="fn.id !== selected.id">{{ fn.apply([vals[0]]) }}</p>
                  </div>
                }
              </div>
            }
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class MathPlaygroundComponent {
  functions = FUNCTIONS;
  selected  = FUNCTIONS[0];
  vals: number[] = [];
  result = 0;

  roundFns = FUNCTIONS.filter(f => ['round', 'ceil', 'floor'].includes(f.id));

  get displayResult(): string {
    const r = this.result;
    return Number.isInteger(r) ? String(r) : parseFloat(r.toFixed(6)).toString();
  }

  get callArgs(): string {
    return this.vals.join(', ');
  }

  get note(): string {
    return this.selected.outputNote ? this.selected.outputNote(this.vals, this.result) : '';
  }

  constructor() {
    this.initFn();
  }

  selectFn(fn: MathFn) {
    this.selected = fn;
    this.initFn();
  }

  initFn() {
    this.vals = this.selected.inputs.map(i => i.default);
    this.compute();
  }

  onSlider(i: number, event: Event) {
    this.vals[i] = parseFloat((event.target as HTMLInputElement).value);
    this.compute();
  }

  reroll() {
    this.compute();
  }

  compute() {
    try {
      this.result = this.selected.apply(this.vals);
    } catch {
      this.result = 0;
    }
  }
}
