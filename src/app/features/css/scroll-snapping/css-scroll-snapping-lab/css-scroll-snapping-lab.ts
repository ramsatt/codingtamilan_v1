import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-scroll-snapping-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="scroll-snapping" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">30. Scroll Snapping</h3>
        <p class="article-body">
            CSS Scroll Snapping allows you to lock the viewport to certain elements or locations after a user has finished scrolling.
        </p>
      </div>

      <!-- 1. Scroll Snap Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">scroll-snap-type: behavior;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200 h-fit">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Snap Type (Container)</label>
                    <select [value]="snapType()" (change)="snapType.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono">
                        <option value="none">none</option>
                        <option value="x mandatory">x mandatory</option>
                        <option value="x proximity">x proximity</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Snap Align (Items)</label>
                    <select [value]="snapAlign()" (change)="snapAlign.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono">
                        <option value="start">start</option>
                        <option value="center">center</option>
                        <option value="end">end</option>
                    </select>
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300 leading-relaxed shadow-xl">
                    <span class="text-purple-400">.container</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">scroll-snap-type</span>: {{ snapType() }};<br>
                    &#125;<br><br>
                    <span class="text-purple-400">.item</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">scroll-snap-align</span>: {{ snapAlign() }};<br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-3">
                 <div class="w-full h-80 bg-slate-800 rounded-3xl overflow-x-auto flex gap-4 p-8 shadow-inner border border-slate-700 no-scrollbar"
                      [style.scrollSnapType]="snapType()">
                    @for (item of [1,2,3,4,5,6]; track item) {
                        <div class="h-full min-w-[300px] bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex flex-col items-center justify-center border-2 border-slate-600 transition-all duration-300 group hover:border-blue-400"
                             [style.scrollSnapAlign]="snapAlign()">
                            <span class="text-6xl font-black text-slate-500 group-hover:text-blue-400 transition-colors">{{ item }}</span>
                            <p class="text-slate-300 text-xs mt-4 font-bold tracking-widest uppercase">Slide Layer</p>
                        </div>
                    }
                </div>
                
                <div class="mt-4 flex items-center justify-between px-4">
                    <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">← Swipe or Scroll →</span>
                    <div class="flex gap-2">
                         <div *ngFor="let i of [1,2,3,4,5,6]" class="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class CssScrollSnappingLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  snapType = signal('x mandatory');
  snapAlign = signal('center');
}
