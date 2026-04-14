import { Component, signal, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-media-queries-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="media-queries" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">15. Media Queries</h3>
        <p class="article-body">
            Media queries are a key part of responsive design. They allow you to apply different styles for different devices/screen sizes.
        </p>
      </div>

      <!-- 1. Media Query Simulator -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6">Device Simulator</h4>
        
        <div class="space-y-8">
            <!-- Breakpoint Indicators -->
            <div class="flex items-center justify-between bg-slate-100 p-4 rounded-xl relative overflow-hidden">
                <div class="absolute inset-y-0 left-0 bg-blue-500/10 transition-all duration-500" [style.width.px]="simulatedWidth()"></div>
                
                <div class="z-10 flex gap-4 text-xs font-bold font-mono">
                    <span [class.text-blue-600]="simulatedWidth() < 640">MOBILE (< 640px)</span>
                    <span [class.text-blue-600]="simulatedWidth() >= 640 && simulatedWidth() < 1024">TABLET (>= 640px)</span>
                    <span [class.text-blue-600]="simulatedWidth() >= 1024">DESKTOP (>= 1024px)</span>
                </div>
                
                <div class="z-10 text-sm font-bold text-slate-600">Simulated Width: {{ simulatedWidth() }}px</div>
            </div>

            <!-- Simulator Area -->
            <div class="flex flex-col items-center gap-6">
                <!-- Slider -->
                <input type="range" min="300" max="1200" [value]="simulatedWidth()" (input)="simulatedWidth.set($any($event.target).value)" 
                       class="w-full max-w-2xl h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600">

                <!-- The Responsive Header -->
                <div class="border-4 border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 bg-white"
                     [style.width.px]="simulatedWidth()">
                    
                    <!-- Simulating @media screen and (min-width: ...) -->
                    <div class="p-8 text-center transition-all duration-500"
                         [style.backgroundColor]="simulatedWidth() < 640 ? '#fee2e2' : (simulatedWidth() < 1024 ? '#dcfce7' : '#dbeafe')">
                        
                        <h2 class="text-3xl font-black mb-2 transition-all"
                            [style.fontSize.rem]="simulatedWidth() < 640 ? 1.5 : (simulatedWidth() < 1024 ? 2.5 : 4)">
                            {{ simulatedWidth() < 640 ? 'MOBILE VIEW' : (simulatedWidth() < 1024 ? 'TABLET VIEW' : 'DESKTOP VIEW') }}
                        </h2>
                        
                        <div class="flex flex-wrap justify-center gap-4 mt-6">
                            <div class="h-10 w-24 bg-slate-800/10 rounded-full animate-pulse"></div>
                            <div class="h-10 w-24 bg-slate-800/10 rounded-full animate-pulse" *ngIf="simulatedWidth() >= 640"></div>
                            <div class="h-10 w-24 bg-slate-800/10 rounded-full animate-pulse" *ngIf="simulatedWidth() >= 1024"></div>
                        </div>
                    </div>

                    <!-- Layout Simulation -->
                    <div class="p-8 grid gap-4"
                         [style.gridTemplateColumns]="simulatedWidth() < 640 ? '1fr' : (simulatedWidth() < 1024 ? '1fr 1fr' : 'repeat(3, 1fr)')">
                         <div class="h-32 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-300">Card 1</div>
                         <div class="h-32 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-300">Card 2</div>
                         <div class="h-32 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-300">Card 3</div>
                    </div>
                </div>
            </div>

            <!-- Code -->
            <div class="max-w-3xl mx-auto bg-slate-900 rounded-xl p-6 font-mono text-xs text-slate-300 leading-relaxed shadow-xl">
                <div class="mb-4 text-emerald-400">/* Standard CSS Media Queries */</div>
                
                <div [class.bg-blue-500/20]="simulatedWidth() < 640" class="p-1 rounded transition-colors">
                    <span class="text-yellow-400">&#64;media</span> (max-width: <span class="text-pink-400">639px</span>) &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">h2</span> &#123; <span class="text-cyan-400">font-size</span>: 1.5rem; &#125;<br>
                    &#125;
                </div>
                
                <div [class.bg-blue-500/20]="simulatedWidth() >= 640 && simulatedWidth() < 1024" class="p-1 rounded transition-colors mt-2">
                    <span class="text-yellow-400">&#64;media</span> (min-width: <span class="text-pink-400">640px</span>) &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">h2</span> &#123; <span class="text-cyan-400">font-size</span>: 2.5rem; &#125;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">.grid</span> &#123; <span class="text-cyan-400">grid-template-columns</span>: 1fr 1fr; &#125;<br>
                    &#125;
                </div>

                <div [class.bg-blue-500/20]="simulatedWidth() >= 1024" class="p-1 rounded transition-colors mt-2">
                    <span class="text-yellow-400">&#64;media</span> (min-width: <span class="text-pink-400">1024px</span>) &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">h2</span> &#123; <span class="text-cyan-400">font-size</span>: 4rem; &#125;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">.grid</span> &#123; <span class="text-cyan-400">grid-template-columns</span>: 1fr 1fr 1fr; &#125;<br>
                    &#125;
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssMediaQueriesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  simulatedWidth = signal(800);
}
