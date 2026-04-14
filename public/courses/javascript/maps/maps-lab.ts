
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-maps-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="maps" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-4">JS Maps</h3>
        <p class="article-body">
            A <code class="bg-emerald-100 px-1 rounded text-emerald-700 font-bold text-sm">Map</code> holds key-value pairs where keys can be any type.
        </p>
      </div>

      <!-- Map Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-emerald-100 text-emerald-700 rounded text-xs">Structured</span> Key-Value
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                 <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">const</span> myMap = <span class="code-keyword">new</span> Map();<br>
                    myMap.set(<span class="text-emerald-400">'key1'</span>, <span class="text-emerald-400">'value1'</span>);<br>
                    <span class="code-keyword">console</span>.log(myMap.get(<span class="text-emerald-400">'key1'</span>));
                </div>
                
                <div class="space-y-2 bg-slate-50 p-3 rounded">
                    <div class="flex gap-2">
                        <input [(ngModel)]="newKey" placeholder="Key" class="w-1/3 p-2 border rounded text-sm outline-none focus:border-emerald-400">
                        <input [(ngModel)]="newValue" placeholder="Value" class="flex-1 p-2 border rounded text-sm outline-none focus:border-emerald-400">
                    </div>
                    <button (click)="addEntry()" class="w-full bg-emerald-600 text-white font-bold py-2 rounded shadow hover:bg-emerald-700 transition active:scale-95 text-sm">
                        .set(Key, Value)
                    </button>
                    <button (click)="clearMap()" class="w-full bg-slate-200 text-slate-600 font-bold py-2 rounded shadow hover:bg-slate-300 transition active:scale-95 text-sm">
                        .clear()
                    </button>
                </div>
            </div>

            <div class="bg-slate-50 p-6 rounded border border-slate-200 flex flex-col gap-2 min-h-[150px]">
                <div *ngFor="let entry of mapEntries" class="bg-white p-3 rounded shadow-sm border border-slate-200 flex justify-between items-center animate-popIn">
                    <div class="flex items-center gap-2 font-mono text-sm">
                        <span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold">{{ entry[0] }}</span>
                        <span class="text-slate-300">➜</span>
                        <span class="text-slate-700">{{ entry[1] }}</span>
                    </div>
                    <button (click)="deleteEntry(entry[0])" class="text-slate-300 hover:text-red-500 text-xs">✕</button>
                </div>
                <div *ngIf="mapEntries.length === 0" class="w-full text-center text-slate-300 italic text-sm py-8">
                    Map is empty
                </div>
            </div>
            
            <div class="col-span-1 md:col-span-2 flex justify-between items-center text-sm text-slate-500 px-4 py-2 border-t border-slate-100">
                <span>Size: <span class="font-bold text-slate-800">{{ myMap.size }}</span></span>
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
export class MapsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  myMap = new Map<string, string>([['name', 'Coding Tamilan'], ['role', 'Admin']]);
  newKey = '';
  newValue = '';

  get mapEntries() {
      return Array.from(this.myMap.entries());
  }

  addEntry() {
      if (!this.newKey) return;
      this.myMap.set(this.newKey, this.newValue);
      this.newKey = '';
      this.newValue = '';
      // Trigger change detection by re-assigning map (or relying on getter if change detection runs)
      // Since mapEntries is a getter, it will re-evaluate on CD.
      // But standard CD only runs on events. Since (click) is an event, it should work.
      // However, the map itself is mutated.
      this.myMap = new Map(this.myMap);
  }

  deleteEntry(key: string) {
      this.myMap.delete(key);
      this.myMap = new Map(this.myMap);
  }

  clearMap() {
      this.myMap.clear();
      this.myMap = new Map(this.myMap);
  }
}
