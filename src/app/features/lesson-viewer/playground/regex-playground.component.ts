import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface RegexPattern { label: string; pattern: string; testStr: string; }
const PRESETS: RegexPattern[] = [
  { label: 'Email',        pattern: '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$', testStr: 'user@example.com' },
  { label: 'Phone (IN)',   pattern: '^[6-9]\\d{9}$',                        testStr: '9876543210' },
  { label: 'Digits only',  pattern: '^\\d+$',                               testStr: '123456' },
  { label: 'Alphanumeric', pattern: '^[a-zA-Z0-9]+$',                       testStr: 'Hello123' },
  { label: 'URL',          pattern: '^https?://[^\\s/$.?#].[^\\s]*$',       testStr: 'https://example.com/path' },
  { label: 'Date dd/mm',   pattern: '^(0[1-9]|[12]\\d|3[01])/(0[1-9]|1[0-2])/\\d{4}$', testStr: '25/12/2025' },
];

interface MatchPart { text: string; isMatch: boolean; }

@Component({
  selector: 'app-regex-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">RegEx Pattern Tester</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Presets -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Common Patterns</p>
          <div class="flex flex-wrap gap-2">
            @for (p of presets; track p.label) {
              <button (click)="applyPreset(p)"
                class="px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 border-slate-200 text-slate-600">
                {{ p.label }}
              </button>
            }
          </div>
        </div>

        <!-- Inputs -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pattern</label>
            <input [(ngModel)]="pattern" (ngModelChange)="test()" placeholder="e.g. ^\\d+$"
              class="w-full font-mono text-sm border-2 border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-400 bg-slate-50">
          </div>
          <div>
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Test String</label>
            <input [(ngModel)]="testStr" (ngModelChange)="test()" placeholder="Text to match against pattern"
              class="w-full font-mono text-sm border-2 border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-400 bg-slate-50">
          </div>
        </div>

        <!-- Result badge -->
        <div class="flex items-center gap-3">
          @if (result === 'match') {
            <div class="flex items-center gap-2 px-4 py-2 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-emerald-700 text-sm font-black">
              <i class="fa-solid fa-circle-check"></i> MATCH
            </div>
          } @else if (result === 'no-match') {
            <div class="flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-400 rounded-xl text-red-700 text-sm font-black">
              <i class="fa-solid fa-circle-xmark"></i> NO MATCH
            </div>
          } @else if (result === 'error') {
            <div class="flex items-center gap-2 px-4 py-2 bg-amber-50 border-2 border-amber-400 rounded-xl text-amber-700 text-sm font-black">
              <i class="fa-solid fa-triangle-exclamation"></i> INVALID PATTERN
            </div>
          }

          @if (findAllCount > 0) {
            <span class="text-xs text-slate-500">{{ findAllCount }} occurrence(s) found</span>
          }
        </div>

        <!-- Highlighted output -->
        @if (testStr.length > 0) {
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Match Highlight</p>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-sm leading-7">
              @for (part of parts; track $index) {
                @if (part.isMatch) {
                  <mark class="bg-brand-400 text-white rounded px-0.5 not-italic">{{ part.text }}</mark>
                } @else {
                  <span class="text-slate-300">{{ part.text }}</span>
                }
              }
            </div>
          </div>
        }

        <!-- Java code -->
        <div class="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed space-y-0.5">
          <div><span class="text-blue-400">Pattern</span> <span class="text-slate-300">p = </span>
               <span class="text-blue-400">Pattern</span><span class="text-slate-300">.compile(</span>
               <span class="text-emerald-400">"{{ escapedPattern }}"</span><span class="text-slate-300">);</span></div>
          <div><span class="text-blue-400">Matcher</span> <span class="text-slate-300">m = p.matcher(</span>
               <span class="text-emerald-400">"{{ testStr }}"</span><span class="text-slate-300">);</span></div>
          <div><span class="text-purple-400">boolean</span> <span class="text-slate-300">matches = m.matches();</span></div>
          <div><span class="text-slate-500">// matches → </span>
               <span [class.text-emerald-400]="result === 'match'" [class.text-red-400]="result === 'no-match'">{{ result === 'match' ? 'true' : result === 'no-match' ? 'false' : '?' }}</span></div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class RegexPlaygroundComponent {
  presets = PRESETS;
  pattern  = '';
  testStr  = '';
  result: 'match' | 'no-match' | 'error' | '' = '';
  parts: MatchPart[] = [];
  findAllCount = 0;

  get escapedPattern() { return this.pattern.replace(/\\/g, '\\\\'); }

  applyPreset(p: RegexPattern) {
    this.pattern = p.pattern;
    this.testStr = p.testStr;
    this.test();
  }

  test() {
    this.parts = [];
    this.findAllCount = 0;
    if (!this.pattern || !this.testStr) { this.result = ''; return; }
    try {
      const re = new RegExp(this.pattern);
      const reG = new RegExp(this.pattern, 'g');
      this.result = re.test(this.testStr) ? 'match' : 'no-match';

      // Build match parts
      const matches = [...this.testStr.matchAll(reG)];
      this.findAllCount = matches.length;
      if (matches.length === 0) {
        this.parts = [{ text: this.testStr, isMatch: false }];
      } else {
        let cursor = 0;
        for (const m of matches) {
          if (m.index! > cursor) this.parts.push({ text: this.testStr.slice(cursor, m.index), isMatch: false });
          this.parts.push({ text: m[0], isMatch: true });
          cursor = m.index! + m[0].length;
        }
        if (cursor < this.testStr.length) this.parts.push({ text: this.testStr.slice(cursor), isMatch: false });
      }
    } catch {
      this.result = 'error'; this.parts = [];
    }
  }
}
