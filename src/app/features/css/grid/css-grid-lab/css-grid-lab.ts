import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-grid-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="grid" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">7. CSS Grid</h3>
        <p class="article-body">
            CSS Grid Layout is a two-dimensional layout system for the web. It lets you layout items in rows and columns.
        </p>
      </div>

      <!-- 1. Grid Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Grid Generator</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-200 h-fit">
                 <!-- Templates -->
                <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-2">grid-template-columns</label>
                     <div class="flex gap-2 mb-2">
                        <input type="text" [value]="gridTemplateColumns()" (input)="gridTemplateColumns.set($any($event.target).value)" 
                               placeholder="e.g. 1fr 1fr 1fr" 
                               class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 outline-none">
                     </div>
                     <p class="text-[10px] text-slate-300">Try: <code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="gridTemplateColumns.set('1fr 1fr 1fr')">1fr 1fr 1fr</code>, <code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="gridTemplateColumns.set('repeat(3, 100px)')">repeat(3, 100px)</code>, <code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="gridTemplateColumns.set('200px 1fr')">200px 1fr</code></p>
                </div>

                <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-2">grid-template-rows</label>
                     <div class="flex gap-2 mb-2">
                        <input type="text" [value]="gridTemplateRows()" (input)="gridTemplateRows.set($any($event.target).value)" 
                               placeholder="e.g. 100px 100px" 
                               class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 outline-none">
                     </div>
                      <p class="text-[10px] text-slate-300">Try: <code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="gridTemplateRows.set('100px 100px')">100px 100px</code>, <code class="bg-slate-100 px-1 rounded cursor-pointer hover:bg-slate-200" (click)="gridTemplateRows.set('auto auto')">auto auto</code></p>
                </div>

                <!-- Gap -->
                 <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">gap: {{ gap() }}px</label>
                    <input type="range" min="0" max="50" [value]="gap()" (input)="gap.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>

                 <!-- Item Count -->
                 <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Items: {{ itemCount() }}</label>
                    <input type="range" min="1" max="20" [value]="itemCount()" (input)="itemCount.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-3">
                 <div class="bg-slate-800 rounded-xl shadow-inner border border-slate-700 relative p-4 transition-all duration-300 min-h-[400px]"
                      [style.display]="'grid'"
                      [style.gridTemplateColumns]="gridTemplateColumns()"
                      [style.gridTemplateRows]="gridTemplateRows()"
                      [style.gap.px]="gap()">
                    
                     @for (item of items(); track item) {
                        <div class="bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center justify-center text-emerald-400 font-bold text-2xl animate-popIn p-4 min-h-[50px]">
                            {{ item }}
                        </div>
                     }

                </div>
                 <div class="mt-4 p-4 bg-slate-100 rounded border border-slate-200 font-mono text-sm text-slate-700">
                    <span class="text-purple-600">.container</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-600">display</span>: grid;<br>
                    &nbsp;&nbsp;<span class="text-blue-600">grid-template-columns</span>: {{ gridTemplateColumns() }};<br>
                    &nbsp;&nbsp;<span class="text-blue-600">grid-template-rows</span>: {{ gridTemplateRows() }};<br>
                    &nbsp;&nbsp;<span class="text-blue-600">gap</span>: {{ gap() }}px;<br>
                    &#125;
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssGridLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  gridTemplateColumns = signal('1fr 1fr 1fr');
  gridTemplateRows = signal('100px 100px');
  gap = signal(10);
  itemCount = signal(6);

  items = computed(() => Array.from({length: this.itemCount()}, (_, i) => i + 1));
}
