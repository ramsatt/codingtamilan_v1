
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-intro-lab',
  imports: [CommonModule],
  template: `
    <section id="intro" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-yellow-500 pl-4">1. Introduction to JavaScript</h3>
        <p class="article-body">
            <span class="font-bold text-slate-800">JavaScript</span> is the programming language of the Web. It enables dynamic content, controls multimedia, animates images, and pretty much everything else.
        </p>
      </div>

      <!-- Quick Demo -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-yellow-100 text-yellow-700 rounded text-xs">Interactive</span> Hello World
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Code -->
            <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner flex flex-col justify-center">
                <div class="absolute top-2 right-2 text-[10px] text-slate-500 font-bold uppercase">script.js</div>
                <span class="code-keyword">function</span> sayHello() {{ '{' }}<br>
                &nbsp;&nbsp;alert(<span class="text-green-400">"Hello from JS!"</span>);<br>
                {{ '}' }}
            </div>

            <!-- Execution -->
            <div class="flex items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded">
                <button (click)="showAlert()" class="px-6 py-3 bg-yellow-500 text-white font-bold rounded shadow hover:bg-yellow-600 transition active:scale-95">
                    Run sayHello()
                </button>
            </div>

        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class IntroLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  showAlert() {
    alert("Hello from JavaScript! ⚡");
  }
}
