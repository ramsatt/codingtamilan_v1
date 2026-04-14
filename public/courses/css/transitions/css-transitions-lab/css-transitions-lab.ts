import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-transitions-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="transitions" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">10. Transitions & Animations</h3>
        <p class="article-body">
            CSS transitions allows you to change property values smoothly, over a given duration.
        </p>
      </div>

      <!-- 1. Transition Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Transition Builder</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-200 h-fit">
                
                <!-- Duration -->
                <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Duration: {{ duration() }}s</label>
                     <input type="range" min="0.1" max="2" step="0.1" [value]="duration()" (input)="duration.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>
                
                 <!-- Delay -->
                <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Delay: {{ delay() }}s</label>
                     <input type="range" min="0" max="1" step="0.1" [value]="delay()" (input)="delay.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>

                <!-- Timing Function -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">timing-function</label>
                    <select [value]="timingFunction()" (change)="timingFunction.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono">
                        <option value="linear">linear</option>
                        <option value="ease">ease</option>
                        <option value="ease-in">ease-in</option>
                        <option value="ease-out">ease-out</option>
                        <option value="ease-in-out">ease-in-out</option>
                        <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">bounce (custom)</option>
                    </select>
                </div>
                
                 <!-- Properties -->
                <div class="bg-white p-3 rounded border border-slate-200">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Target State (Hover)</label>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2">
                            <input type="checkbox" [checked]="changeWidth()" (change)="changeWidth.set(!changeWidth())"> Width (100px -> 300px)
                        </label>
                         <label class="flex items-center gap-2">
                            <input type="checkbox" [checked]="changeColor()" (change)="changeColor.set(!changeColor())"> Color (Blue -> Orange)
                        </label>
                         <label class="flex items-center gap-2">
                            <input type="checkbox" [checked]="rotate()" (change)="rotate.set(!rotate())"> Rotation (0deg -> 45deg)
                        </label>
                    </div>
                </div>

                <div class="mt-4 p-4 bg-slate-800 rounded font-mono text-xs text-slate-300">
                    <span class="text-pink-400">transition</span>: all {{ duration() }}s {{ timingFunction() }} {{ delay() }}s;
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-3 min-h-[400px] bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-start p-10 overflow-hidden relative group cursor-pointer">
                <span class="absolute top-4 left-4 text-xs font-bold text-slate-300 uppercase tracking-wider animate-pulse">Hover Me!</span>
                
                <!-- The Box -->
                <div class="h-32 rounded-xl shadow-xl flex items-center justify-center text-white font-bold text-xl border-4 border-white transition-all ml-10 p-4"
                     [style.transitionDuration]="duration() + 's'"
                     [style.transitionDelay]="delay() + 's'"
                     [style.transitionTimingFunction]="timingFunction()"
                     [class.w-32]="!((isHovered || forceHover) && changeWidth())"
                     [class.w-[300px]]="(isHovered || forceHover) && changeWidth()"
                     [class.bg-blue-500]="!((isHovered || forceHover) && changeColor())"
                     [class.bg-orange-500]="(isHovered || forceHover) && changeColor()"
                     [class.rotate-45]="(isHovered || forceHover) && rotate()"
                     (mouseenter)="isHovered = true"
                     (mouseleave)="isHovered = false"
                     (click)="forceHover = !forceHover">
                    
                    <span *ngIf="!isHovered && !forceHover">Hover Me</span>
                    <span *ngIf="isHovered || forceHover">Changed!</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssTransitionsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  duration = signal(0.5);
  delay = signal(0);
  timingFunction = signal('ease');

  changeWidth = signal(true);
  changeColor = signal(true);
  rotate = signal(false);

  isHovered = false;
  forceHover = false;
}
