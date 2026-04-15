
import { Component, ElementRef, ViewChild, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-dom-lab',
  imports: [CommonModule],
  template: `
    <section id="dom" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-4">6. DOM Manipulation</h3>
        <p class="article-body">
            The <span class="font-bold text-slate-800">Document Object Model (DOM)</span> connects web pages to scripts.
            JavaScript can change HTML elements, attributes, and styles, and react to all existing events.
        </p>
      </div>

      <!-- DOM Playground -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-cyan-100 text-cyan-700 rounded text-xs">Live</span> DOM Interaction
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Controls -->
            <div class="space-y-4">
                <div class="text-xs font-bold text-slate-500 uppercase">JavaScript Commands</div>
                
                <button (click)="changeText()" class="w-full text-left bg-slate-50 hover:bg-slate-100 p-2 rounded border border-slate-200 font-mono text-xs text-slate-700 flex justify-between group transition">
                    <span>document.getElementById("target").innerText = "Hello!";</span>
                    <span class="text-cyan-600 opacity-0 group-hover:opacity-100">Run ▶</span>
                </button>

                <button (click)="changeColor()" class="w-full text-left bg-slate-50 hover:bg-slate-100 p-2 rounded border border-slate-200 font-mono text-xs text-slate-700 flex justify-between group transition">
                    <span>target.style.color = "red";</span>
                    <span class="text-cyan-600 opacity-0 group-hover:opacity-100">Run ▶</span>
                </button>

                <button (click)="toggleHide()" class="w-full text-left bg-slate-50 hover:bg-slate-100 p-2 rounded border border-slate-200 font-mono text-xs text-slate-700 flex justify-between group transition">
                    <span>target.style.display = "{{ isHidden ? 'block' : 'none' }}";</span>
                    <span class="text-cyan-600 opacity-0 group-hover:opacity-100">Run ▶</span>
                </button>

                <button (click)="reset()" class="w-full text-center text-xs text-slate-300 hover:text-slate-600 underline mt-4">
                    Reset DOM
                </button>
            </div>

            <!-- The DOM Element -->
            <div class="flex items-center justify-center bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 min-h-[200px] relative overflow-hidden">
                <div class="absolute top-2 left-2 text-[10px] text-slate-300 font-bold uppercase">Browser Viewport</div>
                
                <div #targetBox class="p-6 bg-white rounded shadow-lg transition-all duration-500 text-center"
                     [style.color]="textColor"
                     [style.display]="isHidden ? 'none' : 'block'">
                    <h2 class="text-2xl font-bold mb-2">{{ boxText }}</h2>
                    <p class="text-sm text-slate-300">id="target"</p>
                </div>
                
                <div *ngIf="isHidden" class="text-slate-300 italic text-sm animate-pulse">
                    (Element is hidden)
                </div>
            </div>

        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class DomLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  boxText = 'Original Text';
  textColor = 'black';
  isHidden = false;

  changeText() {
    this.boxText = "Hello World! 🌍";
  }

  changeColor() {
    const colors = ['red', 'blue', 'green', 'purple', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.textColor = randomColor;
  }

  toggleHide() {
    this.isHidden = !this.isHidden;
  }

  reset() {
    this.boxText = 'Original Text';
    this.textColor = 'black';
    this.isHidden = false;
  }
}
