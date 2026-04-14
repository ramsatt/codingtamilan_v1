

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-control-flow-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="control-flow" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-4">6. Control Flow</h3>
        <p class="article-body">
            JavaScript controls the execution flow using conditionals like <code class="bg-emerald-100 px-1 rounded">if/else</code>, 
            <code class="bg-emerald-100 px-1 rounded">switch</code>, and loops like <code class="bg-emerald-100 px-1 rounded">for</code> and <code class="bg-emerald-100 px-1 rounded">while</code>.
        </p>
      </div>

      <!-- Logic Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-emerald-100 text-emerald-700 rounded text-xs">Logic</span> Traffic Light
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Code -->
            <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner leading-relaxed">
                <span class="code-keyword">let</span> message = <span class="text-slate-300">""</span>;<br>
                <span class="code-keyword">if</span> (color === <span class="text-red-400">"red"</span>) {{ '{' }}<br>
                &nbsp;&nbsp;message = <span class="text-red-400">"STOP"</span>;<br>
                {{ '}' }} <span class="code-keyword">else if</span> (color === <span class="text-yellow-400">"yellow"</span>) {{ '{' }}<br>
                &nbsp;&nbsp;message = <span class="text-yellow-400">"WAIT"</span>;<br>
                {{ '}' }} <span class="code-keyword">else</span> {{ '{' }}<br>
                &nbsp;&nbsp;message = <span class="text-green-400">"GO"</span>;<br>
                {{ '}' }}
            </div>

            <!-- Interaction -->
            <div class="space-y-4 flex flex-col items-center">
                 <div class="flex gap-4">
                     <button (click)="setColor('red')" class="w-12 h-12 rounded-full border-4 border-red-200 bg-red-500 hover:scale-110 transition shadow-lg ring focus:ring-2 focus:ring-offset-2 focus:ring-red-300" 
                             [class.ring-4]="selectedColor === 'red'" [class.ring-red-300]="selectedColor === 'red'"></button>
                     <button (click)="setColor('yellow')" class="w-12 h-12 rounded-full border-4 border-yellow-200 bg-yellow-400 hover:scale-110 transition shadow-lg ring focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300" 
                             [class.ring-4]="selectedColor === 'yellow'" [class.ring-yellow-300]="selectedColor === 'yellow'"></button>
                     <button (click)="setColor('green')" class="w-12 h-12 rounded-full border-4 border-green-200 bg-green-500 hover:scale-110 transition shadow-lg ring focus:ring-2 focus:ring-offset-2 focus:ring-green-300" 
                             [class.ring-4]="selectedColor === 'green'" [class.ring-green-300]="selectedColor === 'green'"></button>
                 </div>
                 
                 <div class="mt-4 text-3xl font-extrabold tracking-widest animate-pulse h-10" 
                      [class.text-red-600]="selectedColor === 'red'"
                      [class.text-yellow-500]="selectedColor === 'yellow'"
                      [class.text-green-600]="selectedColor === 'green'">
                     {{ message }}
                 </div>
            </div>

        </div>
      </div>
      
      <!-- Switch Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-orange-100 text-orange-700 rounded text-xs">Selection</span> Switch Case
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 shadow-inner leading-relaxed">
                <span class="code-keyword">switch</span> (fruit) {{ '{' }} <br>
                &nbsp;&nbsp;<span class="code-keyword">case</span> <span class="text-green-400">"Apple"</span>: <br>
                &nbsp;&nbsp;&nbsp;&nbsp;color = <span class="text-red-400">"Red"</span>; <br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">break</span>; <br>
                &nbsp;&nbsp;<span class="code-keyword">case</span> <span class="text-yellow-400">"Banana"</span>: <br>
                &nbsp;&nbsp;&nbsp;&nbsp;color = <span class="text-yellow-300">"Yellow"</span>; <br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">break</span>; <br>
                &nbsp;&nbsp;<span class="code-keyword">default</span>: <br>
                &nbsp;&nbsp;&nbsp;&nbsp;color = <span class="text-slate-300">"Unknown"</span>; <br>
                {{ '}' }}
            </div>

            <div class="space-y-6">
                <div class="flex gap-2 justify-center">
                    <button *ngFor="let f of fruits" (click)="selectFruit(f)" 
                            class="px-4 py-2 border rounded-full hover:bg-slate-50 transition text-sm font-bold shadow-sm active:scale-95"
                            [class.bg-slate-800]="selectedFruit === f" [class.text-white]="selectedFruit === f">
                        {{ f }}
                    </button>
                </div>
                
                <div class="flex flex-col items-center">
                    <div class="text-xs font-bold text-slate-300 uppercase mb-2">Result Color</div>
                    <div class="w-full h-16 rounded border-2 border-dashed flex items-center justify-center font-bold text-xl transition-all duration-300"
                         [style.borderColor]="fruitColor"
                         [style.color]="fruitColor"
                         [style.backgroundColor]="fruitColor + '10'">
                        {{ fruitColor }}
                    </div>
                </div>
            </div>
        </div>
      </div>

       <!-- Loops Visualizer -->
       <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
          <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-blue-100 text-blue-700 rounded text-xs">Loop</span> for Loop
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner flex items-center">
                <div>
                    <span class="code-keyword">const</span> items = [];<br>
                    <span class="code-keyword">for</span> (<span class="code-keyword">let</span> i = 0; i < <span class="text-blue-400">5</span>; i++) {{ '{' }}<br>
                    &nbsp;&nbsp;items.push(i);<br>
                    {{ '}' }}
                </div>
            </div>
            
            <div class="bg-slate-50 p-4 rounded flex items-center gap-2 overflow-x-auto min-h-[80px] border border-slate-200">
                <div *ngFor="let i of loopItems" class="w-10 h-10 bg-blue-600 text-white font-bold flex items-center justify-center rounded shadow-md animate-popIn">
                    {{ i }}
                </div>
                
                <div *ngIf="loopItems.length === 0 && !isLooping" class="flex-1 flex justify-center">
                    <button (click)="runLoop()" class="px-4 py-2 bg-slate-800 text-white rounded text-xs font-bold hover:bg-slate-700 transition shadow-sm active:scale-95">Run Loop ➔</button>
                </div>
                
                <div *ngIf="loopItems.length === 5" class="ml-auto">
                    <button (click)="loopItems = []" class="px-3 py-1 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300 font-bold">Reset</button>
                </div>
            </div>
          </div>
       </div>
    </section>
  `,
  styles: `
    .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `
})
export class ControlFlowLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  selectedColor: 'red' | 'yellow' | 'green' = 'red';
  message = 'STOP';
  
  loopItems: number[] = [];
  isLooping = false;

  setColor(color: 'red' | 'yellow' | 'green') {
    this.selectedColor = color;
    if (color === 'red') this.message = 'STOP';
    else if (color === 'yellow') this.message = 'WAIT';
    else this.message = 'GO';
  }

  async runLoop() {
      if (this.isLooping) return;
      this.isLooping = true;
      this.loopItems = [];
      for(let i = 0; i < 5; i++) {
          await new Promise(r => setTimeout(r, 400));
          this.loopItems.push(i);
      }
      this.isLooping = false;
  }

  // Switch Logic
  fruits = ['Apple', 'Banana', 'Grape'];
  selectedFruit = 'Apple';
  fruitColor = 'Red';

  selectFruit(fruit: string) {
      this.selectedFruit = fruit;
      switch(fruit) {
          case 'Apple': this.fruitColor = 'Red'; break;
          case 'Banana': this.fruitColor = '#EAB308'; break; // Yellow-500
          case 'Grape': this.fruitColor = '#9333EA'; break; // Purple-600
          default: this.fruitColor = 'Gray';
      }
  }
}
