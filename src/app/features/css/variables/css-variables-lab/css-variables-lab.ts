import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-variables-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="variables" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">16. CSS Variables</h3>
        <p class="article-body">
            CSS variables (Custom Properties) allow you to store values and reuse them throughout your stylesheet.
        </p>
      </div>

      <!-- 1. Variables Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">--custom-properties: playground;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Color (--brand-color)</label>
                    <div class="flex gap-4">
                        <input type="color" [value]="brandColor()" (input)="brandColor.set($any($event.target).value)" class="h-10 w-20 rounded border-0 bg-transparent cursor-pointer">
                        <input type="text" [value]="brandColor()" (input)="brandColor.set($any($event.target).value)" class="flex-1 bg-white border border-slate-300 rounded px-3 text-sm font-mono">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Border Radius (--base-radius)</label>
                    <input type="range" min="0" max="40" [value]="radius()" (input)="radius.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <div class="text-right text-xs font-bold text-slate-300 mt-1">{{ radius() }}px</div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Padding (--main-spacing)</label>
                    <input type="range" min="8" max="48" [value]="spacing()" (input)="spacing.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    <div class="text-right text-xs font-bold text-slate-300 mt-1">{{ spacing() }}px</div>
                </div>
                
                <!-- Definition Box -->
                <div class="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300">
                    <span class="text-yellow-400">:root</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">--brand-color</span>: <span [style.color]="brandColor()">{{ brandColor() }}</span>;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">--base-radius</span>: <span>{{ radius() }}px</span>;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">--main-spacing</span>: <span>{{ spacing() }}px</span>;<br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="space-y-6">
                <!-- Applied Variables -->
                <div class="bg-slate-100 p-8 rounded-xl border border-slate-200 flex flex-col gap-4">
                    
                    <div class="shadow-xl bg-white transition-all overflow-hidden"
                         [style.borderRadius.px]="radius()"
                         [style.padding.px]="spacing()">
                        
                        <div class="h-10 w-32 mb-4 transition-colors" [style.backgroundColor]="brandColor()" [style.borderRadius.px]="radius() * 0.5"></div>
                        <h5 class="text-xl font-bold text-slate-800 mb-2">Variable-themed Card</h5>
                        <p class="text-slate-500 text-sm mb-6 leading-relaxed">
                            This card's padding, border-radius, and highlight colors are all driven by CSS variables.
                        </p>
                        
                        <button class="w-full py-3 font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-lg"
                                [style.backgroundColor]="brandColor()"
                                [style.borderRadius.px]="radius() * 0.8">
                            Get Started
                        </button>
                    </div>

                    <div class="p-4 bg-white border-2 transition-all flex items-center justify-between"
                         [style.borderColor]="brandColor()"
                         [style.borderRadius.px]="radius()">
                        <span class="text-xs font-bold text-slate-300">STATUS</span>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full animate-ping" [style.backgroundColor]="brandColor()"></div>
                            <span class="font-bold uppercase tracking-widest text-[10px]" [style.color]="brandColor()">Online</span>
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
export class CssVariablesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  brandColor = signal('#3b82f6');
  radius = signal(12);
  spacing = signal(24);
}
