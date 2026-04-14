import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-z-index-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="z-index" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">19. Z-index & Stacking Context</h3>
        <p class="article-body">
            The <code>z-index</code> property specifies the stack order of an element (which element should be placed in front of, or behind, the others).
        </p>
      </div>

      <!-- 1. Stacking Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">z-index: layer-up;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div class="space-y-6">
                    <!-- Box 1 -->
                    <div class="bg-blue-100 p-4 rounded border border-blue-200">
                        <label class="block text-xs font-bold text-blue-800 uppercase mb-2 flex justify-between">
                            <span>Box 1 (Blue)</span>
                            <span class="font-mono">z-index: {{ z1() }}</span>
                        </label>
                        <input type="range" min="0" max="10" [value]="z1()" (input)="z1.set($any($event.target).value)" class="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600">
                    </div>

                    <!-- Box 2 -->
                    <div class="bg-red-100 p-4 rounded border border-red-200">
                        <label class="block text-xs font-bold text-red-800 uppercase mb-2 flex justify-between">
                            <span>Box 2 (Red)</span>
                            <span class="font-mono">z-index: {{ z2() }}</span>
                        </label>
                        <input type="range" min="0" max="10" [value]="z2()" (input)="z2.set($any($event.target).value)" class="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-600">
                    </div>

                    <!-- Box 3 -->
                    <div class="bg-emerald-100 p-4 rounded border border-emerald-200">
                        <label class="block text-xs font-bold text-emerald-800 uppercase mb-2 flex justify-between">
                            <span>Box 3 (Green)</span>
                            <span class="font-mono">z-index: {{ z3() }}</span>
                        </label>
                        <input type="range" min="0" max="10" [value]="z3()" (input)="z3.set($any($event.target).value)" class="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600">
                    </div>
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-500 leading-relaxed shadow-xl">
                    <span class="text-emerald-400">/* Note: z-index only works on positioned elements */</span><br><br>
                    <span class="text-yellow-400">.box</span> &#123; <span class="text-blue-400">position</span>: relative; &#125;<br><br>
                    <span class="text-blue-400">.blue</span> &#123; <span class="text-cyan-400">z-index</span>: {{ z1() }}; &#125;<br>
                    <span class="text-red-400">.red</span> &#123; <span class="text-cyan-400">z-index</span>: {{ z2() }}; &#125;<br>
                    <span class="text-emerald-400">.green</span> &#123; <span class="text-cyan-400">z-index</span>: {{ z3() }}; &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-200 rounded-2xl relative min-h-[500px] border-4 border-white shadow-inner overflow-hidden flex items-center justify-center">
                <!-- Stack Representation -->
                <div class="relative w-80 h-80">
                    <!-- Blue -->
                    <div class="absolute w-40 h-40 bg-blue-500/90 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white/50 transition-all duration-300"
                         style="top: 0; left: 0;"
                         [style.zIndex]="z1()">
                         1
                    </div>
                    <!-- Red -->
                    <div class="absolute w-40 h-40 bg-red-500/90 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white/50 transition-all duration-300"
                         style="top: 80px; left: 80px;"
                         [style.zIndex]="z2()">
                         2
                    </div>
                    <!-- Green -->
                    <div class="absolute w-40 h-40 bg-emerald-500/90 rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white/50 transition-all duration-300"
                         style="top: 160px; left: 160px;"
                         [style.zIndex]="z3()">
                         3
                    </div>
                </div>

                <div class="absolute bottom-4 left-4 bg-white/50 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold text-slate-500 border border-white/50">
                    3D VIEW (SIMULATED BY ELEVATION)
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssZIndexLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  z1 = signal(1);
  z2 = signal(2);
  z3 = signal(3);
}
