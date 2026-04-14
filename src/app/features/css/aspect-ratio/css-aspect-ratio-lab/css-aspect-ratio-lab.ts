import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-aspect-ratio-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="aspect-ratio" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">21. Aspect Ratio & Object-fit</h3>
        <p class="article-body">
            The <code>aspect-ratio</code> property simplifies defining box dimensions, and <code>object-fit</code> controls how content fills that space.
        </p>
      </div>

      <!-- 1. aspect-ratio Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">aspect-ratio: dynamic;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Ratio Type</label>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        @for (ratio of ratios; track ratio) {
                            <button (click)="currentRatio.set(ratio)" 
                                    [class]="getBtnClass(currentRatio(), ratio)"
                                    class="py-2 px-1 rounded border text-[10px] font-black tracking-widest transition">
                                {{ ratio }}
                            </button>
                        }
                    </div>
                </div>

                <div class="bg-blue-50 p-4 rounded border border-blue-100 text-[10px] font-mono leading-relaxed text-blue-800">
                    <span class="text-blue-900">.container</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-600">width</span>: 100%;<br>
                    &nbsp;&nbsp;<span class="text-blue-600">aspect-ratio</span>: {{ currentRatio() }};<br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-100 p-8 rounded-xl border border-slate-200 flex items-center justify-center min-h-[400px]">
                <div class="w-full bg-slate-800 shadow-2xl transition-all duration-500 rounded-lg overflow-hidden border-2 border-slate-400 relative"
                     [style.aspectRatio]="currentRatio()">
                    <div class="absolute inset-0 flex items-center justify-center">
                         <span class="text-white font-black text-2xl drop-shadow-md">{{ currentRatio() }}</span>
                    </div>
                    <img src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Sample" 
                         class="w-full h-full object-cover opacity-60">
                </div>
            </div>
        </div>
      </div>

      <!-- 2. object-fit Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">object-fit: visual-fit;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-6">
                 <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Fit Mode</label>
                    <div class="grid grid-cols-3 gap-3">
                        @for (mode of fitModes; track mode) {
                            <button (click)="currentFit.set(mode)" 
                                    [class]="getBtnClass(currentFit(), mode)"
                                    class="py-2 px-4 rounded border text-sm font-bold transition">
                                {{ mode }}
                            </button>
                        }
                    </div>
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 leading-relaxed">
                    <span class="text-blue-400">img</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">width</span>: 100%; <span class="text-cyan-400">height</span>: 100%;<br>
                    &nbsp;&nbsp;<span class="text-emerald-400 font-bold">object-fit: {{ currentFit() }};</span><br>
                    &#125;
                </div>
            </div>

            <div class="bg-slate-200 p-8 rounded-xl border border-slate-300 flex items-center justify-center h-[400px]">
                <!-- Fixed size container to show fit issues -->
                <div class="w-64 h-80 bg-white border-4 border-slate-800 rounded-lg overflow-hidden shadow-2xl relative">
                    <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                         alt="Sample"
                         class="w-full h-full transition-all duration-300"
                         [style.objectFit]="currentFit()">
                    
                    <div class="absolute top-2 right-2 bg-black/50 text-white text-[8px] px-2 py-1 rounded font-bold">
                        CONTAINER: 16rem x 20rem
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssAspectRatioLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  ratios = ['1 / 1', '4 / 3', '16 / 9', '21 / 9', '9 / 16'];
  currentRatio = signal('16 / 9');

  fitModes = ['fill', 'contain', 'cover', 'none', 'scale-down'];
  currentFit = signal('cover');

  getBtnClass(active: string, current: string) {
      return active === current 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-100' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
