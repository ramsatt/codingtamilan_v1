import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-shadows-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="shadows" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">14. Shadows (Box & Text)</h3>
        <p class="article-body">
            Shadows add depth and emphasis to elements and text.
        </p>
      </div>

      <!-- 1. Box Shadow Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6">Box Shadow Builder</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Offset X: {{ x() }}px</label>
                        <input type="range" min="-50" max="50" [value]="x()" (input)="x.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Offset Y: {{ y() }}px</label>
                        <input type="range" min="-50" max="50" [value]="y()" (input)="y.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Blur: {{ blur() }}px</label>
                        <input type="range" min="0" max="100" [value]="blur()" (input)="blur.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                     <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Spread: {{ spread() }}px</label>
                        <input type="range" min="-20" max="50" [value]="spread()" (input)="spread.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                </div>
                
                <div class="md:col-span-2 pt-4 border-t border-slate-200">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" [checked]="inset()" (change)="inset.set(!inset())" class="rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-sm font-bold text-slate-700">Inset Shadow</span>
                    </label>
                </div>
            </div>

            <!-- Visualization -->
            <div class="flex flex-col items-center justify-center space-y-8 bg-slate-100 p-8 rounded-xl border border-slate-200">
                <div class="w-48 h-48 bg-white rounded-2xl transition-all duration-300 flex items-center justify-center font-bold text-slate-300"
                     [style.boxShadow]="shadowString()">
                    BOX
                </div>
                
                <div class="w-full bg-slate-900 rounded-lg p-4 font-mono text-sm text-center shadow-inner">
                    <span class="text-cyan-400">box-shadow</span>: <span class="text-emerald-400">{{ shadowString() }}</span>;
                </div>
            </div>
        </div>
      </div>

       <!-- 2. Text Shadow -->
       <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6">Text Shadow Effects</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-blue-600 p-8 rounded-xl flex items-center justify-center">
                <h2 class="text-4xl font-black text-white" style="text-shadow: 2px 2px 0px rgba(0,0,0,0.5);">SOLID SHADOW</h2>
            </div>
            <div class="bg-slate-800 p-8 rounded-xl flex items-center justify-center">
                <h2 class="text-4xl font-black text-white" style="text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;">GLOW EFFECT</h2>
            </div>
            <div class="bg-pink-100 p-8 rounded-xl flex items-center justify-center">
                <h2 class="text-4xl font-black text-pink-500" style="text-shadow: 1px 1px white, 3px 3px rgba(0,0,0,0.1);">LAYERED</h2>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssShadowsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  x = signal(10);
  y = signal(10);
  blur = signal(20);
  spread = signal(0);
  inset = signal(false);

  shadowString = computed(() => {
    const mode = this.inset() ? 'inset ' : '';
    return `${mode}${this.x()}px ${this.y()}px ${this.blur()}px ${this.spread()}px rgba(0,0,0,0.2)`;
  });
}
