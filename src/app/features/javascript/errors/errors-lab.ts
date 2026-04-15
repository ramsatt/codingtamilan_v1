
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-errors-lab',
  imports: [CommonModule],
  template: `
    <section id="errors" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-red-500 pl-4">JS Errors</h3>
        <p class="article-body">
            Errors can occur due to syntax typos, logic issues, or runtime problems. Use <code class="bg-red-100 px-1 rounded text-red-900 font-bold text-sm">try...catch</code> to handle them.
        </p>
      </div>

      <!-- Error Handling Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-red-100 text-red-700 rounded text-xs">Handling</span> try...catch
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                 <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">try</span> {{ '{' }} <br>
                    &nbsp;&nbsp;<span class="code-keyword">throw new</span> <span class="text-red-400">Error</span>(<span class="text-green-400">"Oops!"</span>); <br>
                    {{ '}' }} <span class="code-keyword">catch</span> (e) {{ '{' }} <br>
                    &nbsp;&nbsp;<span class="code-keyword">console</span>.error(e.message); <br>
                    {{ '}' }} <span class="code-keyword">finally</span> {{ '{' }} <br>
                    &nbsp;&nbsp;<span class="text-slate-500">// Cleanup</span> <br>
                    {{ '}' }}
                </div>
                
                <div class="grid grid-cols-2 gap-2">
                    <button (click)="throwError()" class="bg-red-600 text-white font-bold py-2 rounded shadow hover:bg-red-700 transition active:scale-95 text-sm">
                        Throw Error 💥
                    </button>
                    <button (click)="runSuccess()" class="bg-green-600 text-white font-bold py-2 rounded shadow hover:bg-green-700 transition active:scale-95 text-sm">
                        Run Success ✅
                    </button>
                </div>
            </div>

            <div class="space-y-2">
                 <div class="bg-slate-50 p-6 rounded border border-slate-200 h-full flex flex-col justify-between">
                     <div class="space-y-2">
                         <div *ngIf="log.length > 0; else noLogs" class="space-y-1 font-mono text-xs">
                             <div *ngFor="let msg of log" 
                                  [class.text-red-600]="msg.type === 'error'"
                                  [class.text-green-600]="msg.type === 'success'"
                                  [class.text-blue-600]="msg.type === 'info'"
                                  class="border-b border-slate-100 pb-1 last:border-0 animate-fadeIn">
                                 [{{ msg.time | date:'HH:mm:ss' }}] {{ msg.text }}
                             </div>
                         </div>
                         <ng-template #noLogs>
                             <div class="text-slate-300 italic text-center py-8 text-sm">
                                 Console is empty...
                             </div>
                         </ng-template>
                     </div>
                     
                     <div class="mt-4 pt-4 border-t border-slate-200 flex justify-end">
                         <button (click)="clearLogs()" class="text-xs text-slate-300 hover:text-slate-600 underline">Clear Console</button>
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  `
})
export class ErrorsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  log: { type: 'info' | 'error' | 'success', text: string, time: Date }[] = [];

  throwError() {
      this.log = []; // Clear previous run for clarity
      this.addLog('info', 'Starting execution...');
      
      try {
          this.addLog('info', 'Inside try block...');
          throw new Error('Something went wrong!');
          // Unreachable code
          this.addLog('success', 'This will not run.');
      } catch (e: any) {
          this.addLog('error', `Caught error: ${e.message}`);
      } finally {
          this.addLog('info', 'Running finally block (cleanup)...');
      }
      
      this.addLog('info', 'Execution continues...');
  }

  runSuccess() {
      this.log = [];
      this.addLog('info', 'Starting execution...');

      try {
          this.addLog('info', 'Inside try block...');
          const result = 10 + 20;
          this.addLog('success', `Operation successful: ${result}`);
      } catch (e: any) {
          this.addLog('error', `Caught error: ${e.message}`);
      } finally {
          this.addLog('info', 'Running finally block...');
      }

      this.addLog('info', 'Execution finished.');
  }

  addLog(type: 'info' | 'error' | 'success', text: string) {
      this.log.push({ type, text, time: new Date() });
  }

  clearLogs() {
      this.log = [];
  }
}
