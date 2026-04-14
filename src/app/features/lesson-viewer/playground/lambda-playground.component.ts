import { Component } from '@angular/core';

interface LambdaExample {
  id: string;
  label: string;
  description: string;
  traditional: string[];
  lambda: string[];
  result: string;
}

const EXAMPLES: LambdaExample[] = [
  {
    id: 'runnable', label: 'Runnable', description: 'Execute a task with no return value',
    traditional: [
      'Runnable r = new Runnable() {',
      '  @Override',
      '  public void run() {',
      '    System.out.println("Hello!");',
      '  }',
      '};',
      'r.run();',
    ],
    lambda: [
      'Runnable r = () -> System.out.println("Hello!");',
      '',
      'r.run();',
    ],
    result: 'Hello!'
  },
  {
    id: 'comparator', label: 'Comparator', description: 'Compare two values for sorting',
    traditional: [
      'Comparator<Integer> cmp =',
      '  new Comparator<Integer>() {',
      '  @Override',
      '  public int compare(Integer a, Integer b) {',
      '    return a - b;',
      '  }',
      '};',
    ],
    lambda: [
      'Comparator<Integer> cmp =',
      '  (a, b) -> a - b;',
      '',
      '// Usage: list.sort(cmp);',
    ],
    result: 'Sorted list ascending'
  },
  {
    id: 'predicate', label: 'Predicate', description: 'Test a condition, returns boolean',
    traditional: [
      'Predicate<Integer> isEven =',
      '  new Predicate<Integer>() {',
      '  @Override',
      '  public boolean test(Integer n) {',
      '    return n % 2 == 0;',
      '  }',
      '};',
    ],
    lambda: [
      'Predicate<Integer> isEven =',
      '  n -> n % 2 == 0;',
      '',
      '// isEven.test(4) → true',
    ],
    result: 'isEven.test(4) = true'
  },
  {
    id: 'function', label: 'Function', description: 'Transform a value from one type to another',
    traditional: [
      'Function<String, Integer> len =',
      '  new Function<String, Integer>() {',
      '  @Override',
      '  public Integer apply(String s) {',
      '    return s.length();',
      '  }',
      '};',
    ],
    lambda: [
      'Function<String, Integer> len =',
      '  s -> s.length();',
      '',
      '// len.apply("Java") → 4',
    ],
    result: 'len.apply("Java") = 4'
  },
  {
    id: 'consumer', label: 'Consumer', description: 'Accept a value and perform an action',
    traditional: [
      'Consumer<String> print =',
      '  new Consumer<String>() {',
      '  @Override',
      '  public void accept(String s) {',
      '    System.out.println(s);',
      '  }',
      '};',
    ],
    lambda: [
      'Consumer<String> print =',
      '  s -> System.out.println(s);',
      '',
      '// or method reference:',
      '// Consumer<String> print = System.out::println;',
    ],
    result: 'Prints the value'
  },
];

@Component({
  selector: 'app-lambda-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Lambda Expression Explorer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Category tabs -->
        <div class="flex flex-wrap gap-2">
          @for (ex of examples; track ex.id) {
            <button (click)="active = ex"
              class="px-4 py-2 rounded-xl border-2 text-xs font-black transition-all"
              [class.border-brand-500]="active.id === ex.id"
              [class.bg-brand-500]="active.id === ex.id"
              [class.text-white]="active.id === ex.id"
              [class.border-slate-200]="active.id !== ex.id"
              [class.text-slate-600]="active.id !== ex.id"
              [class.hover:border-brand-300]="active.id !== ex.id">
              {{ ex.label }}
            </button>
          }
        </div>

        <p class="text-sm text-slate-600">{{ active.description }}</p>

        <!-- Side-by-side code -->
        <div class="grid sm:grid-cols-2 gap-4">

          <!-- Traditional -->
          <div class="rounded-xl overflow-hidden border-2 border-slate-200">
            <div class="px-4 py-2 bg-slate-700 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-400"></span>
              <span class="text-xs font-black text-white uppercase tracking-wider">Traditional (Before Java 8)</span>
            </div>
            <div class="bg-slate-900 p-4 font-mono text-xs leading-relaxed min-h-[140px]">
              @for (line of active.traditional; track $index) {
                <div>
                  @if (line.trim().startsWith('//')) {
                    <span class="text-slate-500">{{ line }}</span>
                  } @else if (line.includes('new ') || line.includes('@Override')) {
                    <span class="text-blue-400">{{ line }}</span>
                  } @else if (line.includes('return') || line.includes('public')) {
                    <span class="text-purple-400">{{ line }}</span>
                  } @else if (line.trim() === '') {
                    <span>&nbsp;</span>
                  } @else {
                    <span class="text-slate-300">{{ line }}</span>
                  }
                </div>
              }
            </div>
            <div class="px-4 py-2 bg-slate-800 text-[10px] text-slate-400">Verbose — requires anonymous class boilerplate</div>
          </div>

          <!-- Lambda -->
          <div class="rounded-xl overflow-hidden border-2 border-emerald-300">
            <div class="px-4 py-2 bg-emerald-600 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></span>
              <span class="text-xs font-black text-white uppercase tracking-wider">Lambda (Java 8+)</span>
            </div>
            <div class="bg-slate-900 p-4 font-mono text-xs leading-relaxed min-h-[140px]">
              @for (line of active.lambda; track $index) {
                <div>
                  @if (line.trim().startsWith('//')) {
                    <span class="text-slate-500">{{ line }}</span>
                  } @else if (line.includes('->')) {
                    <span class="text-emerald-400 font-semibold">{{ line }}</span>
                  } @else if (line.trim() === '') {
                    <span>&nbsp;</span>
                  } @else {
                    <span class="text-slate-300">{{ line }}</span>
                  }
                </div>
              }
            </div>
            <div class="px-4 py-2 bg-emerald-900 text-[10px] text-emerald-400">Concise — same behavior in fewer lines</div>
          </div>
        </div>

        <!-- Result -->
        <div class="flex items-center gap-3 bg-slate-900 rounded-xl px-4 py-3">
          <span class="text-slate-500 text-xs font-mono">Result:</span>
          <span class="text-emerald-400 font-mono text-sm font-semibold">{{ active.result }}</span>
        </div>

        <!-- Syntax breakdown -->
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
          <p class="text-xs font-black text-blue-800 uppercase tracking-widest">Lambda Syntax Anatomy</p>
          <div class="font-mono text-sm text-center py-2">
            <span class="bg-amber-200 text-amber-800 px-2 py-0.5 rounded mr-1">(parameters)</span>
            <span class="bg-blue-200 text-blue-800 px-2 py-0.5 rounded mx-1">-&gt;</span>
            <span class="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded ml-1">&#123; body &#125;</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-[10px] text-center">
            <div class="text-amber-700">Parameter list<br><span class="text-slate-500">(can be empty)</span></div>
            <div class="text-blue-700">Arrow operator</div>
            <div class="text-emerald-700">Implementation<br><span class="text-slate-500">(expression or block)</span></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class LambdaPlaygroundComponent {
  examples = EXAMPLES;
  active   = EXAMPLES[0];
}
