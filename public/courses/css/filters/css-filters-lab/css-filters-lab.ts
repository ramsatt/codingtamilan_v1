import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-filters-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="filters" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">22. Filters & Effects</h3>
        <p class="article-body">
            The <code>filter</code> property defines visual effects (like blur and saturation) to an element (usually images).
        </p>
      </div>

      <!-- 1. Filter Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">filter: gallery-effects;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Blur: {{ blur() }}px</label>
                        <input type="range" min="0" max="20" [value]="blur()" (input)="blur.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Brightness: {{ brightness() }}%</label>
                        <input type="range" min="0" max="200" [value]="brightness()" (input)="brightness.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Contrast: {{ contrast() }}%</label>
                        <input type="range" min="0" max="200" [value]="contrast()" (input)="contrast.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Grayscale: {{ grayscale() }}%</label>
                        <input type="range" min="0" max="100" [value]="grayscale()" (input)="grayscale.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Hue Rotate: {{ hue() }}deg</label>
                        <input type="range" min="0" max="360" [value]="hue()" (input)="hue.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                     <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Sepia: {{ sepia() }}%</label>
                        <input type="range" min="0" max="100" [value]="sepia()" (input)="sepia.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                </div>

                <div class="md:col-span-2 pt-4 border-t border-slate-200 flex justify-end">
                    <button (click)="resetFilters()" class="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">Reset All ⟲</button>
                </div>
            </div>

            <!-- Visualization -->
            <div class="space-y-6">
                 <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video group">
                    <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                         alt="Landscape"
                         class="w-full h-full object-cover transition-all duration-300"
                         [style.filter]="filterString()">
                    
                    <div class="absolute inset-0 border-4 border-white/20 rounded-2xl pointer-events-none"></div>
                    
                    <div class="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-mono text-[10px] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        filter: {{ filterString() }}
                    </div>
                </div>

                <div class="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 shadow-inner overflow-x-auto whitespace-nowrap">
                    <span class="text-cyan-400">img</span> &#123; <span class="text-emerald-400">filter</span>: {{ filterString() }}; &#125;
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssFiltersLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  blur = signal(0);
  brightness = signal(100);
  contrast = signal(100);
  grayscale = signal(0);
  hue = signal(0);
  sepia = signal(0);

  filterString = computed(() => {
    let str = '';
    if (this.blur() > 0) str += `blur(${this.blur()}px) `;
    if (this.brightness() !== 100) str += `brightness(${this.brightness()}%) `;
    if (this.contrast() !== 100) str += `contrast(${this.contrast()}%) `;
    if (this.grayscale() > 0) str += `grayscale(${this.grayscale()}%) `;
    if (this.hue() > 0) str += `hue-rotate(${this.hue()}deg) `;
    if (this.sepia() > 0) str += `sepia(${this.sepia()}%) `;
    return str.trim() || 'none';
  });

  resetFilters() {
    this.blur.set(0);
    this.brightness.set(100);
    this.contrast.set(100);
    this.grayscale.set(0);
    this.hue.set(0);
    this.sepia.set(0);
  }
}
