import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Tab = 'arithmetic' | 'comparison' | 'logical' | 'assignment';

interface ArithmeticOp  { symbol: string; name: string; }
interface ComparisonOp  { symbol: string; name: string; }
interface AssignmentRow { op: string; meaning: string; example: string; equivalent: string; }

@Component({
  selector: 'app-operator-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Operator Playground</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Interactive Java Operators</span>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto">
        @for (tab of tabs; track tab.key) {
          <button (click)="activeTab = tab.key"
            class="px-5 py-3 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2"
            [class.border-brand-500]="activeTab === tab.key"
            [class.text-brand-600]="activeTab === tab.key"
            [class.bg-white]="activeTab === tab.key"
            [class.border-transparent]="activeTab !== tab.key"
            [class.text-slate-400]="activeTab !== tab.key">
            {{ tab.icon }} {{ tab.label }}
          </button>
        }
      </div>

      <div class="p-6">

        <!-- ── ARITHMETIC TAB ── -->
        @if (activeTab === 'arithmetic') {
          <div class="space-y-5">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Calculator</p>

            <!-- Inputs -->
            <div class="grid grid-cols-3 gap-4 items-end">
              <div>
                <label class="block text-xs font-bold text-slate-600 mb-1.5">Value A</label>
                <input [(ngModel)]="numA" (ngModelChange)="calcArithmetic()" type="number"
                  class="w-full bg-slate-50 border-2 border-slate-100 focus:border-brand-500 rounded-xl px-4 py-3 text-base font-mono font-bold text-slate-800 outline-none">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 mb-1.5">Value B</label>
                <input [(ngModel)]="numB" (ngModelChange)="calcArithmetic()" type="number"
                  class="w-full bg-slate-50 border-2 border-slate-100 focus:border-brand-500 rounded-xl px-4 py-3 text-base font-mono font-bold text-slate-800 outline-none">
              </div>
              <div class="bg-brand-50 border-2 border-brand-100 rounded-xl px-4 py-3 text-center">
                <p class="text-[9px] font-black text-brand-400 uppercase tracking-widest mb-0.5">Selected Result</p>
                <p class="text-2xl font-black text-brand-600 font-mono">{{ selectedArithResult }}</p>
                <p class="text-[10px] text-brand-500 font-mono mt-0.5">{{ numA }} {{ selectedOp }} {{ numB }}</p>
              </div>
            </div>

            <!-- Operator buttons grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              @for (op of arithmeticOps; track op.symbol) {
                <button (click)="selectOp(op.symbol)"
                  class="p-3 rounded-xl border-2 text-left transition-all"
                  [class.border-brand-500]="selectedOp === op.symbol"
                  [class.bg-brand-50]="selectedOp === op.symbol"
                  [class.border-slate-100]="selectedOp !== op.symbol"
                  [class.bg-slate-50]="selectedOp !== op.symbol">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-mono text-lg font-black"
                      [class.text-brand-600]="selectedOp === op.symbol"
                      [class.text-slate-700]="selectedOp !== op.symbol">{{ op.symbol }}</span>
                    <span class="font-mono text-sm font-bold px-2 py-0.5 rounded-lg"
                      [class.bg-brand-100]="selectedOp === op.symbol"
                      [class.text-brand-700]="selectedOp === op.symbol"
                      [class.bg-slate-200]="selectedOp !== op.symbol"
                      [class.text-slate-600]="selectedOp !== op.symbol">
                      {{ arithResults[op.symbol] }}
                    </span>
                  </div>
                  <p class="text-[10px] text-slate-400 font-medium">{{ op.name }}</p>
                  <p class="text-[10px] font-mono mt-0.5"
                    [class.text-brand-500]="selectedOp === op.symbol"
                    [class.text-slate-400]="selectedOp !== op.symbol">
                    {{ numA }} {{ op.symbol }} {{ numB }}
                  </p>
                </button>
              }

              <!-- ++ / -- special -->
              <div class="p-3 rounded-xl border-2 border-slate-100 bg-slate-50">
                <p class="font-mono text-lg font-black text-slate-700 mb-1">++</p>
                <p class="text-[10px] text-slate-400 font-medium">Increment</p>
                <p class="text-[10px] font-mono text-slate-400">{{ numA }}++ → {{ +numA + 1 }}</p>
              </div>
              <div class="p-3 rounded-xl border-2 border-slate-100 bg-slate-50">
                <p class="font-mono text-lg font-black text-slate-700 mb-1">--</p>
                <p class="text-[10px] text-slate-400 font-medium">Decrement</p>
                <p class="text-[10px] font-mono text-slate-400">{{ numA }}-- → {{ +numA - 1 }}</p>
              </div>
            </div>

            <!-- Java Code -->
            <div class="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <p class="text-[9px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Java Code</p>
              <div class="font-mono text-sm space-y-1">
                <div><span class="text-blue-400">int</span> <span class="text-white">a = </span><span class="text-emerald-400">{{ numA }}</span><span class="text-slate-500">;</span></div>
                <div><span class="text-blue-400">int</span> <span class="text-white">b = </span><span class="text-emerald-400">{{ numB }}</span><span class="text-slate-500">;</span></div>
                <div><span class="text-blue-400">int</span> <span class="text-white">result = a </span><span class="text-amber-400">{{ selectedOp }}</span><span class="text-white"> b</span><span class="text-slate-500">;</span> <span class="text-slate-600">// {{ selectedArithResult }}</span></div>
              </div>
            </div>
          </div>
        }

        <!-- ── COMPARISON TAB ── -->
        @if (activeTab === 'comparison') {
          <div class="space-y-5">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comparison Tester — Results are always true or false</p>

            <!-- Inputs -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-600 mb-1.5">Value A</label>
                <input [(ngModel)]="cmpA" (ngModelChange)="calcComparisons()" type="number"
                  class="w-full bg-slate-50 border-2 border-slate-100 focus:border-brand-500 rounded-xl px-4 py-3 text-base font-mono font-bold text-slate-800 outline-none">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-600 mb-1.5">Value B</label>
                <input [(ngModel)]="cmpB" (ngModelChange)="calcComparisons()" type="number"
                  class="w-full bg-slate-50 border-2 border-slate-100 focus:border-brand-500 rounded-xl px-4 py-3 text-base font-mono font-bold text-slate-800 outline-none">
              </div>
            </div>

            <!-- Comparison results grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              @for (op of comparisonOps; track op.symbol) {
                <div class="p-4 rounded-xl border-2 text-center transition-all"
                  [class.border-emerald-300]="cmpResults[op.symbol]"
                  [class.bg-emerald-50]="cmpResults[op.symbol]"
                  [class.border-red-200]="!cmpResults[op.symbol]"
                  [class.bg-red-50]="!cmpResults[op.symbol]">
                  <p class="font-mono text-xl font-black mb-1"
                    [class.text-emerald-600]="cmpResults[op.symbol]"
                    [class.text-red-500]="!cmpResults[op.symbol]">{{ op.symbol }}</p>
                  <p class="text-[10px] text-slate-500 mb-2">{{ op.name }}</p>
                  <div class="px-3 py-1 rounded-full text-xs font-black inline-block"
                    [class.bg-emerald-500]="cmpResults[op.symbol]"
                    [class.text-white]="cmpResults[op.symbol]"
                    [class.bg-red-400]="!cmpResults[op.symbol]"
                    [class.text-white]="!cmpResults[op.symbol]">
                    {{ cmpResults[op.symbol] ? 'true' : 'false' }}
                  </div>
                  <p class="font-mono text-[10px] text-slate-400 mt-2">{{ cmpA }} {{ op.symbol }} {{ cmpB }}</p>
                </div>
              }
            </div>

            <!-- Java Code -->
            <div class="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <p class="text-[9px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Java Code</p>
              <div class="font-mono text-xs space-y-1">
                @for (op of comparisonOps; track op.symbol) {
                  <div>
                    <span class="text-blue-400">boolean </span>
                    <span class="text-white">r{{ opVarName(op.symbol) }} = ({{ cmpA }} </span>
                    <span class="text-amber-400">{{ op.symbol }}</span>
                    <span class="text-white"> {{ cmpB }})</span>
                    <span class="text-slate-500">;</span>
                    <span class="text-slate-600 ml-2">// {{ cmpResults[op.symbol] }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- ── LOGICAL TAB ── -->
        @if (activeTab === 'logical') {
          <div class="space-y-5">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logical Gate — Toggle the boolean values</p>

            <!-- Boolean toggles -->
            <div class="grid grid-cols-2 gap-4">
              @for (v of logicalVars; track v.label) {
                <div class="p-4 rounded-xl border-2 transition-all"
                  [class.border-emerald-300]="v.value"
                  [class.bg-emerald-50]="v.value"
                  [class.border-slate-200]="!v.value"
                  [class.bg-slate-50]="!v.value">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-mono text-sm font-black text-slate-700">{{ v.label }}</span>
                    <button (click)="toggleLogical(v)"
                      class="relative w-12 h-6 rounded-full transition-colors focus:outline-none"
                      [class.bg-emerald-500]="v.value" [class.bg-slate-300]="!v.value">
                      <span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                        [class.translate-x-6]="v.value" [class.translate-x-0]="!v.value"></span>
                    </button>
                  </div>
                  <div class="text-center py-2 rounded-lg font-mono font-black text-lg"
                    [class.text-emerald-600]="v.value" [class.text-slate-400]="!v.value">
                    {{ v.value }}
                  </div>
                </div>
              }
            </div>

            <!-- Logical results -->
            <div class="grid grid-cols-3 gap-3">
              <!-- AND -->
              <div class="p-4 rounded-xl border-2 text-center"
                [class.border-emerald-300]="logicalA && logicalB"
                [class.bg-emerald-50]="logicalA && logicalB"
                [class.border-slate-200]="!(logicalA && logicalB)"
                [class.bg-slate-50]="!(logicalA && logicalB)">
                <p class="font-mono text-xl font-black mb-1 text-slate-800">&&</p>
                <p class="text-[10px] text-slate-500 mb-2">AND — both must be true</p>
                <div class="px-3 py-1 rounded-full text-xs font-black inline-block"
                  [class.bg-emerald-500]="logicalA && logicalB"
                  [class.text-white]="logicalA && logicalB"
                  [class.bg-slate-300]="!(logicalA && logicalB)"
                  [class.text-slate-700]="!(logicalA && logicalB)">
                  {{ logicalA && logicalB }}
                </div>
                <p class="font-mono text-[10px] text-slate-400 mt-2">a && b</p>
              </div>

              <!-- OR -->
              <div class="p-4 rounded-xl border-2 text-center"
                [class.border-emerald-300]="logicalA || logicalB"
                [class.bg-emerald-50]="logicalA || logicalB"
                [class.border-slate-200]="!(logicalA || logicalB)"
                [class.bg-slate-50]="!(logicalA || logicalB)">
                <p class="font-mono text-xl font-black mb-1 text-slate-800">||</p>
                <p class="text-[10px] text-slate-500 mb-2">OR — at least one true</p>
                <div class="px-3 py-1 rounded-full text-xs font-black inline-block"
                  [class.bg-emerald-500]="logicalA || logicalB"
                  [class.text-white]="logicalA || logicalB"
                  [class.bg-slate-300]="!(logicalA || logicalB)"
                  [class.text-slate-700]="!(logicalA || logicalB)">
                  {{ logicalA || logicalB }}
                </div>
                <p class="font-mono text-[10px] text-slate-400 mt-2">a || b</p>
              </div>

              <!-- NOT -->
              <div class="p-4 rounded-xl border-2 text-center"
                [class.border-emerald-300]="!logicalA"
                [class.bg-emerald-50]="!logicalA"
                [class.border-slate-200]="logicalA"
                [class.bg-slate-50]="logicalA">
                <p class="font-mono text-xl font-black mb-1 text-slate-800">!</p>
                <p class="text-[10px] text-slate-500 mb-2">NOT — inverts the value</p>
                <div class="px-3 py-1 rounded-full text-xs font-black inline-block"
                  [class.bg-emerald-500]="!logicalA"
                  [class.text-white]="!logicalA"
                  [class.bg-slate-300]="logicalA"
                  [class.text-slate-700]="logicalA">
                  {{ !logicalA }}
                </div>
                <p class="font-mono text-[10px] text-slate-400 mt-2">!a</p>
              </div>
            </div>

            <!-- Truth table -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Truth Table</p>
              <div class="rounded-xl overflow-hidden border border-slate-200">
                <table class="w-full text-xs font-mono">
                  <thead>
                    <tr class="bg-slate-100 text-slate-500 font-black uppercase tracking-wider">
                      <th class="px-4 py-2 text-left">a</th>
                      <th class="px-4 py-2 text-left">b</th>
                      <th class="px-4 py-2 text-left">a && b</th>
                      <th class="px-4 py-2 text-left">a || b</th>
                      <th class="px-4 py-2 text-left">!a</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (row of truthTable; track $index) {
                      <tr class="border-t border-slate-100"
                        [class.bg-brand-50]="row.a === logicalA && row.b === logicalB">
                        <td class="px-4 py-2" [class.text-emerald-600]="row.a" [class.text-red-400]="!row.a">{{ row.a }}</td>
                        <td class="px-4 py-2" [class.text-emerald-600]="row.b" [class.text-red-400]="!row.b">{{ row.b }}</td>
                        <td class="px-4 py-2" [class.text-emerald-600]="row.and" [class.text-red-400]="!row.and">{{ row.and }}</td>
                        <td class="px-4 py-2" [class.text-emerald-600]="row.or"  [class.text-red-400]="!row.or">{{ row.or }}</td>
                        <td class="px-4 py-2" [class.text-emerald-600]="!row.a"  [class.text-red-400]="row.a">{{ !row.a }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        <!-- ── ASSIGNMENT TAB ── -->
        @if (activeTab === 'assignment') {
          <div class="space-y-5">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignment Operators — Shorthand for updating a variable</p>

            <!-- Live demo -->
            <div class="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
              <p class="text-xs font-bold text-slate-600">Starting value of <span class="font-mono text-brand-600">x</span></p>
              <div class="flex items-center gap-4">
                <input [(ngModel)]="assignX" type="number"
                  class="w-28 bg-white border-2 border-slate-200 focus:border-brand-500 rounded-xl px-3 py-2 text-base font-mono font-bold text-slate-800 outline-none">
                <span class="text-sm text-slate-400">Pick an operator to see what happens to x</span>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (row of assignmentRows; track row.op) {
                  <button (click)="selectedAssignOp = row.op"
                    class="px-3 py-1.5 rounded-lg border-2 font-mono text-sm font-bold transition-all"
                    [class.border-brand-500]="selectedAssignOp === row.op"
                    [class.bg-brand-500]="selectedAssignOp === row.op"
                    [class.text-white]="selectedAssignOp === row.op"
                    [class.border-slate-200]="selectedAssignOp !== row.op"
                    [class.text-slate-600]="selectedAssignOp !== row.op">
                    {{ row.op }}
                  </button>
                }
              </div>
              @if (selectedAssignOp) {
                <div class="bg-white rounded-xl border border-brand-100 p-4 space-y-2">
                  <div class="flex items-center gap-3 flex-wrap">
                    <span class="font-mono text-base font-black text-slate-800">x {{ selectedAssignOp }} 5</span>
                    <i class="fa-solid fa-arrow-right text-slate-300"></i>
                    <span class="font-mono text-base font-black text-brand-600">x = {{ calcAssign(assignX, selectedAssignOp, 5) }}</span>
                  </div>
                  <p class="text-[10px] text-slate-400">Same as: <span class="font-mono">x = {{ assignX }} {{ assignOpMeaning(selectedAssignOp) }} 5</span></p>
                </div>
              }
            </div>

            <!-- Reference table -->
            <div class="rounded-xl overflow-hidden border border-slate-200">
              <table class="w-full text-xs">
                <thead>
                  <tr class="bg-slate-100">
                    <th class="px-4 py-2.5 text-left font-black text-slate-500 uppercase tracking-wider">Op</th>
                    <th class="px-4 py-2.5 text-left font-black text-slate-500 uppercase tracking-wider">Example</th>
                    <th class="px-4 py-2.5 text-left font-black text-slate-500 uppercase tracking-wider">Same As</th>
                    <th class="px-4 py-2.5 text-left font-black text-slate-500 uppercase tracking-wider">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of assignmentRows; track row.op) {
                    <tr class="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td class="px-4 py-3 font-mono font-black text-brand-600 text-sm">{{ row.op }}</td>
                      <td class="px-4 py-3 font-mono text-slate-700">{{ row.example }}</td>
                      <td class="px-4 py-3 font-mono text-slate-500">{{ row.equivalent }}</td>
                      <td class="px-4 py-3 text-slate-500">{{ row.meaning }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class OperatorPlaygroundComponent {
  activeTab: Tab = 'arithmetic';

  tabs = [
    { key: 'arithmetic' as Tab,  icon: '➕', label: 'Arithmetic' },
    { key: 'comparison' as Tab,  icon: '⚖️',  label: 'Comparison' },
    { key: 'logical'    as Tab,  icon: '🔁',  label: 'Logical' },
    { key: 'assignment' as Tab,  icon: '📝',  label: 'Assignment' },
  ];

  // ── ARITHMETIC ──
  numA = 10;
  numB = 3;
  selectedOp = '+';
  selectedArithResult: number | string = 13;
  arithResults: Record<string, number | string> = {};

  arithmeticOps: ArithmeticOp[] = [
    { symbol: '+',  name: 'Addition' },
    { symbol: '-',  name: 'Subtraction' },
    { symbol: '*',  name: 'Multiplication' },
    { symbol: '/',  name: 'Division' },
    { symbol: '%',  name: 'Modulus (remainder)' },
  ];

  selectOp(op: string) {
    this.selectedOp = op;
    this.selectedArithResult = this.arithResults[op];
  }

  calcArithmetic() {
    const a = +this.numA, b = +this.numB;
    this.arithResults = {
      '+': a + b,
      '-': a - b,
      '*': a * b,
      '/': b !== 0 ? parseFloat((a / b).toFixed(4)) : 'Error (÷0)',
      '%': b !== 0 ? a % b : 'Error (÷0)',
    };
    this.selectedArithResult = this.arithResults[this.selectedOp];
  }

  // ── COMPARISON ──
  cmpA = 10;
  cmpB = 5;
  cmpResults: Record<string, boolean> = {};

  comparisonOps: ComparisonOp[] = [
    { symbol: '==', name: 'Equal to' },
    { symbol: '!=', name: 'Not equal to' },
    { symbol: '>',  name: 'Greater than' },
    { symbol: '<',  name: 'Less than' },
    { symbol: '>=', name: 'Greater or equal' },
    { symbol: '<=', name: 'Less or equal' },
  ];

  calcComparisons() {
    const a = +this.cmpA, b = +this.cmpB;
    this.cmpResults = {
      '==': a === b, '!=': a !== b,
      '>':  a > b,   '<':  a < b,
      '>=': a >= b,  '<=': a <= b,
    };
  }

  // ── LOGICAL ──
  logicalVars = [
    { label: 'boolean a', value: true },
    { label: 'boolean b', value: false },
  ];

  get logicalA() { return this.logicalVars[0].value; }
  get logicalB() { return this.logicalVars[1].value; }

  toggleLogical(v: { label: string; value: boolean }) { v.value = !v.value; }

  truthTable = [
    { a: true,  b: true,  and: true,  or: true  },
    { a: true,  b: false, and: false, or: true  },
    { a: false, b: true,  and: false, or: true  },
    { a: false, b: false, and: false, or: false },
  ];

  // ── ASSIGNMENT ──
  assignX = 10;
  selectedAssignOp = '+=';

  assignmentRows: AssignmentRow[] = [
    { op: '=',   example: 'x = 5',   equivalent: 'x = 5',       meaning: 'Assign value' },
    { op: '+=',  example: 'x += 5',  equivalent: 'x = x + 5',   meaning: 'Add and assign' },
    { op: '-=',  example: 'x -= 5',  equivalent: 'x = x - 5',   meaning: 'Subtract and assign' },
    { op: '*=',  example: 'x *= 5',  equivalent: 'x = x * 5',   meaning: 'Multiply and assign' },
    { op: '/=',  example: 'x /= 5',  equivalent: 'x = x / 5',   meaning: 'Divide and assign' },
    { op: '%=',  example: 'x %= 5',  equivalent: 'x = x % 5',   meaning: 'Modulus and assign' },
  ];

  calcAssign(x: number, op: string, n: number): number | string {
    const a = +x;
    switch (op) {
      case '=':  return n;
      case '+=': return a + n;
      case '-=': return a - n;
      case '*=': return a * n;
      case '/=': return n !== 0 ? parseFloat((a / n).toFixed(4)) : 'Error';
      case '%=': return n !== 0 ? a % n : 'Error';
      default:   return a;
    }
  }

  opVarName(symbol: string): string {
    const map: Record<string, string> = {
      '==': 'Eq', '!=': 'NotEq', '>': 'Gt', '<': 'Lt', '>=': 'GtEq', '<=': 'LtEq'
    };
    return map[symbol] ?? symbol;
  }

  assignOpMeaning(op: string): string {
    const map: Record<string, string> = { '+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%', '=': '' };
    return map[op] ?? '';
  }

  constructor() {
    this.calcArithmetic();
    this.calcComparisons();
  }
}
