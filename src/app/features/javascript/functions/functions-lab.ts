

import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-functions-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="functions" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">3. Functions</h3>
        <p class="article-body">
            Functions are reusable blocks of code. Modern JS introduces <span class="font-bold text-slate-800">Arrow Functions</span> (<code class="bg-slate-100 px-1 rounded">=></code>) and powerful concepts like <span class="font-bold text-slate-800">Closures</span>.
        </p>
      </div>

      <!-- Arrow vs Traditional -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-purple-100 text-purple-700 rounded text-xs">Syntax</span> Evolution
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Traditional -->
            <div class="space-y-2">
                <div class="text-xs font-bold text-slate-500 uppercase">Traditional (ES5)</div>
                <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">function</span> add(a, b) {{ '{' }}<br>
                    &nbsp;&nbsp;<span class="code-keyword">return</span> a + b;<br>
                    {{ '}' }}
                </div>
            </div>

            <!-- Arrow -->
            <div class="space-y-2">
                <div class="text-xs font-bold text-slate-500 uppercase">Arrow Function (ES6)</div>
                <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">const</span> add = (a, b) => a + b;
                </div>
            </div>

        </div>

        <!-- Live Demo -->
        <div class="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
             <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
                 <input type="number" [(ngModel)]="num1" class="w-20 border rounded px-2 py-1 text-center font-bold text-lg outline-none focus:border-purple-400">
                 <span class="text-2xl text-slate-300">+</span>
                 <input type="number" [(ngModel)]="num2" class="w-20 border rounded px-2 py-1 text-center font-bold text-lg outline-none focus:border-purple-400">
                 
                 <button (click)="calculate()" class="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-purple-700 transition active:scale-95">
                     Run Arrow Function
                 </button>

                 <span class="text-2xl text-slate-300">=</span>
                 <div class="w-20 h-10 flex items-center justify-center bg-white border rounded font-bold text-xl text-purple-700 shadow-sm animate-popIn" *ngIf="result !== null">
                     {{ result }}
                 </div>
             </div>
             <p class="text-center text-xs text-slate-300 mt-4 font-mono">
                 const result = (a, b) => a + b;
             </p>
        </div>
      </div>

      <!-- Closure Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-indigo-100 text-indigo-700 rounded text-xs">Scope</span> Closures
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <div class="text-xs font-bold text-slate-500 uppercase">Concept</div>
                <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 shadow-inner leading-relaxed">
                    <span class="code-keyword">function</span> createCounter() {{ '{' }} <br>
                    &nbsp;&nbsp;<span class="code-keyword">let</span> count = 0; <br>
                    &nbsp;&nbsp;<span class="code-keyword">return</span> () => ++count; <br>
                    {{ '}' }} <br>
                    <br>
                    <span class="code-keyword">const</span> counterA = createCounter();
                </div>
                
                <p class="text-sm text-slate-600 leading-relaxed">
                    The inner function "remembers" the <code class="bg-slate-100 px-1 rounded font-bold text-indigo-600">count</code> variable even after <code class="font-mono text-xs">createCounter</code> finishes.
                </p>
                
                <button (click)="createCounterInstance()" class="w-full bg-indigo-600 text-white font-bold py-3 rounded shadow hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                    <span class="text-lg">+</span> Create New Counter
                </button>
            </div>

            <div class="bg-slate-50 p-6 rounded border border-slate-200 min-h-[200px]">
                 <div class="text-xs font-bold text-slate-500 uppercase mb-4">Active Closures</div>
                 
                 <div class="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                    <div *ngFor="let c of counters; let i = index" class="bg-white p-3 rounded shadow-sm border border-slate-100 flex items-center justify-between animate-popIn">
                        <div class="flex items-center gap-3">
                            <span class="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">counter{{i+1}}()</span>
                            <span class="text-2xl font-bold text-slate-700 w-12 text-center">{{ c.value }}</span>
                        </div>
                        <div class="flex gap-2">
                            <button (click)="increment(i)" class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 font-bold text-xs transition active:scale-95">
                                Call
                            </button>
                            <button (click)="removeCounter(i)" class="text-slate-300 hover:text-red-500 px-2">✕</button>
                        </div>
                    </div>
                    
                    <div *ngIf="counters.length === 0" class="text-center text-slate-300 italic text-sm py-8">
                        No active closures. Click button to create one.
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `
})
export class FunctionsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  num1 = 5;
  num2 = 10;
  result: number | null = null;

  calculate() {
    // Simulating arrow function execution
    const add = (a: number, b: number) => a + b;
    this.result = add(this.num1, this.num2);
  }

  // Closures
  counters: { value: number }[] = [];

  createCounterInstance() {
    this.counters.push({ value: 0 });
  }

  increment(index: number) {
    this.counters[index].value++;
  }

  removeCounter(index: number) {
      this.counters.splice(index, 1);
  }
}
