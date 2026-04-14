
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-regexp-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="regexp" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-pink-500 pl-4">JS RegExp</h3>
        <p class="article-body">
            Regular expressions are patterns used to match character combinations in strings.
        </p>
      </div>

      <!-- RegExp Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-pink-100 text-pink-700 rounded text-xs">Search</span> Pattern Matching
        </h4>
        
        <div class="space-y-6">
             <div class="flex flex-col md:flex-row gap-4">
                 <div class="flex-1 space-y-2">
                     <label class="text-xs font-bold text-slate-500 uppercase">Input Text</label>
                     <input [(ngModel)]="text" class="w-full p-2 border rounded outline-none focus:border-pink-400 font-mono text-sm" placeholder="Text to search...">
                 </div>
                 <div class="flex-1 space-y-2">
                     <label class="text-xs font-bold text-slate-500 uppercase">RegExp Pattern</label>
                     <div class="flex items-center bg-slate-100 border rounded px-2">
                         <span class="text-slate-500 font-mono">/</span>
                         <input [(ngModel)]="pattern" class="flex-1 p-2 bg-transparent outline-none font-mono text-sm text-pink-600" placeholder="e.g. [a-z]+">
                         <span class="text-slate-500 font-mono">/{{ flags }}</span>
                     </div>
                 </div>
                 <div class="w-24 space-y-2">
                     <label class="text-xs font-bold text-slate-500 uppercase">Flags</label>
                     <input [(ngModel)]="flags" class="w-full p-2 border rounded outline-none text-center font-mono text-sm" placeholder="g, i...">
                 </div>
             </div>

             <div class="bg-slate-50 p-6 rounded border border-slate-200">
                 <div class="flex justify-between items-center mb-4">
                     <div class="text-xs font-bold text-slate-500 uppercase">Results</div>
                     <div class="text-[10px] text-slate-300">Match found: {{ hasMatch }}</div>
                 </div>
                 
                 <div class="bg-white p-4 rounded shadow-sm border border-slate-200 font-mono text-sm text-slate-700 break-all leading-relaxed" [innerHTML]="highlightedText"></div>
             </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    ::ng-deep .highlight { background-color: #fce7f3; color: #db2777; font-weight: bold; padding: 0 2px; border-radius: 2px; }
  `
})
export class RegExpLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  text = 'The rain in SPAIN stays mainly in the plain.';
  pattern = 'ain';
  flags = 'gi';

  get regex() {
      try {
          return new RegExp(this.pattern, this.flags);
      } catch (e) {
          return null;
      }
  }

  get hasMatch() {
      if (!this.regex) return false;
      return this.regex.test(this.text);
  }

  get highlightedText() {
      const regex = this.regex;
      if (!this.pattern || !regex) return this.text;
      try {
          return this.text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      } catch (e) {
          return this.text;
      }
  }
}
