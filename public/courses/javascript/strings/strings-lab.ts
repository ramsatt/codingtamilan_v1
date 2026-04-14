
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-strings-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="strings" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-lime-500 pl-4">5. JS Strings</h3>
        <p class="article-body">
            Strings are used to store and manipulate text. JavaScript provides many built-in methods to work with strings.
        </p>
      </div>

      <!-- String Methods Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-lime-100 text-lime-700 rounded text-xs">Manipulation</span> Common Methods
        </h4>
        
        <div class="space-y-6">
             <div class="flex flex-col md:flex-row gap-4 align-items-center">
                 <label class="text-xs font-bold text-slate-500 uppercase mt-2">Input String</label>
                 <input [(ngModel)]="text" class="flex-1 p-2 border rounded text-lg font-mono outline-none focus:border-lime-400 shadow-sm" placeholder="Enter text...">
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 <!-- Length -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">.length</div>
                     <div class="font-mono text-lime-700 font-bold text-lg">{{ text.length }}</div>
                 </div>

                 <!-- Case -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">.toUpperCase()</div>
                     <div class="font-mono text-lime-700 font-bold truncate">{{ text.toUpperCase() }}</div>
                 </div>

                 <!-- Slice -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1 flex justify-between">
                         <span>.slice(0, 5)</span>
                         <span class="text-[10px] text-slate-300">First 5 chars</span>
                     </div>
                     <div class="font-mono text-lime-700 font-bold truncate">{{ text.slice(0, 5) }}</div>
                 </div>

                 <!-- Replace -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1 flex justify-between">
                         <span>.replace('JS', 'JavaScript')</span>
                     </div>
                     <div class="font-mono text-lime-700 font-bold truncate">{{ text.replace('JS', 'JavaScript') }}</div>
                 </div>

                 <!-- Includes -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1 flex justify-between">
                         <span>.includes('script')</span>
                     </div>
                     <div class="font-mono font-bold truncate" [class.text-green-600]="text.includes('script')" [class.text-red-500]="!text.includes('script')">
                         {{ text.includes('script') }}
                     </div>
                 </div>

                 <!-- Split -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1 flex justify-between">
                         <span>.split(' ')</span>
                         <span class="text-[10px] text-slate-300">Array of words</span>
                     </div>
                     <div class="font-mono text-lime-700 font-bold text-xs truncate">
                         [{{ text.split(' ').join(', ') }}]
                     </div>
                 </div>

             </div>
        </div>
      </div>
      
    </section>
  `,
  styles: ``
})
export class StringsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  text = 'Modern JS is awesome!';
}
