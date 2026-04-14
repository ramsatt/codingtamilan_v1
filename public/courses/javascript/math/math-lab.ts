
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-math-lab',
  imports: [CommonModule],
  template: `
    <section id="math" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-fuchsia-500 pl-4">8. JS Math</h3>
        <p class="article-body">
            The <code class="px-1 bg-slate-100 rounded text-slate-700 font-bold text-sm">Math</code> object allows you to perform mathematical tasks.
        </p>
      </div>

      <!-- Math Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-fuchsia-100 text-fuchsia-700 rounded text-xs">Methods</span> Common Operations
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Random -->
            <div class="space-y-4">
                 <div class="bg-fuchsia-50 p-6 rounded-lg border border-fuchsia-200 flex flex-col items-center justify-center min-h-[150px]">
                     <div class="text-4xl font-mono font-bold text-fuchsia-800 mb-2 animate-popIn">
                         {{ randomNumber.toFixed(4) }}
                     </div>
                     <button (click)="generateRandom()" class="px-4 py-2 bg-fuchsia-600 text-white rounded font-bold shadow hover:bg-fuchsia-700 transition active:scale-95 text-xs">
                         Math.random()
                     </button>
                 </div>
                 
                 <div class="text-xs text-slate-500 text-center italic">
                     Generates a floating-point number between 0 (inclusive) and 1 (exclusive).
                 </div>
            </div>

            <!-- Rounding -->
            <div class="space-y-4">
                 <div class="grid grid-cols-2 gap-4">
                     <div class="bg-slate-50 p-2 rounded border border-slate-200">
                         <div class="text-[10px] font-bold text-slate-500 uppercase">Math.round({{ randomNumber.toFixed(2) }})</div>
                         <div class="font-bold text-slate-700 text-lg">{{ Math.round(randomNumber) }}</div>
                     </div>
                     <div class="bg-slate-50 p-2 rounded border border-slate-200">
                         <div class="text-[10px] font-bold text-slate-500 uppercase">Math.ceil({{ randomNumber.toFixed(2) }})</div>
                         <div class="font-bold text-slate-700 text-lg">{{ Math.ceil(randomNumber) }}</div>
                     </div>
                     <div class="bg-slate-50 p-2 rounded border border-slate-200">
                         <div class="text-[10px] font-bold text-slate-500 uppercase">Math.floor({{ randomNumber.toFixed(2) }})</div>
                         <div class="font-bold text-slate-700 text-lg">{{ Math.floor(randomNumber) }}</div>
                     </div>
                     <div class="bg-slate-50 p-2 rounded border border-slate-200">
                         <div class="text-[10px] font-bold text-slate-500 uppercase">Math.sqrt({{ (randomNumber * 100).toFixed(0) }})</div>
                         <div class="font-bold text-slate-700 text-lg">{{ Math.sqrt(randomNumber * 100).toFixed(2) }}</div>
                     </div>
                 </div>
            </div>
        </div>
      </div>
      
    </section>
  `,
  styles: `
    .animate-popIn { animation: popIn 0.2s ease-out; }
    @keyframes popIn { from { transform: scale(0.9); opacity: 0.8; } to { transform: scale(1); opacity: 1; } }
  `
})
export class MathLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  randomNumber = Math.random();
  Math = Math;

  generateRandom() {
      this.randomNumber = Math.random();
  }
}
