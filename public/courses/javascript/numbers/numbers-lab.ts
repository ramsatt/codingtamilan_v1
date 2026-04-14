
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-numbers-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="numbers" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-4">6. JS Numbers</h3>
        <p class="article-body">
            In JavaScript, numbers are always 64-bit floating point.
        </p>
      </div>

      <!-- Number Methods Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-cyan-100 text-cyan-700 rounded text-xs">Values</span> Number System
        </h4>

        <div class="space-y-6">
             <div class="flex flex-col md:flex-row gap-4 items-center">
                 <label class="text-xs font-bold text-slate-500 uppercase mt-2">Input</label>
                 <input type="text" [(ngModel)]="inputStr" class="w-full md:w-48 p-2 border rounded text-lg font-mono outline-none focus:border-cyan-400 text-center shadow-sm">
                 <div class="text-xs text-slate-300 italic">Try: "123", "12.5", "abc"</div>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 <!-- parseInt -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">parseInt(input)</div>
                     <div class="font-mono text-cyan-700 font-bold text-lg">{{ parseIntSafe(inputStr) }}</div>
                     <div class="text-[10px] text-slate-300 mt-1">Parses as integer</div>
                 </div>

                 <!-- parseFloat -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">parseFloat(input)</div>
                     <div class="font-mono text-cyan-700 font-bold text-lg">{{ parseFloatSafe(inputStr) }}</div>
                     <div class="text-[10px] text-slate-300 mt-1">Parses as float</div>
                 </div>

                 <!-- isNaN -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">isNaN(input)</div>
                     <div class="font-mono text-cyan-700 font-bold text-lg" [class.text-red-500]="isNaNVal" [class.text-green-600]="!isNaNVal">
                         {{ isNaNVal }}
                     </div>
                     <div class="text-[10px] text-slate-300 mt-1">Checks if Not-a-Number</div>
                 </div>

                 <!-- isInteger -->
                  <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">Number.isInteger(parseFloat(input))</div>
                     <div class="font-mono text-cyan-700 font-bold text-lg" [class.text-green-600]="isInteger" [class.text-slate-300]="!isInteger">
                         {{ isInteger }}
                     </div>
                     <div class="text-[10px] text-slate-300 mt-1">Validates integer</div>
                 </div>

             </div>
             
             <!-- Special Values -->
             <div class="mt-4 pt-4 border-t border-slate-200">
                 <div class="text-xs font-bold text-slate-500 uppercase mb-2">Special Properties</div>
                 <div class="flex flex-wrap gap-2 text-xs font-mono">
                     <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200">MAX_VALUE: {{ Number.MAX_VALUE.toExponential(2) }}</span>
                     <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200">MIN_VALUE: {{ Number.MIN_VALUE.toExponential(2) }}</span>
                     <span class="bg-slate-100 px-2 py-1 rounded border border-slate-200">POSITIVE_INFINITY: ∞</span>
                 </div>
             </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class NumbersLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  inputStr = '123.45';
  Number = Number;

  parseIntSafe(val: string) {
      return parseInt(val);
  }

  parseFloatSafe(val: string) {
      return parseFloat(val);
  }
  
  get isNaNVal() {
      return isNaN(Number(this.inputStr));
  }

  get isInteger() {
      return Number.isInteger(parseFloat(this.inputStr));
  }
}
