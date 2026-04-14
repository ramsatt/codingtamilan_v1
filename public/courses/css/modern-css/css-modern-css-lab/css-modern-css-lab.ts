import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-modern-css-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="modern-css" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">32. Modern CSS Features</h3>
        <p class="article-body">
            Exploring the latest features in CSS: Container Queries, the <code>:has()</code> selector, and Feature Queries.
        </p>
      </div>

      <!-- 1. Container Queries -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">&#64;container: responsive-components;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6">
                <div class="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h5 class="text-sm font-bold text-blue-800 mb-2">Independent Components</h5>
                    <p class="text-xs text-blue-700 leading-relaxed mb-4">
                        Unlike Media Queries which look at the <strong>viewport</strong>, Container Queries look at the <strong>parent's width</strong>. 
                        Resize the container below to see the card adapt.
                    </p>
                    
                    <input type="range" min="200" max="600" [value]="containerWidth()" (input)="containerWidth.set($any($event.target).value)" 
                           class="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600">
                    <div class="text-center text-[10px] font-black text-blue-400 mt-2 uppercase">Container Width: {{ containerWidth() }}px</div>
                </div>

                <div class="bg-slate-900 rounded-xl p-5 font-mono text-[10px] text-slate-300 shadow-2xl leading-relaxed">
                    <span class="text-purple-400">.parent</span> &#123; <span class="text-blue-400">container-type</span>: inline-size; &#125;<br><br>
                    <span class="text-yellow-400">&#64;container</span> (min-width: <span class="text-pink-400">400px</span>) &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">.card</span> &#123; <span class="text-emerald-400">flex-direction</span>: row; &#125;<br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-100 p-8 rounded-3xl border border-slate-200 flex flex-col items-center justify-center min-h-[400px]">
                <!-- The Container -->
                <div class="bg-white border-4 border-dashed border-slate-300 rounded-2xl p-4 transition-all duration-300 overflow-hidden"
                     [style.width.px]="containerWidth()" [style.containerType]="'inline-size'">
                    
                    <!-- The Responding Component -->
                    <div class="flex gap-4 p-4 rounded-xl border-2 transition-all duration-500"
                         [class.flex-col]="containerWidth() < 400"
                         [class.items-center]="containerWidth() < 400"
                         [class.bg-blue-50]="containerWidth() >= 400"
                         [class.border-blue-200]="containerWidth() >= 400">
                        
                        <div class="w-20 h-20 bg-blue-500 rounded-lg shrink-0 flex items-center justify-center text-white font-black shadow-lg">IMG</div>
                        
                        <div class="flex-1 text-center" [class.md:text-left]="containerWidth() >= 400" [class.text-left]="containerWidth() >= 400">
                             <h4 class="font-bold text-slate-800">Adaptive Card</h4>
                             <p class="text-[10px] text-slate-500 mt-1">I change my layout based on my container, not the screen!</p>
                             <button class="mt-3 px-4 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-lg hover:bg-slate-700 transition">View Details</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>

      <!-- 2. :has() Selector -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">:has(): the parent selector;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-6">
                <p class="text-sm text-slate-600 leading-relaxed">
                    The <code>:has()</code> selector allows you to style an element based on its children or following elements. 
                    It's often called the "parent selector".
                </p>

                <div class="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                    <label class="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" [checked]="showBadge()" (change)="showBadge.set(!showBadge())" class="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500">
                        <span class="font-bold text-emerald-800 text-sm">Add 'New' Badge to child</span>
                    </label>
                </div>

                <div class="bg-slate-900 rounded-xl p-5 font-mono text-[10px] text-slate-300 shadow-2xl leading-relaxed">
                    <span class="text-emerald-400">/* Style the CARD if it contains a BADGE */</span><br>
                    <span class="text-yellow-400">.card:has(.badge)</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">border-color</span>: #10b981;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">background-color</span>: #f0fdf4;<br>
                    &#125;
                </div>
            </div>

            <div class="bg-slate-100 p-8 rounded-3xl border border-slate-200 flex items-center justify-center">
                 <div class="w-64 p-6 rounded-2xl border-4 transition-all duration-500 bg-white"
                      [class.border-emerald-500]="showBadge()"
                      [class.bg-emerald-50]="showBadge()"
                      [class.border-slate-200]="!showBadge()"
                      [style.transform]="showBadge() ? 'scale(1.05)' : 'scale(1)'">
                    
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                        <span *ngIf="showBadge()" class="badge px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded uppercase tracking-tighter animate-bounce">New</span>
                    </div>
                    
                    <h5 class="font-bold text-slate-800">Product Card</h5>
                    <p class="text-[10px] text-slate-500 mt-2">The parent card's border turns green only when the badge exists inside it.</p>
                 </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssModernCssLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  containerWidth = signal(500);
  showBadge = signal(false);
}
