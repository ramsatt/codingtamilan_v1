import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-grid-areas-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="grid-areas" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">25. Grid Template Areas</h3>
        <p class="article-body">
            <code>grid-template-areas</code> allows you to define named areas in your grid layout, making the CSS easier to read and maintain.
        </p>
      </div>

      <!-- 1. Grid Area Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">grid-template-areas: "classic-layout";</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Controls -->
            <div class="space-y-6">
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-4">Select Layout Template</label>
                    <div class="grid grid-cols-1 gap-3">
                        <button *ngFor="let layout of layouts" 
                                (click)="currentLayout.set(layout.id)"
                                [class]="getBtnClass(currentLayout(), layout.id)"
                                class="p-3 rounded border text-sm font-bold transition text-left flex justify-between items-center group">
                            <span>{{ layout.label }}</span>
                            <span class="text-[10px] opacity-50 group-hover:opacity-100 font-mono">{{ layout.id }}</span>
                        </button>
                    </div>
                </div>

                <div class="bg-slate-900 rounded-xl p-5 font-mono text-[11px] text-slate-300 shadow-2xl leading-relaxed">
                    <span class="text-purple-400">.container</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">display</span>: grid;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">grid-template-areas</span>:<br>
                    <div class="pl-4 text-emerald-400">
                        @for (line of getActiveLayoutLines(); track line) {
                            "{{ line }}"<br>
                        }
                    </div>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-800 rounded-3xl p-6 shadow-2xl border-8 border-slate-900 min-h-[500px] flex items-stretch">
                <div class="grid w-full gap-3 transition-all duration-500 flex-1"
                     [style.gridTemplateAreas]="getGridTemplateValue()"
                     [style.gridTemplateColumns]="'repeat(3, 1fr)'"
                     [style.gridTemplateRows]="'80px 1fr 60px'">
                    
                    <div class="grid-card bg-blue-500 text-white flex items-center justify-center font-bold rounded-xl border-2 border-white/20 shadow-lg" [style.gridArea]="'header'">HEADER</div>
                    <div class="grid-card bg-emerald-500 text-white flex items-center justify-center font-bold rounded-xl border-2 border-white/20 shadow-lg" [style.gridArea]="'nav'">NAV</div>
                    <div class="grid-card bg-slate-600 text-white flex items-center justify-center font-bold rounded-xl border-2 border-white/20 shadow-lg" [style.gridArea]="'main'">MAIN CONTENT</div>
                    <div class="grid-card bg-orange-500 text-white flex items-center justify-center font-bold rounded-xl border-2 border-white/20 shadow-lg" [style.gridArea]="'sidebar'">SIDEBAR</div>
                    <div class="grid-card bg-slate-700 text-white flex items-center justify-center font-bold rounded-xl border-2 border-white/20 shadow-lg" [style.gridArea]="'footer'">FOOTER</div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .grid-card { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  `]
})
export class CssGridAreasLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  layouts = [
    { 
      id: 'standard', 
      label: 'Standard Layout', 
      lines: ['header header header', 'nav main sidebar', 'footer footer footer'] 
    },
    { 
      id: 'full-width', 
      label: 'Main Centered', 
      lines: ['header header header', 'main main main', 'footer footer footer'] 
    },
    { 
      id: 'dashboard', 
      label: 'Dashboard Style', 
      lines: ['nav header header', 'nav main sidebar', 'footer footer footer'] 
    }
  ];

  currentLayout = signal('standard');

  getActiveLayoutLines() {
    return this.layouts.find(l => l.id === this.currentLayout())?.lines || [];
  }

  getGridTemplateValue() {
    return this.getActiveLayoutLines().map(line => `"${line}"`).join(' ');
  }

  getBtnClass(active: string, current: string) {
      return active === current 
        ? 'bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-100' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
