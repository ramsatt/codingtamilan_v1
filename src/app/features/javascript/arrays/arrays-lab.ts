

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-arrays-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="arrays" class="scroll-mt-8 space-y-8">
      
      <!-- 1. Introduction -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-4">7. Arrays & Methods</h3>
        <p class="article-body mb-4">
            An array is a special variable, which can hold more than one value.
            It is a common practice to declare arrays with the <code class="bg-slate-100 px-1 rounded text-pink-500">const</code> keyword.
        </p>
        <div class="bg-slate-900 rounded p-4 font-mono text-sm text-slate-300 shadow-inner">
            <span class="text-pink-400">const</span> cars = [<span class="text-green-400">"Saab"</span>, <span class="text-green-400">"Volvo"</span>, <span class="text-green-400">"BMW"</span>];
        </div>
      </div>

      <!-- 2. Basic Methods Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-indigo-100 text-indigo-700 rounded text-xs">Interactive</span> Basic Methods
        </h4>
        <p class="text-slate-600 mb-4">
            JavaScript arrays come with built-in methods to add or remove elements.
        </p>

        <!-- Array Display -->
        <div class="flex flex-wrap gap-2 mb-6 p-4 bg-slate-50 border border-slate-200 rounded min-h-[80px] items-center">
            <div *ngFor="let fruit of fruits; let i = index" 
                 class="px-4 py-2 bg-white text-indigo-600 font-bold rounded shadow-sm border border-indigo-100 animate-fadeIn flex items-center gap-2">
                <span>{{ fruit }}</span>
                <span class="text-[10px] text-slate-300 font-normal">index:{{i}}</span>
            </div>
            <div *ngIf="fruits.length === 0" class="text-slate-300 italic">Empty Array []</div>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button (click)="pushFruit()" class="btn-method">
                <span class="font-mono text-xs block text-slate-500">array.push()</span>
                Add Element (End)
            </button>
            <button (click)="popFruit()" class="btn-method">
                <span class="font-mono text-xs block text-slate-500">array.pop()</span>
                Remove Element (End)
            </button>
            <button (click)="unshiftFruit()" class="btn-method">
                <span class="font-mono text-xs block text-slate-500">array.unshift()</span>
                Add Element (Start)
            </button>
            <button (click)="shiftFruit()" class="btn-method">
                <span class="font-mono text-xs block text-slate-500">array.shift()</span>
                Remove Element (Start)
            </button>
        </div>
        
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
             <button (click)="sortFruits()" class="btn-method bg-slate-100 border-slate-300">
                <span class="font-mono text-xs block text-slate-500">array.sort()</span>
                Sort
            </button>
             <button (click)="reverseFruits()" class="btn-method bg-slate-100 border-slate-300">
                <span class="font-mono text-xs block text-slate-500">array.reverse()</span>
                Reverse
            </button>
        </div>
      </div>

      <!-- 3. Splicing -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
         <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-amber-100 text-amber-700 rounded text-xs">Splice</span> Add/Remove at Position
        </h4>
        <p class="text-slate-600 mb-4">
            The <code class="font-mono text-amber-600">splice()</code> method can be used to add new items to an array or remove existing ones.
        </p>

        <div class="bg-amber-50 rounded p-4 border border-amber-100 mb-4">
            <code class="text-sm text-slate-700">fruitArray.splice(<strong>2</strong>, <strong>0</strong>, "Lemon", "Kiwi");</code>
        </div>
        
        <div class="flex gap-2 p-2 overflow-x-auto">
            <div *ngFor="let item of spliceArray; let i = index" class="w-20 text-center">
                <div class="w-full py-2 mb-1 bg-white border border-amber-200 rounded font-bold text-amber-700 text-sm transition-all"
                     [class.bg-green-100]="isNew(item)" [class.scale-110]="isNew(item)">
                    {{ item }}
                </div>
                <div class="text-[10px] text-slate-300">{{i}}</div>
            </div>
        </div>

        <button (click)="runSplice()" class="mt-4 px-4 py-2 bg-amber-500 text-white rounded font-bold hover:bg-amber-600 transition shadow-sm">
            Execute Splice(2, 0, ...)
        </button>
        <button (click)="resetSplice()" class="mt-4 ml-2 px-4 py-2 text-slate-600 hover:text-slate-800 text-sm">Reset</button>
      </div>

      <!-- 4. High-Order Methods (Map/Filter/Reduce) -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-purple-100 text-purple-700 rounded text-xs">Iterate</span> Functional Methods
        </h4>
        
        <!-- Original Array -->
        <div class="mb-6">
            <div class="text-xs font-bold text-slate-500 uppercase mb-2">Original Numbers</div>
            <div class="flex gap-2">
                <div *ngFor="let num of numbers" class="w-10 h-10 bg-slate-100 text-slate-600 font-bold flex items-center justify-center rounded border border-slate-200">
                    {{ num }}
                </div>
            </div>
        </div>
        
        <div class="space-y-6">
             <!-- Filter -->
             <div class="flex flex-col md:flex-row gap-4 items-start border-l-2 border-indigo-200 pl-4">
                <div class="min-w-[200px]">
                    <h5 class="font-bold text-indigo-700">filter()</h5>
                    <p class="text-xs text-slate-500 mb-2">Check (num % 2 === 0)</p>
                    <button (click)="runFilter()" class="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded hover:bg-indigo-700">Get Evens</button>
                </div>
                <div class="flex gap-2 items-center h-10">
                    <span *ngIf="!filtered" class="text-slate-300 text-sm italic">Result will appear here...</span>
                    <div *ngFor="let num of filtered" class="w-8 h-8 bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center rounded animate-popIn">
                        {{ num }}
                    </div>
                </div>
             </div>

             <!-- Map -->
             <div class="flex flex-col md:flex-row gap-4 items-start border-l-2 border-purple-200 pl-4">
                <div class="min-w-[200px]">
                    <h5 class="font-bold text-purple-700">map()</h5>
                    <p class="text-xs text-slate-500 mb-2">Transform (num * 2)</p>
                    <button (click)="runMap()" class="bg-purple-600 text-white text-xs px-3 py-1.5 rounded hover:bg-purple-700">Double Values</button>
                </div>
                <div class="flex gap-2 items-center h-10">
                    <span *ngIf="!mapped" class="text-slate-300 text-sm italic">Result will appear here...</span>
                    <div *ngFor="let num of mapped" class="w-8 h-8 bg-purple-100 text-purple-700 font-bold flex items-center justify-center rounded animate-popIn">
                        {{ num }}
                    </div>
                </div>
             </div>

             <!-- Reduce -->
             <div class="flex flex-col md:flex-row gap-4 items-start border-l-2 border-pink-200 pl-4">
                <div class="min-w-[200px]">
                    <h5 class="font-bold text-pink-700">reduce()</h5>
                    <p class="text-xs text-slate-500 mb-2">Accumulate Sum</p>
                    <button (click)="runReduce()" class="bg-pink-600 text-white text-xs px-3 py-1.5 rounded hover:bg-pink-700">Check Sum</button>
                </div>
                <div class="flex gap-2 items-center h-10">
                    <span *ngIf="reduced === null" class="text-slate-300 text-sm italic">Result will appear here...</span>
                    <div *ngIf="reduced !== null" class="h-8 px-3 bg-pink-100 text-pink-700 font-bold flex items-center justify-center rounded animate-popIn">
                        {{ reduced }}
                    </div>
                </div>
             </div>
        </div>

      </div>

    </section>
  `,
  styles: `
    @reference "../../../../styles.css";
    .btn-method {
        @apply p-3 rounded border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm transition text-left flex flex-col gap-1;
    }
    .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
    .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `
})
export class ArraysLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  // Playground State
  fruits = ['Apple', 'Banana', 'Orange'];
  availableFruits = ['Mango', 'Pineapple', 'Grapes', 'Peach', 'Berry'];
  
  pushFruit() {
     const next = this.availableFruits[Math.floor(Math.random() * this.availableFruits.length)];
     this.fruits.push(next);
  }
  
  popFruit() {
    this.fruits.pop();
  }

  unshiftFruit() {
    const next = this.availableFruits[Math.floor(Math.random() * this.availableFruits.length)];
    this.fruits.unshift(next);
  }

  shiftFruit() {
    this.fruits.shift();
  }

  sortFruits() {
      this.fruits.sort();
  }

  reverseFruits() {
      this.fruits.reverse();
  }

  // Splice State
  spliceArray = ['Apple', 'Banana', 'Orange', 'Mango'];
  newlyAdded: string[] = [];
  
  runSplice() {
     this.spliceArray.splice(2, 0, "Lemon", "Kiwi");
     this.newlyAdded = ["Lemon", "Kiwi"];
  }

  isNew(item: string) {
      return this.newlyAdded.includes(item);
  }

  resetSplice() {
      this.spliceArray = ['Apple', 'Banana', 'Orange', 'Mango'];
      this.newlyAdded = [];
  }

  // Functional Methods State
  numbers = [1, 2, 3, 4, 5];
  filtered: number[] | null = null;
  mapped: number[] | null = null;
  reduced: number | null = null;

  runFilter() {
    this.filtered = this.numbers.filter(n => n % 2 === 0);
  }

  runMap() {
    this.mapped = this.numbers.map(n => n * 2);
  }

  runReduce() {
    this.reduced = this.numbers.reduce((acc, curr) => acc + curr, 0);
  }
}
