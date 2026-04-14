import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StringMethod {
  id: string;
  label: string;
  signature: string;
  description: string;
  apply: (s: string, arg?: string | number) => string;
  hasArg?: boolean;
  argLabel?: string;
  argDefault?: string;
  argType?: 'text' | 'number';
}

const METHODS: StringMethod[] = [
  {
    id: 'length',
    label: 'length()',
    signature: 'str.length()',
    description: 'Returns the number of characters in the string.',
    apply: s => String(s.length),
  },
  {
    id: 'toUpperCase',
    label: 'toUpperCase()',
    signature: 'str.toUpperCase()',
    description: 'Converts every character to uppercase.',
    apply: s => s.toUpperCase(),
  },
  {
    id: 'toLowerCase',
    label: 'toLowerCase()',
    signature: 'str.toLowerCase()',
    description: 'Converts every character to lowercase.',
    apply: s => s.toLowerCase(),
  },
  {
    id: 'trim',
    label: 'trim()',
    signature: 'str.trim()',
    description: 'Removes leading and trailing whitespace.',
    apply: s => s.trim(),
  },
  {
    id: 'charAt',
    label: 'charAt(i)',
    signature: 'str.charAt(index)',
    description: 'Returns the character at the given index position.',
    apply: (s, arg) => { const i = Number(arg ?? 0); return i >= 0 && i < s.length ? `'${s[i]}'` : 'Index out of bounds'; },
    hasArg: true, argLabel: 'Index', argDefault: '0', argType: 'number',
  },
  {
    id: 'indexOf',
    label: 'indexOf(s)',
    signature: 'str.indexOf(search)',
    description: 'Returns the index of the first occurrence of the search text, or -1 if not found.',
    apply: (s, arg) => String(s.indexOf(String(arg ?? ''))),
    hasArg: true, argLabel: 'Search text', argDefault: 'a', argType: 'text',
  },
  {
    id: 'contains',
    label: 'contains(s)',
    signature: 'str.contains(search)',
    description: 'Returns true if the string contains the given text.',
    apply: (s, arg) => String(s.includes(String(arg ?? ''))),
    hasArg: true, argLabel: 'Search text', argDefault: 'Java', argType: 'text',
  },
  {
    id: 'substring',
    label: 'substring(i)',
    signature: 'str.substring(start)',
    description: 'Returns a new string from the start index to the end.',
    apply: (s, arg) => { const i = Number(arg ?? 0); return i >= 0 && i <= s.length ? `"${s.substring(i)}"` : 'Index out of bounds'; },
    hasArg: true, argLabel: 'Start index', argDefault: '5', argType: 'number',
  },
  {
    id: 'replace',
    label: 'replace(a,b)',
    signature: 'str.replace(old, new)',
    description: 'Replaces all occurrences of a character or text with another.',
    apply: (s, arg) => { const parts = String(arg ?? 'a,b').split(','); return `"${s.split(parts[0]).join(parts[1] ?? '')}"` ; },
    hasArg: true, argLabel: 'old,new', argDefault: 'a,@', argType: 'text',
  },
  {
    id: 'isEmpty',
    label: 'isEmpty()',
    signature: 'str.isEmpty()',
    description: 'Returns true if the string has zero characters.',
    apply: s => String(s.length === 0),
  },
];

