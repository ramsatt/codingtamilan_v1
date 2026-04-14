import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-logical-properties-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="logical-properties" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">31. Logical Properties & Writing Modes</h3>
        <p class="article-body">
            Logical properties (like <code>margin-inline</code>) adapt based on the <code>writing-mode</code>, unlike physical properties (<code>margin-left</code>).
        </p>
      </div>

      <!-- 1. Logical vs Physical Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">writing-mode: global-design;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Writing Mode (Direction)</label>
                    <div class="grid grid-cols-1 gap-2">
                        <button *ngFor="let mode of modes" 
                                (click)="currentMode.set(mode.id)" 
                                [class]="getBtnClass(currentMode(), mode.id)"
                                class="py-2 px-4 rounded border text-sm font-bold transition text-left flex justify-between">
                            <span>{{ mode.label }}</span>
                            <span class="text-[10px] opacity-60 font-mono">{{ mode.id }}</span>
                        </button>
                    </div>
                </div>

                <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                     <p class="text-xs text-blue-800 mb-4">Observe how <code>margin-inline-start</code> (Emerald) moves compared to <code>margin-left</code> (Blue) when writing mode changes.</p>
                     
                     <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300 leading-relaxed shadow-xl">
                        <span class="text-yellow-400">.container</span> &#123; <span class="text-blue-400">writing-mode</span>: {{ currentMode() }}; &#125;<br>
                        <span class="text-yellow-400">.box</span> &#123;<br>
                        &nbsp;&nbsp;<span class="text-emerald-400 font-bold">margin-inline-start: 40px;</span><br>
                        &nbsp;&nbsp;<span class="text-blue-400">margin-left: 40px;</span><br>
                        &#125;
                     </div>
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-100 p-8 rounded-3xl border border-slate-200 flex items-center justify-center min-h-[400px]">
                <div class="border-2 border-slate-300 p-4 bg-white shadow-sm transition-all duration-500"
                     [style.writingMode]="currentMode()">
                    
                    <div class="text-xs font-black text-slate-300 mb-4 uppercase tracking-tighter">Text flow samples</div>
                    
                    <div class="flex flex-col gap-4">
                        <!-- Label start -->
                        <div class="flex items-center gap-2">
                             <div class="w-2 h-10 bg-emerald-500 rounded-full" style="margin-inline-start: 40px;"></div>
                             <span class="text-[10px] font-bold text-emerald-600">Logical Start</span>
                        </div>

                        <!-- Physical Left -->
                        <div class="flex items-center gap-2">
                             <div class="w-2 h-10 bg-blue-500 rounded-full" style="margin-left: 40px;"></div>
                             <span class="text-[10px] font-bold text-blue-600">Physical Left</span>
                        </div>
                    </div>

                    <p class="mt-8 text-sm text-slate-600 border-t pt-4">
                        Japanese (vertical-rl): 日本語の縦書きテストです。<br>
                        Arabic (rtl): هذا نص تجريبي باللغة العربية.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssLogicalPropertiesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  modes = [
    { id: 'horizontal-tb', label: 'Default (LTR)' },
    { id: 'vertical-rl', label: 'Vertical (Right to Left)' },
    { id: 'vertical-lr', label: 'Vertical (Left to Right)' }
  ];

  currentMode = signal('horizontal-tb');

  getBtnClass(active: string, current: string) {
      return active === current 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
