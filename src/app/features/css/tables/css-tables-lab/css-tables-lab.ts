import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-tables-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="tables" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">17. CSS Tables</h3>
        <p class="article-body">
            Styling HTML tables to be readable, professional, and visually appealing.
        </p>
      </div>

      <!-- 1. Table Style Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">table-styling: playground;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                
                <div class="space-y-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" [checked]="collapse()" (change)="collapse.set(!collapse())" class="rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-sm font-bold text-slate-700">border-collapse: collapse;</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" [checked]="zebraStripes()" (change)="zebraStripes.set(!zebraStripes())" class="rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-sm font-bold text-slate-700">Zebra Striping (odd/even)</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" [checked]="hoverEffect()" (change)="hoverEffect.set(!hoverEffect())" class="rounded text-blue-600 focus:ring-blue-500">
                        <span class="text-sm font-bold text-slate-700">Row Hover Effect</span>
                    </label>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Cell Padding: {{ padding() }}px</label>
                    <input type="range" min="4" max="24" [value]="padding()" (input)="padding.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300">
                    <span class="text-yellow-400">table</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">border-collapse</span>: {{ collapse() ? 'collapse' : 'separate' }};<br>
                    &#125;<br>
                    <span class="text-yellow-400">th, td</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-cyan-400">padding</span>: {{ padding() }}px;<br>
                    &#125;
                    <span *ngIf="zebraStripes()">
                        <br><span class="text-yellow-400">tr:nth-child(even)</span> &#123;<br>
                        &nbsp;&nbsp;<span class="text-cyan-400">background-color</span>: #f8fafc;<br>
                        &#125;
                    </span>
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-2 overflow-x-auto bg-slate-100 p-8 rounded-xl border border-slate-200 min-h-[400px]">
                <table class="w-full bg-white transition-all duration-300 shadow-sm"
                       [style.borderCollapse]="collapse() ? 'collapse' : 'separate'"
                       [style.borderSpacing.px]="collapse() ? 0 : 4">
                    <thead>
                        <tr class="bg-slate-800 text-white text-left">
                            <th class="border border-slate-300" [style.padding.px]="padding()">Student</th>
                            <th class="border border-slate-300" [style.padding.px]="padding()">Topic</th>
                            <th class="border border-slate-300" [style.padding.px]="padding()">Score</th>
                            <th class="border border-slate-300" [style.padding.px]="padding()">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (row of data; track row.name; let i = $index) {
                            <tr class="transition-colors"
                                [class.bg-slate-50]="zebraStripes() && i % 2 === 1"
                                [class.hover:bg-blue-50]="hoverEffect()">
                                <td class="border border-slate-300" [style.padding.px]="padding()">{{ row.name }}</td>
                                <td class="border border-slate-300" [style.padding.px]="padding()">{{ row.topic }}</td>
                                <td class="border border-slate-300 font-mono font-bold" [style.padding.px]="padding()" 
                                    [class.text-emerald-600]="row.score >= 80"
                                    [class.text-orange-600]="row.score < 80">
                                    {{ row.score }}%
                                </td>
                                <td class="border border-slate-300" [style.padding.px]="padding()">
                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                                          [class.bg-emerald-100]="row.status === 'Completed'"
                                          [class.text-emerald-700]="row.status === 'Completed'"
                                          [class.bg-blue-100]="row.status === 'In Progress'"
                                          [class.text-blue-700]="row.status === 'In Progress'">
                                        {{ row.status }}
                                    </span>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssTablesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  collapse = signal(true);
  zebraStripes = signal(true);
  hoverEffect = signal(true);
  padding = signal(12);

  data = [
    { name: 'Arun', topic: 'Selectors', score: 95, status: 'Completed' },
    { name: 'Priya', topic: 'Box Model', score: 88, status: 'Completed' },
    { name: 'Karthik', topic: 'Flexbox', score: 72, status: 'In Progress' },
    { name: 'Meera', topic: 'Grid', score: 91, status: 'Completed' },
    { name: 'Suresh', topic: 'Variables', score: 65, status: 'In Progress' }
  ];
}
