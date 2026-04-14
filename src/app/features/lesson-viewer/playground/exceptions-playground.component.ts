import { Component } from '@angular/core';

interface ExceptionScenario {
  id: string;
  label: string;
  icon: string;
  exceptionClass: string;
  trigger: string;
  tryCode: string;
  catchCode: string;
  finallyCode: string;
  message: string;
}

const SCENARIOS: ExceptionScenario[] = [
  {
    id: 'npe', label: 'NullPointerException', icon: '💥', exceptionClass: 'NullPointerException',
    trigger: 'String s = null; s.length();',
    tryCode: 'String s = null;\nString upper = s.toUpperCase();',
    catchCode: 'System.out.println("Caught: " + e.getMessage());',
    finallyCode: 'System.out.println("Finally always runs!");',
    message: 'Cannot invoke method on null reference'
  },
  {
    id: 'aioob', label: 'ArrayIndexOutOfBounds', icon: '📍', exceptionClass: 'ArrayIndexOutOfBoundsException',
    trigger: 'int[] arr = {1,2,3}; arr[5];',
    tryCode: 'int[] arr = {1, 2, 3};\nint val = arr[5];',
    catchCode: 'System.out.println("Index 5 does not exist!");',
    finallyCode: 'System.out.println("Cleanup done.");',
    message: 'Index 5 out of bounds for length 3'
  },
  {
    id: 'nfe', label: 'NumberFormatException', icon: '🔢', exceptionClass: 'NumberFormatException',
    trigger: 'Integer.parseInt("abc");',
    tryCode: 'String input = "abc";\nint num = Integer.parseInt(input);',
    catchCode: 'System.out.println("Not a valid number: " + e.getMessage());',
    finallyCode: 'System.out.println("Always executes.");',
    message: 'For input string: "abc"'
  },
  {
    id: 'ae', label: 'ArithmeticException', icon: '➗', exceptionClass: 'ArithmeticException',
    trigger: 'int result = 10 / 0;',
    tryCode: 'int a = 10, b = 0;\nint result = a / b;',
    catchCode: 'System.out.println("Cannot divide by zero!");',
    finallyCode: 'System.out.println("Finally block ran.");',
    message: '/ by zero'
  },
  {
    id: 'custom', label: 'Custom Exception', icon: '🛠️', exceptionClass: 'InvalidAgeException',
    trigger: 'if (age < 0) throw new InvalidAgeException(...);',
    tryCode: 'int age = -5;\nif (age < 0) throw new InvalidAgeException("Age cannot be negative");',
    catchCode: 'System.out.println("Caught: " + e.getMessage());',
    finallyCode: 'System.out.println("Validation complete.");',
    message: 'Age cannot be negative'
  },
];

type FlowState = 'idle' | 'try' | 'throw' | 'catch' | 'finally' | 'done';

