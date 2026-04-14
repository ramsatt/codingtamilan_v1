import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-lists-links-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="lists-links" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">18. Lists & Links</h3>
        <p class="article-body">
            Customizing list markers and styling links based on their states (hover, active, visited).
        </p>
      </div>

      <!-- 1. Lists Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">list-style-type: explorer;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6">
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Marker Type</label>
                    <div class="grid grid-cols-2 gap-3">
                        @for (type of listTypes; track type) {
                            <button (click)="listStyleType.set(type)" 
                                    [class]="getBtnClass(listStyleType(), type)"
                                    class="py-2 px-4 rounded border text-sm font-bold transition">
                                {{ type }}
                            </button>
                        }
                    </div>
                </div>

                <div class="bg-blue-50 p-4 rounded border border-blue-100 font-mono text-xs">
                    <span class="text-blue-800">ul</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-600">list-style-type</span>: {{ listStyleType() }};<br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-100 p-8 rounded-xl border border-slate-200">
                <ul class="space-y-4 pl-10 list-outside text-slate-700 font-medium transition-all"
                    [style.listStyleType]="listStyleType()">
                    <li>Getting Started with CSS</li>
                    <li>Mastering the Box Model</li>
                    <li>Advanced Layouts (Flex & Grid)</li>
                    <li>Responsive Web Design</li>
                </ul>
            </div>
        </div>
      </div>

      <!-- 2. Links Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">link-decoration: states;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="bg-slate-100 p-8 rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-8">
                <!-- Sample Link -->
                <a href="javascript:void(0)" 
                   class="text-2xl font-bold transition-all duration-300 relative group"
                   [style.color]="linkColor()"
                   [style.textDecoration]="showUnderline() ? 'underline' : 'none'"
                   [style.textUnderlineOffset.px]="4">
                   Click Me!
                   <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"
                         *ngIf="!showUnderline()"></span>
                </a>

                <div class="flex gap-4">
                    @for (state of ['Normal', 'Hover', 'Active']; track state) {
                        <div class="text-center">
                            <div class="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all"
                                 [style.borderColor]="state === activeLinkState() ? linkColor() : '#e2e8f0'"
                                 [style.color]="state === activeLinkState() ? linkColor() : '#94a3b8'"
                                 (click)="activeLinkState.set(state)">
                                {{ state[0] }}
                            </div>
                            <span class="text-[10px] text-slate-300 mt-1 block font-bold uppercase">{{ state }}</span>
                        </div>
                    }
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Base Color</label>
                        <input type="color" [value]="linkColor()" (input)="linkColor.set($any($event.target).value)" class="h-10 w-full rounded border-0 bg-transparent cursor-pointer">
                    </div>
                    
                    <label class="flex items-center gap-2 cursor-pointer pt-2">
                        <input type="checkbox" [checked]="showUnderline()" (change)="showUnderline.set(!showUnderline())" class="rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-sm font-bold text-slate-700">text-decoration: underline;</span>
                    </label>
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300">
                    <span class="text-yellow-400">a</span> &#123; <span class="text-blue-400">color</span>: {{ linkColor() }}; &#125;<br>
                    <span class="text-yellow-400">a:hover</span> &#123; <span class="text-blue-400">color</span>: {{ linkColor() }}; <span class="text-cyan-400">opacity</span>: 0.8; &#125;
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssListsLinksLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  listStyleType = signal('square');
  listTypes = ['disc', 'circle', 'square', 'decimal', 'lower-alpha', 'upper-roman', 'none'];

  linkColor = signal('#3b82f6');
  showUnderline = signal(false);
  activeLinkState = signal('Normal');

  getBtnClass(active: string, current: string) {
      return active === current 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
