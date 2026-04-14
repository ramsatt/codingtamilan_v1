import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../../services/content-state';

@Component({
  selector: 'app-display-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="display" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">8. Display & Visibility</h3>
        <p class="article-body">
            The <code>display</code> property specifies the display behavior (the type of rendering box) of an element.
        </p>
      </div>

      <!-- 1. Display Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4">Display Behavior</h4>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Controls -->
            <div class="space-y-6">
                 <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Display Mode</label>
                    <div class="grid grid-cols-2 gap-3">
                        <button (click)="display.set('block')" [class]="getBtnClass('block')" class="py-2 px-4 rounded border text-sm font-bold transition">block</button>
                        <button (click)="display.set('inline')" [class]="getBtnClass('inline')" class="py-2 px-4 rounded border text-sm font-bold transition">inline</button>
                        <button (click)="display.set('inline-block')" [class]="getBtnClass('inline-block')" class="py-2 px-4 rounded border text-sm font-bold transition">inline-block</button>
                        <button (click)="display.set('none')" [class]="getBtnClass('none')" class="py-2 px-4 rounded border text-sm font-bold transition">none</button>
                    </div>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm">
                    <h5 class="font-bold text-blue-800 mb-2">About {{ display() }}</h5>
                    <p class="text-blue-600 leading-relaxed" *ngIf="display() === 'block'">
                        Takes up the full width available. Starts on a new line. Helpful for layout sections, paragraphs, headers.
                    </p>
                    <p class="text-blue-600 leading-relaxed" *ngIf="display() === 'inline'">
                        Takes up only as much width as necessary. Does NOT start on a new line. Width/height properties are ignored. Used for text spans, links.
                    </p>
                    <p class="text-blue-600 leading-relaxed" *ngIf="display() === 'inline-block'">
                        Like inline, but allows setting width and height. Respects top/bottom margins/padding. Good for buttons, navigation items.
                    </p>
                     <p class="text-blue-600 leading-relaxed" *ngIf="display() === 'none'">
                        The element is completely removed from the document layout. It takes up no space.
                    </p>
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-100 p-6 rounded-xl border border-slate-200">
                <div class="bg-white p-4 rounded shadow-sm border border-slate-200 text-slate-600">
                    <span class="bg-slate-200 px-1 rounded text-slate-500 text-xs font-mono">Before Element</span>
                    This is some text before our target element.
                    
                    <!-- Target Element -->
                    <div class="bg-orange-500 text-white font-bold p-2 text-center transition-all duration-300 border-2 border-orange-600"
                         [style.display]="display()"
                         [style.width.px]="display() === 'inline' ? null : 150"
                         [style.height.px]="display() === 'inline' ? null : 80">
                        TARGET
                    </div>

                    This is some text after our target element. Notice how the flow changes based on the display property.
                    <span class="bg-slate-200 px-1 rounded text-slate-500 text-xs font-mono">After Element</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class CssDisplayLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  display = signal('block');

  getBtnClass(val: string) {
      return this.display() === val 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200' 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50';
  }
}
