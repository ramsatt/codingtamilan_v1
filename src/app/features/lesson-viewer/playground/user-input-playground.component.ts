import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type InputMethod = 'nextLine' | 'nextInt' | 'nextDouble' | 'nextBoolean';

interface InputOption {
  method: InputMethod;
  label: string;
  hint: string;
  validate: (v: string) => boolean;
  parse: (v: string) => string;
  javaType: string;
}

const OPTIONS: InputOption[] = [
  { method: 'nextLine',    label: 'nextLine()',    hint: 'Any text',      javaType: 'String',  validate: () => true,              parse: v => `"${v}"` },
  { method: 'nextInt',     label: 'nextInt()',     hint: 'Whole number',  javaType: 'int',     validate: v => /^-?\d+$/.test(v.trim()), parse: v => v.trim() },
  { method: 'nextDouble',  label: 'nextDouble()',  hint: 'Decimal number',javaType: 'double',  validate: v => !isNaN(+v),         parse: v => (+v).toString() },
  { method: 'nextBoolean', label: 'nextBoolean()', hint: 'true or false', javaType: 'boolean', validate: v => /^(true|false)$/i.test(v.trim()), parse: v => v.trim().toLowerCase() },
];

@Component({
  selector: 'app-user-input-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Scanner — User Input Simulator</span>
      </div>

      <div class="p-6 grid lg:grid-cols-2 gap-6">

        <!-- Left: Scanner controls -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Simulate Scanner Input</p>

          <!-- Method selector -->
          <div class="grid grid-cols-2 gap-2">
            @for (opt of options; track opt.method) {
              <button (click)="selectMethod(opt)"
                class="px-3 py-2.5 rounded-xl border-2 text-xs font-mono font-bold transition-all text-left"
                [class.border-brand-500]="current.method === opt.method" [class.bg-brand-50]="current.method === opt.method" [class.text-brand-700]="current.method === opt.method"
                [class.border-slate-100]="current.method !== opt.method" [class.text-slate-600]="current.method !== opt.method">
                {{ opt.label }}
                <span class="block text-[9px] font-normal mt-0.5"
                  [class.text-brand-400]="current.method === opt.method"
                  [class.text-slate-400]="current.method !== opt.method">→ {{ opt.javaType }}</span>
              </button>
            }
          </div>

          <!-- Input field -->
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type your input ({{ current.hint }})</label>
            <div class="flex gap-2">
              <input [(ngModel)]="inputValue" [placeholder]="current.hint"
                class="flex-1 border border-slate-300 rounded-lg px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none"
                (keyup.enter)="read()">
              <button (click)="read()"
                class="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-black rounded-lg transition-all active:scale-95">
                Read
              </button>
            </div>
            @if (error) {
              <p class="text-xs text-red-500">{{ error }}</p>
            }
          </div>

          <!-- Output log -->
          <div class="bg-black rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-1.5 min-h-[100px] overflow-y-auto max-h-[160px]">
            @if (log.length === 0) {
              <span class="text-slate-600 italic">Output will appear here...</span>
            }
            @for (entry of log; track $index) {
              <div>
                <span class="text-slate-500">{{ entry.prompt }}</span>
                <span [class.text-emerald-400]="!entry.isError" [class.text-red-400]="entry.isError"> {{ entry.result }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Right: Code -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Java Code</p>

          <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5">
            <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.util.Scanner</span>;</div>
            <div class="h-2"></div>
            <div><span class="text-purple-400">public class</span> <span class="text-yellow-300">Main</span> &#123;</div>
            <div class="pl-4"><span class="text-purple-400">public static void</span> <span class="text-yellow-300">main</span>(String[] args) &#123;</div>
            <div class="pl-8">
              <span class="text-blue-400">Scanner</span>
              <span class="text-white"> sc = </span>
              <span class="text-purple-400">new </span>
              <span class="text-blue-400">Scanner</span>
              <span class="text-slate-300">(System.in);</span>
            </div>
            <div class="h-2"></div>
            <div class="pl-8"><span class="text-emerald-400">System.out.print</span><span class="text-slate-300">("Enter value: ");</span></div>
            <div class="pl-8 bg-brand-900/30 rounded px-2 py-0.5">
              <span class="text-blue-300">{{ current.javaType }}</span>
              <span class="text-white"> input = sc.</span>
              <span class="text-yellow-300">{{ current.method }}</span>
              <span class="text-slate-300">();</span>
              <span class="text-slate-500 ml-2">// ← active</span>
            </div>
            <div class="pl-8"><span class="text-emerald-400">System.out.println</span><span class="text-slate-300">("You entered: " + input);</span></div>
            <div class="pl-4">&#125;</div>
            <div>&#125;</div>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
            <strong>Note:</strong> <code class="bg-amber-100 px-1 rounded">Scanner</code> reads from <code class="bg-amber-100 px-1 rounded">System.in</code> (standard input).
            Always close it with <code class="bg-amber-100 px-1 rounded">sc.close()</code> when done to free resources. Use <code class="bg-amber-100 px-1 rounded">nextLine()</code> after <code class="bg-amber-100 px-1 rounded">nextInt()</code> to consume the leftover newline.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class UserInputPlaygroundComponent {
  options    = OPTIONS;
  current    = OPTIONS[0];
  inputValue = '';
  error      = '';
  log: { prompt: string; result: string; isError: boolean }[] = [];

  selectMethod(opt: InputOption) { this.current = opt; this.inputValue = ''; this.error = ''; }

  read() {
    this.error = '';
    if (!this.inputValue.trim()) { this.error = 'Please type a value first.'; return; }
    if (!this.current.validate(this.inputValue)) {
      this.error = `InputMismatchException: "${this.inputValue}" is not a valid ${this.current.javaType}`;
      this.log = [{ prompt: `sc.${this.current.method}() →`, result: `⚠ ${this.error}`, isError: true }, ...this.log].slice(0, 8);
      return;
    }
    const parsed = this.current.parse(this.inputValue);
    this.log = [{ prompt: `sc.${this.current.method}() →`, result: `${parsed}  (${this.current.javaType})`, isError: false }, ...this.log].slice(0, 8);
    this.inputValue = '';
  }
}
