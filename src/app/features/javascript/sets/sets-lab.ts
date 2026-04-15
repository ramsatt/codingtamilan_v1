
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-sets-lab',
  imports: [CommonModule],
  template: `
    <section id="sets" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-rose-500 pl-4">JS Sets</h3>
        <p class="article-body">
            A <code class="bg-rose-100 px-1 rounded text-rose-700 font-bold text-sm">Set</code> is a collection of unique values.
        </p>
      </div>

      <!-- Set Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-rose-100 text-rose-700 rounded text-xs">Unique</span> Collection
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                 <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">const</span> mySet = <span class="code-keyword">new</span> Set();<br>
                    mySet.add(<span class="text-rose-400">1</span>);<br>
                    mySet.add(<span class="text-rose-400">5</span>);<br>
                    mySet.add(<span class="text-rose-400">5</span>); <span class="text-slate-500">// Ignored</span><br>
                    <span class="code-keyword">console</span>.log(mySet.size); <span class="text-slate-500">// 2</span>
                </div>
                
                <div class="flex gap-2">
                    <button (click)="addRandom()" class="flex-1 bg-rose-600 text-white font-bold py-2 rounded shadow hover:bg-rose-700 transition active:scale-95 text-sm">
                        .add(Random)
                    </button>
                    <button (click)="clear()" class="px-4 bg-slate-200 text-slate-600 font-bold py-2 rounded shadow hover:bg-slate-300 transition active:scale-95 text-sm">
                        .clear()
                    </button>
                </div>
            </div>

            <div class="bg-slate-50 p-6 rounded border border-slate-200 flex flex-wrap content-start gap-2 min-h-[150px]">
                <div *ngFor="let item of mySet" class="bg-white px-3 py-1 rounded shadow-sm border border-slate-200 flex items-center gap-2 animate-popIn">
                    <span class="font-mono font-bold text-rose-600">{{ item }}</span>
                    <button (click)="delete(item)" class="text-slate-300 hover:text-red-500 text-xs">✕</button>
                </div>
                <div *ngIf="mySet.size === 0" class="w-full text-center text-slate-300 italic text-sm self-center">
                    Set is empty
                </div>
            </div>
            
            <div class="col-span-1 md:col-span-2 flex justify-between items-center text-sm text-slate-500 px-4 py-2 border-t border-slate-100">
                <span>Size: <span class="font-bold text-slate-800">{{ mySet.size }}</span></span>
                <span>Has 5? <span class="font-bold" [class.text-green-600]="mySet.has(5)" [class.text-red-500]="!mySet.has(5)">{{ mySet.has(5) }}</span></span>
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
export class SetsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  mySet = new Set<number>([1, 2, 3]);

  addRandom() {
     this.mySet.add(Math.floor(Math.random() * 10) + 1);
     this.mySet = new Set(this.mySet);
  }

  delete(item: number) {
      this.mySet.delete(item);
      this.mySet = new Set(this.mySet);
  }

  clear() {
      this.mySet.clear();
      this.mySet = new Set(this.mySet);
  }
}
