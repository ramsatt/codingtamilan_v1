
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-operators-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="operators" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-teal-500 pl-4">4. JS Operators</h3>
        <p class="article-body">
            Operators perform actions on variables and values. Common types include <span class="font-bold text-slate-800">Arithmetic</span>, <span class="font-bold text-slate-800">Assignment</span>, <span class="font-bold text-slate-800">Comparison</span>, and <span class="font-bold text-slate-800">Logical</span> operators.
        </p>
      </div>

      <!-- Arithmetic Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Math</span> Arithmetic
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div class="space-y-4">
                 <div class="space-y-2">
                     <label class="text-xs font-bold text-slate-500 uppercase">Input A</label>
                     <input type="number" [(ngModel)]="numA" class="w-full p-2 border rounded text-sm outline-none focus:border-teal-400">
                 </div>
                 <div class="space-y-2">
                     <label class="text-xs font-bold text-slate-500 uppercase">Input B</label>
                     <input type="number" [(ngModel)]="numB" class="w-full p-2 border rounded text-sm outline-none focus:border-teal-400">
                 </div>
            </div>
            
            <div class="space-y-2">
                <div class="text-xs font-bold text-slate-500 uppercase">Operations</div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="bg-slate-50 p-2 rounded border border-slate-200 text-sm font-mono flex justify-between">
                        <span>+ (Add)</span>
                        <span class="font-bold text-teal-600">{{ numA + numB }}</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded border border-slate-200 text-sm font-mono flex justify-between">
                        <span>- (Sub)</span>
                        <span class="font-bold text-teal-600">{{ numA - numB }}</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded border border-slate-200 text-sm font-mono flex justify-between">
                        <span>* (Mul)</span>
                        <span class="font-bold text-teal-600">{{ numA * numB }}</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded border border-slate-200 text-sm font-mono flex justify-between">
                        <span>/ (Div)</span>
                        <span class="font-bold text-teal-600">{{ (numB !== 0 ? (numA / numB).toFixed(2) : '∞') }}</span>
                    </div>
                    <div class="bg-slate-50 p-2 rounded border border-slate-200 text-sm font-mono flex justify-between">
                        <span>% (Mod)</span>
                        <span class="font-bold text-teal-600">{{ (numB !== 0 ? (numA % numB) : 'NaN') }}</span>
                    </div>
                     <div class="bg-slate-50 p-2 rounded border border-slate-200 text-sm font-mono flex justify-between">
                        <span>** (Exp)</span>
                        <span class="font-bold text-teal-600">{{ (numA ** numB) }}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <!-- Comparison Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-indigo-100 text-indigo-700 rounded text-xs">Logic</span> Comparison & Equality
        </h4>
        
        <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-6">
             <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
                 <div class="flex">
                     <select [(ngModel)]="compTypeA" class="px-2 bg-slate-100 border rounded-l text-xs outline-none">
                         <option value="string">String</option>
                         <option value="number">Number</option>
                         <option value="boolean">Boolean</option>
                     </select>
                     <input [(ngModel)]="compValA" class="w-24 p-2 border rounded-r text-sm outline-none focus:border-indigo-400" placeholder="Val A">
                 </div>

                 <div class="text-slate-300 font-bold">vs</div>

                 <div class="flex">
                     <select [(ngModel)]="compTypeB" class="px-2 bg-slate-100 border rounded-l text-xs outline-none">
                         <option value="string">String</option>
                         <option value="number">Number</option>
                         <option value="boolean">Boolean</option>
                     </select>
                     <input [(ngModel)]="compValB" class="w-24 p-2 border rounded-r text-sm outline-none focus:border-indigo-400" placeholder="Val B">
                 </div>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div class="bg-white p-3 rounded shadow-sm border border-slate-200 flex justify-between items-center">
                     <div class="font-mono text-sm text-slate-600">== (Loose Equality)</div>
                     <div class="font-bold" [class.text-green-600]="looseEqual" [class.text-red-600]="!looseEqual">
                         {{ looseEqual }}
                     </div>
                 </div>
                 <div class="bg-white p-3 rounded shadow-sm border border-slate-200 flex justify-between items-center">
                     <div class="font-mono text-sm text-slate-600">=== (Strict Equality)</div>
                     <div class="font-bold" [class.text-green-600]="strictEqual" [class.text-red-600]="!strictEqual">
                         {{ strictEqual }}
                     </div>
                 </div>
                 <div class="col-span-1 md:col-span-2 text-xs text-slate-500 text-center italic">
                     Loose equality (==) performs type coercion. Strict equality (===) does not.
                 </div>
             </div>
        </div>
      </div>

    </section>
  `,
  styles: ``
})
export class OperatorsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  // Arithmetic
  numA = 10;
  numB = 5;

  // Comparison
  compTypeA = 'number';
  compValA: any = 5;
  compTypeB = 'string';
  compValB: any = '5';

  get parsedA() {
      if (this.compTypeA === 'number') return Number(this.compValA);
      if (this.compTypeA === 'boolean') return this.compValA === 'true';
      return String(this.compValA);
  }

  get parsedB() {
      if (this.compTypeB === 'number') return Number(this.compValB);
      if (this.compTypeB === 'boolean') return this.compValB === 'true';
      return String(this.compValB);
  }

  get looseEqual() {
      // @ts-ignore
      return this.parsedA == this.parsedB;
  }

  get strictEqual() {
      return this.parsedA === this.parsedB;
  }
}
