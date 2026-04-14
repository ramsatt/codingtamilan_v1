import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-flex-items-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="flex-items" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">24. Flexbox Items</h3>
        <p class="article-body">
            While basic flexbox controls the container, these properties control how individual items behave inside the flex container.
        </p>
      </div>

      <!-- 1. Flex Item Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">flex-item: behavior;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-200 h-fit">
                <div class="p-3 bg-blue-600 rounded-lg text-white mb-4">
                    <h5 class="text-xs font-bold uppercase tracking-widest text-blue-100 mb-1">Editing Item 2</h5>
                    <p class="text-[10px] opacity-80">Adjust properties to see how #2 competes for space with #1 and #3.</p>
                </div>

                <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Flex Grow: {{ grow() }}</label>
                    <input type="range" min="0" max="5" [value]="grow()" (input)="grow.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <p class="text-[9px] text-slate-300 mt-1">Defines the ability for an item to grow if necessary.</p>
                </div>

                <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Flex Shrink: {{ shrink() }}</label>
                    <input type="range" min="0" max="5" [value]="shrink()" (input)="shrink.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <p class="text-[9px] text-slate-300 mt-1">Defines the ability for an item to shrink if necessary.</p>
                </div>

                <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Align Self</label>
                    <select [value]="alignSelf()" (change)="alignSelf.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-xs font-mono">
                        <option value="auto">auto</option>
                        <option value="flex-start">flex-start</option>
                        <option value="flex-end">flex-end</option>
                        <option value="center">center</option>
                        <option value="baseline">baseline</option>
                        <option value="stretch">stretch</option>
                    </select>
                </div>

                <div class="bg-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-500 leading-relaxed shadow-xl">
                    <span class="text-yellow-400">.item-2</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400 font-bold">flex-grow: {{ grow() }};</span><br>
                    &nbsp;&nbsp;<span class="text-cyan-400 font-bold">flex-shrink: {{ shrink() }};</span><br>
                    &nbsp;&nbsp;<span class="text-cyan-400 font-bold">align-self: {{ alignSelf() }};</span><br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-3 flex flex-col gap-6">
                <!-- Flex Container -->
                <div class="h-64 bg-slate-800 rounded-2xl flex p-4 gap-4 items-stretch shadow-inner border border-slate-700 relative overflow-hidden">
                    <!-- Item 1 -->
                    <div class="flex-1 min-w-[50px] bg-slate-600 rounded-xl flex items-center justify-center text-slate-300 font-bold text-xl border-2 border-slate-500">1</div>
                    
                    <!-- Item 2 (The Target) -->
                    <div class="min-w-[50px] bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-2xl transition-all duration-300 relative group overflow-hidden"
                         [style.flexGrow]="grow()"
                         [style.flexShrink]="shrink()"
                         [style.alignSelf]="alignSelf()">
                         2
                         <div class="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>

                    <!-- Item 3 -->
                    <div class="flex-1 min-w-[50px] bg-slate-600 rounded-xl flex items-center justify-center text-slate-300 font-bold text-xl border-2 border-slate-500">3</div>
                </div>

                <!-- Guidance -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                         <div class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">!</div>
                         <p class="text-xs text-blue-700 leading-relaxed">
                            <strong>Flex Grow 0:</strong> Item takes minimum space required.<br>
                            <strong>Flex Grow 1+:</strong> Item tries to fill the remaining empty space.
                         </p>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-3">
                         <div class="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">?</div>
                         <p class="text-xs text-purple-700 leading-relaxed">
                            <strong>Align Self:</strong> Overrides the container's <code>align-items</code> property for this specific item.
                         </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssFlexItemsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  grow = signal(1);
  shrink = signal(1);
  alignSelf = signal('auto');
}