@Component({
  selector: 'app-exceptions-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Exception Handling Flow</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Scenario selector -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
          @for (s of scenarios; track s.id) {
            <button (click)="select(s)"
              class="px-3 py-2.5 rounded-xl border-2 text-center transition-all"
              [class.border-brand-500]="active.id === s.id" [class.bg-brand-50]="active.id === s.id"
              [class.border-slate-100]="active.id !== s.id" [class.bg-slate-50]="active.id !== s.id">
              <div class="text-lg mb-0.5">{{ s.icon }}</div>
              <div class="text-[10px] font-bold leading-tight"
                [class.text-brand-700]="active.id === s.id"
                [class.text-slate-600]="active.id !== s.id">{{ s.label.length > 16 ? s.label.slice(0, 14) + '...' : s.label }}</div>
            </button>
          }
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Flow diagram -->
          <div class="space-y-3">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Execution Flow</p>

            <!-- try block -->
            <div class="rounded-xl border-2 overflow-hidden transition-all"
              [class.border-blue-400]="flow === 'try' || flow === 'done'"
              [class.bg-blue-50]="flow === 'try'"
              [class.border-slate-200]="flow !== 'try' && flow !== 'done' && flow !== 'throw'"
              [class.border-red-400]="flow === 'throw'">
              <div class="px-3 py-2 flex items-center gap-2 font-mono text-xs font-bold"
                [class.bg-blue-500]="flow === 'try'" [class.text-white]="flow === 'try'"
                [class.bg-red-400]="flow === 'throw'" [class.text-white]="flow === 'throw'"
                [class.bg-slate-100]="flow !== 'try' && flow !== 'throw'"
                [class.text-slate-600]="flow !== 'try' && flow !== 'throw'">
                @if (flow === 'try') { <span class="animate-pulse">▶</span> }
                @if (flow === 'throw') { <span>💥</span> }
                try &#123;
              </div>
              <div class="p-3 font-mono text-xs text-slate-600 whitespace-pre bg-white">{{ active.tryCode }}</div>
            </div>

            <!-- catch block -->
            <div class="rounded-xl border-2 overflow-hidden transition-all"
              [class.border-amber-400]="flow === 'catch' || (flow === 'done' && state === 'caught')"
              [class.bg-amber-50]="flow === 'catch'"
              [class.border-slate-200]="flow !== 'catch'">
              <div class="px-3 py-2 flex items-center gap-2 font-mono text-xs font-bold"
                [class.bg-amber-400]="flow === 'catch'" [class.text-white]="flow === 'catch'"
                [class.bg-slate-100]="flow !== 'catch'"
                [class.text-slate-600]="flow !== 'catch'">
                @if (flow === 'catch') { <span class="animate-pulse">▶</span> }
                &#125; catch (<span class="text-red-300">{{ active.exceptionClass }}</span> e) &#123;
              </div>
              <div class="p-3 font-mono text-xs text-slate-600 bg-white">{{ active.catchCode }}</div>
            </div>

            <!-- finally block -->
            <div class="rounded-xl border-2 overflow-hidden transition-all"
              [class.border-emerald-400]="flow === 'finally' || flow === 'done'"
              [class.bg-emerald-50]="flow === 'finally'"
              [class.border-slate-200]="flow !== 'finally' && flow !== 'done'">
              <div class="px-3 py-2 flex items-center gap-2 font-mono text-xs font-bold"
                [class.bg-emerald-500]="flow === 'finally'" [class.text-white]="flow === 'finally'"
                [class.bg-slate-100]="flow !== 'finally'"
                [class.text-slate-600]="flow !== 'finally'">
                @if (flow === 'finally') { <span class="animate-pulse">▶</span> }
                &#125; finally &#123;
              </div>
              <div class="p-3 font-mono text-xs text-slate-600 bg-white">{{ active.finallyCode }}</div>
              <div class="px-3 py-2 text-xs font-mono text-slate-500 bg-slate-50">&#125;</div>
            </div>
          </div>

          <!-- Controls + output -->
          <div class="space-y-4">
            <div class="flex gap-2">
              <button (click)="simulate()"
                class="flex-1 py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                <i class="fa-solid fa-play text-xs"></i> Run with Exception
              </button>
              <button (click)="simulateSuccess()"
                class="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                <i class="fa-solid fa-check text-xs"></i> Run — No Exception
              </button>
            </div>

            <div class="bg-black rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-1.5 min-h-[100px]">
              @if (log.length === 0) { <span class="text-slate-600 italic">Click Run to simulate...</span> }
              @for (l of log; track $index) {
                <div [class.text-emerald-400]="l.type === 'ok'"
                  [class.text-red-400]="l.type === 'err'"
                  [class.text-amber-400]="l.type === 'catch'"
                  [class.text-blue-400]="l.type === 'info'">
                  <i class="fa-solid fa-terminal text-slate-600 mr-1 text-[9px]"></i>{{ l.msg }}
                </div>
              }
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              <strong>finally always runs!</strong> Whether an exception was thrown or not, the <code class="bg-amber-100 px-1 rounded">finally</code> block executes. Use it for cleanup (closing files, releasing DB connections, etc.).
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ExceptionsPlaygroundComponent {
  scenarios = SCENARIOS;
  active    = SCENARIOS[0];
  flow: FlowState = 'idle';
  state     = '';
  log: { msg: string; type: 'ok' | 'err' | 'catch' | 'info' }[] = [];

  select(s: ExceptionScenario) { this.active = s; this.flow = 'idle'; this.log = []; this.state = ''; }

  async simulate() {
    this.log = [];
    this.flow = 'try';
    this.push('Entering try block...', 'info');
    await this.delay(600);
    this.push(`Executing: ${this.active.trigger}`, 'info');
    await this.delay(500);
    this.flow = 'throw';
    this.push(`⚠ ${this.active.exceptionClass}: ${this.active.message}`, 'err');
    await this.delay(600);
    this.flow = 'catch';
    this.state = 'caught';
    this.push(`catch block: ${this.active.catchCode}`, 'catch');
    await this.delay(700);
    this.flow = 'finally';
    await this.delay(500);
    this.push(`finally block: ${this.active.finallyCode}`, 'ok');
    await this.delay(400);
    this.flow = 'done';
  }

  async simulateSuccess() {
    this.log = [];
    this.flow = 'try';
    this.push('Entering try block...', 'info');
    await this.delay(500);
    this.push('try block completed successfully ✓', 'ok');
    await this.delay(700);
    this.flow = 'finally';
    await this.delay(400);
    this.push(`finally block: ${this.active.finallyCode}`, 'ok');
    await this.delay(400);
    this.flow = 'done';
    this.state = '';
  }

  private delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
  private push(msg: string, type: 'ok' | 'err' | 'catch' | 'info') {
    this.log = [...this.log, { msg, type }].slice(-8);
  }
}
