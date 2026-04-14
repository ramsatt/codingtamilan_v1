import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-units-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="css-units" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">11. CSS Units</h3>
        <p class="article-body">
            Understanding the difference between absolute (px) and relative (em, rem, %, vh, vw) units is key to responsive design.
        </p>
      </div>

      <!-- 1. Units Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Relative vs. Absolute</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div class="bg-blue-50 p-4 rounded border border-blue-100">
                    <label class="block text-xs font-bold text-blue-800 uppercase mb-2">Root Font Size (HTML)</label>
                    <input type="range" min="10" max="32" [value]="rootFontSize()" (input)="rootFontSize.set($any($event.target).value)" class="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer">
                    <div class="text-right text-xs font-bold text-blue-600 mt-1">{{ rootFontSize() }}px</div>
                    <p class="text-[10px] text-blue-500 mt-2">Changing this affects <code>rem</code> units globally.</p>
                </div>

                <div class="bg-green-50 p-4 rounded border border-green-100">
                    <label class="block text-xs font-bold text-green-800 uppercase mb-2">Parent Font Size</label>
                    <input type="range" min="10" max="40" [value]="parentFontSize()" (input)="parentFontSize.set($any($event.target).value)" class="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer">
                    <div class="text-right text-xs font-bold text-green-600 mt-1">{{ parentFontSize() }}px</div>
                    <p class="text-[10px] text-green-500 mt-2">Changing this affects <code>em</code> and <code>%</code> units inside the container.</p>
                </div>

                <div class="bg-purple-50 p-4 rounded border border-purple-100">
                    <label class="block text-xs font-bold text-purple-800 uppercase mb-2">Container Width</label>
                    <input type="range" min="200" max="600" [value]="containerWidth()" (input)="containerWidth.set($any($event.target).value)" class="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer">
                    <div class="text-right text-xs font-bold text-purple-600 mt-1">{{ containerWidth() }}px</div>
                     <p class="text-[10px] text-purple-500 mt-2">Changing this affects <code>%</code> widths.</p>
                </div>

            </div>

            <!-- Visualization -->
            <div class="space-y-6">
                <!-- Visual Context -->
                <div class="border-2 border-dashed border-slate-300 p-4 rounded-xl relative" [style.width.px]="containerWidth()" [style.fontSize.px]="parentFontSize()">
                    <div class="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-slate-300">Parent Container ({{ parentFontSize() }}px font)</div>

                    <!-- Pixel Box -->
                    <div class="mb-4 bg-slate-100 p-2 rounded border border-slate-200">
                        <div class="text-xs font-bold text-slate-500 mb-1">Pixels (px) - Absolute</div>
                        <div class="bg-slate-800 text-white font-bold p-2 text-center rounded w-[100px] text-[16px]">
                            16px Text / 100px Width
                        </div>
                    </div>

                    <!-- REM Box -->
                    <div class="mb-4 bg-slate-100 p-2 rounded border border-slate-200">
                        <div class="text-xs font-bold text-slate-500 mb-1">Root EM (rem) - Relative to HTML</div>
                        <!-- 1rem = rootFontSize -->
                        <div class="bg-blue-600 text-white font-bold p-2 text-center rounded w-[10rem] text-[1rem]"
                             [style.fontSize.px]="rootFontSize()"> <!-- Simulating REM by setting px to root size for this element context in Angular, normally relies on actual root -->
                            1rem Text / 10rem Width
                        </div>
                        <div class="text-[10px] text-slate-300 mt-1">Computed: {{ rootFontSize() }}px font / {{ rootFontSize() * 10 }}px width</div>
                    </div>

                    <!-- EM Box -->
                    <div class="mb-4 bg-slate-100 p-2 rounded border border-slate-200">
                        <div class="text-xs font-bold text-slate-500 mb-1">EM (em) - Relative to Parent</div>
                        <div class="bg-green-600 text-white font-bold p-2 text-center rounded w-[10em] text-[1em]">
                            1em Text / 10em Width
                        </div>
                        <div class="text-[10px] text-slate-300 mt-1">Computed: {{ parentFontSize() }}px font / {{ parentFontSize() * 10 }}px width</div>
                    </div>

                     <!-- Percent Box -->
                    <div class="mb-4 bg-slate-100 p-2 rounded border border-slate-200">
                        <div class="text-xs font-bold text-slate-500 mb-1">Percentage (%) - Relative to Parent Width</div>
                        <div class="bg-purple-600 text-white font-bold p-2 text-center rounded w-[50%]">
                            50% Width
                        </div>
                         <div class="text-[10px] text-slate-300 mt-1">Computed: {{ containerWidth() * 0.5 }}px width</div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssUnitsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  rootFontSize = signal(16);
  parentFontSize = signal(16);
  containerWidth = signal(400);
}
