
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-json-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="json" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-orange-500 pl-4">JS JSON</h3>
        <p class="article-body">
            <code class="bg-orange-100 px-1 rounded text-orange-900 font-bold text-sm">JSON</code> (JavaScript Object Notation) is a lightweight data interchange format.
        </p>
      </div>

      <!-- JSON Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-orange-100 text-orange-700 rounded text-xs">Exchage</span> Parse & Stringify
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Object to JSON -->
            <div class="space-y-4">
                 <div class="text-xs font-bold text-slate-500 uppercase">JavaScript Object</div>
                 <div class="bg-slate-50 p-4 rounded border border-slate-200">
                     <div class="flex flex-col gap-2">
                         <div class="flex gap-2 items-center">
                             <span class="text-slate-300 font-mono">name:</span>
                             <input [(ngModel)]="objName" class="flex-1 p-1 border rounded text-sm px-2 outline-none focus:border-orange-300">
                         </div>
                         <div class="flex gap-2 items-center">
                             <span class="text-slate-300 font-mono">age:</span>
                             <input type="number" [(ngModel)]="objAge" class="flex-1 p-1 border rounded text-sm px-2 outline-none focus:border-orange-300">
                         </div>
                         <div class="flex gap-2 items-center">
                             <span class="text-slate-300 font-mono">isAdmin:</span>
                             <input type="checkbox" [(ngModel)]="objIsAdmin" class="w-4 h-4 text-orange-600 rounded focus:ring-orange-500">
                         </div>
                     </div>
                 </div>
                 
                 <div class="flex justify-center">
                     <div class="rotate-90 md:rotate-0 text-slate-300 text-2xl">⬇️</div>
                 </div>

                 <div class="bg-slate-900 p-4 rounded text-xs font-mono text-orange-300 shadow-inner relative group">
                     <div class="absolute top-2 right-2 text-[10px] text-slate-500 font-sans uppercase">JSON String</div>
                     {{ jsonString }}
                 </div>
            </div>

            <!-- JSON to Object -->
            <div class="space-y-4 pt-8 md:pt-0 md:border-l md:border-slate-100 md:pl-8">
                 <div class="text-xs font-bold text-slate-500 uppercase">JSON String Input</div>
                 <textarea [(ngModel)]="jsonInput" rows="5" class="w-full p-3 bg-slate-50 border rounded font-mono text-xs text-slate-700 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 resize-none"></textarea>
                 
                 <button (click)="parseJson()" class="w-full bg-orange-600 text-white font-bold py-2 rounded shadow hover:bg-orange-700 transition active:scale-95 text-xs">
                     JSON.parse()
                 </button>

                 <div *ngIf="parseError" class="p-3 bg-red-50 text-red-600 text-xs rounded border border-red-200 animate-pulse">
                     {{ parseError }}
                 </div>

                 <div *ngIf="parsedObject" class="bg-green-50 p-4 rounded border border-green-200 text-green-800 text-xs font-mono overflow-auto animate-popIn">
                     <pre>{{ parsedObject | json }}</pre>
                 </div>
            </div>

        </div>
      </div>
    </section>
  `,
  styles: `
    .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `
})
export class JsonLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  objName = 'John';
  objAge = 30;
  objIsAdmin = false;

  get jsonString() {
      return JSON.stringify({
          name: this.objName,
          age: this.objAge,
          isAdmin: this.objIsAdmin
      }, null, 2);
  }

  jsonInput = '{"city": "New York", "zip": 10001}';
  parsedObject: any = null;
  parseError = '';

  parseJson() {
      try {
          this.parseError = '';
          this.parsedObject = JSON.parse(this.jsonInput);
      } catch (e: any) {
          this.parsedObject = null;
          this.parseError = e.message;
      }
  }
}
