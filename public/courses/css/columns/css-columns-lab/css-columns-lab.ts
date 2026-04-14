import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-css-columns-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="columns" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">27. Multi-column Layout</h3>
        <p class="article-body">
            The Multi-column Layout Module allows easy definition of multiple columns of text - just like in newspapers.
        </p>
      </div>

      <!-- 1. Columns Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-6 font-mono">column-count: explorer;</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Controls -->
            <div class="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200 h-fit">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Column Count: {{ count() }}</label>
                    <input type="range" min="1" max="5" [value]="count()" (input)="count.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Column Gap: {{ gap() }}px</label>
                    <input type="range" min="10" max="100" [value]="gap()" (input)="gap.set($any($event.target).value)" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Column Rule Style</label>
                    <select [value]="ruleStyle()" (change)="ruleStyle.set($any($event.target).value)" class="w-full bg-white border border-slate-300 rounded p-2 text-sm font-mono">
                        <option value="none">none</option>
                        <option value="solid">solid</option>
                        <option value="dashed">dashed</option>
                        <option value="dotted">dotted</option>
                        <option value="double">double</option>
                    </select>
                </div>

                <div class="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-slate-300 leading-relaxed shadow-xl">
                    <span class="text-purple-400">.article</span> &#123;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">column-count</span>: {{ count() }};<br>
                    &nbsp;&nbsp;<span class="text-blue-400">column-gap</span>: {{ gap() }}px;<br>
                    &nbsp;&nbsp;<span class="text-blue-400">column-rule</span>: 2px {{ ruleStyle() }} #cbd5e1;<br>
                    &#125;
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-3 bg-white p-8 rounded-xl border border-slate-200 shadow-inner overflow-hidden">
                <div class="transition-all duration-500 text-slate-600 leading-relaxed text-justify"
                     [style.columnCount]="count()"
                     [style.columnGap.px]="gap()"
                     [style.columnRule]="'2px ' + ruleStyle() + ' #cbd5e1'">
                    <h5 class="text-xl font-bold text-slate-800 mb-4 column-span-all" style="column-span: all;">BREAKING NEWS: CSS Layouts Simplified</h5>
                    <p class="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas iaculis. 
                        Quisque at feugiat nisi. In hac habitasse platea dictumst. Curabitur sit amet sapien elementum, 
                        luctus ante egestas, placerat tellus. Vivamus dapibus elementum feugiat. 
                    </p>
                    <p class="mb-4">
                        Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis 
                        dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. 
                        Donec ullamcorper nulla non metus auctor fringilla. 
                    </p>
                    <p class="mb-4 font-bold italic text-blue-600">
                        "The multi-column layout is perfect for text-heavy content that needs to remain readable across screen sizes."
                    </p>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget risus varius blandit 
                        sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. 
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    </p>
                    <p>
                        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere 
                        consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssColumnsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  count = signal(3);
  gap = signal(40);
  ruleStyle = signal('solid');
}
