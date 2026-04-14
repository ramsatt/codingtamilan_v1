

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-variables-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="variables" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-yellow-500 pl-4">2. Variables & Data Types</h3>
        <p class="article-body">
            In modern JavaScript (ES6+), we use <code class="bg-yellow-100 px-1 rounded">let</code> and <code class="bg-yellow-100 px-1 rounded">const</code>.
            Avoid using <code class="bg-red-100 text-red-700 px-1 rounded">var</code> as it has function-scope issues.
            JS is dynamically typed, meaning a variable can hold any type of data.
        </p>
      </div>

      <!-- Scope Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-yellow-100 text-yellow-700 rounded text-xs">Scope</span> let vs const
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div class="space-y-4">
                <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">let</span> score = <span class="text-orange-400">100</span>;<br>
                    score = <span class="text-orange-400">200</span>; <span class="text-green-500">// ✅ Allowed</span><br><br>
                    
                    <span class="code-keyword">const</span> PI = <span class="text-orange-400">3.14</span>;<br>
                    PI = <span class="text-orange-400">3.14159</span>; <span class="text-red-500">// ❌ Error!</span>
                </div>
                
                <div class="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm font-bold animate-pulse" *ngIf="errorMessage">
                    {{ errorMessage }}
                </div>
            </div>

            <!-- Interactive -->
            <div class="space-y-4">
                 <div class="p-4 bg-slate-50 border border-slate-200 rounded">
                     <div class="flex items-center gap-2 mb-2">
                         <span class="font-mono text-sm font-bold text-purple-600">let</span>
                         <span class="font-mono text-sm">score = </span>
                         <input type="number" [(ngModel)]="score" class="w-20 border rounded px-2 py-1 text-sm outline-none focus:border-purple-400">
                     </div>
                     <div class="text-xs text-slate-500">Current Value: {{ score }}</div>
                 </div>

                 <div class="p-4 bg-slate-50 border border-slate-200 rounded relative overflow-hidden">
                     <div class="flex items-center gap-2 mb-2">
                         <span class="font-mono text-sm font-bold text-blue-600">const</span>
                         <span class="font-mono text-sm">PI = 3.14</span>
                     </div>
                     <button (click)="tryChangeConst()" class="bg-slate-200 hover:bg-red-100 hover:text-red-600 text-slate-600 px-3 py-1 rounded text-xs font-bold w-full transition active:scale-95">
                         Attempt: PI = 3.14159;
                     </button>
                 </div>
            </div>

        </div>
      </div>

      <!-- Dynamic Typing -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-blue-100 text-blue-700 rounded text-xs">Dynamic</span> Type Coercion & Typeof
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div class="space-y-4">
                 <div class="space-y-2">
                     <label class="text-xs font-bold text-slate-500 uppercase">Operand A</label>
                     <div class="flex">
                         <select [(ngModel)]="typeA" class="px-2 bg-slate-100 border rounded-l text-xs outline-none">
                             <option value="string">String</option>
                             <option value="number">Number</option>
                         </select>
                         <input [(ngModel)]="valA" class="flex-1 p-2 border rounded-r text-sm outline-none focus:border-blue-400" placeholder="Value">
                     </div>
                 </div>

                 <div class="flex justify-center text-slate-300 font-bold">+</div>

                 <div class="space-y-2">
                     <label class="text-xs font-bold text-slate-500 uppercase">Operand B</label>
                     <div class="flex">
                         <select [(ngModel)]="typeB" class="px-2 bg-slate-100 border rounded-l text-xs outline-none">
                             <option value="string">String</option>
                             <option value="number">Number</option>
                         </select>
                         <input [(ngModel)]="valB" class="flex-1 p-2 border rounded-r text-sm outline-none focus:border-blue-400" placeholder="Value">
                     </div>
                 </div>
            </div>
            
            <div class="flex flex-col gap-4">
                <div class="bg-slate-50 p-6 rounded border border-slate-200 flex flex-col items-center justify-center min-h-[100px]">
                     <div class="text-sm text-slate-300 mb-1">Result</div>
                     <div class="text-3xl font-bold text-slate-800 truncate max-w-full">
                         {{ result }}
                     </div>
                </div>
                
                <div class="bg-slate-900 p-3 rounded font-mono text-xs text-center text-green-400 shadow-inner">
                    typeof result === "{{ resultType }}"
                </div>
            </div>
        </div>
      </div>

    </section>
  `,
  styles: ``
})
export class VariablesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  score = 100;
  errorMessage = '';

  tryChangeConst() {
    this.errorMessage = "Uncaught TypeError: Assignment to constant variable.";
    setTimeout(() => this.errorMessage = '', 3000);
  }

  // Type Coercion
  typeA = 'string';
  valA: any = '5';
  typeB = 'number';
  valB: any = 5;

  get result() {
      const a = this.typeA === 'number' ? Number(this.valA) : String(this.valA);
      const b = this.typeB === 'number' ? Number(this.valB) : String(this.valB);
      // @ts-ignore
      return a + b;
  }

  get resultType() {
      return typeof this.result;
  }
}
