import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-gradients-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="gradients" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">23. Gradients</h3>
        <p class="article-body">
            CSS gradients let you display smooth transitions between two or more specified colors.
        </p>
      </div>

      <!-- 1. Gradient Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">background: gradient-logic;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3 text-center">Gradient Type</label>
                    <div class="flex bg-white rounded-lg border border-slate-300 overflow-hidden divide-x divide-slate-200">
                        <button (click)="type.set('linear')" [class.bg-blue-600]="type() === 'linear'" [class.text-white]="type() === 'linear'" class="flex-1 py-2 font-bold transition">Linear</button>
                        <button (click)="type.set('radial')" [class.bg-blue-600]="type() === 'radial'" [class.text-white]="type() === 'radial'" class="flex-1 py-2 font-bold transition">Radial</button>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Color 1</label>
                        <input type="color" [value]="color1()" (input)="color1.set($any($event.target).value)" class="w-full h-10 rounded border-0 bg-transparent cursor-pointer">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black text-slate-500 uppercase mb-1">Color 2</label>
                        <input type="color" [value]="color2()" (input)="color2.set($any($event.target).value)" class="w-full h-10 rounded border-0 bg-transparent cursor-pointer">
                    </div>
                </div>

                <div *ngIf="type() === 'linear'">
                    <label class="block text-[10px] font-black text-slate-500 uppercase mb-2">Direction ({{ angle() }}deg)</label>
                    <input type="range" min="0" max="360" [value]="angle()" (input)="angle.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600">
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300 leading-relaxed shadow-xl overflow-x-auto whitespace-nowrap">
                    <span class="text-cyan-400">background</span>: {{ gradientString() }};
                </div>
            </div>

            <!-- Visualization -->
            <div class="flex flex-col items-center justify-center space-y-8 bg-slate-100 p-8 rounded-xl border border-slate-200 min-h-[400px]">
                <div class="w-full aspect-video rounded-2xl shadow-2xl transition-all duration-500 border-4 border-white"
                     [style.background]="gradientString()">
                </div>
                
                <div class="flex gap-4">
                    <button *ngFor="let preset of presets" 
                            (click)="applyPreset(preset)"
                            class="w-10 h-10 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110"
                            [style.background]="getPresetGradient(preset)">
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssGradientsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  type = signal<'linear' | 'radial'>('linear');
  color1 = signal('#3b82f6');
  color2 = signal('#ef4444');
  angle = signal(135);

  presets = [
    { c1: '#845ec2', c2: '#d65db1', a: 135 },
    { c1: '#00c9a7', c2: '#00d2fc', a: 90 },
    { c1: '#ff9671', c2: '#ffc75f', a: 180 },
    { c1: '#4d8076', c2: '#4b4453', a: 45 }
  ];

  gradientString = computed(() => {
    if (this.type() === 'linear') {
      return `linear-gradient(${this.angle()}deg, ${this.color1()}, ${this.color2()})`;
    }
    return `radial-gradient(circle, ${this.color1()}, ${this.color2()})`;
  });

  getPresetGradient(p: any) {
      return `linear-gradient(${p.a}deg, ${p.c1}, ${p.c2})`;
  }

  applyPreset(p: any) {
      this.color1.set(p.c1);
      this.color2.set(p.c2);
      this.angle.set(p.a);
      this.type.set('linear');
  }
}
