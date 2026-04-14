import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-overflow-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="overflow" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">12. CSS Overflow</h3>
        <p class="article-body">
            The <code>overflow</code> property controls what happens to content that is too big to fit into an area.
        </p>
      </div>

      <!-- 1. Overflow Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Overflow Behavior Explorer</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">overflow value</label>
                    <div class="grid grid-cols-2 gap-3">
                        <button (click)="overflowMode.set('visible')" [class]="getBtnClass('visible')" class="py-2 px-4 rounded border text-sm font-bold transition">visible</button>
                        <button (click)="overflowMode.set('hidden')" [class]="getBtnClass('hidden')" class="py-2 px-4 rounded border text-sm font-bold transition">hidden</button>
                        <button (click)="overflowMode.set('scroll')" [class]="getBtnClass('scroll')" class="py-2 px-4 rounded border text-sm font-bold transition">scroll</button>
                        <button (click)="overflowMode.set('auto')" [class]="getBtnClass('auto')" class="py-2 px-4 rounded border text-sm font-bold transition">auto</button>
                    </div>
                </div>

                <div class="p-4 bg-blue-50 rounded border border-blue-100 text-sm">
                    <h5 class="font-bold text-blue-800 mb-2">Behavior: {{ overflowMode() }}</h5>
                    <p class="text-blue-600 leading-relaxed" *ngIf="overflowMode() === 'visible'">
                        Default. The overflow is not clipped. It renders outside the element's box.
                    </p>
                    <p class="text-blue-600 leading-relaxed" *ngIf="overflowMode() === 'hidden'">
                        The overflow is clipped, and the rest of the content will be invisible.
                    </p>
                    <p class="text-blue-600 leading-relaxed" *ngIf="overflowMode() === 'scroll'">
                        The overflow is clipped, but a scroll-bar is added to see the rest of the content.
                    </p>
                    <p class="text-blue-600 leading-relaxed" *ngIf="overflowMode() === 'auto'">
                        If overflow is clipped, a scroll-bar should be added to see the rest of the content.
                    </p>
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-100 p-8 rounded-xl border border-slate-200 flex items-center justify-center min-h-[400px]">
                <div class="w-64 h-64 bg-white border-4 border-slate-800 rounded shadow-lg transition-all"
                     [style.overflow]="overflowMode()">
                    <div class="p-4 bg-gradient-to-br from-blue-400 to-indigo-600 text-white min-h-[400px] min-w-[400px]">
                        <h5 class="font-bold text-xl mb-4 text-center">Large Content Area</h5>
                        <p class="mb-4">
                            This internal div is 400x400 pixels, while the container is only 256x256 (16rem).
                        </p>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="h-20 bg-white/20 rounded border border-white/30 flex items-center justify-center font-bold">1</div>
                            <div class="h-20 bg-white/20 rounded border border-white/30 flex items-center justify-center font-bold">2</div>
                            <div class="h-20 bg-white/20 rounded border border-white/30 flex items-center justify-center font-bold">3</div>
                            <div class="h-20 bg-white/20 rounded border border-white/30 flex items-center justify-center font-bold">4</div>
                            <div class="h-20 bg-white/20 rounded border border-white/30 flex items-center justify-center font-bold">5</div>
                            <div class="h-20 bg-white/20 rounded border border-white/30 flex items-center justify-center font-bold">6</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssOverflowLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  overflowMode = signal('visible');

  getBtnClass(val: string) {
      return this.overflowMode() === val 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
