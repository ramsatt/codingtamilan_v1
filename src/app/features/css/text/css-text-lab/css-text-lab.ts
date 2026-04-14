import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-text-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="text-fonts" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">5. Text & Typography</h3>
        <p class="article-body">
            Styling text is one of the most common tasks in CSS. Control fonts, alignment, decoration, and more.
        </p>
      </div>

      <!-- 1. Text Properties Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Typography Playground</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Controls -->
            <div class="lg:col-span-4 space-y-5 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <!-- Font Family -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Font Family</label>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="font" value="sans-serif" [checked]="fontFamily() === 'sans-serif'" (change)="fontFamily.set('sans-serif')" class="text-blue-500 focus:ring-blue-500">
                            <span class="font-sans text-sm">Sans-Serif (Arial)</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="font" value="serif" [checked]="fontFamily() === 'serif'" (change)="fontFamily.set('serif')" class="text-blue-500 focus:ring-blue-500">
                            <span class="font-serif text-sm">Serif (Times)</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="font" value="monospace" [checked]="fontFamily() === 'monospace'" (change)="fontFamily.set('monospace')" class="text-blue-500 focus:ring-blue-500">
                            <span class="font-mono text-sm">Monospace (Code)</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="font" value="cursive" [checked]="fontFamily() === 'cursive'" (change)="fontFamily.set('cursive')" class="text-blue-500 focus:ring-blue-500">
                            <span class="font-cursive text-sm" style="font-family: cursive;">Cursive</span>
                        </label>
                    </div>
                </div>

                <!-- Font Weight -->
                <div>
                     <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Font Weight: {{ fontWeight() }}</label>
                     <input type="range" min="100" max="900" step="100" [value]="fontWeight()" (input)="fontWeight.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>

                <!-- Text Align -->
                 <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Text Align</label>
                    <div class="flex bg-white rounded border border-slate-300 overflow-hidden divide-x divide-slate-200">
                        <button (click)="textAlign.set('left')" [class.bg-blue-50]="textAlign() === 'left'" class="flex-1 py-1 hover:bg-slate-50 transition">Left</button>
                        <button (click)="textAlign.set('center')" [class.bg-blue-50]="textAlign() === 'center'" class="flex-1 py-1 hover:bg-slate-50 transition">Center</button>
                        <button (click)="textAlign.set('right')" [class.bg-blue-50]="textAlign() === 'right'" class="flex-1 py-1 hover:bg-slate-50 transition">Right</button>
                        <button (click)="textAlign.set('justify')" [class.bg-blue-50]="textAlign() === 'justify'" class="flex-1 py-1 hover:bg-slate-50 transition">Justify</button>
                    </div>
                </div>

                <!-- Decoration -->
                 <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Text Decoration</label>
                    <select [value]="textDecoration()" (change)="textDecoration.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm">
                        <option value="none">none</option>
                        <option value="underline">underline</option>
                        <option value="line-through">line-through</option>
                        <option value="overline">overline</option>
                    </select>
                </div>

                <!-- Transform -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Text Transform</label>
                    <div class="flex flex-wrap gap-2">
                         <button (click)="textTransform.set('none')" [class]="getBtnClass('none')" class="px-3 py-1 rounded border text-xs transition">none</button>
                         <button (click)="textTransform.set('uppercase')" [class]="getBtnClass('uppercase')" class="px-3 py-1 rounded border text-xs transition">UPPER</button>
                         <button (click)="textTransform.set('lowercase')" [class]="getBtnClass('lowercase')" class="px-3 py-1 rounded border text-xs transition">lower</button>
                         <button (click)="textTransform.set('capitalize')" [class]="getBtnClass('capitalize')" class="px-3 py-1 rounded border text-xs transition">Capitalize</button>
                    </div>
                </div>
            </div>

            <!-- Preview -->
            <div class="lg:col-span-8">
                <div class="h-full min-h-[500px] bg-slate-50 rounded-xl border-dashed border-2 border-slate-300 p-8 overflow-y-auto">
                    <p class="transition-all duration-300"
                       [style.fontFamily]="fontFamily()"
                       [style.fontWeight]="fontWeight()"
                       [style.textAlign]="textAlign()"
                       [style.textDecoration]="textDecoration()"
                       [style.textTransform]="textTransform()"
                       [style.fontSize.px]="20"
                       [style.lineHeight]="1.6"
                       [style.color]="'#334155'">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    
                    <div class="mt-8 pt-8 border-t border-slate-200">
                        <h5 class="text-xs font-bold text-slate-300 uppercase mb-4">Generated CSS</h5>
                        <div class="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 shadow-inner">
                            <span class="text-yellow-400">p</span> <span class="text-white">&#123;</span><br>
                            <div class="pl-4">
                                <span class="text-cyan-400">font-family</span>: <span class="text-emerald-400">{{ fontFamily() }}</span>;<br>
                                <span class="text-cyan-400">font-weight</span>: <span class="text-emerald-400">{{ fontWeight() }}</span>;<br>
                                <span class="text-cyan-400">text-align</span>: <span class="text-emerald-400">{{ textAlign() }}</span>;<br>
                                <span class="text-cyan-400">text-decoration</span>: <span class="text-emerald-400">{{ textDecoration() }}</span>;<br>
                                <span class="text-cyan-400">text-transform</span>: <span class="text-emerald-400">{{ textTransform() }}</span>;<br>
                            </div>
                            <span class="text-white">&#125;</span>
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
export class CssTextLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  fontFamily = signal('sans-serif');
  fontWeight = signal(400);
  textAlign = signal('left');
  textDecoration = signal('none');
  textTransform = signal('none');

  getBtnClass(val: string) {
      return this.textTransform() === val 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