@Component({
  selector: 'app-string-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">String Methods Explorer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Type a string, pick a method, see the result</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- String input -->
        <div class="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your String</label>
          <div class="flex items-center gap-2">
            <span class="font-mono text-slate-400 text-sm shrink-0">String str =</span>
            <input [(ngModel)]="inputStr" (ngModelChange)="compute()"
              class="flex-1 font-mono text-sm border-2 border-slate-200 focus:border-brand-500 rounded-xl px-3 py-2 outline-none bg-white transition-all"
              placeholder="Hello, Java World!">
          </div>
          <!-- character strip -->
          @if (inputStr.length > 0) {
            <div class="flex flex-wrap gap-1 pt-1">
              @for (ch of charArray; track $index; let i = $index) {
                <div class="flex flex-col items-center">
                  <div class="w-7 h-7 rounded border border-slate-200 bg-white font-mono text-xs flex items-center justify-center text-slate-700"
                    [class.bg-brand-500]="selectedMethod?.id === 'charAt' && Number(methodArg) === i"
                    [class.text-white]="selectedMethod?.id === 'charAt' && Number(methodArg) === i"
                    [class.border-brand-400]="selectedMethod?.id === 'charAt' && Number(methodArg) === i">
                    {{ ch === ' ' ? '␣' : ch }}
                  </div>
                  <span class="text-[8px] text-slate-300">{{ i }}</span>
                </div>
              }
            </div>
          }
        </div>

        <!-- Method grid -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Method</p>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
            @for (m of methods; track m.id) {
              <button (click)="selectMethod(m)"
                class="px-2 py-2 rounded-xl border-2 text-center transition-all"
                [class.border-brand-500]="selectedMethod?.id === m.id"
                [class.bg-brand-50]="selectedMethod?.id === m.id"
                [class.border-slate-100]="selectedMethod?.id !== m.id"
                [class.bg-slate-50]="selectedMethod?.id !== m.id">
                <p class="font-mono text-[11px] font-bold"
                  [class.text-brand-700]="selectedMethod?.id === m.id"
                  [class.text-slate-600]="selectedMethod?.id !== m.id">{{ m.label }}</p>
              </button>
            }
          </div>
        </div>

        @if (selectedMethod) {
          <!-- Argument input if needed -->
          @if (selectedMethod.hasArg) {
            <div class="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <span class="text-xs font-bold text-amber-700">{{ selectedMethod.argLabel }}:</span>
              <input [(ngModel)]="methodArg" (ngModelChange)="compute()"
                [type]="selectedMethod.argType === 'number' ? 'number' : 'text'"
                class="font-mono text-sm border-2 border-amber-200 focus:border-amber-400 rounded-lg px-3 py-1.5 outline-none bg-white w-36 transition-all">
            </div>
          }

          <!-- Result panel -->
          <div class="grid lg:grid-cols-2 gap-5">

            <!-- Code view -->
            <div>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
              <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-1">
                <div>
                  <span class="text-blue-400">String</span>
                  <span class="text-white"> str = </span>
                  <span class="text-emerald-400">"{{ inputStr }}"</span>
                  <span class="text-slate-500">;</span>
                </div>
                <div class="h-1"></div>
                <div>
                  <span class="text-white">result = str.</span>
                  <span class="text-amber-300">{{ selectedMethod.id }}</span>
                  <span class="text-slate-300">(</span>
                  @if (selectedMethod.hasArg) {
                    @if (selectedMethod.argType === 'text') {
                      <span class="text-emerald-400">"{{ methodArg }}"</span>
                    } @else {
                      <span class="text-emerald-400">{{ methodArg }}</span>
                    }
                  }
                  <span class="text-slate-300">);</span>
                </div>
                <div>
                  <span class="text-emerald-400">System.out.println</span>
                  <span class="text-slate-300">(result);</span>
                </div>
              </div>

              <!-- Description -->
              <div class="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">What it does</p>
                <p class="text-xs text-blue-800 leading-relaxed">{{ selectedMethod.description }}</p>
              </div>
            </div>

            <!-- Result -->
            <div class="space-y-3">
              <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Result</p>
                <div class="rounded-2xl border-2 border-brand-200 overflow-hidden">
                  <div class="bg-brand-50 px-4 py-2 border-b border-brand-100">
                    <span class="font-mono text-[10px] text-brand-500">str.{{ selectedMethod.id }}({{ selectedMethod.hasArg ? (selectedMethod.argType === 'text' ? '"' + methodArg + '"' : methodArg) : '' }})</span>
                  </div>
                  <div class="px-4 py-5 text-center">
                    <p class="font-mono text-2xl font-black text-brand-700 break-all">{{ result }}</p>
                  </div>
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
        }

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class StringPlaygroundComponent {
  methods = METHODS;
  selectedMethod: StringMethod | null = METHODS[0];
  inputStr = 'Hello, Java World!';
  methodArg = '';
  result = '';

  get charArray(): string[] { return this.inputStr.split(''); }
  Number = Number;

  constructor() {
    this.methodArg = this.selectedMethod?.argDefault ?? '';
    this.compute();
  }

  selectMethod(m: StringMethod) {
    this.selectedMethod = m;
    this.methodArg = m.argDefault ?? '';
    this.compute();
  }

  compute() {
    if (!this.selectedMethod) return;
    try {
      this.result = this.selectedMethod.apply(this.inputStr, this.methodArg);
    } catch {
      this.result = 'Error';
    }
  }
}
