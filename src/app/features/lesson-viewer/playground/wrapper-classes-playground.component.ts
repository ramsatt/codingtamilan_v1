import { Component } from '@angular/core';

interface WrapperDemo {
  primitive: string;
  wrapper: string;
  boxExample: string;
  unboxExample: string;
  parseMethod: string;
  parseInput: string;
  valueOfMethod: string;
}

const WRAPPERS: WrapperDemo[] = [
  { primitive: 'int',    wrapper: 'Integer', boxExample: 'Integer x = 42;',          unboxExample: 'int n = x;',            parseMethod: 'Integer.parseInt("123")',    parseInput: '"123"',    valueOfMethod: 'Integer.valueOf(42)' },
  { primitive: 'double', wrapper: 'Double',  boxExample: 'Double d = 3.14;',          unboxExample: 'double v = d;',         parseMethod: 'Double.parseDouble("3.14")', parseInput: '"3.14"',   valueOfMethod: 'Double.valueOf(3.14)' },
  { primitive: 'boolean',wrapper: 'Boolean', boxExample: 'Boolean b = true;',         unboxExample: 'boolean f = b;',        parseMethod: 'Boolean.parseBoolean("true")',parseInput: '"true"',  valueOfMethod: 'Boolean.valueOf(true)' },
  { primitive: 'char',   wrapper: 'Character',boxExample:'Character c = \'A\';',      unboxExample: 'char ch = c;',          parseMethod: 'Character.isLetter(\'A\')',  parseInput: '\'A\'',   valueOfMethod: 'Character.valueOf(\'A\')' },
  { primitive: 'long',   wrapper: 'Long',    boxExample: 'Long l = 100L;',            unboxExample: 'long v = l;',           parseMethod: 'Long.parseLong("100")',      parseInput: '"100"',    valueOfMethod: 'Long.valueOf(100L)' },
];

