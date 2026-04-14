import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-intro-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="css-intro" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">1. Introduction to CSS</h3>
        <p class="article-body">
            CSS (Cascading Style Sheets) is the language used to style an HTML document. CSS describes how HTML elements should be displayed.
        </p>
      </div>

      <!-- 1. The Anatomy of a CSS Rule -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">CSS Syntax Anatomy</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Code Anatomy -->
            <div class="bg-slate-900 rounded-lg p-6 font-mono text-lg shadow-inner">
                <div class="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                    <div class="group relative cursor-help">
                        <span class="text-yellow-400 font-bold border-b-2 border-transparent group-hover:border-yellow-400">h1</span>
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 bg-yellow-600 text-white text-xs p-1 rounded text-center opacity-0 group-hover:opacity-100 transition pointer-events-none">Selector</div>
                    </div>
                    
                    <span class="text-white">&#123;</span>
                    
                    <div class="group relative cursor-help">
                        <span class="text-cyan-400 border-b-2 border-transparent group-hover:border-cyan-400">color</span>
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 bg-cyan-600 text-white text-xs p-1 rounded text-center opacity-0 group-hover:opacity-100 transition pointer-events-none">Property</div>
                    </div>
                    
                    <span class="text-white">:</span>

                    <div class="group relative cursor-help">
                        <span class="text-emerald-400 border-b-2 border-transparent group-hover:border-emerald-400">blue</span>
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 bg-emerald-600 text-white text-xs p-1 rounded text-center opacity-0 group-hover:opacity-100 transition pointer-events-none">Value</div>
                    </div>
                    
                    <span class="text-white">;</span>
                    <span class="text-white">&#125;</span>
                </div>
            </div>

            <!-- Explanation -->
            <ul class="space-y-3 text-slate-600">
                <li class="flex gap-3">
                    <span class="bg-yellow-100 text-yellow-700 font-bold rounded px-2 py-0.5 text-xs h-fit mt-1">1. Selector</span>
                    <span>Points to the HTML element you want to style.</span>
                </li>
                <li class="flex gap-3">
                    <span class="bg-cyan-100 text-cyan-700 font-bold rounded px-2 py-0.5 text-xs h-fit mt-1">2. Property</span>
                    <span>The style attribute you want to change (e.g. color, font-size).</span>
                </li>
                <li class="flex gap-3">
                    <span class="bg-emerald-100 text-emerald-700 font-bold rounded px-2 py-0.5 text-xs h-fit mt-1">3. Value</span>
                    <span>The value assigned to the property (e.g. blue, 12px).</span>
                </li>
            </ul>
        </div>
      </div>

      <!-- 2. Interactive CSS Editor -->
      <div class="glass-panel rounded-xl p-6 shadow-lg bg-gradient-to-br from-slate-50 to-white border border-slate-200">
        <h4 class="text-xl font-bold text-slate-800 mb-2">CSS Playground</h4>
        <p class="text-slate-600 mb-6 text-sm">Modify the CSS properties below to style the box.</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Controls -->
            <div class="lg:col-span-5 space-y-4">
                <div class="space-y-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Color</label>
                        <select [value]="selectedColor()" (change)="selectedColor.set($any($event.target).value)" 
                                class="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                            <option value="red">red</option>
                            <option value="blue">blue</option>
                            <option value="green">green</option>
                            <option value="orange">orange</option>
                            <option value="purple">purple</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Font Size</label>
                         <input type="range" min="12" max="48" [value]="fontSize()" (input)="fontSize.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                         <div class="text-right text-xs text-slate-500 mt-1 font-mono">{{ fontSize() }}px</div>
                    </div>

                    <div>
                         <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Background Color</label>
                        <select [value]="backgroundColor()" (change)="backgroundColor.set($any($event.target).value)" 
                                class="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                            <option value="white">white</option>
                            <option value="#f0f9ff">light blue</option>
                            <option value="#f0fdf4">light green</option>
                             <option value="#fff1f2">light red</option>
                             <option value="#333">dark</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Output/Preview -->
            <div class="lg:col-span-7">
                <div class="h-full bg-slate-100 rounded-lg p-8 shadow-inner relative flex flex-col items-center justify-center border border-slate-200">
                    <div class="absolute top-0 right-0 p-2 text-slate-300 font-bold text-xs uppercase tracking-widest">Preview</div>
                    
                    <div class="p-6 rounded shadow-lg transition-all duration-300"
                         [style.color]="selectedColor()"
                         [style.fontSize.px]="fontSize()"
                         [style.backgroundColor]="backgroundColor()">
                        This is a styled box!
                    </div>

                    <div class="mt-8 font-mono text-sm bg-slate-800 text-slate-300 p-4 rounded w-full">
                        <div class="text-yellow-400">.box <span class="text-white">&#123;</span></div>
                        <div class="pl-4 text-cyan-400">color<span class="text-white">:</span> <span class="text-emerald-400">{{ selectedColor() }}</span><span class="text-white">;</span></div>
                        <div class="pl-4 text-cyan-400">font-size<span class="text-white">:</span> <span class="text-emerald-400">{{ fontSize() }}px</span><span class="text-white">;</span></div>
                         <div class="pl-4 text-cyan-400">background-color<span class="text-white">:</span> <span class="text-emerald-400">{{ backgroundColor() }}</span><span class="text-white">;</span></div>
                        <div class="text-white">&#125;</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssIntroLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  selectedColor = signal('blue');
  fontSize = signal(24);
  backgroundColor = signal('white');
}
