import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-selectors-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="selectors" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">2. CSS Selectors</h3>
        <p class="article-body">
            Selectors are patterns used to select the element(s) you want to style.
        </p>
      </div>

      <!-- 1. Types of Selectors -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Common Selectors</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Element Selector -->
            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div class="font-mono font-bold text-blue-600 text-lg mb-2">p</div>
                <div class="text-xs font-bold uppercase text-slate-300 mb-2">Element Selector</div>
                <p class="text-sm text-slate-600">Selects all <code class="bg-slate-200 px-1 rounded">p</code> elements.</p>
            </div>

            <!-- Class Selector -->
            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div class="font-mono font-bold text-emerald-600 text-lg mb-2">.my-class</div>
                <div class="text-xs font-bold uppercase text-slate-300 mb-2">Class Selector</div>
                <p class="text-sm text-slate-600">Selects all elements with <code class="bg-slate-200 px-1 rounded">class="my-class"</code>.</p>
            </div>

            <!-- ID Selector -->
            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div class="font-mono font-bold text-purple-600 text-lg mb-2">#header</div>
                <div class="text-xs font-bold uppercase text-slate-300 mb-2">ID Selector</div>
                <p class="text-sm text-slate-600">Selects the single element with <code class="bg-slate-200 px-1 rounded">id="header"</code>.</p>
            </div>
        </div>
      </div>

      <!-- 2. Interactive Selector Game -->
      <div class="glass-panel rounded-xl p-6 shadow-lg bg-gradient-to-br from-slate-50 to-white border border-slate-200">
        <h4 class="text-xl font-bold text-slate-800 mb-2">Selector Target Practice</h4>
        <p class="text-slate-600 mb-6 text-sm">Type a selector to highlight the matching elements below.</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Controls -->
            <div class="lg:col-span-5 space-y-4">
                <div class="space-y-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Type a Selector</label>
                        <input type="text" [value]="userInput()" (input)="userInput.set($any($event.target).value)" 
                               placeholder="e.g. div, .highlight, #special"
                               class="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                    </div>
                    
                    <div class="text-xs text-slate-500">
                        <p class="mb-1">Try these:</p>
                        <ul class="list-disc pl-4 space-y-1">
                            <li><code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="userInput.set('div')">div</code></li>
                            <li><code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="userInput.set('.highlight')">.highlight</code></li>
                            <li><code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="userInput.set('#special')">#special</code></li>
                            <li><code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="userInput.set('span')">span</code></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Output/Preview -->
            <div class="lg:col-span-7">
                <div class="h-full bg-white rounded-lg p-8 shadow-inner border border-slate-200 relative">
                    <div class="absolute top-0 right-0 p-2 text-slate-300 font-bold text-xs uppercase tracking-widest">DOM Preview</div>
                    
                    <div class="border-2 border-dashed border-slate-200 p-4 rounded-lg flex flex-wrap gap-4 items-center justify-center min-h-[200px]">
                        
                        <!-- Element 1 -->
                        <div class="box w-20 h-20 bg-slate-100 rounded flex items-center justify-center border-2 border-slate-300 relative transition-all duration-300"
                             [class.ring-4]="checkMatch('div')"
                             [class.ring-blue-400]="checkMatch('div')"
                             [class.scale-110]="checkMatch('div')">
                             <span class="font-mono text-xs text-slate-500">div</span>
                        </div>

                        <!-- Element 2 -->
                        <div class="box w-20 h-20 bg-yellow-50 rounded flex items-center justify-center border-2 border-yellow-200 relative transition-all duration-300"
                             [class.ring-4]="checkMatch('div', ['highlight'])"
                             [class.ring-blue-400]="checkMatch('div', ['highlight'])"
                             [class.scale-110]="checkMatch('div', ['highlight'])">
                             <div class="text-center">
                                 <span class="font-mono text-xs text-slate-500 block">div</span>
                                 <span class="font-mono text-[10px] text-yellow-600 block">.highlight</span>
                             </div>
                        </div>

                         <!-- Element 3 -->
                        <div class="box w-20 h-20 bg-purple-50 rounded flex items-center justify-center border-2 border-purple-200 relative transition-all duration-300"
                             [class.ring-4]="checkMatch('div', [], 'special')"
                             [class.ring-blue-400]="checkMatch('div', [], 'special')"
                             [class.scale-110]="checkMatch('div', [], 'special')">
                             <div class="text-center">
                                 <span class="font-mono text-xs text-slate-500 block">div</span>
                                 <span class="font-mono text-[10px] text-purple-600 block">#special</span>
                             </div>
                        </div>

                         <!-- Element 4 -->
                        <div class="box w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-200 relative transition-all duration-300"
                             [class.ring-4]="checkMatch('span', ['highlight'])"
                             [class.ring-blue-400]="checkMatch('span', ['highlight'])"
                             [class.scale-110]="checkMatch('span', ['highlight'])">
                             <div class="text-center">
                                 <span class="font-mono text-xs text-slate-500 block">span</span>
                                 <span class="font-mono text-[10px] text-emerald-600 block">.highlight</span>
                             </div>
                        </div>

                    </div>
                    
                     <div class="mt-4 text-center text-sm text-slate-500" *ngIf="userInput()">
                        Matches: <span class="font-bold text-blue-600">{{ matchCount }}</span> elements
                    </div>

                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class SelectorsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  userInput = signal('');

  checkMatch(tag: string, classes: string[] = [], id: string = ''): boolean {
      const selector = this.userInput().trim();
      if (!selector) return false;

      // Element selector
      if (selector === tag) return true;

      // Class selector
      if (selector.startsWith('.')) {
          const className = selector.substring(1);
          return classes.includes(className);
      }

      // ID selector
      if (selector.startsWith('#')) {
          return selector.substring(1) === id;
      }

      // Grouping (comma) basic support (e.g. div, span)
      if (selector.includes(',')) {
          const parts = selector.split(',').map(s => s.trim());
          if (parts.includes(tag)) return true;
          if (classes.some(c => parts.includes('.' + c))) return true;
          if (id && parts.includes('#' + id)) return true;
      }

      // Composite (basic support)
      // e.g. div.highlight
      if (selector.includes('.') && !selector.startsWith('.')) {
           const [t, c] = selector.split('.');
           if (t === tag && classes.includes(c)) return true;
      }
      
      // e.g. div#special
      if (selector.includes('#') && !selector.startsWith('#')) {
           const [t, i] = selector.split('#');
           if (t === tag && i === id) return true;
      }

      return false;
  }

  get matchCount() {
    // This is just for display, accurate count would need to run checkMatch on all items
    let count = 0;
    if (this.checkMatch('div')) count++; // Box 1
    if (this.checkMatch('div', ['highlight'])) count++; // Box 2
    if (this.checkMatch('div', [], 'special')) count++; // Box 3
    if (this.checkMatch('span', ['highlight'])) count++; // Box 4
    return count;
  }
}
