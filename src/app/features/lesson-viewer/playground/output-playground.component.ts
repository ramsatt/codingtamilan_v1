import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface OutputRow {
  type: 'println' | 'print' | 'comment';
  value: string;
}

@Component({
  selector: 'app-output-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl my-6">
      <!-- Header -->
      <div class="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span class="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">Output Playground</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-medium text-slate-500 bg-slate-900 px-2 py-1 rounded">Java 21</span>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
        <!-- Input Area -->
        <div class="p-6 bg-slate-900/50">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Edit Code</p>
          <div class="space-y-2">
            @for (row of rows; track $index) {
              @if (row.type === 'comment') {
                <!-- Comment row: read-only, styled as comment -->
                <div class="flex items-center gap-2 bg-slate-800/40 px-3 py-2 rounded-xl border border-slate-700/30">
                  <span class="font-mono text-sm text-slate-500 italic">{{ row.value }}</span>
                </div>
              } @else {
                <!-- Code row: editable println/print -->
                <div class="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/50 group hover:border-blue-500/30 transition-colors"
                  [class.opacity-50]="row.value.trim().startsWith('//')">
                  <span class="text-slate-500 font-mono text-sm leading-none pt-0.5 shrink-0">System.out.</span>
                  <select [(ngModel)]="row.type" class="bg-slate-950 text-blue-400 font-mono text-sm border-none focus:ring-0 p-0 cursor-pointer hover:text-blue-300 shrink-0">
                    <option value="println">println</option>
                    <option value="print">print</option>
                  </select>
                  <span class="text-slate-400 font-mono text-sm shrink-0">(</span>
                  <input [(ngModel)]="row.value"
                    class="flex-1 bg-transparent border-none focus:ring-0 text-emerald-400 font-mono text-sm p-0 placeholder-emerald-900/50 min-w-0"
                    [class.text-slate-500]="row.value.trim().startsWith('//')"
                    placeholder='"Text here"'>
                  <span class="text-slate-400 font-mono text-sm shrink-0">);</span>
                </div>
              }
            }
          </div>

          <button (click)="runCode()"
            class="mt-6 w-full py-3 bg-brand-500 hover:bg-brand-400 text-white font-black rounded-xl transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 active:scale-95">
            <i class="fa-solid fa-play text-xs"></i>
            RUN CODE
          </button>
        </div>

        <!-- Output Area -->
        <div class="p-6 bg-black flex flex-col min-h-[220px]">
          <div class="flex justify-between items-center mb-4">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Console Output</p>
            <button (click)="clear()" class="text-[10px] text-slate-600 hover:text-slate-400 font-bold uppercase">Clear</button>
          </div>

          <div class="flex-1 font-mono text-sm leading-relaxed overflow-y-auto">
            @if (output.length === 0 && !isRunning) {
              <div class="text-slate-700 italic">Click RUN to see output...</div>
            }
            @if (isRunning) {
              <div class="text-brand-500 animate-pulse">Executing code...</div>
            }
            <div class="flex flex-wrap">
              @for (res of output; track $index) {
                <span [class.block]="res.newline" [class.w-full]="res.newline"
                  class="text-emerald-500 whitespace-pre-wrap">{{ res.text }}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    select { -webkit-appearance: none; }
  `]
})
export class OutputPlaygroundComponent implements OnInit {
  @Input() config: any;

  rows: OutputRow[] = [
    { type: 'println', value: '"Hello World!"' },
    { type: 'print',   value: '"Java is "' },
    { type: 'println', value: '"Awesome"' }
  ];

  output: { text: string; newline: boolean }[] = [];
  isRunning = false;

  ngOnInit() {
    if (this.config?.rows) {
      this.rows = JSON.parse(JSON.stringify(this.config.rows));
    }
  }

  runCode() {
    this.isRunning = true;
    this.output = [];

    setTimeout(() => {
      this.rows.forEach(row => {
        // skip comment rows and single-line commented code
        if (row.type === 'comment') return;
        if (row.value.trim().startsWith('//')) return;

        this.output.push({
          text: row.value.replace(/^"|"$/g, ''),   // strip surrounding quotes for display
          newline: row.type === 'println'
        });
      });
      this.isRunning = false;
    }, 400);
  }

  clear() {
    this.output = [];
  }
}
