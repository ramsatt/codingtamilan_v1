import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-box-model-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="box-model" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">4. The Box Model</h3>
        <p class="article-body">
            Every element in CSS is a box. The Box Model consists of: margins, borders, padding, and the actual content.
        </p>
      </div>

      <!-- 1. Interactive Box Model Explorer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Box Model Visualizer</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- Controls -->
            <div class="space-y-6">
                <!-- Margin -->
                <div class="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h5 class="font-bold text-orange-800 mb-2 text-sm uppercase tracking-wider">Margin (Outside)</h5>
                    <div class="flex items-center gap-4">
                        <input type="range" min="0" max="50" [value]="margin()" (input)="margin.set($any($event.target).value)" class="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500">
                        <span class="font-mono text-sm font-bold text-orange-600 w-12">{{ margin() }}px</span>
                    </div>
                </div>

                <!-- Border -->
                <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <h5 class="font-bold text-yellow-800 mb-2 text-sm uppercase tracking-wider">Border</h5>
                    <div class="flex items-center gap-4">
                        <input type="range" min="0" max="20" [value]="border()" (input)="border.set($any($event.target).value)" class="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500">
                        <span class="font-mono text-sm font-bold text-yellow-600 w-12">{{ border() }}px</span>
                    </div>
                </div>

                <!-- Padding -->
                <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h5 class="font-bold text-green-800 mb-2 text-sm uppercase tracking-wider">Padding (Inside)</h5>
                    <div class="flex items-center gap-4">
                        <input type="range" min="0" max="50" [value]="padding()" (input)="padding.set($any($event.target).value)" class="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500">
                        <span class="font-mono text-sm font-bold text-green-600 w-12">{{ padding() }}px</span>
                    </div>
                </div>

                <!-- Content -->
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h5 class="font-bold text-blue-800 mb-2 text-sm uppercase tracking-wider">Content Width</h5>
                    <div class="flex items-center gap-4">
                        <input type="range" min="50" max="200" [value]="width()" (input)="width.set($any($event.target).value)" class="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500">
                        <span class="font-mono text-sm font-bold text-blue-600 w-12">{{ width() }}px</span>
                    </div>
                </div>
                
                <div class="p-4 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600">
                    <div class="flex justify-between font-bold mb-2">Total Element Width:</div>
                    <div class="font-mono text-xs">
                        {{ width() }} (Context) + {{ padding() * 2 }} (Padding) + {{ border() * 2 }} (Border) = <span class="text-lg font-bold text-slate-900">{{ totalWidth() }}px</span>
                    </div>
                    <p class="text-[10px] mt-2 text-slate-300">* Assuming standard box-sizing: content-box</p>
                </div>
            </div>

            <!-- Visualization -->
            <div class="h-[400px] bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-x-0 top-0 h-px bg-red-400/50" style="top: 50%;"></div>
                <div class="absolute inset-y-0 left-0 w-px bg-red-400/50" style="left: 50%;"></div>

                <!-- Margin Box -->
                <div class="bg-orange-200/50 border border-dashed border-orange-400 relative transition-all duration-300 flex items-center justify-center"
                     [style.width.px]="totalWidth()"
                     [style.height.px]="totalWidth()"> <!-- Square for simplicity -->
                    
                    <span class="absolute top-1 left-2 text-[10px] text-orange-700 font-bold uppercase">Margin</span>

                    <!-- Border Box -->
                    <div class="bg-yellow-200/50 border-solid border-yellow-500 relative transition-all duration-300 flex items-center justify-center"
                         [style.borderWidth.px]="border()"
                         [style.width.px]="width() + (padding() * 2)"
                         [style.height.px]="width() + (padding() * 2)"> <!-- content + padding -->
                        
                        <span class="absolute top-1 right-2 text-[10px] text-yellow-700 font-bold uppercase z-10">Border</span>

                        <!-- Padding Box -->
                        <div class="bg-green-200/50 border border-dashed border-green-500 relative transition-all duration-300 flex items-center justify-center w-full h-full">
                            
                             <span class="absolute bottom-1 left-2 text-[10px] text-green-700 font-bold uppercase">Padding</span>

                            <!-- Content Box -->
                            <div class="bg-blue-400 text-white flex items-center justify-center font-bold shadow-sm transition-all duration-300"
                                 [style.width.px]="width()"
                                 [style.height.px]="width()">
                                 Content
                            </div>
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
export class BoxModelLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  margin = signal(20);
  border = signal(5);
  padding = signal(15);
  width = signal(100);

  totalWidth = computed(() => {
      // Content + Padding*2 + Border*2
      return Number(this.width()) + (Number(this.padding()) * 2) + (Number(this.border()) * 2);
  });
}
