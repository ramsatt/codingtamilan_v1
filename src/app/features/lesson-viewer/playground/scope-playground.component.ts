import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

interface ScopeLevel {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  variables: { name: string; type: string; value: string }[];
  description: string;
}

const LEVELS: ScopeLevel[] = [
  {
    id: 'class', label: 'Class Scope', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-300',
    variables: [{ name: 'count', type: 'static int', value: '0' }, { name: 'name', type: 'String', value: '"Calculator"' }],
    description: 'Class-level (field) variables are accessible from any method in the class.'
  },
  {
    id: 'method', label: 'Method Scope', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-300',
    variables: [{ name: 'total', type: 'int', value: '10' }, { name: 'result', type: 'double', value: '3.14' }],
    description: 'Method-level variables exist only while the method is executing. They cannot be used outside the method.'
  },
  {
    id: 'block', label: 'Block Scope', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-300',
    variables: [{ name: 'i', type: 'int', value: '0..4' }, { name: 'temp', type: 'int', value: 'total * 2' }],
    description: 'Block variables (inside { }) exist only within that block — e.g. loop counters vanish after the loop ends.'
  },
];

@Component({
  selector: 'app-scope-playground',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Scope Visualizer</span>
        <span class="ml-auto text-[10px] text-slate-400">Click a scope level to inspect</span>
      </div>

      <div class="p-6 grid lg:grid-cols-2 gap-6">

        <!-- Nested scope boxes -->
        <div class="space-y-0">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Scope Nesting</p>

          <!-- Class scope -->
          <div class="rounded-2xl border-2 border-purple-300 bg-purple-50 p-4 cursor-pointer transition-all hover:shadow-md"
            [class.ring-2]="active?.id === 'class'" [class.ring-purple-400]="active?.id === 'class'"
            (click)="select('class')">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-3 h-3 rounded-full bg-purple-500"></div>
              <span class="text-xs font-black text-purple-700 uppercase tracking-wider">Class Scope</span>
            </div>
            <div class="font-mono text-xs text-purple-600 mb-3">
              <div><span class="text-purple-400">class</span> <span class="text-purple-700">Calculator</span> &#123;</div>
              <div class="pl-4 space-y-0.5">
                @for (v of levels[0].variables; track v.name) {
                  <div><span class="text-blue-600">{{ v.type }}</span> <span class="text-slate-700">{{ v.name }}</span> <span class="text-slate-400">= </span><span class="text-emerald-600">{{ v.value }}</span><span class="text-slate-400">;</span></div>
                }
              </div>

              <!-- Method scope -->
              <div class="mt-2 rounded-xl border-2 border-blue-300 bg-blue-50 p-3 cursor-pointer transition-all hover:shadow-sm"
                [class.ring-2]="active?.id === 'method'" [class.ring-blue-400]="active?.id === 'method'"
                (click)="select('method'); $event.stopPropagation()">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span class="text-[10px] font-black text-blue-700 uppercase tracking-wider">Method Scope</span>
                </div>
                <div class="font-mono text-xs text-blue-600">
                  <div><span class="text-blue-400">void</span> <span class="text-yellow-600">calculate</span><span class="text-slate-400">()</span> &#123;</div>
                  <div class="pl-4 space-y-0.5">
                    @for (v of levels[1].variables; track v.name) {
                      <div><span class="text-blue-600">{{ v.type }}</span> <span class="text-slate-700">{{ v.name }}</span> <span class="text-slate-400">= </span><span class="text-emerald-600">{{ v.value }}</span><span class="text-slate-400">;</span></div>
                    }
                  </div>

                  <!-- Block scope -->
                  <div class="mt-2 rounded-xl border-2 border-teal-300 bg-teal-50 p-3 cursor-pointer transition-all hover:shadow-sm"
                    [class.ring-2]="active?.id === 'block'" [class.ring-teal-400]="active?.id === 'block'"
                    (click)="select('block'); $event.stopPropagation()">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-2 h-2 rounded-full bg-teal-500"></div>
                      <span class="text-[10px] font-black text-teal-700 uppercase tracking-wider">Block Scope</span>
                    </div>
                    <div class="font-mono text-xs text-teal-700">
                      <div><span class="text-purple-500">for</span> (<span class="text-blue-500">int</span> <span class="text-slate-700">i</span> = <span class="text-emerald-600">0</span>; <span class="text-slate-500">i &lt; 5; i++</span>) &#123;</div>
                      <div class="pl-4"><span class="text-blue-500">int</span> <span class="text-slate-700">temp</span> = <span class="text-slate-600">total * 2</span>;</div>
                      <div>&#125;</div>
                      <div class="mt-1 text-teal-400 text-[10px]">// i and temp → not accessible here</div>
                    </div>
                  </div>

                  <div>&#125;</div>
                </div>
              </div>
              <div>&#125;</div>
            </div>
          </div>
        </div>

        <!-- Info panel -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspector</p>

          @if (active) {
            <div class="rounded-xl border-2 p-5 space-y-4 transition-all"
              [class]="'rounded-xl border-2 p-5 space-y-4 transition-all ' + active.borderColor + ' ' + active.bgColor">

              <h3 class="font-black text-sm" [ngClass]="active.color">{{ active.label }}</h3>
              <p class="text-xs leading-relaxed text-slate-600">{{ active.description }}</p>

              <!-- Variables in this scope -->
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Variables declared here</p>
                <div class="space-y-2">
                  @for (v of active.variables; track v.name) {
                    <div class="flex items-center gap-2 bg-white/70 rounded-lg px-3 py-2 border border-white/80">
                      <span class="font-mono text-xs text-blue-600">{{ v.type }}</span>
                      <span class="font-mono text-xs font-bold text-slate-800">{{ v.name }}</span>
                      <span class="font-mono text-xs text-emerald-600 ml-auto">= {{ v.value }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Visibility -->
              <div>
                <p class="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Accessible from</p>
                <div class="flex flex-wrap gap-2 text-[10px]">
                  @if (active.id === 'class') {
                    <span class="px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-bold">Same method</span>
                    <span class="px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-bold">All methods</span>
                    <span class="px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-bold">Inner blocks</span>
                  }
                  @if (active.id === 'method') {
                    <span class="px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">Inside calculate()</span>
                    <span class="px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold">Inner blocks</span>
                    <span class="px-2 py-1 rounded-full bg-red-100 text-red-600 font-bold line-through">Other methods ✗</span>
                  }
                  @if (active.id === 'block') {
                    <span class="px-2 py-1 rounded-full bg-teal-100 text-teal-700 font-bold">Only inside for &#123; &#125;</span>
                    <span class="px-2 py-1 rounded-full bg-red-100 text-red-600 font-bold line-through">After loop ✗</span>
                    <span class="px-2 py-1 rounded-full bg-red-100 text-red-600 font-bold line-through">Other methods ✗</span>
                  }
                </div>
              </div>
            </div>
          } @else {
            <div class="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 text-sm">
              Click a scope level on the left to inspect it
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ScopePlaygroundComponent {
  levels = LEVELS;
  active: ScopeLevel | null = null;

  select(id: string) {
    this.active = LEVELS.find(l => l.id === id) ?? null;
  }
}
