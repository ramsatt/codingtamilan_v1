import { Component } from '@angular/core';

type InnerType = 'member' | 'static';

@Component({
  selector: 'app-inner-class-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Inner Classes Visualizer</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Toggle -->
        <div class="flex gap-2">
          @for (t of types; track t.id) {
            <button (click)="mode = t.id"
              class="flex-1 py-2.5 rounded-xl border-2 text-xs font-black transition-all"
              [class.border-brand-500]="mode === t.id" [class.bg-brand-50]="mode === t.id" [class.text-brand-700]="mode === t.id"
              [class.border-slate-200]="mode !== t.id" [class.text-slate-600]="mode !== t.id">
              {{ t.label }}
            </button>
          }
        </div>

        <div class="grid lg:grid-cols-2 gap-5">

          <!-- Outer → Inner diagram -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Class Structure</p>

            <!-- Outer class -->
            <div class="rounded-2xl border-2 border-slate-700 bg-slate-900 p-4 space-y-3">
              <div class="flex items-center gap-2">
                <span class="text-[9px] bg-purple-700 text-purple-200 px-2 py-0.5 rounded-full font-bold uppercase">public class</span>
                <span class="font-mono text-sm text-yellow-300 font-black">{{ outerClass }}</span>
              </div>

              <div class="space-y-1 font-mono text-xs">
                @for (f of outerFields; track f) {
                  <div class="text-white pl-2"><span class="text-blue-400">String </span><span class="text-white">{{ f }}</span>;</div>
                }
              </div>

              <!-- Inner class box -->
              <div class="rounded-xl border-2 border-brand-500/50 bg-brand-950/20 p-3 space-y-2">
                <div class="flex items-center gap-2">
                  @if (mode === 'static') {
                    <span class="text-[9px] bg-amber-700 text-amber-200 px-2 py-0.5 rounded-full font-bold uppercase">static class</span>
                  } @else {
                    <span class="text-[9px] bg-blue-700 text-blue-200 px-2 py-0.5 rounded-full font-bold uppercase">class</span>
                  }
                  <span class="font-mono text-sm text-yellow-300 font-black">{{ innerClass }}</span>
                  <span class="ml-auto text-[9px] text-brand-400 font-bold">(inner)</span>
                </div>

                <div class="space-y-0.5 font-mono text-xs">
                  @for (f of innerFields; track f) {
                    <div class="text-white pl-2"><span class="text-blue-400">String </span><span class="text-white">{{ f }}</span>;</div>
                  }
                  <div class="pl-2 mt-1 text-yellow-300">{{ innerMethod }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Usage + code -->
          <div class="space-y-4">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">How to Instantiate</p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-1">
              @if (mode === 'member') {
                <div><span class="text-slate-500">// 1. Create outer object first</span></div>
                <div>
                  <span class="text-yellow-300">{{ outerClass }}</span>
                  <span class="text-white"> outer = </span>
                  <span class="text-purple-400">new </span>
                  <span class="text-yellow-300">{{ outerClass }}</span>
                  <span class="text-slate-300">();</span>
                </div>
                <div class="h-2"></div>
                <div><span class="text-slate-500">// 2. Use outer object to create inner</span></div>
                <div>
                  <span class="text-yellow-300">{{ outerClass }}.{{ innerClass }}</span>
                  <span class="text-white"> inner = outer.</span>
                  <span class="text-purple-400">new </span>
                  <span class="text-yellow-300">{{ innerClass }}</span>
                  <span class="text-slate-300">();</span>
                </div>
                <div class="h-2"></div>
                <div><span class="text-slate-500">// 3. Call inner method</span></div>
                <div>
                  <span class="text-white">inner.</span>
                  <span class="text-yellow-300">{{ innerMethod.replace('void ', '').replace(' { }', '()') }}</span>
                  <span class="text-slate-300">;</span>
                </div>
              } @else {
                <div><span class="text-slate-500">// Static inner — no outer object needed!</span></div>
                <div>
                  <span class="text-yellow-300">{{ outerClass }}.{{ innerClass }}</span>
                  <span class="text-white"> inner = </span>
                  <span class="text-purple-400">new </span>
                  <span class="text-yellow-300">{{ outerClass }}.{{ innerClass }}</span>
                  <span class="text-slate-300">();</span>
                </div>
                <div class="h-2"></div>
                <div>
                  <span class="text-white">inner.</span>
                  <span class="text-yellow-300">{{ innerMethod.replace('void ', '').replace(' { }', '()') }}</span>
                  <span class="text-slate-300">;</span>
                </div>
              }
            </div>

            <!-- Difference note -->
            <div [class.bg-blue-50]="mode === 'member'" [class.border-blue-200]="mode === 'member'"
              [class.bg-amber-50]="mode === 'static'" [class.border-amber-200]="mode === 'static'"
              class="border rounded-xl p-4 text-xs leading-relaxed">
              @if (mode === 'member') {
                <p class="text-blue-800"><strong>Member Inner Class:</strong> Has access to all fields and methods of the outer class (including private). Requires an outer object to instantiate.</p>
              } @else {
                <p class="text-amber-800"><strong>Static Nested Class:</strong> Does NOT have access to non-static members of outer class. Can be instantiated without an outer object — behaves like a top-level class.</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class InnerClassPlaygroundComponent {
  types = [
    { id: 'member' as InnerType, label: 'Member Inner Class' },
    { id: 'static' as InnerType, label: 'Static Nested Class' },
  ];
  mode: InnerType = 'member';

  get outerClass()  { return this.mode === 'member' ? 'Car'    : 'University'; }
  get innerClass()  { return this.mode === 'member' ? 'Engine' : 'Department'; }
  get outerFields() { return this.mode === 'member' ? ['brand', 'model']    : ['name', 'city']; }
  get innerFields() { return this.mode === 'member' ? ['horsepower', 'fuel'] : ['deptName', 'code']; }
  get innerMethod() { return this.mode === 'member' ? 'void start() { }'    : 'void display() { }'; }
}
