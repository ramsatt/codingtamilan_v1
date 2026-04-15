

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-es6-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="es6" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-4">10. ES6+ Features</h3>
        <p class="article-body">
            Modern JavaScript (ES6+) introduced powerful syntax improvements like <span class="font-bold text-slate-800">Arrow Functions</span>, <span class="font-bold text-slate-800">Destructuring</span>, <span class="font-bold text-slate-800">Spread/Rest</span> operators, and <span class="font-bold text-slate-800">Template Literals</span>.
        </p>
      </div>

      <!-- Arrow Functions Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
             <span class="p-1 bg-pink-100 text-pink-700 rounded text-xs">Function</span> Arrow Syntax
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="space-y-2">
                <div class="text-xs font-bold text-slate-500 uppercase">Traditional Function</div>
                <div class="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-xs text-slate-600">
                    function add(a, b) {{ '{' }} <br>
                    &nbsp;&nbsp;return a + b; <br>
                    {{ '}' }}
                </div>
            </div>

            <div class="space-y-2">
                <div class="text-xs font-bold text-slate-500 uppercase">Arrow Function</div>
                <div class="bg-slate-900 p-3 rounded border border-slate-800 font-mono text-xs text-slate-300 shadow-inner">
                    <span class="text-purple-400">const</span> add = (a, b) <span class="text-blue-400">=></span> a + b;
                </div>
            </div>
            
            <div class="col-span-1 md:col-span-2 bg-slate-50 p-4 rounded border border-slate-200 flex flex-wrap items-center gap-4 justify-center">
                <div class="flex items-center gap-2">
                    <input type="number" [(ngModel)]="num1" class="w-20 p-2 border rounded text-center focus:ring-2 focus:ring-purple-200 outline-none">
                    <span class="font-bold text-slate-300">+</span>
                    <input type="number" [(ngModel)]="num2" class="w-20 p-2 border rounded text-center focus:ring-2 focus:ring-purple-200 outline-none">
                </div>
                
                <button (click)="calculateSum()" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-bold shadow-sm transition active:scale-95">
                    Run add()
                </button>
                
                <div class="bg-white px-4 py-2 rounded border border-slate-200 font-mono font-bold text-slate-700 min-w-[100px] text-center">
                    {{ sumResult !== null ? sumResult : '...' }}
                </div>
            </div>
        </div>
      </div>

      <!-- Template Literals Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
             <span class="p-1 bg-yellow-100 text-yellow-700 rounded text-xs">String</span> Template Literals
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                 <div class="space-y-2">
                    <label class="text-xs font-bold text-slate-500 uppercase">Variable: name</label>
                    <input [(ngModel)]="tplName" class="w-full p-2 border rounded font-mono text-sm focus:border-yellow-400 outline-none placeholder:text-slate-300" placeholder="Enter name...">
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-bold text-slate-500 uppercase">Variable: age</label>
                    <input type="number" [(ngModel)]="tplAge" class="w-full p-2 border rounded font-mono text-sm focus:border-yellow-400 outline-none">
                </div>
            </div>

            <div class="space-y-4">
                <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-500 uppercase">Old Syntax</div>
                    <div class="bg-slate-100 p-2 rounded border border-slate-200 font-mono text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
                        'Hello I am ' + name + ' and I am ' + age + ' years old.'
                    </div>
                </div>

                <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-500 uppercase">Template Literal</div>
                    <div class="bg-slate-900 p-3 rounded border border-slate-800 font-mono text-sm text-yellow-300 shadow-inner overflow-x-auto whitespace-nowrap">
                        \`Hello I am <span class="text-white font-bold">{{ '${' }}tplName{{ '}' }}</span> and I am <span class="text-white font-bold">{{ '${' }}tplAge{{ '}' }}</span> years old.\`
                    </div>
                </div>

                <div class="bg-green-50 p-3 rounded border border-green-200 text-green-800 text-sm italic">
                    Output: "Hello I am {{ tplName }} and I am {{ tplAge }} years old."
                </div>
            </div>
        </div>
      </div>

      <!-- Spread Operator Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-purple-100 text-purple-700 rounded text-xs">Spread</span> Merging Arrays
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div class="space-y-4">
                <div class="text-xs font-bold text-slate-500 uppercase">Input Arrays</div>
                
                <div class="flex items-center gap-2">
                    <span class="font-mono text-sm text-slate-600">const arr1 = [1, 2, 3];</span>
                    <div class="flex gap-1">
                        <span class="w-6 h-6 bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center rounded">1</span>
                        <span class="w-6 h-6 bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center rounded">2</span>
                        <span class="w-6 h-6 bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center rounded">3</span>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <span class="font-mono text-sm text-slate-600">const arr2 = [4, 5, 6];</span>
                    <div class="flex gap-1">
                        <span class="w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center rounded">4</span>
                        <span class="w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center rounded">5</span>
                        <span class="w-6 h-6 bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center rounded">6</span>
                    </div>
                </div>

                <button (click)="mergeArrays()" class="w-full bg-purple-600 text-white font-bold py-2 rounded shadow hover:bg-purple-700 transition">
                    const combined = [...arr1, ...arr2];
                </button>
            </div>

            <div class="bg-slate-50 p-6 rounded border border-slate-200 flex flex-col items-center justify-center min-h-[150px]">
                <div *ngIf="combinedArray.length > 0" class="flex flex-wrap gap-2 animate-popIn">
                    <div *ngFor="let num of combinedArray" 
                         class="w-8 h-8 font-bold flex items-center justify-center rounded shadow-sm border"
                         [class.bg-red-100]="num <= 3" [class.text-red-600]="num <= 3" [class.border-red-200]="num <= 3"
                         [class.bg-blue-100]="num > 3" [class.text-blue-600]="num > 3" [class.border-blue-200]="num > 3">
                        {{ num }}
                    </div>
                </div>
                <div *ngIf="combinedArray.length === 0" class="text-slate-300 italic text-sm">
                    Click button to merge...
                </div>
            </div>

        </div>
      </div>

      <!-- Destructuring Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
             <span class="p-1 bg-green-100 text-green-700 rounded text-xs">Unpack</span> Destructuring
        </h4>
        
        <div class="flex flex-col md:flex-row gap-8 items-center justify-center">
            
            <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                <span class="code-keyword">const</span> user = {{ '{' }} <span class="text-orange-400">id</span>: 1, <span class="text-green-400">name</span>: "Alice" {{ '}' }};<br>
                <br>
                <span class="code-keyword">const</span> {{ '{' }} <span class="text-orange-400">id</span>, <span class="text-green-400">name</span> {{ '}' }} = user;
            </div>

            <div class="text-2xl text-slate-300">➜</div>

            <div class="flex gap-4">
                <div class="p-4 bg-orange-50 border border-orange-200 rounded text-center min-w-[80px] animate-bounce">
                    <div class="text-[10px] uppercase font-bold text-orange-400 mb-1">id</div>
                    <div class="text-xl font-bold text-orange-700">1</div>
                </div>
                <div class="p-4 bg-green-50 border border-green-200 rounded text-center min-w-[80px] animate-bounce" style="animation-delay: 0.1s">
                    <div class="text-[10px] uppercase font-bold text-green-400 mb-1">name</div>
                    <div class="text-xl font-bold text-green-700">"Alice"</div>
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
export class Es6Lab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  // Arrow Functions
  num1 = 5;
  num2 = 10;
  sumResult: number | null = null;

  calculateSum() {
      this.sumResult = this.num1 + this.num2;
  }

  // Template Literals
  tplName = 'John Doe';
  tplAge = 25;

  // Spread
  combinedArray: number[] = [];

  mergeArrays() {
    this.combinedArray = [];
    // Animation simulate
    setTimeout(() => {
        this.combinedArray = [1, 2, 3, 4, 5, 6];
    }, 100);
  }
}
