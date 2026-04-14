import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-shapes-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="shapes" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">26. Shapes & Clip-path</h3>
        <p class="article-body">
            The <code>clip-path</code> property allows you to mask an element into basic shapes (circle, ellipse, polygon) or complex SVG paths.
        </p>
      </div>

      <!-- 1. Clip-path Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">clip-path: shape-shifter;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6">
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-4">Select Shape Template</label>
                    <div class="grid grid-cols-2 gap-3">
                        @for (shape of shapeTemplates; track shape.id) {
                            <button (click)="currentShape.set(shape.id)" 
                                    [class]="getBtnClass(currentShape(), shape.id)"
                                    class="py-2.5 px-4 rounded border text-xs font-black uppercase tracking-wider transition">
                                {{ shape.id }}
                            </button>
                        }
                    </div>
                </div>

                <div class="bg-slate-900 rounded-xl p-5 font-mono text-xs text-slate-300 shadow-2xl overflow-x-auto whitespace-nowrap">
                    <span class="text-yellow-400">.clipped-element</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">clip-path</span>: <span class="text-emerald-400">{{ getClipPathValue() }}</span>;<br>
                    &#125;
                </div>
                
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 text-[10px] text-blue-700 leading-relaxed italic">
                    Note: clip-path creates a "clipping region" that sets which part of an element should be visible. Anything outside the path is hidden.
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-100 rounded-3xl p-12 border border-slate-200 flex items-center justify-center min-h-[400px]">
                <div class="w-full aspect-square max-w-[300px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl transition-all duration-700 flex items-center justify-center border-4 border-white/20"
                     [style.clipPath]="getClipPathValue()">
                    
                    <div class="text-center p-8">
                        <div class="text-4xl font-black text-white drop-shadow-lg mb-2">SHAPE</div>
                        <p class="text-white/80 text-[10px] font-bold tracking-widest uppercase">Masking Demo</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssShapesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  shapeTemplates = [
    { id: 'circle', value: 'circle(50% at 50% 50%)' },
    { id: 'ellipse', value: 'ellipse(25% 40% at 50% 50%)' },
    { id: 'triangle', value: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
    { id: 'rhombus', value: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
    { id: 'star', value: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
    { id: 'message', value: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' },
    { id: 'bevel', value: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' },
    { id: 'inset', value: 'inset(10% 20% 10% 20% round 20px)' }
  ];

  currentShape = signal('circle');

  getClipPathValue() {
    return this.shapeTemplates.find(s => s.id === this.currentShape())?.value || 'none';
  }

  getBtnClass(active: string, current: string) {
      return active === current 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
