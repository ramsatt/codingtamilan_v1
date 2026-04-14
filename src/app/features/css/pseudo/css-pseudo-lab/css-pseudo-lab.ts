import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-pseudo-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pseudo" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">13. Pseudo-classes & Pseudo-elements</h3>
        <p class="article-body">
            Pseudo-classes style an element based on its state (like hover), while pseudo-elements style specific parts of an element (like the first letter).
        </p>
      </div>

      <!-- 1. Pseudo-classes Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 underline decoration-blue-500 decoration-4 underline-offset-8">Interactive States</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Hover/Active -->
            <div class="space-y-4">
                <h5 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Stateful Button</h5>
                <button class="w-full py-4 px-6 bg-slate-800 text-white font-bold rounded-xl transition-all duration-300
                               hover:bg-blue-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20
                               active:scale-95 active:bg-blue-700
                               focus:ring-4 focus:ring-blue-300 focus:outline-none">
                    Hover, Click or Tab to me!
                </button>
                <div class="bg-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-300">
                    <span class="text-yellow-400">button</span>:hover &#123; <span class="text-blue-400">background</span>: blue; &#125;<br>
                    <span class="text-yellow-400">button</span>:active &#123; <span class="text-blue-400">transform</span>: scale(0.95); &#125;
                </div>
            </div>

            <!-- nth-child -->
            <div class="space-y-4">
                <h5 class="text-sm font-bold text-slate-500 uppercase tracking-widest">nth-child(even) Selection</h5>
                <ul class="space-y-2">
                    <li *ngFor="let i of [1,2,3,4,5]" class="p-2 rounded border border-slate-100 flex justify-between items-center group
                                                             even:bg-emerald-50 even:border-emerald-100">
                        <span class="text-sm font-medium text-slate-700">Item {{i}}</span>
                        <span class="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-300 opacity-0 group-hover:opacity-100 transition"
                              [class.hidden]="i % 2 !== 0">Matched :even</span>
                    </li>
                </ul>
                <div class="bg-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-300">
                    <span class="text-yellow-400">li</span>:nth-child(even) &#123; <span class="text-blue-400">background</span>: emerald; &#125;
                </div>
            </div>
        </div>
      </div>

      <!-- 2. Pseudo-elements -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 underline decoration-purple-500 decoration-4 underline-offset-8">::before & ::after</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Text Customization -->
            <div class="space-y-4">
                <h5 class="text-sm font-bold text-slate-500 uppercase tracking-widest">First Letter & Line</h5>
                <p class="text-slate-600 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-purple-600 first-letter:mr-3 first-letter:float-left
                          first-line:uppercase first-line:tracking-widest first-line:font-bold first-line:text-slate-800">
                    This paragraph uses <code>::first-letter</code> and <code>::first-line</code>. The first letter is large and colorful, while the entire first line is capitalized and bolded to create a classic editorial look.
                </p>
            </div>

            <!-- Decorations -->
            <div class="space-y-4">
                <h5 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Decorative Shapes</h5>
                <div class="relative p-6 bg-slate-50 rounded-xl border border-slate-100 text-center font-bold text-slate-700
                            before:content-['''] before:absolute before:-top-2 before:left-4 before:text-6xl before:text-blue-200 before:font-serif
                            after:content-['''] after:absolute after:-bottom-8 after:right-4 after:text-6xl after:text-blue-200 after:font-serif">
                    "Pseudo-elements allow you to insert content and create decorative elements without extra HTML tags."
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .font-cursive { font-family: cursive; }
  `]
})
export class CssPseudoLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }
}
