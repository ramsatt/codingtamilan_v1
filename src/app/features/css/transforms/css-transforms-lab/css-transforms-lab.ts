import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-transforms-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="transforms" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">20. CSS Transforms</h3>
        <p class="article-body">
            The <code>transform</code> property applies 2D or 3D transformations to an element (rotate, scale, skew, translate).
        </p>
      </div>

      <!-- 1. Transformation Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">transform: modify-reality;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Rotate -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Rotate: {{ rotate() }}deg</label>
                        <input type="range" min="0" max="360" [value]="rotate()" (input)="rotate.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <!-- Scale -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Scale: {{ scale() }}</label>
                        <input type="range" min="0.5" max="2" step="0.1" [value]="scale()" (input)="scale.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <!-- Skew X -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Skew X: {{ skewX() }}deg</label>
                        <input type="range" min="-45" max="45" [value]="skewX()" (input)="skewX.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <!-- Skew Y -->
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Skew Y: {{ skewY() }}deg</label>
                        <input type="range" min="-45" max="45" [value]="skewY()" (input)="skewY.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-200">
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Translate (X, Y)</label>
                     <div class="flex gap-4">
                        <div class="flex-1">
                             <input type="range" min="-50" max="50" [value]="translateX()" (input)="translateX.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                             <div class="text-center text-[10px] mt-1 text-slate-300">X: {{ translateX() }}px</div>
                        </div>
                        <div class="flex-1">
                             <input type="range" min="-50" max="50" [value]="translateY()" (input)="translateY.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                             <div class="text-center text-[10px] mt-1 text-slate-300">Y: {{ translateY() }}px</div>
                        </div>
                     </div>
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300 leading-relaxed shadow-xl">
                    <span class="text-cyan-400">transform</span>: <br>
                    &nbsp;&nbsp;<span class="text-emerald-400">rotate</span>(<span class="text-pink-400">{{ rotate() }}deg</span>) <br>
                    &nbsp;&nbsp;<span class="text-emerald-400">scale</span>(<span class="text-pink-400">{{ scale() }}</span>) <br>
                    &nbsp;&nbsp;<span class="text-emerald-400">skew</span>(<span class="text-pink-400">{{ skewX() }}deg, {{ skewY() }}deg</span>) <br>
                    &nbsp;&nbsp;<span class="text-emerald-400">translate</span>(<span class="text-pink-400">{{ translateX() }}px, {{ translateY() }}px</span>);
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-800 rounded-2xl flex items-center justify-center p-12 min-h-[400px] border-4 border-slate-900 shadow-2xl relative overflow-hidden">
                <!-- Guide Lines -->
                <div class="absolute inset-x-0 h-px bg-slate-700/50 top-1/2"></div>
                <div class="absolute inset-y-0 w-px bg-slate-700/50 left-1/2"></div>

                <div class="w-40 h-40 bg-gradient-to-br from-purple-500 to-blue-600 rounded shadow-2xl transition-all duration-300 flex items-center justify-center text-white border-4 border-white/20 ring-4 ring-black/20"
                     [style.transform]="transformString()">
                    <div class="text-center">
                        <div class="text-2xl font-black">TRANSFORM</div>
                        <div class="text-[10px] opacity-70 mt-1 uppercase tracking-widest font-bold">2D SPACE</div>
                    </div>
                </div>
                
                <div class="absolute top-4 left-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Target Preview</div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssTransformsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  rotate = signal(0);
  scale = signal(1);
  skewX = signal(0);
  skewY = signal(0);
  translateX = signal(0);
  translateY = signal(0);

  transformString = computed(() => {
    return `rotate(${this.rotate()}deg) scale(${this.scale()}) skew(${this.skewX()}deg, ${this.skewY()}deg) translate(${this.translateX()}px, ${this.translateY()}px)`;
  });
}
