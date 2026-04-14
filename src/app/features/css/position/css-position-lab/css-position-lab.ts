import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-position-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="position" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">9. Positioning</h3>
        <p class="article-body">
            The <code>position</code> property specifies the type of positioning method used for an element (static, relative, fixed, absolute or sticky).
        </p>
      </div>

      <!-- 1. Positioning Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Coordinate System</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-200 h-fit">
                
                <!-- Position Type -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">position</label>
                    <select [value]="position()" (change)="position.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono">
                        <option value="static">static</option>
                        <option value="relative">relative</option>
                        <option value="absolute">absolute</option>
                        <option value="fixed">fixed</option>
                    </select>
                </div>

                <!-- Coordinates -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Top</label>
                        <input type="range" min="0" max="200" [value]="top()" (input)="top.set($any($event.target).value)" class="w-full h-1 bg-slate-200 rounded appearance-none cursor-pointer mb-1">
                        <span class="text-xs font-mono text-slate-600">{{ top() }}px</span>
                        <div class="mt-2 text-[10px] text-slate-300">
                            <label class="flex items-center gap-1">
                                <input type="checkbox" [checked]="useTop()" (change)="useTop.set(!useTop())"> Enable
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Left</label>
                        <input type="range" min="0" max="200" [value]="left()" (input)="left.set($any($event.target).value)" class="w-full h-1 bg-slate-200 rounded appearance-none cursor-pointer mb-1">
                        <span class="text-xs font-mono text-slate-600">{{ left() }}px</span>
                         <div class="mt-2 text-[10px] text-slate-300">
                            <label class="flex items-center gap-1">
                                <input type="checkbox" [checked]="useLeft()" (change)="useLeft.set(!useLeft())"> Enable
                            </label>
                        </div>
                    </div>
                </div>

                <div class="text-xs text-slate-500 mt-2 bg-blue-50 p-2 rounded border border-blue-100">
                    <strong class="block mb-1 text-blue-700">About {{ position() }}:</strong>
                     <p *ngIf="position() === 'static'">Default. Not positioned in any special way. Top/Left/Right/Bottom have NO effect.</p>
                     <p *ngIf="position() === 'relative'">Positioned relative to its normal position. Does NOT affect surrounding elements layout.</p>
                     <p *ngIf="position() === 'absolute'">Positioned relative to the nearest positioned ancestor (the container here). Removed from flow.</p>
                     <p *ngIf="position() === 'fixed'">Positioned relative to the viewport (window). Stays in place when scrolling.</p>
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-3 h-[400px] bg-slate-100 rounded-xl border-2 border-slate-300 relative overflow-hidden group">
                <!-- Grid Lines -->
                <div class="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
                    <div class="border-r border-b border-slate-200"></div>
                     <div class="border-r border-b border-slate-200"></div>
                      <div class="border-r border-b border-slate-200"></div>
                       <div class="border-b border-slate-200"></div>
                        <div class="border-r border-b border-slate-200"></div>
                         <div class="border-r border-b border-slate-200"></div>
                          <div class="border-r border-b border-slate-200"></div>
                           <div class="border-b border-slate-200"></div>
                            <div class="border-r border-b border-slate-200"></div>
                             <div class="border-r border-b border-slate-200"></div>
                              <div class="border-r border-b border-slate-200"></div>
                               <div class="border-b border-slate-200"></div>
                </div>
                
                <span class="absolute top-2 left-2 text-xs font-bold text-slate-300 uppercase tracking-wider">Container (relative)</span>

                <!-- Normal Flow Element -->
                 <div class="w-32 h-20 bg-slate-300 m-8 rounded flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-400">
                    Static Element
                </div>

                <!-- Target Element -->
                <div class="w-32 h-32 bg-purple-500 rounded shadow-2xl flex flex-col items-center justify-center text-white font-bold transition-all duration-300 border-2 border-white z-10"
                     [style.position]="position()"
                     [style.top.px]="useTop() ? top() : null"
                     [style.left.px]="useLeft() ? left() : null">
                    <span>TARGET</span>
                    <span class="text-[10px] font-normal opacity-80 mt-1">{{ position() }}</span>
                </div>

                 <!-- Normal Flow Element 2 -->
                 <div class="w-32 h-20 bg-slate-300 m-8 rounded flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-400">
                    Static Element
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssPositionLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  position = signal('static');
  top = signal(50);
  left = signal(50);
  useTop = signal(true);
  useLeft = signal(true);
}
