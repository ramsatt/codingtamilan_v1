import { Component } from '@angular/core';

interface DatePattern {
  id: string;
  pattern: string;
  label: string;
  example: (d: Date) => string;
}

const PATTERNS: DatePattern[] = [
  { id: 'iso',     pattern: 'yyyy-MM-dd',        label: 'ISO Date',       example: d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}` },
  { id: 'slash',   pattern: 'dd/MM/yyyy',         label: 'Short Date',     example: d => `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}` },
  { id: 'long',    pattern: 'MMMM dd, yyyy',      label: 'Long Date',      example: d => `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` },
  { id: 'day',     pattern: 'EEE, d MMM yyyy',    label: 'Day + Date',     example: d => `${DAYS[d.getDay()]}, ${d.getDate()} ${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}` },
  { id: 'time',    pattern: 'HH:mm:ss',           label: 'Time Only',      example: d => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` },
  { id: 'full',    pattern: 'yyyy-MM-dd HH:mm',   label: 'Date + Time',    example: d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}` },
];

function pad(n: number) { return n.toString().padStart(2, '0'); }
const MONTHS       = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS         = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

@Component({
  selector: 'app-date-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Java Date & Time Explorer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Current date display -->
        <div class="bg-gradient-to-r from-brand-500 to-blue-500 rounded-xl p-4 text-white text-center shadow-lg">
          <p class="text-[10px] font-bold uppercase tracking-widest opacity-75 mb-1">LocalDate.now()</p>
          <p class="text-2xl font-black">{{ todayISO }}</p>
          <p class="text-sm opacity-75 mt-1">{{ todayLong }}</p>
        </div>

        <!-- Pattern grid -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Format Patterns — Click to Inspect</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            @for (p of patterns; track p.id) {
              <button (click)="active = p"
                class="rounded-xl border-2 p-3 text-left transition-all hover:shadow-sm"
                [class.border-brand-500]="active?.id === p.id" [class.bg-brand-50]="active?.id === p.id"
                [class.border-slate-100]="active?.id !== p.id" [class.bg-slate-50]="active?.id !== p.id">
                <p class="text-[10px] font-bold uppercase tracking-wider"
                  [class.text-brand-500]="active?.id === p.id" [class.text-slate-400]="active?.id !== p.id">
                  {{ p.label }}
                </p>
                <p class="font-mono text-xs font-bold mt-1"
                  [class.text-brand-700]="active?.id === p.id" [class.text-slate-700]="active?.id !== p.id">
                  {{ p.example(today) }}
                </p>
              </button>
            }
          </div>
        </div>

        <!-- Active pattern code -->
        @if (active) {
          <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5">
            <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.time.LocalDateTime</span>;</div>
            <div><span class="text-blue-400">import</span> <span class="text-emerald-400">java.time.format.DateTimeFormatter</span>;</div>
            <div class="h-2"></div>
            <div>
              <span class="text-blue-400">LocalDateTime</span>
              <span class="text-white"> now = </span>
              <span class="text-blue-400">LocalDateTime</span>
              <span class="text-slate-300">.now();</span>
            </div>
            <div>
              <span class="text-blue-400">DateTimeFormatter</span>
              <span class="text-white"> fmt = DateTimeFormatter.ofPattern(</span>
              <span class="text-amber-300">"{{ active.pattern }}"</span>
              <span class="text-slate-300">);</span>
            </div>
            <div>
              <span class="text-blue-400">String</span>
              <span class="text-white"> result = now.format(fmt);</span>
            </div>
            <div class="h-2"></div>
            <div><span class="text-slate-500">// Output:</span></div>
            <div>
              <span class="text-emerald-400">System.out.println</span>
              <span class="text-slate-300">(result);</span>
              <span class="text-slate-500 ml-2">→ </span>
              <span class="text-emerald-300">"{{ active.example(today) }}"</span>
            </div>
          </div>
        }

        <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
          <strong>Java 8+ Date API:</strong>
          <code class="bg-amber-100 px-1 rounded mx-1">LocalDate</code> (date only),
          <code class="bg-amber-100 px-1 rounded mx-1">LocalTime</code> (time only),
          <code class="bg-amber-100 px-1 rounded mx-1">LocalDateTime</code> (both) — all immutable and thread-safe.
          Use <code class="bg-amber-100 px-1 rounded mx-1">ZonedDateTime</code> when time zones are needed.
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class DatePlaygroundComponent {
  patterns = PATTERNS;
  today    = new Date();
  active: DatePattern | null = null;

  get todayISO()  { return PATTERNS[0].example(this.today); }
  get todayLong() { return PATTERNS[2].example(this.today); }
}
