import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-colors-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="colors" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">3. Colors & Backgrounds</h3>
        <p class="article-body">
            Understanding color formats (HEX, RGB, HSL) and background properties effectively.
        </p>
      </div>

      <!-- 1. Color Formats -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Color Formats Playground</h4>
        <p class="text-slate-500 mb-6">Experiment with RGB and HSL values to see how they affect the color.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <!-- Controls -->
            <div class="space-y-6">
                <!-- RGB Controls -->
                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 class="font-bold text-slate-700 mb-3 flex justify-between">
                        <span>RGB</span>
                        <span class="font-mono text-xs text-slate-500">rgb({{ r() }}, {{ g() }}, {{ b() }})</span>
                    </h5>
                    <div class="space-y-2">
                        <div>
                            <div class="flex justify-between text-xs font-bold text-red-500 mb-1">Red: {{ r() }}</div>
                            <input type="range" min="0" max="255" [value]="r()" (input)="r.set($any($event.target).value)" class="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer accent-red-500">
                        </div>
                        <div>
                            <div class="flex justify-between text-xs font-bold text-green-500 mb-1">Green: {{ g() }}</div>
                            <input type="range" min="0" max="255" [value]="g()" (input)="g.set($any($event.target).value)" class="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-500">
                        </div>
                        <div>
                            <div class="flex justify-between text-xs font-bold text-blue-500 mb-1">Blue: {{ b() }}</div>
                            <input type="range" min="0" max="255" [value]="b()" (input)="b.set($any($event.target).value)" class="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500">
                        </div>
                    </div>
                </div>

                <!-- HSL Controls -->
                 <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 class="font-bold text-slate-700 mb-3 flex justify-between">
                        <span>HSL</span>
                        <span class="font-mono text-xs text-slate-500">hsl({{ h() }}, {{ s() }}%, {{ l() }}%)</span>
                    </h5>
                    <div class="space-y-2">
                        <div>
                            <div class="flex justify-between text-xs font-bold text-purple-500 mb-1">Hue: {{ h() }}°</div>
                            <input type="range" min="0" max="360" [value]="h()" (input)="h.set($any($event.target).value)" class="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer">
                        </div>
                        <div>
                            <div class="flex justify-between text-xs font-bold text-slate-500 mb-1">Saturation: {{ s() }}%</div>
                            <input type="range" min="0" max="100" [value]="s()" (input)="s.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                        <div>
                            <div class="flex justify-between text-xs font-bold text-slate-500 mb-1">Lightness: {{ l() }}%</div>
                            <input type="range" min="0" max="100" [value]="l()" (input)="l.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Preview -->
            <div class="h-full min-h-[300px] rounded-xl shadow-lg border-2 border-slate-200 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-200"
                 [style.backgroundColor]="activeMode() === 'rgb' ? rgbString() : hslString()">
                
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm cursor-pointer hover:bg-white" (click)="toggleMode()">
                    Mode: {{ activeMode().toUpperCase() }} 🔄
                </div>

                <div class="bg-white p-6 rounded-xl shadow-xl text-center max-w-xs mx-auto">
                    <div class="w-20 h-20 rounded-full mx-auto mb-4 shadow-inner border border-slate-100"
                         [style.backgroundColor]="activeMode() === 'rgb' ? rgbString() : hslString()"></div>
                    
                    <h3 class="text-2xl font-bold text-slate-800 mb-1" [style.color]="activeMode() === 'rgb' ? rgbString() : hslString()">Sample Text</h3>
                    <p class="text-slate-500 text-sm mb-4">This is how your color looks on a white background.</p>
                    
                    <div class="bg-slate-100 p-2 rounded font-mono text-xs text-slate-600 select-all cursor-text">
                        {{ activeMode() === 'rgb' ? rgbString() : hslString() }}
                    </div>
                </div>

                <!-- Contrast Check (Simplified) -->
                <div class="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
                    <span class="text-lg font-bold mix-blend-difference text-white">White Text</span>
                    <span class="text-lg font-bold mix-blend-difference text-black">Black Text</span>
                </div>
            </div>
        </div>
      </div>

      <!-- 2. Background Properties -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Background Controls</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div class="space-y-4">
                 <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Size</label>
                     <select [value]="bgSize()" (change)="bgSize.set($any($event.target).value)" class="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 outline-none">
                         <option value="auto">auto</option>
                         <option value="cover">cover</option>
                         <option value="contain">contain</option>
                         <option value="50%">50%</option>
                     </select>
                 </div>

                 <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Repeat</label>
                     <select [value]="bgRepeat()" (change)="bgRepeat.set($any($event.target).value)" class="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 outline-none">
                         <option value="no-repeat">no-repeat</option>
                         <option value="repeat">repeat</option>
                         <option value="repeat-x">repeat-x</option>
                         <option value="repeat-y">repeat-y</option>
                     </select>
                 </div>
                 
                 <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Position</label>
                     <select [value]="bgPosition()" (change)="bgPosition.set($any($event.target).value)" class="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 outline-none">
                         <option value="center">center</option>
                         <option value="top">top</option>
                         <option value="bottom">bottom</option>
                         <option value="left">left</option>
                         <option value="right">right</option>
                         <option value="top left">top left</option>
                     </select>
                 </div>
             </div>

             <div class="h-64 bg-slate-200 rounded-lg border-2 border-slate-300 relative overflow-hidden"
                  [style.backgroundImage]="'url(https://img.icons8.com/color/96/css3.png)'"
                  [style.backgroundSize]="bgSize()"
                  [style.backgroundRepeat]="bgRepeat()"
                  [style.backgroundPosition]="bgPosition()">
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div class="bg-white/80 p-2 rounded text-xs font-mono text-slate-600 border border-slate-200 shadow-sm backdrop-blur-sm">
                          background-image: url('css-logo.png');
                      </div>
                  </div>
             </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssColorsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  // RGB
  r = signal(100);
  g = signal(149);
  b = signal(237);

  // HSL
  h = signal(218);
  s = signal(78);
  l = signal(66);

  activeMode = signal<'rgb' | 'hsl'>('rgb');

  rgbString = computed(() => `rgb(${this.r()}, ${this.g()}, ${this.b()})`);
  hslString = computed(() => `hsl(${this.h()}, ${this.s()}%, ${this.l()}%)`);

  toggleMode() {
      this.activeMode.update(m => m === 'rgb' ? 'hsl' : 'rgb');
  }

  // Background
  bgSize = signal('auto');
  bgRepeat = signal('no-repeat');
  bgPosition = signal('center');
}
