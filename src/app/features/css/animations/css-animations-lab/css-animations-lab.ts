import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-animations-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="animations" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">28. Keyframe Animations</h3>
        <p class="article-body">
            The <code>@keyframes</code> rule specifies the animation code. The animation is created by gradually changing from one set of CSS styles to another.
        </p>
      </div>

      <!-- 1. Animation Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">@keyframes: cinematic;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Animation Preset</label>
                    <div class="grid grid-cols-2 gap-3">
                        <button *ngFor="let anim of anims" 
                                (click)="currentAnim.set(anim.id)" 
                                [class]="getBtnClass(currentAnim(), anim.id)"
                                class="py-2 px-4 rounded border text-sm font-bold transition">
                            {{ anim.label }}
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Duration: {{ duration() }}s</label>
                        <input type="range" min="0.5" max="5" step="0.5" [value]="duration()" (input)="duration.set($any($event.target).value)" class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Iteration Count</label>
                        <select [value]="iteration()" (change)="iteration.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono focus:ring-2 focus:ring-blue-200">
                            <option value="infinite">infinite</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>

                <div class="bg-slate-900 rounded-xl p-4 font-mono text-[10px] text-slate-300 leading-relaxed shadow-xl overflow-x-auto whitespace-nowrap">
                    <span class="text-purple-400">.animate-me</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">animation-name</span>: {{ currentAnim() }};<br>
                    &nbsp;&nbsp;<span class="text-blue-400">animation-duration</span>: {{ duration() }}s;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">animation-iteration-count</span>: {{ iteration() }};<br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-800 rounded-3xl p-12 border-8 border-slate-900 flex items-center justify-center min-h-[400px] relative overflow-hidden">
                <!-- Decorative BG grid -->
                <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>

                <div class="w-32 h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-slate-800 font-black text-2xl z-10"
                     [style.animationName]="currentAnim()"
                     [style.animationDuration]="duration() + 's'"
                     [style.animationIterationCount]="iteration()">
                     ANIM
                </div>
                
                <div class="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                    Preview Mode: Active
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
      40% {transform: translateY(-30px) rotate(-5deg);}
      60% {transform: translateY(-15px) rotate(5deg);}
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      70% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }
    @keyframes wobble {
      0% { transform: translateX(0%); }
      15% { transform: translateX(-25%) rotate(-5deg); }
      30% { transform: translateX(20%) rotate(3deg); }
      45% { transform: translateX(-15%) rotate(-3deg); }
      60% { transform: translateX(10%) rotate(2deg); }
      75% { transform: translateX(-5%) rotate(-1deg); }
      100% { transform: translateX(0%); }
    }
    @keyframes flip {
      0% { transform: perspective(400px) rotateY(0); }
      100% { transform: perspective(400px) rotateY(360deg); }
    }
    @keyframes heartBeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.3); }
      28% { transform: scale(1); }
      42% { transform: scale(1.3); }
      70% { transform: scale(1); }
    }
  `]
})
export class CssAnimationsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  duration = signal(2);
  iteration = signal('infinite');
  currentAnim = signal('bounce');

  anims = [
    { id: 'bounce', label: 'Bounce' },
    { id: 'spin', label: 'Spin' },
    { id: 'pulse', label: 'Pulse' },
    { id: 'wobble', label: 'Wobble' },
    { id: 'flip', label: 'Flip' },
    { id: 'heartBeat', label: 'Heart Beat' }
  ];

  getBtnClass(active: string, current: string) {
      return active === current 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-100' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
