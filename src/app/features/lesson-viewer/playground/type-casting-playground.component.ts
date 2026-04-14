import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TypeNode {
  name: string;
  bytes: number;
  label: string;
  isDecimal: boolean;
}

const CHAIN: TypeNode[] = [
  { name: 'byte',   bytes: 1,  label: '1B',  isDecimal: false },
  { name: 'short',  bytes: 2,  label: '2B',  isDecimal: false },
  { name: 'int',    bytes: 4,  label: '4B',  isDecimal: false },
  { name: 'long',   bytes: 8,  label: '8B',  isDecimal: false },
  { name: 'float',  bytes: 4,  label: '4B',  isDecimal: true  },
  { name: 'double', bytes: 8,  label: '8B',  isDecimal: true  },
];

@Component({
  selector: 'app-type-casting-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Type Casting Visualizer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Pick FROM → TO to see how casting works</span>
      </div>

      <div class="p-6 space-y-6">

        <!-- Widening chain diagram -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Widening Order (small → large)</p>
          <div class="flex items-center flex-wrap gap-1">
            @for (node of chain; track node.name; let last = $last) {
              <button (click)="selectNode(node)"
                class="px-3 py-2 rounded-xl border-2 font-mono text-sm font-bold transition-all flex flex-col items-center gap-0.5"
                [class.border-brand-500]="from.name === node.name || to.name === node.name"
                [class.bg-brand-500]="from.name === node.name"
                [class.text-white]="from.name === node.name"
                [class.bg-brand-50]="to.name === node.name && from.name !== node.name"
                [class.text-brand-700]="to.name === node.name && from.name !== node.name"
                [class.bg-slate-50]="from.name !== node.name && to.name !== node.name"
                [class.border-slate-200]="from.name !== node.name && to.name !== node.name"
                [class.text-slate-600]="from.name !== node.name && to.name !== node.name">
                <span>{{ node.name }}</span>
                <span class="text-[9px] font-medium opacity-60">{{ node.label }}</span>
              </button>
              @if (!last) {
                <i class="fa-solid fa-arrow-right text-slate-300 text-xs"></i>
              }
            }
          </div>
          <div class="mt-2 flex items-center justify-between text-[10px] px-1">
            <span class="text-emerald-600 font-bold flex items-center gap-1">
              <i class="fa-solid fa-arrow-right"></i> Widening (automatic, safe)
            </span>
            <span class="text-red-500 font-bold flex items-center gap-1">
              Narrowing (manual, may lose data) <i class="fa-solid fa-arrow-left"></i>
            </span>
          </div>
        </div>

        <!-- Picker -->
        <div class="grid grid-cols-3 gap-4 items-center">
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">From Type</label>
            <select [(ngModel)]="fromName" (ngModelChange)="onFromChange($event)"
              class="w-full bg-slate-50 border-2 border-slate-200 focus:border-brand-500 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-slate-800 outline-none cursor-pointer">
              @for (node of chain; track node.name) {
                <option [value]="node.name">{{ node.name }}</option>
              }
            </select>
          </div>

          <div class="flex flex-col items-center gap-1 pt-5">
            @if (castType === 'widening') {
              <div class="flex items-center gap-2 text-emerald-600">
                <div class="h-px w-8 bg-emerald-400"></div>
                <i class="fa-solid fa-arrow-right text-lg"></i>
                <div class="h-px w-8 bg-emerald-400"></div>
              </div>
              <span class="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Widening</span>
              <span class="text-[9px] text-emerald-500">automatic</span>
            } @else if (castType === 'narrowing') {
              <div class="flex items-center gap-2 text-red-500">
                <div class="h-px w-8 bg-red-400"></div>
                <i class="fa-solid fa-arrow-right text-lg"></i>
                <div class="h-px w-8 bg-red-400"></div>
              </div>
              <span class="text-[10px] font-black text-red-500 uppercase tracking-wider">Narrowing</span>
              <span class="text-[9px] text-red-400">manual required</span>
            } @else {
              <i class="fa-solid fa-equals text-slate-300 text-xl"></i>
              <span class="text-[10px] text-slate-400">same type</span>
            }
          </div>

          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">To Type</label>
            <select [(ngModel)]="toName" (ngModelChange)="onToChange($event)"
              class="w-full bg-slate-50 border-2 border-slate-200 focus:border-brand-500 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-slate-800 outline-none cursor-pointer">
              @for (node of chain; track node.name) {
                <option [value]="node.name">{{ node.name }}</option>
              }
            </select>
          </div>
        </div>

        <!-- Enter value -->
        <div>
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Enter a Value</label>
          <input [(ngModel)]="inputValue" (ngModelChange)="compute()" type="number" step="0.01"
            class="w-full bg-slate-50 border-2 border-slate-200 focus:border-brand-500 focus:bg-white rounded-xl px-4 py-3 text-sm font-mono outline-none transition-all"
            placeholder="e.g. 9.78">
        </div>

        <!-- Result panel -->
        @if (castType !== 'same') {
          <div class="rounded-2xl border overflow-hidden transition-all"
            [class.border-emerald-200]="castType === 'widening'"
            [class.border-red-200]="castType === 'narrowing'">

            <!-- Result header -->
            <div class="px-4 py-2.5 flex items-center gap-2 border-b"
              [class.bg-emerald-50]="castType === 'widening'"
              [class.border-emerald-100]="castType === 'widening'"
              [class.bg-red-50]="castType === 'narrowing'"
              [class.border-red-100]="castType === 'narrowing'">
              @if (castType === 'widening') {
                <i class="fa-solid fa-circle-check text-emerald-500 text-sm"></i>
                <span class="text-xs font-black text-emerald-700 uppercase tracking-wider">Widening Cast — Automatic</span>
              } @else {
                <i class="fa-solid fa-triangle-exclamation text-red-500 text-sm"></i>
                <span class="text-xs font-black text-red-700 uppercase tracking-wider">Narrowing Cast — Manual Required</span>
              }
            </div>

            <div class="p-4 grid md:grid-cols-2 gap-4 bg-white">

              <!-- Before / After -->
              <div class="flex items-center gap-3">
                <div class="flex-1 rounded-xl border-2 p-3 text-center"
                  [class.border-slate-200]="castType === 'widening'"
                  [class.border-red-200]="castType === 'narrowing'">
                  <p class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Before</p>
                  <p class="font-mono text-lg font-black text-slate-800">{{ inputValue || '0' }}</p>
                  <p class="font-mono text-[10px] text-slate-400 mt-0.5">{{ fromName }}</p>
                </div>
                <i class="fa-solid fa-arrow-right text-slate-300"></i>
                <div class="flex-1 rounded-xl border-2 p-3 text-center"
                  [class.border-emerald-200]="castType === 'widening'"
                  [class.border-red-200]="castType === 'narrowing'">
                  <p class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">After</p>
                  <p class="font-mono text-lg font-black"
                    [class.text-emerald-700]="castType === 'widening'"
                    [class.text-red-600]="castType === 'narrowing'">{{ resultValue }}</p>
                  <p class="font-mono text-[10px] text-slate-400 mt-0.5">{{ toName }}</p>
                </div>
              </div>

              <!-- Code -->
              <div>
                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Java Code</p>
                <div class="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1 font-mono text-xs">
                  <div>
                    <span class="text-blue-400">{{ fromName }}</span>
                    <span class="text-white"> original = </span>
                    <span class="text-emerald-400">{{ inputValue || '0' }}</span>
                    @if (fromName === 'long') { <span class="text-amber-400">L</span> }
                    @if (fromName === 'float') { <span class="text-amber-400">f</span> }
                    <span class="text-slate-500">;</span>
                  </div>
                  <div>
                    <span class="text-blue-400">{{ toName }}</span>
                    <span class="text-white"> result = </span>
                    @if (castType === 'narrowing') {
                      <span class="text-amber-400">({{ toName }})</span>
                    }
                    <span class="text-white"> original</span>
                    <span class="text-slate-500">;</span>
                    @if (castType === 'widening') {
                      <span class="text-slate-600 ml-2">// automatic</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Data loss warning -->
            @if (castType === 'narrowing' && hasDataLoss()) {
              <div class="px-4 py-3 bg-amber-50 border-t border-amber-200 flex items-center gap-2">
                <i class="fa-solid fa-fire text-amber-500 text-sm shrink-0"></i>
                <p class="text-xs text-amber-800">
                  <strong>Data loss detected!</strong> The decimal part <strong>.{{ decimalPart() }}</strong> is dropped when converting to <code class="font-mono bg-amber-100 px-1 rounded">{{ toName }}</code>.
                </p>
              </div>
            }
          </div>
        }

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class TypeCastingPlaygroundComponent {
  chain = CHAIN;

  fromName = 'int';
  toName   = 'double';
  inputValue = '9';

  from: TypeNode = CHAIN[2];  // int
  to:   TypeNode = CHAIN[5];  // double

  castType: 'widening' | 'narrowing' | 'same' = 'widening';
  resultValue = '9.0';

  // For visual chain selection (click two nodes in sequence)
  private clickPhase: 'from' | 'to' = 'from';

  selectNode(node: TypeNode) {
    if (this.clickPhase === 'from') {
      this.from = node;
      this.fromName = node.name;
      this.clickPhase = 'to';
    } else {
      this.to = node;
      this.toName = node.name;
      this.clickPhase = 'from';
    }
    this.compute();
  }

  onFromChange(name: string) {
    this.from = CHAIN.find(n => n.name === name)!;
    this.compute();
  }

  onToChange(name: string) {
    this.to = CHAIN.find(n => n.name === name)!;
    this.compute();
  }

  compute() {
    const fromIdx = CHAIN.indexOf(this.from);
    const toIdx   = CHAIN.indexOf(this.to);

    if (fromIdx === toIdx) {
      this.castType = 'same';
      this.resultValue = String(this.inputValue || '0');
      return;
    }

    this.castType = toIdx > fromIdx ? 'widening' : 'narrowing';

    const num = parseFloat(this.inputValue || '0') || 0;

    if (this.to.name === 'int' || this.to.name === 'short' || this.to.name === 'byte') {
      this.resultValue = String(Math.trunc(num));
    } else if (this.to.name === 'long') {
      this.resultValue = String(Math.trunc(num)) + ' (L)';
    } else if (this.to.name === 'float') {
      this.resultValue = parseFloat(num.toFixed(7)).toString() + ' (f)';
    } else {
      // double or widening to decimal
      const s = num.toString();
      this.resultValue = s.includes('.') ? s : s + '.0';
    }
  }

  hasDataLoss(): boolean {
    const num = parseFloat(this.inputValue || '0') || 0;
    return num !== Math.trunc(num);
  }

  decimalPart(): string {
    const s = (this.inputValue || '0').toString();
    const dot = s.indexOf('.');
    return dot >= 0 ? s.slice(dot + 1) : '0';
  }
}
