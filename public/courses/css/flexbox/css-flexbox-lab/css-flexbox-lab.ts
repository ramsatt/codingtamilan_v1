import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-flexbox-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="flexbox" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">6. Flexbox Layout</h3>
        <p class="article-body">
            The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.
        </p>
      </div>

      <!-- 1. Flex Container Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Flex Container Playground</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-4 rounded-xl border border-slate-200 h-fit">
                
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Item Count: {{ itemCount() }}</label>
                    <input type="range" min="1" max="10" [value]="itemCount()" (input)="itemCount.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>

                <!-- Flex Direction -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">flex-direction</label>
                    <select [value]="flexDirection()" (change)="flexDirection.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm">
                        <option value="row">row (default)</option>
                        <option value="row-reverse">row-reverse</option>
                        <option value="column">column</option>
                        <option value="column-reverse">column-reverse</option>
                    </select>
                </div>

                <!-- Justify Content -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">justify-content</label>
                    <div class="space-y-1">
                        <label *ngFor="let opt of justifyOptions" class="flex items-center gap-2 cursor-pointer p-2 hover:bg-white rounded transition">
                            <input type="radio" name="justify" [value]="opt" [checked]="justifyContent() === opt" (change)="justifyContent.set(opt)" class="text-blue-500">
                            <span class="text-xs font-mono">{{ opt }}</span>
                        </label>
                    </div>
                </div>

                <!-- Align Items -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">align-items</label>
                    <div class="space-y-1">
                        <label *ngFor="let opt of alignOptions" class="flex items-center gap-2 cursor-pointer p-2 hover:bg-white rounded transition">
                            <input type="radio" name="align" [value]="opt" [checked]="alignItems() === opt" (change)="alignItems.set(opt)" class="text-blue-500">
                            <span class="text-xs font-mono">{{ opt }}</span>
                        </label>
                    </div>
                </div>
                 
                 <!-- Flex Wrap -->
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">flex-wrap</label>
                    <select [value]="flexWrap()" (change)="flexWrap.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm">
                        <option value="nowrap">nowrap</option>
                        <option value="wrap">wrap</option>
                        <option value="wrap-reverse">wrap-reverse</option>
                    </select>
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-3">
                <div class="h-[600px] bg-slate-800 rounded-xl shadow-inner border border-slate-700 relative flex overflow-hidden p-4 transition-all duration-300"
                     [style.flexDirection]="flexDirection()"
                     [style.justifyContent]="justifyContent()"
                     [style.alignItems]="alignItems()"
                     [style.flexWrap]="flexWrap()">
                    
                    @for (item of items(); track item) {
                        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl border border-white/20 animate-popIn m-1 shrink-0"
                             [style.height.px]="item % 3 === 0 ? 100 : 80"
                             [style.width.px]="item % 2 === 0 ? 100 : 80">
                             {{ item }}
                        </div>
                    }

                </div>
                 <div class="mt-4 p-4 bg-slate-100 rounded border border-slate-200 font-mono text-sm text-slate-700">
                    <span class="text-purple-600">.container</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-600">display</span>: flex;<br>
                    &nbsp;&nbsp;<span class="text-blue-600">flex-direction</span>: {{ flexDirection() }};<br>
                    &nbsp;&nbsp;<span class="text-blue-600">justify-content</span>: {{ justifyContent() }};<br>
                    &nbsp;&nbsp;<span class="text-blue-600">align-items</span>: {{ alignItems() }};<br>
                    &nbsp;&nbsp;<span class="text-blue-600">flex-wrap</span>: {{ flexWrap() }};<br>
                    &#125;
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssFlexboxLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  flexDirection = signal('row');
  justifyContent = signal('flex-start');
  alignItems = signal('stretch');
  flexWrap = signal('nowrap');
  
  itemCount = signal(5);
  items = computed(() => Array.from({length: this.itemCount()}, (_, i) => i + 1));

  justifyOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
  alignOptions = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'];
}
