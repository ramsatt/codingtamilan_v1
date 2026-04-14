import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-blend-modes-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="blend-modes" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">29. Blend Modes</h3>
        <p class="article-body">
            The <code>mix-blend-mode</code> and <code>background-blend-mode</code> properties define how an element's content should blend with its background.
        </p>
      </div>

      <!-- 1. mix-blend-mode Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">mix-blend-mode: text-overlay;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6">
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-4 text-center">Select Blend Mode</label>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                        @for (mode of blendModes; track mode) {
                            <button (click)="currentMode.set(mode)" 
                                    [class]="getBtnClass(currentMode(), mode)"
                                    class="py-2 px-1 rounded border text-[10px] font-bold transition">
                                {{ mode }}
                            </button>
                        }
                    </div>
                </div>

                <div class="bg-slate-900 rounded-xl p-5 font-mono text-[11px] text-slate-300 shadow-2xl leading-relaxed">
                    <span class="text-cyan-400">h1</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-emerald-400 font-bold">mix-blend-mode: {{ currentMode() }};</span><br>
                    &#125;
                </div>

                <div class="p-4 bg-orange-50 border border-orange-100 rounded-xl text-[10px] text-orange-700 leading-relaxed italic">
                    Tip: Try "difference" or "exclusion" labels on top of vibrant images for high-contrast effects.
                </div>
            </div>

            <!-- Visualization -->
            <div class="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-900 flex items-center justify-center group">
                <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                     alt="Vibrant Abstract"
                     class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]">
                
                <h1 class="relative font-black text-8xl md:text-9xl text-white select-none transition-all duration-300 pointer-events-none"
                    [style.mixBlendMode]="currentMode()">
                    ART
                </h1>
                
                <div class="absolute inset-0 border-4 border-white/10 rounded-2xl pointer-events-none"></div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssBlendModesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  blendModes = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 
    'color-dodge', 'color-burn', 'hard-light', 'soft-light', 
    'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
  ];

  currentMode = signal('difference');

  getBtnClass(active: string, current: string) {
      return active === current 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