@Component({
  selector: 'app-wrapper-classes-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Wrapper Classes Explorer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Mode tabs -->
        <div class="flex gap-2">
          @for (m of modes; track m.id) {
            <button (click)="mode = m.id"
              class="flex-1 py-2.5 rounded-xl border-2 text-xs font-black transition-all"
              [class.border-brand-500]="mode === m.id" [class.bg-brand-50]="mode === m.id" [class.text-brand-700]="mode === m.id"
              [class.border-slate-200]="mode !== m.id" [class.text-slate-600]="mode !== m.id">
              {{ m.label }}
            </button>
          }
        </div>

        <!-- Wrapper selector -->
        <div class="flex gap-2 flex-wrap">
          @for (w of wrappers; track w.primitive) {
            <button (click)="active = w"
              class="px-3 py-2 rounded-xl border-2 font-mono text-xs font-bold transition-all"
              [class.border-brand-500]="active.primitive === w.primitive" [class.bg-brand-50]="active.primitive === w.primitive" [class.text-brand-700]="active.primitive === w.primitive"
              [class.border-slate-100]="active.primitive !== w.primitive" [class.text-slate-600]="active.primitive !== w.primitive">
              {{ w.primitive }} ↔ {{ w.wrapper }}
            </button>
          }
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Visual -->
          <div>
            @if (mode === 'boxing') {
              <!-- Autoboxing -->
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Autoboxing (primitive → object)</p>
              <div class="flex items-center gap-4">
                <!-- Primitive -->
                <div class="flex-1 rounded-xl border-2 border-slate-300 bg-slate-50 p-4 text-center">
                  <div class="text-[10px] text-slate-400 font-bold uppercase mb-2">Primitive</div>
                  <div class="font-mono text-lg font-black text-slate-700">{{ active.primitive }}</div>
                  <div class="text-[10px] mt-1 text-slate-500">stored on stack</div>
                </div>
                <!-- Arrow -->
                <div class="flex flex-col items-center gap-1">
                  <span class="text-xs text-slate-500 font-bold">auto</span>
                  <span class="text-2xl text-brand-500">→</span>
                  <span class="text-[10px] text-slate-400">boxes</span>
                </div>
                <!-- Wrapper Object -->
                <div class="flex-1 rounded-xl border-2 border-brand-400 bg-brand-50 p-4 text-center">
                  <div class="text-[10px] text-brand-500 font-bold uppercase mb-2">Object</div>
                  <div class="font-mono text-lg font-black text-brand-700">{{ active.wrapper }}</div>
                  <div class="text-[10px] mt-1 text-brand-500">stored on heap</div>
                </div>
              </div>
              <div class="mt-3 bg-slate-950 rounded-xl p-3 font-mono text-xs">
                <div><span class="text-blue-400">{{ active.primitive }}</span> <span class="text-white">num = </span><span class="text-emerald-400">{{ exampleValue }}</span><span class="text-slate-400">;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text-slate-500">// primitive</span></div>
                <div><span class="text-yellow-300">{{ active.wrapper }}</span><span class="text-white"> obj = num;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text-slate-500">// autoboxed!</span></div>
              </div>
            } @else if (mode === 'unboxing') {
              <!-- Unboxing -->
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Unboxing (object → primitive)</p>
              <div class="flex items-center gap-4">
                <div class="flex-1 rounded-xl border-2 border-brand-400 bg-brand-50 p-4 text-center">
                  <div class="text-[10px] text-brand-500 font-bold uppercase mb-2">Object</div>
                  <div class="font-mono text-lg font-black text-brand-700">{{ active.wrapper }}</div>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <span class="text-xs text-slate-500 font-bold">auto</span>
                  <span class="text-2xl text-emerald-500">→</span>
                  <span class="text-[10px] text-slate-400">unboxes</span>
                </div>
                <div class="flex-1 rounded-xl border-2 border-slate-300 bg-slate-50 p-4 text-center">
                  <div class="text-[10px] text-slate-400 font-bold uppercase mb-2">Primitive</div>
                  <div class="font-mono text-lg font-black text-slate-700">{{ active.primitive }}</div>
                </div>
              </div>
              <div class="mt-3 bg-slate-950 rounded-xl p-3 font-mono text-xs">
                <div><span class="text-yellow-300">{{ active.wrapper }}</span><span class="text-white"> obj = </span><span class="text-yellow-300">{{ active.wrapper }}</span><span class="text-slate-300">.valueOf({{ exampleValue }});</span></div>
                <div><span class="text-blue-400">{{ active.primitive }}</span><span class="text-white"> n = obj;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="text-slate-500">// unboxed!</span></div>
              </div>
            } @else {
              <!-- Utility methods -->
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Utility Methods</p>
              <div class="space-y-2">
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                  <div class="text-[10px] font-bold text-slate-500 uppercase">parse from String</div>
                  <div class="font-mono text-xs bg-slate-950 rounded p-2 text-emerald-400">{{ active.parseMethod }}</div>
                </div>
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                  <div class="text-[10px] font-bold text-slate-500 uppercase">valueOf</div>
                  <div class="font-mono text-xs bg-slate-950 rounded p-2 text-yellow-300">{{ active.valueOfMethod }}</div>
                </div>
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                  <div class="text-[10px] font-bold text-slate-500 uppercase">max / min value</div>
                  <div class="font-mono text-xs bg-slate-950 rounded p-2 text-blue-400">{{ active.wrapper }}.MAX_VALUE</div>
                </div>
              </div>
            }
          </div>

          <!-- Info -->
          <div class="space-y-3">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Why use Wrapper Classes?</p>
            <ul class="space-y-2 text-xs text-slate-600">
              @for (r of reasons; track r) {
                <li class="flex items-start gap-2">
                  <span class="w-5 h-5 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">✓</span>
                  <span>{{ r }}</span>
                </li>
              }
            </ul>

            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              <strong>Autoboxing:</strong> Java automatically converts between primitives and their wrapper objects when needed — you rarely need to do it manually.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class WrapperClassesPlaygroundComponent {
  wrappers = WRAPPERS;
  active   = WRAPPERS[0];
  mode     = 'boxing';
  modes    = [
    { id: 'boxing',   label: 'Autoboxing' },
    { id: 'unboxing', label: 'Unboxing' },
    { id: 'methods',  label: 'Utility Methods' },
  ];
  reasons = [
    'Use primitives in Java Collections (ArrayList, HashMap require objects)',
    'Call utility methods like parseInt(), valueOf(), isLetter()',
    'Handle null values when primitive would be 0 instead',
    'Use with Generics — ArrayList<Integer> not ArrayList<int>',
  ];
  get exampleValue() {
    const map: Record<string, string> = { int: '42', double: '3.14', boolean: 'true', char: "'A'", long: '100L' };
    return map[this.active.primitive] ?? '42';
  }
}
